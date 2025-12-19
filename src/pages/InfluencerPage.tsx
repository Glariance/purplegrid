import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Star, Play, Pause, Users, Handshake, Phone, Search, Send, Code, Smartphone, Zap, Building2, Settings, DollarSign, BarChart3, TrendingUp, Clock, ArrowRight, Headphones, Calendar, Check, ShoppingCart, Target, Globe, UserPlus, Shield, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productsVideos, restaurantsVideos, realEstateVideos, medicalBeautyVideos, otherIndustriesVideos } from '../data/videos';
import { apiBaseUrl } from '../lib/api';

// Counter Component with Intersection Observer
interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

function Counter({ end, suffix = '', duration = 2000, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const startAnimation = () => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    
    // Start animation
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        animationFrameIdRef.current = null;
      }
    };
    
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const element = counterRef.current;
    if (!element || hasAnimatedRef.current) return;

    // Check if element is already visible on mount
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      // Small delay to ensure component is fully mounted
      setTimeout(() => {
        startAnimation();
      }, 100);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            observer.disconnect(); // Stop observing once animation starts
            startAnimation();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [end, duration]);

  return (
    <div ref={counterRef} className={className}>
      {count}{suffix}
    </div>
  );
}

interface VideoCardProps {
  thumbnail: string;
  title?: string;
  category?: string;
  videoUrl: string;
}

function VideoCard({ thumbnail, title, category, videoUrl }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && !hasLoadError) {
      // Update muted state based on hover
      videoRef.current.muted = !isHovered;
      
      // Try to play when hovered, but don't treat play failures as errors
      if (isHovered) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              // Autoplay failed - this is normal, not an error
              console.log('Video autoplay prevented (normal browser behavior):', error);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [isHovered, hasLoadError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasLoadError) return;

    // Add event listeners for play/pause
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handlePlaying = () => setIsPlaying(true);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('playing', handlePlaying);

    // Try to autoplay on mount, but don't treat failure as error
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Autoplay failed - this is normal, not an error
          console.log('Video autoplay prevented (normal browser behavior):', error);
          setIsPlaying(false);
        });
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [hasLoadError]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const error = video.error;
    
    if (error) {
      console.error('Video error:', {
        code: error.code,
        message: error.message,
        videoUrl
      });
      
      // Retry logic: only retry network errors (code 2) up to 2 times
      if (error.code === MediaError.MEDIA_ERR_NETWORK && retryCount < 2) {
        console.log(`Retrying video load (attempt ${retryCount + 1}):`, videoUrl);
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.load();
          }
        }, 1000 * (retryCount + 1)); // Exponential backoff
      } else {
        // Only show error for actual load failures (not network retries)
        setHasLoadError(true);
      }
    } else {
      setHasLoadError(true);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current && !hasLoadError) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.log('Play failed:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-[#1B0032]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      <div className="aspect-[9/16] relative">
        {/* Thumbnail - always show as fallback, especially when video fails */}
        <img
          src={thumbnail}
          alt={title || 'Video thumbnail'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying && !hasLoadError ? 'opacity-0' : 'opacity-100'
          }`}
          onError={(e) => {
            // If thumbnail also fails, hide it
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Video element - always render (for retry functionality) */}
        <video
          key={`${videoUrl}-${retryCount}`}
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover ${
            hasLoadError ? 'opacity-0 pointer-events-none' : ''
          }`}
          muted={!isHovered}
          loop
          playsInline
          poster={thumbnail}
          onError={handleVideoError}
          onLoadedData={() => {
            // Video loaded successfully, clear error and try to play
            if (videoRef.current) {
              setHasLoadError(false);
              videoRef.current.play().catch(() => {
                // Ignore autoplay failures
              });
            }
          }}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Error message overlay - show on top of thumbnail when video fails */}
        {hasLoadError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B0032]/90 to-[#3d0066]/90 flex items-center justify-center z-20">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-white text-sm mb-2">Video unavailable</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasLoadError(false);
                  setRetryCount(0);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="text-[#9333EA] text-xs hover:text-[#EC4899] underline mt-2"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Play button overlay when paused - only show when not playing and no error */}
        {!isPlaying && !hasLoadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <div className="bg-black/50 rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}

        {isHovered && !hasLoadError && (
          <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full animate-pulse z-10">
            <Volume2 className="w-5 h-5 text-[#9333EA]" />
          </div>
        )}

        {!isHovered && !hasLoadError && (
          <div className="absolute top-4 right-4 bg-black/30 p-2 rounded-full z-10">
            <VolumeX className="w-5 h-5 text-gray-400" />
          </div>
        )}

        {(category || title) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1B0032] to-transparent z-10">
            {category && <div className="text-[#9333EA] text-sm font-semibold mb-1">{category}</div>}
            {title && <h3 className="text-white font-bold text-lg">{title}</h3>}
          </div>
        )}
      </div>
    </div>
  );
}

interface AudioPlayerProps {
  audioUrl: string;
  duration: number; // in seconds
  color: 'blue' | 'orange' | 'purple';
  audioRef?: React.RefObject<HTMLAudioElement>;
  onMuteToggle?: (isMuted: boolean) => void;
}

interface AudioPlayerCardProps {
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  color: 'blue' | 'orange' | 'purple';
}

function AudioPlayerCard({ title, description, audioUrl, duration, color }: AudioPlayerCardProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const colorClasses = {
    blue: {
      card: 'from-[#1E3A8A] to-[#1E40AF]',
      border: 'border-blue-400/30'
    },
    orange: {
      card: 'from-[#EA580C] to-[#F97316]',
      border: 'border-orange-400/30'
    },
    purple: {
      card: 'from-[#9333EA] to-[#7C3AED]',
      border: 'border-purple-400/30'
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color].card} rounded-2xl p-6 border ${colorClasses[color].border} shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <button
          onClick={handleMuteToggle}
          className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      {/* Audio Player */}
      <AudioPlayer audioUrl={audioUrl} duration={duration} color={color} audioRef={audioRef} onMuteToggle={(muted) => setIsMuted(muted)} />
    </div>
  );
}

