/**
 * SignBridge - MediaPipe Gesture & Hand Landmarker Hook
 * 
 * Manages webcam streams, MediaPipe Tasks Vision model loading,
 * high-performance requestAnimationFrame inference loop, and canvas landmark rendering.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { classifyHandSign, analyzeHandGeometry, TemporalStabilityFilter } from '../classifier/signClassifier';
import { renderHandsOnCanvas } from '../utils/drawLandmarks';

// CDN URL for MediaPipe Vision WASM binaries
const MEDIAPIPE_WASM_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
// Google Storage URL for pre-trained Gesture Recognizer model
const GESTURE_MODEL_PATH = "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

export function useHandLandmarker() {
  // Model state
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelError, setModelError] = useState(null);

  // Camera stream state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Recognition state
  const [status, setStatus] = useState("Initializing AI Engine...");
  const [handDetected, setHandDetected] = useState(false);
  const [handCount, setHandCount] = useState(0);
  const [handGeometry, setHandGeometry] = useState(null);
  const [activeSign, setActiveSign] = useState(null);
  const [confirmedSign, setConfirmedSign] = useState(null);
  const [fps, setFps] = useState(0);

  // UI display preferences
  const [isMirrored, setIsMirrored] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Internal refs
  const recognizerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const stabilityFilterRef = useRef(new TemporalStabilityFilter(7, 4, 1300));
  const lastTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const lastFpsCalcRef = useRef(0);
  const detectFrameRef = useRef(null);

  // 1. Initialize MediaPipe Gesture Recognizer on mount once
  useEffect(() => {
    let isCancelled = false;

    async function initMediaPipe() {
      try {
        setIsModelLoading(true);
        setStatus("Loading MediaPipe Vision engine...");

        const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_CDN);
        if (isCancelled) return;

        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: GESTURE_MODEL_PATH,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        if (isCancelled) return;

        recognizerRef.current = recognizer;
        setIsModelLoading(false);
        setStatus("AI engine ready. Click 'Start Camera' to begin.");
      } catch (err) {
        console.warn("Primary GPU MediaPipe init failed, trying CPU fallback:", err);
        try {
          const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_CDN);
          const fallbackRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: GESTURE_MODEL_PATH,
              delegate: "CPU"
            },
            runningMode: "VIDEO",
            numHands: 2
          });
          if (isCancelled) return;
          recognizerRef.current = fallbackRecognizer;
          setIsModelLoading(false);
          setStatus("AI engine ready (CPU mode). Click 'Start Camera' to begin.");
        } catch (fallbackErr) {
          if (isCancelled) return;
          console.error("Fatal MediaPipe initialization error:", fallbackErr);
          setModelError("Unable to load MediaPipe AI model. You can still use Demo Mode or phrase search.");
          setIsModelLoading(false);
          setStatus("AI engine offline. Demo mode available.");
        }
      }
    }

    initMediaPipe();

    return () => {
      isCancelled = true;
      if (recognizerRef.current) {
        try {
          recognizerRef.current.close?.();
        } catch (_cleanupErr) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // 2. Detection Frame Loop
  const detectLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const recognizer = recognizerRef.current;

    if (!video || !canvas || !recognizer || video.readyState < 2) {
      animFrameIdRef.current = requestAnimationFrame(() => detectFrameRef.current?.());
      return;
    }

    // Match canvas dimensions to video feed
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
    }

    const ctx = canvas.getContext('2d');
    const now = performance.now();

    // Avoid duplicate timestamps to MediaPipe video mode
    if (now > lastTimeRef.current) {
      lastTimeRef.current = now;

      try {
        const results = recognizer.recognizeForVideo(video, Math.round(now));

        // FPS calculation
        frameCountRef.current++;
        if (lastFpsCalcRef.current === 0) lastFpsCalcRef.current = Date.now();
        const timeDiff = Date.now() - lastFpsCalcRef.current;
        if (timeDiff >= 1000) {
          setFps(Math.round((frameCountRef.current * 1000) / timeDiff));
          frameCountRef.current = 0;
          lastFpsCalcRef.current = Date.now();
        }

        const handsLandmarks = results.landmarks || [];
        const handednesses = results.handednesses || [];
        const gestures = results.gestures || [];

        if (handsLandmarks.length > 0) {
          setHandDetected(true);
          setHandCount(handsLandmarks.length);

          // Classify primary detected hand
          const primaryHandLandmarks = handsLandmarks[0];
          const primaryHandedness = handednesses[0]?.[0]?.categoryName || "Right";
          const primaryGestures = gestures[0] || [];

          // Extract real-time hand geometry for the Hand Anatomy HUD
          const geo = analyzeHandGeometry(primaryHandLandmarks, primaryHandedness);
          setHandGeometry(geo);

          const prediction = classifyHandSign(
            primaryHandLandmarks,
            primaryGestures,
            primaryHandedness,
            handsLandmarks
          );

          setActiveSign(prediction);

          if (prediction && prediction.name) {
            setStatus(`Recognizing: ${prediction.name} (${Math.round(prediction.confidence * 100)}%)`);

            // Push through temporal stability filter
            const stable = stabilityFilterRef.current.update(prediction);
            if (stable) {
              setConfirmedSign({
                ...stable,
                timestamp: Date.now()
              });
            }
          } else {
            setStatus(handsLandmarks.length > 1 ? "Tracking 2 hands (holding gesture...)" : "Detecting hand (holding position...)");
          }

          // Draw skeleton on canvas overlay
          if (showLandmarks && ctx) {
            renderHandsOnCanvas(ctx, handsLandmarks, handednesses, {
              mirrored: isMirrored,
              showBoundingBox: true,
              showHandedness: true,
              activeSign: prediction
            });
          } else if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        } else {
          setHandDetected(false);
          setHandCount(0);
          setHandGeometry(null);
          setActiveSign(null);
          setStatus("No hand detected. Hold hand in front of camera.");
          stabilityFilterRef.current.reset();
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch (err) {
        console.warn("Frame recognition warning:", err);
      }
    }

    animFrameIdRef.current = requestAnimationFrame(() => detectFrameRef.current?.());
  }, [isMirrored, showLandmarks]);

  useEffect(() => {
    detectFrameRef.current = detectLoop;
  }, [detectLoop]);

  // 3. Start Camera (User Action Only)
  const startCamera = async () => {
    setCameraError(null);
    setPermissionDenied(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Webcam access is not supported by your browser environment.");
      }

      setStatus("Requesting camera permission...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setIsCameraActive(true);
            setStatus("Camera active. Show your hand gestures.");
            animFrameIdRef.current = requestAnimationFrame(detectLoop);
          }).catch(err => {
            console.error("Video play error:", err);
            setCameraError("Failed to start video stream playback.");
          });
        };
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setIsCameraActive(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
        setCameraError("Camera permission was denied. Please allow camera access in your browser settings to use real-time sign recognition.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError("No camera device was found on your system. You can test sign recognition using Demo Mode below.");
      } else {
        setCameraError(`Camera error: ${err.message || 'Unable to access webcam.'}`);
      }
      setStatus("Camera offline");
    }
  };

  // 4. Stop Camera and Clean Tracks
  const stopCamera = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    setIsCameraActive(false);
    setHandDetected(false);
    setHandCount(0);
    setHandGeometry(null);
    setActiveSign(null);
    setFps(0);
    stabilityFilterRef.current.reset();
    setStatus("Camera stopped. Click 'Start Camera' to resume.");
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Restart detectLoop if mirror or showLandmarks changes while camera is running
  useEffect(() => {
    if (isCameraActive) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      animFrameIdRef.current = requestAnimationFrame(detectLoop);
    }
  }, [isCameraActive, detectLoop]);

  // 5. Trigger Simulated Sign (Demo Mode)
  const simulateSign = (signName, confidence = 0.95, category = "General", action = null) => {
    const simPrediction = {
      name: signName,
      phrase: signName,
      confidence: confidence,
      method: "simulated-demo",
      category: category,
      action: action,
      timestamp: Date.now()
    };
    setActiveSign(simPrediction);
    setConfirmedSign(simPrediction);
    setStatus(`[Demo Mode] Simulated sign: "${signName}"`);
  };

  return {
    // Refs to attach to elements
    videoRef,
    canvasRef,

    // Status & errors
    isModelLoading,
    modelError,
    isCameraActive,
    cameraError,
    permissionDenied,
    status,
    handDetected,
    handCount,
    handGeometry,
    fps,

    // Detection output
    activeSign,
    confirmedSign,

    // Controls
    startCamera,
    stopCamera,
    simulateSign,

    // UI Preferences
    isMirrored,
    setIsMirrored,
    showLandmarks,
    setShowLandmarks,
    isDemoMode,
    setIsDemoMode
  };
}
