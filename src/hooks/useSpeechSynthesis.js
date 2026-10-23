/**
 * SignBridge - Speech Synthesis Hook
 * Integrates Web SpeechSynthesis API with duplicate prevention,
 * voice selection, speech rate & pitch controls, and visual speaking state.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const lastSpokenTextRef = useRef("");
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Auto-select natural English voice if possible
        if (!selectedVoice && availableVoices.length > 0) {
          const defaultVoice = 
            availableVoices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
            availableVoices.find(v => v.lang.startsWith('en')) ||
            availableVoices[0];
          setSelectedVoice(defaultVoice);
        }
      };

      updateVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, [selectedVoice]);

  const speak = useCallback((text) => {
    if (!text || typeof text !== 'string') return;
    const cleanText = text.trim();
    if (!cleanText) return;

    if (!('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech to avoid awkward queuing and overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      lastSpokenTextRef.current = cleanText;
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    };

    utterance.onerror = (e) => {
      // Speech errors like 'canceled' are normal when user clicks new speech
      if (e.error !== 'canceled') {
        console.warn("Speech synthesis error:", e);
      }
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, rate, pitch]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    }
  }, []);

  return {
    isSupported,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    autoSpeak,
    setAutoSpeak,
    speak,
    stop
  };
}
