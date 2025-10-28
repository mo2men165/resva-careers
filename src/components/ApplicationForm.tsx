import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, ArrowRight, Clock, Users, Briefcase, Award, TrendingUp, Mic, Square, Play, Pause, Trash2 } from 'lucide-react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  audioBlob: Blob | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: string;
  audio?: string;
}

export const ApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    audioBlob: null
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [browserWarning, setBrowserWarning] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check browser compatibility on mount
  useEffect(() => {
    const compatibility = checkBrowserCompatibility();
    if (compatibility.warning) {
      setBrowserWarning(compatibility.warning);
    }
  }, []);

  const validate = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.location.trim() || formData.location.length < 3) {
      newErrors.location = 'Please enter your location';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select your years of experience';
    }
    
    if (!formData.audioBlob) {
      newErrors.audio = 'Please record a short introduction';
    }
    
    return newErrors;
  };

  // Helper function to get supported MIME type
  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus',
      'audio/wav'
    ];
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log('Using MIME type:', type);
        return type;
      }
    }
    
    console.warn('No supported MIME type found, using default');
    return 'audio/webm'; // fallback
  };

  // Check browser compatibility
  const checkBrowserCompatibility = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS && isSafari) {
      console.warn('🚨 iOS Safari detected - recording may have limitations');
      return {
        isCompatible: true,
        warning: 'For best recording quality on iOS, consider using Chrome or Edge browser.'
      };
    }
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        isCompatible: false,
        warning: 'Your browser does not support audio recording. Please use a modern browser like Chrome, Firefox, or Edge.'
      };
    }
    
    if (!window.MediaRecorder) {
      return {
        isCompatible: false,
        warning: 'MediaRecorder is not supported in your browser. Please update your browser or try a different one.'
      };
    }
    
    return { isCompatible: true, warning: null };
  };

  // Audio recording functions
  const startRecording = async () => {
    setMicError(null);
    console.log('🎤 Starting recording process...');
    
    // Check browser compatibility first
    const compatibility = checkBrowserCompatibility();
    if (!compatibility.isCompatible) {
      setMicError(compatibility.warning || 'Your browser does not support audio recording.');
      return;
    }
    
    // Show warning for limited compatibility
    if (compatibility.warning) {
      console.warn('🚨', compatibility.warning);
    }
    
    try {

      console.log('🎤 Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log('🎤 Microphone access granted');
      const supportedMimeType = getSupportedMimeType();
      
      let mediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: supportedMimeType });
      } catch (e) {
        console.warn('Failed to create MediaRecorder with MIME type, using default:', e);
        mediaRecorder = new MediaRecorder(stream);
      }
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('🎤 Data available, size:', event.data.size);
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('🎤 Recording stopped, processing...');
        console.log('🎤 Audio chunks collected:', audioChunksRef.current.length);
        
        if (audioChunksRef.current.length === 0) {
          console.error('🎤 No audio chunks collected!');
          setMicError('Recording failed - no audio data captured. Please try again.');
          return;
        }

        const totalSize = audioChunksRef.current.reduce((total, chunk) => total + chunk.size, 0);
        console.log('🎤 Total audio data size:', totalSize, 'bytes');

        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType || supportedMimeType 
        });
        
        console.log('🎤 Created blob, size:', audioBlob.size, 'type:', audioBlob.type);
        
        if (audioBlob.size === 0) {
          console.error('🎤 Empty audio blob created!');
          setMicError('Recording failed - empty audio file. Please try again.');
          return;
        }

        const url = URL.createObjectURL(audioBlob);
        console.log('🎤 Created audio URL:', url);
        
        setAudioURL(url);
        setFormData(prev => ({ ...prev, audioBlob }));
        stream.getTracks().forEach(track => track.stop());
        console.log('🎤 Recording process completed successfully');
      };

      mediaRecorder.onerror = (event) => {
        console.error('🎤 MediaRecorder error:', event);
        setMicError('Recording error occurred. Please try again.');
      };

      console.log('🎤 Starting MediaRecorder...');
      mediaRecorder.start(1000); // Request data every second
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 120) {
            console.log('🎤 Auto-stopping at 2 minutes');
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000) as unknown as number;
    } catch (error) {
      console.error('🎤 Error accessing microphone:', error);
      if (error instanceof Error) {
        setMicError(`Unable to access microphone: ${error.message}. Please allow microphone access in your browser settings and try again.`);
      } else {
        setMicError('Unable to access microphone. Please allow microphone access in your browser settings and try again.');
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (errors.audio) {
        setErrors(prev => ({ ...prev, audio: '' }));
      }
    }
  };

  const deleteRecording = () => {
    setAudioURL(null);
    setFormData(prev => ({ ...prev, audioBlob: null }));
    setRecordingTime(0);
    setIsPlaying(false);
    setMicError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const togglePlayback = async () => {
    if (!audioURL) {
      console.error('🔊 No audio URL available');
      return;
    }
    
    console.log('🔊 Toggling playback, audioURL:', audioURL);
    
    if (!audioRef.current) {
      console.log('🔊 Creating new Audio object');
      audioRef.current = new Audio(audioURL);
      
      audioRef.current.onended = () => {
        console.log('🔊 Playback ended');
        setIsPlaying(false);
      };
      
      audioRef.current.onerror = (e) => {
        console.error('🔊 Audio playback error:', e);
        setMicError('Unable to play recording. The audio file may be corrupted.');
        setIsPlaying(false);
      };
      
      audioRef.current.oncanplaythrough = () => {
        console.log('🔊 Audio can play through');
      };
    }

    try {
      if (isPlaying) {
        console.log('🔊 Pausing playback');
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('🔊 Starting playback');
        // For mobile browsers, we need to handle the play promise
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('🔊 Playback started successfully');
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('🔊 Playback failed:', error);
              setMicError('Unable to play recording. Please try again.');
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('🔊 Error during playback toggle:', error);
      setMicError('Unable to play recording. Please try again.');
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // 1. Upload audio to Firebase Storage
        let audioDownloadURL = '';
        if (formData.audioBlob) {
          const timestamp = Date.now();
          const audioFileName = `applications/${formData.email}_${timestamp}.webm`;
          const audioRef = ref(storage, audioFileName);
          
          try {
            await uploadBytes(audioRef, formData.audioBlob);
            audioDownloadURL = await getDownloadURL(audioRef);
            console.log('Audio uploaded successfully:', audioDownloadURL);
          } catch (storageError: any) {
            console.error('Storage error:', storageError);
            
            if (storageError.code === 'storage/unauthorized') {
              setSubmitError('Unable to upload audio recording. Please contact support - Firebase Storage permissions need to be configured.');
            } else {
              setSubmitError('Failed to upload audio recording. Please check your internet connection and try again.');
            }
            setIsSubmitting(false);
            return;
          }
        }
        
        // 2. Send to Formspree
        const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
        
        if (!formspreeEndpoint) {
          setSubmitError('Form submission is not configured. Please contact support.');
          setIsSubmitting(false);
          return;
        }
        
        const formspreeData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          experience: formData.experience,
          audioRecording: audioDownloadURL,
          recordingDuration: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`,
          submittedAt: new Date().toISOString(),
          message: `New application from ${formData.fullName}. Please listen to their voice introduction: ${audioDownloadURL}`
        };
        
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formspreeData)
        });
        
        if (response.ok) {
          console.log('Application sent successfully');
          setSubmitted(true);
        } else {
          setSubmitError('Failed to send your application. Please try again or contact support if the issue persists.');
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        setSubmitError('An unexpected error occurred. Please check your internet connection and try again.');
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (submitted) {
    return (
      <div id="application" className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#31a9df]/5 to-white px-6 py-20">
        <style>{`
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        `}</style>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Application Received!
          </h3>
          <p className="text-xl text-[#9a9a9a] mb-8 leading-relaxed">
            Thank you for taking the first step towards joining RES-VA. Our talent acquisition team will carefully review your application and reach out within 48 hours.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#31a9df]/10 rounded-full text-[#31a9df] font-medium">
            <Clock className="w-5 h-5" />
            <span>Expected response: 24-48 hours</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="application" className="py-24 px-6 bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
      <style>{`
        input::placeholder, select option[value=""] {
          color: #cbd5e1;
          opacity: 1;
        }
        input:focus::placeholder {
          color: #e2e8f0;
        }
        select option {
          color: #111827;
        }
      `}</style>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#31a9df]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#31a9df]/10 rounded-full text-[#31a9df] font-semibold text-sm mb-4">
            Join Our Team
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Start Your Journey
          </h2>
          <p className="text-xl text-[#9a9a9a] max-w-2xl mx-auto">
            Take 2 minutes to apply. Your dream career awaits.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section - Left */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-6">
              {[
                { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Ahmed Mohamed Hassan' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'ahmed.mohamed@example.com' },
                { name: 'phone', label: 'Phone Number / WhatsApp', type: 'tel', placeholder: '+20 100 123 4567' },
                { name: 'location', label: 'Current Location', type: 'text', placeholder: 'Cairo, Egypt' }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {field.label} <span className="text-[#31a9df]">*</span>
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof Omit<FormData, 'audioBlob'>]}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#31a9df]/20 transition-all text-gray-900 font-medium ${
                      errors[field.name as keyof FormErrors] ? 'border-red-500' : 'border-gray-200 focus:border-[#31a9df]'
                    }`}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name as keyof FormErrors] && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors[field.name as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ))}

              {[
                { name: 'experience', label: 'How many years of experience do you have?', options: [
                  { value: '', label: 'Select years of experience' },
                  { value: '0-1', label: '0-1 years' },
                  { value: '1-3', label: '1-3 years' },
                  { value: '3-5', label: '3-5 years' },
                  { value: '5-10', label: '5-10 years' },
                  { value: '10+', label: '10+ years' }
                ]}
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {field.label} <span className="text-[#31a9df]">*</span>
                  </label>
                  <select
                    name={field.name}
                    value={formData[field.name as keyof Omit<FormData, 'audioBlob'>]}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#31a9df]/20 transition-all appearance-none bg-white font-medium ${
                      errors[field.name as keyof FormErrors] ? 'border-red-500' : 'border-gray-200 focus:border-[#31a9df]'
                    } ${formData[field.name as keyof Omit<FormData, 'audioBlob'>] ? 'text-gray-900' : 'text-gray-300'}`}
                  >
                    {field.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors[field.name as keyof FormErrors] && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors[field.name as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ))}

              {/* Audio Recording Section */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Voice Introduction (1-2 minutes) <span className="text-[#31a9df]">*</span>
                </label>
                <p className="text-xs text-[#9a9a9a] mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Recording will automatically stop at 2 minutes
                </p>
                <p className="text-xs text-[#31a9df] mb-3 font-medium">
                  📢 Please record your introduction in English
                </p>
                {browserWarning && (
                  <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-amber-700 text-xs font-medium flex items-center gap-2">
                      <span className="shrink-0 w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">!</span>
                      {browserWarning}
                    </p>
                  </div>
                )}
                <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50">
                  {!audioURL ? (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-linear-to-br from-[#31a9df] to-[#29aae0] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mic className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-[#9a9a9a] mb-4">
                        {isRecording 
                          ? `Recording... ${formatTime(recordingTime)} / 2:00` 
                          : 'Introduce yourself and tell us why you want to join RES-VA'}
                      </p>
                      
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startRecording}
                          className="px-6 py-3 bg-linear-to-r from-[#31a9df] to-[#29aae0] text-white rounded-xl font-semibold hover:from-[#29aae0] hover:to-[#31a9df] transition-all flex items-center gap-2 mx-auto"
                        >
                          <Mic className="w-5 h-5" />
                          Start Recording
                        </button>
                      ) : (
                        <div className="flex gap-3 justify-center">
                          <button
                            type="button"
                            onClick={pauseRecording}
                            className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-all flex items-center gap-2"
                          >
                            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                            {isPaused ? 'Resume' : 'Pause'}
                          </button>
                          <button
                            type="button"
                            onClick={stopRecording}
                            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center gap-2"
                          >
                            <Square className="w-5 h-5" />
                            Stop
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Recording Complete</p>
                            <p className="text-sm text-[#9a9a9a]">{formatTime(recordingTime)} duration</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={deleteRecording}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={togglePlayback}
                        className="w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        {isPlaying ? 'Pause' : 'Play Recording'}
                      </button>
                    </div>
                  )}
                </div>
                {errors.audio && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.audio}
                  </p>
                )}
                {micError && (
                  <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">{micError}</p>
                  </div>
                )}
              </div>

              {/* Submit Error Display */}
              {submitError && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                  <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                    <span className="shrink-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">!</span>
                    {submitError}
                  </p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-[#31a9df] to-[#29aae0] text-white py-5 rounded-2xl font-bold text-lg hover:from-[#29aae0] hover:to-[#31a9df] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-[#9a9a9a] mt-4">
                By submitting, you agree to our terms and privacy policy
              </p>
            </div>
          </div>

          {/* Logo & Info Section - Right */}
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="bg-white rounded-3xl shadow-lg p-12 border border-gray-100 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#31a9df]/10 rounded-full blur-3xl"></div>
                <img 
                  src="/Res-Va-Blue-Logo.png" 
                  alt="RES-VA Logo" 
                  className="relative w-full max-w-sm drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Company Stats */}
            {/* <div className="bg-linear-to-br from-[#31a9df] to-[#29aae0] rounded-3xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Join Our Growing Team</h3>
              <div className="space-y-4">
                {[
                  { icon: <Users className="w-5 h-5" />, label: 'Active Team Members', value: '500+' },
                  { icon: <Briefcase className="w-5 h-5" />, label: 'Open Positions', value: '25+' },
                  { icon: <Award className="w-5 h-5" />, label: 'Employee Satisfaction', value: '98%' },
                  { icon: <TrendingUp className="w-5 h-5" />, label: 'Career Growth Rate', value: '3x' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <span className="font-medium">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Trust Badges */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Trusted By Professionals</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Fast Response', desc: '24-48 hours' },
                  { label: 'Secure Process', desc: 'Data Protected' },
                  { label: 'Global Opportunities', desc: '10+ Countries' },
                  { label: 'Career Support', desc: 'Mentorship' }
                ].map((badge, i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-[#31a9df]/5 transition-all">
                    <div className="text-[#31a9df] font-bold text-sm mb-1">{badge.label}</div>
                    <div className="text-[#9a9a9a] text-xs">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;