function AudioPlayer({ audioUrl, duration: initialDuration, color, audioRef: externalAudioRef, onMuteToggle }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [waveformTick, setWaveformTick] = useState(0);
  const internalAudioRef = useRef<HTMLAudioElement>(null);
  const audioRef = externalAudioRef || internalAudioRef;

  const colorClasses = {
    blue: {
      button: 'bg-blue-500 hover:bg-blue-600',
      progress: 'bg-blue-400',
      waveform: 'bg-blue-400/60'
    },
    orange: {
      button: 'bg-orange-500 hover:bg-orange-600',
      progress: 'bg-orange-400',
      waveform: 'bg-orange-400/60'
    },
    purple: {
      button: 'bg-purple-500 hover:bg-purple-600',
      progress: 'bg-purple-400',
      waveform: 'bg-purple-400/60'
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Listen for mute changes from external control
  useEffect(() => {
    if (audioRef.current && onMuteToggle) {
      const handleVolumeChange = () => {
        if (audioRef.current) {
          onMuteToggle(audioRef.current.muted);
        }
      };
      audioRef.current.addEventListener('volumechange', handleVolumeChange);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('volumechange', handleVolumeChange);
        }
      };
    }
  }, [onMuteToggle]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      // Update waveform animation tick when playing
      if (!audio.paused) {
        setWaveformTick(prev => prev + 1);
      }
    };
    const handleLoadedMetadata = () => {
      setIsLoading(false);
      setHasError(false);
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };
    const handleError = () => {
      console.error('Audio loading error:', audioUrl);
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setWaveformTick(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioUrl]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const waveformIntensity = isPlaying ? 0.8 : 0.4;

  // Generate waveform heights that animate based on playback
  const generateWaveformHeights = () => {
    const bars = 20;
    const heights: number[] = [];
    for (let i = 0; i < bars; i++) {
      // Create a more realistic waveform pattern
      const baseHeight = 20 + (Math.sin(i * 0.5) * 15) + (Math.cos(i * 0.3) * 10);
      if (isPlaying) {
        // Animate based on current time, position, and tick for smooth animation
        const timeOffset = currentTime * 2 + waveformTick * 0.1;
        const wave = Math.sin((i * 0.4) + timeOffset) * 0.3;
        heights.push(Math.max(15, baseHeight * (1 + wave)));
      } else {
        heights.push(baseHeight);
      }
    }
    return heights;
  };

  const waveformHeights = generateWaveformHeights();

  return (
    <>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className="bg-white/10 rounded-xl p-4 mt-4">
        {hasError && (
          <div className="text-red-400 text-sm mb-2 text-center">
            Audio file not found. Please add {audioUrl} to the public folder.
          </div>
        )}
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={togglePlay}
            disabled={isLoading || hasError}
            className={`w-12 h-12 rounded-full ${colorClasses[color].button} flex items-center justify-center transition-colors disabled:opacity-50`}
            title={hasError ? 'Audio file not available' : isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-1" />
            )}
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-white text-sm mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full ${colorClasses[color].progress} rounded-full transition-all duration-100`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        {/* Waveform Visualization */}
        <div className="flex items-end justify-center gap-1 h-12 mt-2">
          {waveformHeights.map((height, i) => (
            <div
              key={i}
              className={`w-1 ${colorClasses[color].waveform} rounded-full transition-all duration-150`}
              style={{
                height: `${height}%`,
                opacity: isPlaying ? waveformIntensity : 0.4
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

function InfluencerPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const sophiaVideoRef = useRef<HTMLVideoElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: '',
    budget: '',
    projectDetails: ''
  });

  useEffect(() => {
    const video = sophiaVideoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, []);

  const togglePlay = () => {
    const video = sophiaVideoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = sophiaVideoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1B0032] to-[#0a0014]">
      <Header />
      <main>
      {/* Banner Section */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/amazon-banner.png')" }}
        >
          {/* Overlay with gradient from purple to purple (removed orange) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B0032]/80 via-[#2D0052]/70 to-[#1B0032]/80"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-6">
                {/* Top Tag */}
                <div className="inline-flex items-center gap-2 bg-[#9333EA] px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span className="text-white text-sm font-semibold">Future of AI Influencers</span>
                </div>

                {/* Main Headline */}
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  style={{
                    textShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.4)'
                  }}
                >
                  BUILD YOUR OWN <span 
                    className="text-[#9333EA]"
                    style={{
                      textShadow: '0 0 15px rgba(147, 51, 234, 1), 0 0 30px rgba(147, 51, 234, 0.8), 0 0 45px rgba(147, 51, 234, 0.6)'
                    }}
                  >AI INFLUENCER</span> FOR YOUR BUSINESS
                </h1>

                {/* Sub-headline */}
                <h2 
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{
                    textShadow: '0 0 10px rgba(147, 51, 234, 0.7), 0 0 20px rgba(147, 51, 234, 0.5)'
                  }}
                >
                  SELL 24/7 FOR YOU
                </h2>

                {/* Descriptive Paragraph */}
                <p 
                  className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
                  style={{
                    textShadow: '0 0 5px rgba(147, 51, 234, 0.4), 0 0 10px rgba(147, 51, 234, 0.2)'
                  }}
                >
                  Brand Ambassador Without the Drama. Join us into the future of AI influencers and transform your marketing with authentic, consistent content that converts.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#9333EA] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#7E22CE] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl">
                    <Play className="w-5 h-5" />
                    Get In Touch
                  </button>
                  <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                    Get Started Free
                  </button>
                </div>

                {/* Statistics */}
                <div className="flex flex-wrap gap-8 pt-4">
                  <div>
                    <div 
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(147, 51, 234, 0.5)'
                      }}
                    >88+</div>
                    <div className="text-white/70 text-sm md:text-base">AI Campaigns</div>
                  </div>
                  <div>
                    <div 
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(147, 51, 234, 0.5)'
                      }}
                    >105+</div>
                    <div className="text-white/70 text-sm md:text-base">Viral Videos</div>
                  </div>
                  <div>
                    <div 
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(147, 51, 234, 0.5)'
                      }}
                    >$2M+</div>
                    <div className="text-white/70 text-sm md:text-base">Revenue Generated</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Video Player */}
              <div className="flex justify-center lg:justify-end">
                <div 
                  className="w-full max-w-2xl lg:max-w-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.3))'
                  }}
                >
                  {/* Video Player */}
                  <div 
                    className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#9333EA]/50"
                    style={{
                      boxShadow: '0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.4), 0 0 90px rgba(147, 51, 234, 0.2), inset 0 0 20px rgba(147, 51, 234, 0.1)'
                    }}
                  >
                    <div className="aspect-video relative bg-black">
                      <video
                        ref={sophiaVideoRef}
                        src="/sophia.mp4"
                        className="w-full h-full object-cover"
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onError={(e) => {
                          console.error('Video error:', e);
                        }}
                      />
                      
                      {/* Video controls bar at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <button 
                            onClick={togglePlay}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? (
                              <span className="text-xs">⏸</span>
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <div className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer" onClick={(e) => {
                            const video = sophiaVideoRef.current;
                            if (video) {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const percent = (e.clientX - rect.left) / rect.width;
                              video.currentTime = percent * duration;
                            }
                          }}>
                            <div 
                              className="h-full bg-[#9333EA] rounded-full transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-xs min-w-[60px] text-right">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                          <button 
                            onClick={toggleMute}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded transition-colors"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>
                          <button 
                            onClick={() => {
                              const video = sophiaVideoRef.current;
                              if (video) {
                                video.requestFullscreen();
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded transition-colors"
                            aria-label="Fullscreen"
                          >
                            <span className="text-xs">⛶</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video CTA Button */}
                  <button className="w-full mt-4 bg-[#9333EA] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#7E22CE] transition-colors shadow-lg hover:shadow-xl">
                    Meet Sophia - AI Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Influencer Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B0032] to-[#9333EA] px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-white text-sm font-semibold">Complete AI Business Ecosystem</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span 
                className="text-[#9333EA]"
                style={{
                  textShadow: '0 0 15px rgba(147, 51, 234, 1), 0 0 30px rgba(147, 51, 234, 0.8), 0 0 45px rgba(147, 51, 234, 0.6)'
                }}
              >
                Your AI Influencer
              </span>
              <span className="text-white"> Does It All</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              More than just a content creator - your AI influencer is a complete business solution that works 24/7 to grow your brand, generate leads, and drive revenue across every channel.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Card 1: Social Media Manager */}
            <div className="bg-gradient-to-br from-[#9333EA] to-[#6B21A8] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Social Media Manager</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Create viral content, engage followers, and build your brand presence across all platforms automatically.
              </p>
            </div>

            {/* Card 2: Sales Agent */}
            <div className="bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#3B82F6] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(59, 130, 246, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sales Agent</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Intelligent lead qualification, personalized outreach, and automated sales conversations that convert.
              </p>
            </div>

            {/* Card 3: 24/7 Voice Agent */}
            <div className="bg-gradient-to-br from-[#10B981] to-[#047857] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#10B981] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">24/7 Voice Agent</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Handle phone calls, book appointments, answer questions, and provide customer service around the clock.
              </p>
            </div>

            {/* Card 4: Lead Generator */}
            <div className="bg-gradient-to-br from-[#F97316] to-[#C2410C] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#F97316] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(249, 115, 22, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(249, 115, 22, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lead Generator</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Automatically find and scrape qualified prospects from Google Maps, social media, and business directories.
              </p>
            </div>

            {/* Card 5: Smart Outreach */}
            <div className="bg-gradient-to-br from-[#1B0032] to-[#4C1D95] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Outreach</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Personalized email campaigns, DMs, and follow-ups that feel human and drive engagement.
              </p>
            </div>

            {/* Card 6: Web Developer */}
            <div className="bg-gradient-to-br from-[#14B8A6] to-[#0D9488] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#14B8A6] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(20, 184, 166, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(20, 184, 166, 0.8), 0 0 40px rgba(20, 184, 166, 0.5), 0 0 60px rgba(20, 184, 166, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(20, 184, 166, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Web Developer</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Build and maintain your website, landing pages, and online presence with AI-powered development.
              </p>
            </div>

            {/* Card 7: App Developer */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#2563EB] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.8), 0 0 40px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(37, 99, 235, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">App Developer</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Create custom mobile applications to enhance customer experience and streamline operations.
              </p>
            </div>

            {/* Card 8: Brand Ambassador */}
            <div className="bg-gradient-to-br from-[#92400E] to-[#78350F] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#F59E0B] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(245, 158, 11, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(245, 158, 11, 0)';
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Brand Ambassador</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Represent your brand authentically, build trust, and create emotional connections with your audience.
              </p>
            </div>
          </div>

          {/* Bottom Section - Complete Package */}
          <div className="bg-gradient-to-r from-[#0a0014] to-[#1B0032] rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B0032] to-[#9333EA] px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-white fill-white" />
                <span className="text-white text-sm font-semibold">The Complete Package</span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">One </span>
                <span 
                  className="text-[#9333EA]"
                  style={{
                    textShadow: '0 0 15px rgba(147, 51, 234, 1), 0 0 30px rgba(147, 51, 234, 0.8), 0 0 45px rgba(147, 51, 234, 0.6)'
                  }}
                >
                  AI Influencer
                </span>
                <span className="text-white">, Infinite Possibilities</span>
              </h3>

              {/* Detailed Paragraph */}
              <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto leading-relaxed">
                Stop paying for multiple tools, agencies, and freelancers. Your AI influencer combines the power of a marketing team, sales department, development crew, and customer service representatives into one intelligent system. It creates viral content, generates qualified leads, books appointments, handles customer inquiries, builds digital products, and drives revenue - all while learning and improving 24/7. It's not just automation, it's transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Main Title and Subtitle */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our 3-Step Process
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              From business discovery to revenue generation in just three simple steps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1: Learn Your Business */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                {/* Numbered Indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                {/* Main Icon */}
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-blue-500/10">
                  <Building2 className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Learn Your Business
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                We dive deep into understanding your brand, target audience, business goals, and unique value proposition. This foundational step ensures your AI influencer perfectly represents your company's voice and vision.
              </p>
            </div>

            {/* Step 2: Build & Setup */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                {/* Numbered Indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#9333EA] rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                {/* Main Icon */}
                <div className="w-24 h-24 rounded-full border-4 border-[#9333EA] flex items-center justify-center bg-[#9333EA]/10">
                  <Settings className="w-12 h-12 text-[#9333EA]" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Build & Setup
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                We create your custom AI influencer persona and set up all the automation workflows you need - from content creation and social media management to lead generation, outreach, and sales processes.
              </p>
            </div>

            {/* Step 3: Make Money */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                {/* Numbered Indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                {/* Main Icon */}
                <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/10">
                  <DollarSign className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Make Money
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                Your AI influencer goes to work 24/7 - creating viral content, growing your social media presence, generating qualified leads, booking appointments, closing sales, and driving sustainable revenue growth for your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before vs After AI Influencer Strategy Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full mb-6">
              <BarChart3 className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">Proven Results</span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Before vs After AI Influencer Strategy
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto">
              Real businesses, real results. See how AI influencers transformed these companies' appointment bookings, client acquisition, and revenue growth.
            </p>
          </div>

          {/* Business Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Restaurant Growth Success */}
            <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
              }}
            >
              {/* Category Badge */}
              <div className="p-4">
                <div className="inline-block bg-green-500 px-4 py-1 rounded-full">
                  <span className="text-white text-sm font-semibold">Restaurant</span>
                </div>
              </div>

              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop" 
                  alt="Restaurant interior with bar counter"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Restaurant Growth Success</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  A local restaurant chain transformed their customer acquisition through AI influencer marketing, showcasing authentic dining experiences and signature dishes.
                </p>

                {/* Before AI - Pink Box */}
                <div className="bg-pink-500/20 border-2 border-pink-500 rounded-xl p-4 mb-4">
                  <div className="text-pink-400 font-semibold text-sm mb-3">BEFORE AI</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-semibold">180 covers/week</span></div>
                    <div>New Clients: <span className="font-semibold">145/week</span></div>
                    <div>Engagement: <span className="font-semibold">2.8%</span></div>
                    <div>Revenue: <span className="font-semibold">$52K/month</span></div>
                  </div>
                </div>

                {/* After AI - Green Box */}
                <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-4">
                  <div className="text-green-400 font-semibold text-sm mb-3">AFTER AI</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-semibold">650 covers/week</span></div>
                    <div>New Clients: <span className="font-semibold">520/week</span></div>
                    <div>Engagement: <span className="font-semibold">16.2%</span></div>
                    <div>Revenue: <span className="font-semibold">$185K/month</span></div>
                  </div>
                </div>

                {/* Growth Metrics - Purple Box */}
                <div className="bg-gradient-to-r from-[#9333EA] to-[#6B21A8] rounded-xl p-4">
                  <div className="text-white font-semibold text-sm mb-3">GROWTH METRICS</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-bold">+261%</span></div>
                    <div>Clients: <span className="font-bold">+259%</span></div>
                    <div>Engagement: <span className="font-bold">+479%</span></div>
                    <div>Revenue: <span className="font-bold">+256%</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Dental Clinic Growth */}
            <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
              }}
            >
              {/* Category Badge */}
              <div className="p-4">
                <div className="inline-block bg-green-500 px-4 py-1 rounded-full">
                  <span className="text-white text-sm font-semibold">Healthcare</span>
                </div>
              </div>

              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=400&fit=crop" 
                  alt="Modern dental clinic interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Dental Clinic Growth</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  A cosmetic dentistry practice used AI influencers to educate patients about procedures and showcase beautiful smile transformations.
                </p>

                {/* Before AI - Pink Box */}
                <div className="bg-pink-500/20 border-2 border-pink-500 rounded-xl p-4 mb-4">
                  <div className="text-pink-400 font-semibold text-sm mb-3">BEFORE AI</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-semibold">25/week</span></div>
                    <div>New Clients: <span className="font-semibold">18/week</span></div>
                    <div>Engagement: <span className="font-semibold">1.8%</span></div>
                    <div>Revenue: <span className="font-semibold">$28K/month</span></div>
                  </div>
                </div>

                {/* After AI - Green Box */}
                <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-4">
                  <div className="text-green-400 font-semibold text-sm mb-3">AFTER AI</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-semibold">95/week</span></div>
                    <div>New Clients: <span className="font-semibold">72/week</span></div>
                    <div>Engagement: <span className="font-semibold">12.4%</span></div>
                    <div>Revenue: <span className="font-semibold">$89K/month</span></div>
                  </div>
                </div>

                {/* Growth Metrics - Purple Box */}
                <div className="bg-gradient-to-r from-[#9333EA] to-[#6B21A8] rounded-xl p-4">
                  <div className="text-white font-semibold text-sm mb-3">GROWTH METRICS</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-bold">+280%</span></div>
                    <div>Clients: <span className="font-bold">+300%</span></div>
                    <div>Engagement: <span className="font-bold">+589%</span></div>
                    <div>Revenue: <span className="font-bold">+218%</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Beauty Clinic Success */}
            <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
              }}
            >
              {/* Category Badge */}
              <div className="p-4">
                <div className="inline-block bg-green-500 px-4 py-1 rounded-full">
                  <span className="text-white text-sm font-semibold">Beauty & Wellness</span>
                </div>
              </div>

              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=400&fit=crop" 
                  alt="Beauty clinic facial treatment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Beauty Clinic Success</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  A medical spa leveraged AI influencer content to showcase treatments and build trust with potential clients seeking aesthetic procedures.
                </p>

                {/* Before AI - Pink Box */}
                <div className="bg-pink-500/20 border-2 border-pink-500 rounded-xl p-4 mb-4">
                  <div className="text-pink-400 font-semibold text-sm mb-3">BEFORE AI</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-semibold">35/month</span></div>
                    <div>New Clients: <span className="font-semibold">28/month</span></div>
                    <div>Engagement: <span className="font-semibold">3.2%</span></div>
                    <div>Revenue: <span className="font-semibold">$52K/month</span></div>
                  </div>
                </div>

                {/* After AI - Green Box */}
                <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-4">
                  <div className="text-green-400 font-semibold text-sm mb-3">AFTER AI</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-semibold">156/month</span></div>
                    <div>New Clients: <span className="font-semibold">125/month</span></div>
                    <div>Engagement: <span className="font-semibold">18.9%</span></div>
                    <div>Revenue: <span className="font-semibold">$195K/month</span></div>
                  </div>
                </div>

                {/* Growth Metrics - Purple Box */}
                <div className="bg-gradient-to-r from-[#9333EA] to-[#6B21A8] rounded-xl p-4">
                  <div className="text-white font-semibold text-sm mb-3">GROWTH METRICS</div>
                  <div className="space-y-2 text-white text-sm">
                    <div>Appointments: <span className="font-bold">+346%</span></div>
                    <div>Clients: <span className="font-bold">+346%</span></div>
                    <div>Engagement: <span className="font-bold">+491%</span></div>
                    <div>Revenue: <span className="font-bold">+275%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                Learn from AI Experts
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Watch exclusive insights, tutorials, and breakthroughs in AI technology and machine learning.
                All videos play automatically. Hover to hear the sound.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#9333EA]" />
                  <span>Hover to hear sound</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <VolumeX className="w-5 h-5 text-gray-500" />
                  <span>All videos auto-play silently</span>
                </div>
              </div>
            </div>

            {/* Video Grid inside the card */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {productsVideos.map((video, idx) => (
                <VideoCard
                  key={idx}
                  thumbnail={video.thumbnail}
                  // title={video.title}
                  // category={video.category}
                  videoUrl={video.videoUrl}
                />
              ))}
            </div>

            {/* Feature Cards Section inside the card */}
            <div className="border-t border-white/20 pt-12">
              {/* Three Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1: Boost Listing Views */}
                <div 
                  className="bg-gradient-to-br from-[#6B21A8] to-[#4C1D95] rounded-2xl p-6 border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-400/20 flex items-center justify-center mb-4 border border-purple-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9333EA] mb-3">Boost Listing Views</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Properties with AI influencer videos get <span className="font-bold text-[#9333EA]">4x more views</span> and <span className="font-bold text-[#9333EA]">3x more inquiries</span> than traditional listings.
                  </p>
                </div>

                {/* Card 2: Generate More Leads */}
                <div 
                  className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-500/30 transition-all duration-300 hover:scale-105 hover:border-[#10B981] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mb-4 border border-green-400/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#10B981] mb-3">Generate More Leads</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Automated lead capture through engaging content. Our AI influencers qualify prospects and book showings while you focus on closing deals.
                  </p>
                </div>

                {/* Card 3: Sell Properties Faster */}
                <div 
                  className="bg-gradient-to-br from-[#0C4A6E] to-[#075985] rounded-2xl p-6 border border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:border-[#06B6D4] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6, 182, 212, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#06B6D4] mb-3">Sell Properties Faster</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Listings with AI influencer content sell <span className="font-bold text-[#06B6D4]">40% faster</span> than traditional listings, with higher engagement and qualified buyer interest.
                  </p>
                </div>
              </div>

              {/* CTA Button and Subtitle */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#1D4ED8] hover:to-[#0891B2] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                  Transform My Real Estate Marketing
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-white/80 text-sm md:text-base">
                  Get your first property showcase video in 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants and Dining Promotion Section */}
      <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                Restaurants and Dining Promotion
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Transform your restaurant into a viral sensation. Our AI influencers create mouthwatering food content, dining experiences, and lifestyle moments that drive reservations and make your restaurant the talk of the town.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#9333EA]" />
                  <span>Hover to hear sound</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <VolumeX className="w-5 h-5 text-gray-500" />
                  <span>All videos auto-play silently</span>
                </div>
              </div>
            </div>

            {/* Video Grid inside the card */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {restaurantsVideos.map((video, idx) => (
                <VideoCard
                  key={idx}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  category={video.category}
                  videoUrl={video.videoUrl}
                />
              ))}
            </div>

            {/* Feature Cards Section inside the card */}
            <div className="border-t border-white/20 pt-12">
              {/* Three Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1: Boost Listing Views */}
                <div 
                  className="bg-gradient-to-br from-[#6B21A8] to-[#4C1D95] rounded-2xl p-6 border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-400/20 flex items-center justify-center mb-4 border border-purple-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9333EA] mb-3">Boost Listing Views</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Properties with AI influencer videos get <span className="font-bold text-[#9333EA]">4x more views</span> and <span className="font-bold text-[#9333EA]">3x more inquiries</span> than traditional listings.
                  </p>
                </div>

                {/* Card 2: Generate More Leads */}
                <div 
                  className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-500/30 transition-all duration-300 hover:scale-105 hover:border-[#10B981] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mb-4 border border-green-400/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#10B981] mb-3">Generate More Leads</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Automated lead capture through engaging content. Our AI influencers qualify prospects and book showings while you focus on closing deals.
                  </p>
                </div>

                {/* Card 3: Sell Properties Faster */}
                <div 
                  className="bg-gradient-to-br from-[#0C4A6E] to-[#075985] rounded-2xl p-6 border border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:border-[#06B6D4] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6, 182, 212, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#06B6D4] mb-3">Sell Properties Faster</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Listings with AI influencer content sell <span className="font-bold text-[#06B6D4]">40% faster</span> than traditional listings, with higher engagement and qualified buyer interest.
                  </p>
                </div>
              </div>

              {/* CTA Button and Subtitle */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#1D4ED8] hover:to-[#0891B2] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                  Transform My Real Estate Marketing
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-white/80 text-sm md:text-base">
                  Get your first property showcase video in 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate Agents Section */}
      <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                Real Estate Agents
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Transform your property listings into captivating visual stories. Our AI influencers create stunning property tours, neighborhood showcases, and lifestyle content that makes buyers fall in love before they even visit.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#9333EA]" />
                  <span>Hover to hear sound</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <VolumeX className="w-5 h-5 text-gray-500" />
                  <span>All videos auto-play silently</span>
                </div>
              </div>
            </div>

            {/* Video Grid inside the card */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {realEstateVideos.map((video, idx) => (
                <VideoCard
                  key={idx}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  category={video.category}
                  videoUrl={video.videoUrl}
                />
              ))}
            </div>

            {/* Feature Cards Section inside the card */}
            <div className="border-t border-white/20 pt-12">
              {/* Three Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1: Boost Listing Views */}
                <div 
                  className="bg-gradient-to-br from-[#6B21A8] to-[#4C1D95] rounded-2xl p-6 border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-400/20 flex items-center justify-center mb-4 border border-purple-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9333EA] mb-3">Boost Listing Views</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Properties with AI influencer videos get <span className="font-bold text-[#9333EA]">4x more views</span> and <span className="font-bold text-[#9333EA]">3x more inquiries</span> than traditional listings.
                  </p>
                </div>

                {/* Card 2: Generate More Leads */}
                <div 
                  className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-500/30 transition-all duration-300 hover:scale-105 hover:border-[#10B981] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mb-4 border border-green-400/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#10B981] mb-3">Generate More Leads</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Automated lead capture through engaging content. Our AI influencers qualify prospects and book showings while you focus on closing deals.
                  </p>
                </div>

                {/* Card 3: Sell Properties Faster */}
                <div 
                  className="bg-gradient-to-br from-[#0C4A6E] to-[#075985] rounded-2xl p-6 border border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:border-[#06B6D4] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6, 182, 212, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#06B6D4] mb-3">Sell Properties Faster</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Listings with AI influencer content sell <span className="font-bold text-[#06B6D4]">40% faster</span> than traditional listings, with higher engagement and qualified buyer interest.
                  </p>
                </div>
              </div>

              {/* CTA Button and Subtitle */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#1D4ED8] hover:to-[#0891B2] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                  Transform My Real Estate Marketing
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-white/80 text-sm md:text-base">
                  Get your first property showcase video in 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical & Beauty Promotion Section */}
      <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                Medical & Beauty Promotion
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Transform your healthcare and beauty practice with professional AI influencer content. Showcase dental services, beauty treatments, and aesthetic procedures that educate patients and drive bookings.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#9333EA]" />
                  <span>Hover to hear sound</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <VolumeX className="w-5 h-5 text-gray-500" />
                  <span>All videos auto-play silently</span>
                </div>
              </div>
            </div>

            {/* Video Grid inside the card */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {medicalBeautyVideos.map((video, idx) => (
                <VideoCard
                  key={idx}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  category={video.category}
                  videoUrl={video.videoUrl}
                />
              ))}
            </div>

            {/* Feature Cards Section inside the card */}
            <div className="border-t border-white/20 pt-12">
              {/* Three Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1: Boost Listing Views */}
                <div 
                  className="bg-gradient-to-br from-[#6B21A8] to-[#4C1D95] rounded-2xl p-6 border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-400/20 flex items-center justify-center mb-4 border border-purple-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9333EA] mb-3">Boost Listing Views</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Properties with AI influencer videos get <span className="font-bold text-[#9333EA]">4x more views</span> and <span className="font-bold text-[#9333EA]">3x more inquiries</span> than traditional listings.
                  </p>
                </div>

                {/* Card 2: Generate More Leads */}
                <div 
                  className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-500/30 transition-all duration-300 hover:scale-105 hover:border-[#10B981] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mb-4 border border-green-400/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#10B981] mb-3">Generate More Leads</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Automated lead capture through engaging content. Our AI influencers qualify prospects and book showings while you focus on closing deals.
                  </p>
                </div>

                {/* Card 3: Sell Properties Faster */}
                <div 
                  className="bg-gradient-to-br from-[#0C4A6E] to-[#075985] rounded-2xl p-6 border border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:border-[#06B6D4] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6, 182, 212, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#06B6D4] mb-3">Sell Properties Faster</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Listings with AI influencer content sell <span className="font-bold text-[#06B6D4]">40% faster</span> than traditional listings, with higher engagement and qualified buyer interest.
                  </p>
                </div>
              </div>

              {/* CTA Button and Subtitle */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#1D4ED8] hover:to-[#0891B2] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                  Transform My Real Estate Marketing
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-white/80 text-sm md:text-base">
                  Get your first property showcase video in 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples of Other Industries Section */}
      <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                Examples of Other Industries
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Discover how AI influencer marketing transforms businesses across diverse industries - from luxury lifestyle to healthcare, entertainment to professional services.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#9333EA]" />
                  <span>Hover to hear sound</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <VolumeX className="w-5 h-5 text-gray-500" />
                  <span>All videos auto-play silently</span>
                </div>
              </div>
            </div>

            {/* Video Grid inside the card */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {otherIndustriesVideos.map((video, idx) => (
                <VideoCard
                  key={idx}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  category={video.category}
                  videoUrl={video.videoUrl}
                />
              ))}
            </div>

            {/* Feature Cards Section inside the card */}
            <div className="border-t border-white/20 pt-12">
              {/* Three Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1: Boost Listing Views */}
                <div 
                  className="bg-gradient-to-br from-[#6B21A8] to-[#4C1D95] rounded-2xl p-6 border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-[#9333EA] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-400/20 flex items-center justify-center mb-4 border border-purple-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9333EA] mb-3">Boost Listing Views</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Properties with AI influencer videos get <span className="font-bold text-[#9333EA]">4x more views</span> and <span className="font-bold text-[#9333EA]">3x more inquiries</span> than traditional listings.
                  </p>
                </div>

                {/* Card 2: Generate More Leads */}
                <div 
                  className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-500/30 transition-all duration-300 hover:scale-105 hover:border-[#10B981] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mb-4 border border-green-400/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#10B981] mb-3">Generate More Leads</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Automated lead capture through engaging content. Our AI influencers qualify prospects and book showings while you focus on closing deals.
                  </p>
                </div>

                {/* Card 3: Sell Properties Faster */}
                <div 
                  className="bg-gradient-to-br from-[#0C4A6E] to-[#075985] rounded-2xl p-6 border border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:border-[#06B6D4] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6, 182, 212, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#06B6D4] mb-3">Sell Properties Faster</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Listings with AI influencer content sell <span className="font-bold text-[#06B6D4]">40% faster</span> than traditional listings, with higher engagement and qualified buyer interest.
                  </p>
                </div>
              </div>

              {/* CTA Button and Subtitle */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#1D4ED8] hover:to-[#0891B2] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                  Transform My Real Estate Marketing
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-white/80 text-sm md:text-base">
                  Get your first property showcase video in 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Voice Agents Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            {/* Main Heading */}
            <div className="text-center mb-16">
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                AI Voice Agents for Appointments & Reservations
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Never miss a booking again. Our AI voice agents handle appointments and reservations 24/7, speaking naturally with customers, answering questions, and filling your calendar while you focus on delivering excellent service.
              </p>
            </div>

            {/* Audio Player Examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Real Estate Agent Card */}
            <AudioPlayerCard
              title="Real Estate Agent"
              description="Property viewing appointment booking"
              audioUrl="/sophia.mp3"
              duration={153}
              color="blue"
            />

            {/* Restaurant Reservations Card */}
            <AudioPlayerCard
              title="Restaurant Reservations"
              description="Table booking and inquiry handling"
              audioUrl="/sophia.mp3"
              duration={92}
              color="orange"
            />

            {/* Dental Clinic Card */}
            <AudioPlayerCard
              title="Dental Clinic"
              description="Patient appointment scheduling"
              audioUrl="/sophia.mp3"
              duration={124}
              color="purple"
            />
          </div>

          {/* Listen to Examples Callout */}
          <div className="bg-gradient-to-r from-[#1B0032] to-[#3d0066] rounded-2xl p-6 mb-16 border border-[#9333EA]/30">
            <div className="flex items-center gap-4">
              <Headphones className="w-8 h-8 text-[#9333EA]" />
              <p className="text-white text-lg">
                <span className="text-[#9333EA] font-semibold">Listen to these examples</span> to experience how our AI voice agents sound and interact with customers naturally, just like a real person handling appointments 24/7.
              </p>
            </div>
          </div>

          {/* Feature Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column: 24/7 Automated Booking System */}
            <div className="bg-gradient-to-br from-[#1B0032] to-[#3d0066] rounded-2xl p-8 border border-[#9333EA]/30 shadow-xl">
              <h2 className="text-3xl font-bold text-[#9333EA] mb-4">24/7 Automated Booking System</h2>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                AI voice agents that sound completely human, handling calls with natural conversation, checking availability, booking appointments, and sending confirmations automatically.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-white/80">Natural voice conversations with customers</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-white/80">Automatic calendar integration and booking</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-white/80">Multi-language support for diverse customers</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-white/80">Instant SMS and email confirmations</p>
                </div>
              </div>
            </div>

            {/* Right Column: Three Feature Cards */}
            <div className="space-y-6">
              {/* Never Miss a Call Card */}
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-2xl p-6 border border-blue-400/30 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Never Miss a Call</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      AI voice agents answer <span className="font-bold text-white">100% of incoming calls</span>, even during peak hours, holidays, and after business hours. Capture every opportunity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Booking Confirmation Card */}
              <div className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-400/30 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Instant Booking Confirmation</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Bookings happen in real-time with automatic calendar updates and confirmations. Reduce no-shows with <span className="font-bold text-white">automated reminders</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Increase Revenue by 40% Card */}
              <div className="bg-gradient-to-br from-[#1B0032] to-[#3d0066] rounded-2xl p-6 border border-[#9333EA]/30 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#9333EA]/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-[#9333EA]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Increase Revenue by 40%</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Businesses using AI voice agents see <span className="font-bold text-[#9333EA]">40% more bookings</span> and <span className="font-bold text-[#9333EA]">85% fewer missed opportunities</span> from unanswered calls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* CTA Button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] text-white px-12 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#7E22CE] hover:to-[#DB2777] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                Get My AI Voice Agent
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-white/80 text-sm md:text-base">
                Set up your AI receptionist in 72 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Every Business Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Perfect For Every Business
              </h2>
            </div>

            {/* Four Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* E-commerce Card */}
              <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-400/50"
                style={{
                  boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0)';
                }}
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30">
                  <ShoppingCart className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">E-commerce</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Product demos that convert browsers into buyers
                </p>
              </div>

              {/* Social Media Card */}
              <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-400/50"
                style={{
                  boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(59, 130, 246, 0)';
                }}
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                  <Smartphone className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Social Media</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Viral content that grows your following organically
                </p>
              </div>

              {/* Paid Ads Card */}
              <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-400/50"
                style={{
                  boxShadow: '0 0 0 0 rgba(147, 51, 234, 0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(147, 51, 234, 0)';
                }}
              >
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
                  <Target className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Paid Ads</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  High-converting ad creatives that reduce CPM costs
                </p>
              </div>

              {/* Website Card */}
              <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400/50"
                style={{
                  boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6, 182, 212, 0)';
                }}
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 border border-cyan-500/30">
                  <Globe className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Website</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Landing page videos that boost conversion rates
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] text-white px-12 py-5 rounded-full text-lg md:text-xl font-bold hover:from-[#7E22CE] hover:to-[#DB2777] transition-all shadow-lg hover:shadow-xl mb-4 flex items-center gap-3 mx-auto">
                Transform My Product Today
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-white/80 text-sm md:text-base">
                Get your first AI influencer video in 48 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Metrics Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Three Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Appointment Bookings Card */}
              <div className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-6 border border-green-400/30 shadow-xl">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-400/30">
                  <Calendar className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Appointment Bookings</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Average increase of 340% in monthly appointment bookings across all client types.
                </p>
                <div className="text-4xl font-bold text-green-400">+340%</div>
              </div>

              {/* New Client Acquisition Card */}
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-2xl p-6 border border-blue-400/30 shadow-xl">
                <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-400/30">
                  <UserPlus className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">New Client Acquisition</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Consistent flow of qualified leads converting to long-term clients.
                </p>
                <div className="text-4xl font-bold text-blue-400">+357%</div>
              </div>

              {/* Revenue Growth Card */}
              <div className="bg-gradient-to-br from-[#92400E] to-[#B45309] rounded-2xl p-6 border border-amber-400/30 shadow-xl">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 border border-amber-400/30">
                  <DollarSign className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Revenue Growth</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Dramatic revenue increases through improved conversion rates and client retention.
                </p>
                <div className="text-4xl font-bold text-amber-400">+264%</div>
              </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-12 py-5 rounded-lg text-lg md:text-xl font-bold hover:from-[#059669] hover:to-[#047857] transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
              <TrendingUp className="w-6 h-6" />
              Get These Results For Your Business
            </button>
          </div>
        </div>
      </section>

      {/* We Believe in Creativity and Consistency Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We Believe in Creativity and Consistency
            </h2>
          </div>

          {/* Top Row - Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <Counter end={88} suffix="+" className="text-5xl md:text-6xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm md:text-base">AI Campaigns Launched</div>
            </div>
            <div className="text-center">
              <Counter end={14} suffix="+" className="text-5xl md:text-6xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm md:text-base">Years in Marketing</div>
            </div>
            <div className="text-center">
              <Counter end={95} suffix="%" className="text-5xl md:text-6xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm md:text-base">Client Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <Counter end={50} suffix="+" className="text-5xl md:text-6xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm md:text-base">Viral Videos Created</div>
            </div>
          </div>

          {/* Middle Row - Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 border border-slate-600/30 shadow-xl">
              <Counter end={85} suffix="%" className="text-5xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm leading-relaxed">Average Engagement Rate Increase</div>
            </div>
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 border border-slate-600/30 shadow-xl">
              <Counter end={90} suffix="%" className="text-5xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm leading-relaxed">Content Approval Rate on First Draft</div>
            </div>
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 border border-slate-600/30 shadow-xl">
              <Counter end={75} suffix="%" className="text-5xl font-bold text-[#EC4899] mb-2" />
              <div className="text-white text-sm leading-relaxed">Average ROI Improvement</div>
            </div>
          </div>

          {/* Bottom Row - Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 border border-slate-600/30 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-[#EC4899]/20 flex items-center justify-center mb-4 border border-[#EC4899]/30">
                <Zap className="w-7 h-7 text-[#EC4899]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">24/7 Content Creation</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Your AI influencer never sleeps, constantly creating and posting content.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 border border-slate-600/30 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-[#EC4899]/20 flex items-center justify-center mb-4 border border-[#EC4899]/30">
                <Shield className="w-7 h-7 text-[#EC4899]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Brand Safety</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Complete control over messaging with no risk of off-brand behavior.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 border border-slate-600/30 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-[#EC4899]/20 flex items-center justify-center mb-4 border border-[#EC4899]/30">
                <TrendingUp className="w-7 h-7 text-[#EC4899]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Scalable Growth</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Scale your marketing efforts without increasing overhead costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#1B0032] to-[#3d0066] rounded-3xl p-12 border-2 border-[#9333EA]/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Build Your Grid?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get personalized strategies and expert guidance for your Amazon store
            </p>
            <button className="bg-[#9333EA] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1B0032] transition-all shadow-lg hover:shadow-xl">
              Start Your Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Start Your AI Campaign Today Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0014] to-[#1B0032]">
        <div className="max-w-4xl mx-auto">
          {/* Top Section */}
          <div className="text-center mb-12">
            {/* Ready to Get Started Button */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EC4899] to-[#9333EA] px-6 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-white text-sm font-semibold">Ready to Get Started?</span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Start Your AI Campaign Today
            </h2>
            
            {/* Description */}
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your business with a custom AI influencer. Fill out the form below and let's create viral content that drives real results.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-3xl p-8 md:p-12 border-2 border-[#9333EA]/30 shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(147, 51, 234, 0.3), 0 0 80px rgba(147, 51, 234, 0.1)'
            }}
          >
            <form 
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                
                // Validation
                const errors: string[] = [];
                
                if (!formData.fullName.trim()) {
                  errors.push('Full Name is required');
                }
                
                if (!formData.email.trim()) {
                  errors.push('Email Address is required');
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                  errors.push('Please enter a valid email address');
                }
                
                if (!formData.service) {
                  errors.push('Service Interested In is required');
                }
                
                if (!formData.budget) {
                  errors.push('Monthly Budget is required');
                }
                
                // Show errors if any
                if (errors.length > 0) {
                  errors.forEach((error) => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Validation Error',
                      text: error,
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      background: '#1B0032',
                      color: '#fff',
                      iconColor: '#EC4899'
                    });
                  });
                  return;
                }
                
                // Submit form to API
                try {
                  const response = await fetch(`${apiBaseUrl}/ai-influencer-form`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                      full_name: formData.fullName,
                      email: formData.email,
                      phone: formData.phone || null,
                      company_name: formData.companyName || null,
                      service: formData.service,
                      budget: formData.budget,
                      project_details: formData.projectDetails || null,
                    }),
                  });

                  const data = await response.json();

                  if (response.ok && data.success) {
                    // Show success message
                    Swal.fire({
                      icon: 'success',
                      title: 'Form Submitted!',
                      text: data.message || 'We\'ll respond within 24 hours to discuss your AI influencer strategy.',
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 5000,
                      timerProgressBar: true,
                      background: '#1B0032',
                      color: '#fff',
                      iconColor: '#9333EA'
                    });
                    
                    // Reset form
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      companyName: '',
                      service: '',
                      budget: '',
                      projectDetails: ''
                    });
                  } else {
                    // Show error message
                    Swal.fire({
                      icon: 'error',
                      title: 'Submission Failed',
                      text: data.message || 'There was an error submitting your form. Please try again.',
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 4000,
                      timerProgressBar: true,
                      background: '#1B0032',
                      color: '#fff',
                      iconColor: '#EC4899'
                    });
                  }
                } catch (error) {
                  console.error('Form submission error:', error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Unable to submit the form. Please check your connection and try again.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    background: '#1B0032',
                    color: '#fff',
                    iconColor: '#EC4899'
                  });
                }
              }}
            >
              {/* Two Column Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name <span className="text-[#EC4899]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address <span className="text-[#EC4899]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email address"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Enter your company name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Single Column Fields */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Service Interested In <span className="text-[#EC4899]">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#1B0032]">Select a service...</option>
                  <option value="ai-influencer" className="bg-[#1B0032]">AI Influencer Campaign</option>
                  <option value="video-content" className="bg-[#1B0032]">Video Content Creation</option>
                  <option value="social-media" className="bg-[#1B0032]">Social Media Management</option>
                  <option value="paid-ads" className="bg-[#1B0032]">Paid Advertising</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Monthly Budget <span className="text-[#EC4899]">*</span>
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#1B0032]">Select your budget range...</option>
                  <option value="under-5k" className="bg-[#1B0032]">Under $5,000</option>
                  <option value="5k-10k" className="bg-[#1B0032]">$5,000 - $10,000</option>
                  <option value="10k-25k" className="bg-[#1B0032]">$10,000 - $25,000</option>
                  <option value="25k-plus" className="bg-[#1B0032]">$25,000+</option>
                </select>
              </div>

              {/* Text Area */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Tell Us About Your Project
                </label>
                <textarea
                  rows={5}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Share details about your business, goals, and what you're looking to achieve with AI influencer marketing..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/50 transition-all resize-y"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EC4899] to-[#9333EA] text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-[#DB2777] hover:to-[#7E22CE] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                Launch My AI Campaign
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Disclaimer */}
              <p className="text-gray-400 text-xs text-center leading-relaxed">
                By submitting this form, you agree to our Terms of Service and Privacy Policy. We'll respond within 24 hours to discuss your AI influencer strategy.
              </p>
            </form>
          </div>

          {/* Bottom Section - Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Quick Setup */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                <RefreshCw className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quick Setup</h3>
              <p className="text-white/70 text-sm">Launch in 7 days or less</p>
            </div>

            {/* Risk-Free Guarantee */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Risk-Free Guarantee</h3>
              <p className="text-white/70 text-sm">30-day money back</p>
            </div>

            {/* Dedicated Support */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dedicated Support</h3>
              <p className="text-white/70 text-sm">Personal account manager</p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default InfluencerPage;
