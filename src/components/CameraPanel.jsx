import React from 'react';
import { 
  Camera, 
  CameraOff, 
  FlipHorizontal, 
  Eye, 
  EyeOff, 
  Activity, 
  Hand, 
  AlertCircle, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function CameraPanel({
  videoRef,
  canvasRef,
  isCameraActive,
  isModelLoading,
  modelError,
  cameraError,
  permissionDenied,
  status,
  handDetected,
  fps,
  isMirrored,
  setIsMirrored,
  showLandmarks,
  setShowLandmarks,
  onStartCamera,
  onStopCamera,
  activeSign
}) {
  return (
    <div className="camera-card">
      {/* Camera Header Bar */}
      <div className="camera-header-bar">
        <div className="camera-title-group">
          <div className="card-icon-pill">
            <Camera size={18} />
          </div>
          <div>
            <h2 className="card-heading">Live Camera Stream</h2>
            <p className="card-subheading">MediaPipe Hand Landmarker detection</p>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="camera-status-cluster">
          {isCameraActive && (
            <div className={`status-pill ${handDetected ? 'pill-detected' : 'pill-seeking'}`}>
              <span className="pulse-indicator"></span>
              {handDetected ? (
                <span>Hand In Frame</span>
              ) : (
                <span>Awaiting Hand</span>
              )}
            </div>
          )}

          {isCameraActive && fps > 0 && (
            <div className="fps-counter" title="Frames per second">
              <Activity size={13} />
              <span>{fps} FPS</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="viewport-wrapper">
        <div className={`viewport-container ${isMirrored ? 'is-mirrored' : ''}`}>
          {/* Native HTML5 video */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`camera-video ${!isCameraActive ? 'hidden' : ''}`}
            aria-label="Webcam video stream"
          />

          {/* HTML5 Canvas for glowing landmarks */}
          <canvas
            ref={canvasRef}
            className={`camera-canvas ${!isCameraActive ? 'hidden' : ''}`}
            aria-label="Hand landmark overlay"
          />

          {/* Camera Offline / Empty State */}
          {!isCameraActive && !permissionDenied && !cameraError && (
            <div className="viewport-empty-state">
              <div className="empty-graphic-circle">
                <Hand className="empty-hand-icon" size={48} />
              </div>
              <h3 className="empty-heading">Camera is Currently Offline</h3>
              <p className="empty-body">
                Click <strong>Start Camera</strong> to enable real-time hand landmark tracking and gesture recognition.
              </p>
              
              <div className="empty-features-list">
                <div className="empty-feature-item">
                  <span className="dot-bullet"></span>
                  <span>Tracks 21 3D hand joints with MediaPipe</span>
                </div>
                <div className="empty-feature-item">
                  <span className="dot-bullet"></span>
                  <span>100% private: processed locally on your device</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary btn-start-cam"
                onClick={onStartCamera}
                disabled={isModelLoading}
                aria-label="Start Camera"
              >
                {isModelLoading ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Loading AI Model...</span>
                  </>
                ) : (
                  <>
                    <Camera size={18} />
                    <span>Start Camera</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Permission Denied Error State */}
          {permissionDenied && (
            <div className="viewport-error-state">
              <div className="error-icon-box">
                <AlertCircle size={44} className="text-rose-500" />
              </div>
              <h3 className="error-heading">Camera Permission Required</h3>
              <p className="error-body">
                Your browser blocked webcam access. To use live sign detection:
              </p>
              <ol className="error-steps">
                <li>Click the camera icon or site lock icon in your browser's address bar.</li>
                <li>Change Camera access to <strong>Allow</strong>.</li>
                <li>Refresh the page or click retry below.</li>
              </ol>
              <button
                type="button"
                className="btn-primary btn-retry"
                onClick={onStartCamera}
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Device / General Camera Error */}
          {cameraError && !permissionDenied && (
            <div className="viewport-error-state">
              <div className="error-icon-box">
                <AlertCircle size={44} className="text-amber-500" />
              </div>
              <h3 className="error-heading">Camera Device Unavailable</h3>
              <p className="error-body">{cameraError}</p>
              <p className="text-xs text-slate-400 mt-2">
                Tip: You can continue exploring using the <strong>Demo Mode</strong> simulation below!
              </p>
              <button
                type="button"
                className="btn-secondary mt-3"
                onClick={onStartCamera}
              >
                <RefreshCw size={16} />
                <span>Retry Connection</span>
              </button>
            </div>
          )}

          {/* Real-time sign recognition overlay tag */}
          {isCameraActive && activeSign && activeSign.name && (
            <div className="live-sign-tag">
              <Sparkles size={16} className="text-amber-300" />
              <span className="live-sign-name">{activeSign.name}</span>
              <span className="live-sign-conf">
                {Math.round(activeSign.confidence * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Camera Toolbar & Controls */}
      <div className="camera-toolbar">
        <div className="toolbar-left">
          {isCameraActive ? (
            <button
              type="button"
              className="btn-danger"
              onClick={onStopCamera}
              aria-label="Stop Camera"
            >
              <CameraOff size={16} />
              <span>Stop Camera</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={onStartCamera}
              disabled={isModelLoading}
              aria-label="Start Camera"
            >
              <Camera size={16} />
              <span>Start Camera</span>
            </button>
          )}

          <div className="status-string" title={status}>
            <span className="status-label">Status:</span>
            <span className="status-value">{status}</span>
          </div>
        </div>

        {/* Viewport display toggles */}
        <div className="toolbar-right">
          <button
            type="button"
            className={`btn-icon-toggle ${isMirrored ? 'is-active' : ''}`}
            onClick={() => setIsMirrored(!isMirrored)}
            title={isMirrored ? "Mirror View On" : "Mirror View Off"}
            aria-label="Toggle Mirror Camera"
          >
            <FlipHorizontal size={17} />
            <span className="toggle-label">Mirror</span>
          </button>

          <button
            type="button"
            className={`btn-icon-toggle ${showLandmarks ? 'is-active' : ''}`}
            onClick={() => setShowLandmarks(!showLandmarks)}
            title={showLandmarks ? "Landmarks Visible" : "Landmarks Hidden"}
            aria-label="Toggle Landmark Skeleton"
          >
            {showLandmarks ? <Eye size={17} /> : <EyeOff size={17} />}
            <span className="toggle-label">Skeleton</span>
          </button>
        </div>
      </div>
    </div>
  );
}
