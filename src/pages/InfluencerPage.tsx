import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Star, Play, Users, Handshake, Phone, Search, Send, Code, Smartphone, Zap, Building2, Settings, DollarSign, BarChart3, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface VideoCardProps {
  thumbnail: string;
  title: string;
  category: string;
  videoUrl: string;
}

function VideoCard({ thumbnail, title, category, videoUrl }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && !hasError) {
      videoRef.current.muted = !isHovered;
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
        setHasError(true);
      });
    }
  }, [isHovered, hasError]);

  useEffect(() => {
    if (videoRef.current && !hasError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error auto-playing video:', error);
          setHasError(true);
        });
      }
    }
  }, [hasError]);

  const handleVideoError = () => {
    console.error('Video failed to load:', videoUrl);
    setHasError(true);
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-[#1B0032]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[9/16] relative">
        {hasError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B0032] to-[#3d0066] flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-white text-sm">Video unavailable</div>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            onError={handleVideoError}
            preload="auto"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {isHovered && (
          <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full animate-pulse">
            <Volume2 className="w-5 h-5 text-[#D100FF]" />
          </div>
        )}

        {!isHovered && (
          <div className="absolute top-4 right-4 bg-black/30 p-2 rounded-full">
            <VolumeX className="w-5 h-5 text-gray-400" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1B0032] to-transparent">
          <div className="text-[#D100FF] text-sm font-semibold mb-1">{category}</div>
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
}

function InfluencerPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const sophiaVideoRef = useRef<HTMLVideoElement>(null);

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

  const videos = [
    {
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'AI Voice Cloning Technology',
      category: 'AI Tech',
      videoUrl: '/restaurant.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Deep Learning for Face Synthesis',
      category: 'AI Tech',
      videoUrl: '/restaurant-2.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Neural Networks Explained',
      category: 'AI Tech',
      videoUrl: '/restaurant-3.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861962/pexels-photo-3861962.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Machine Learning Basics',
      category: 'AI Tech',
      videoUrl: '/restaurant-4.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861966/pexels-photo-3861966.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'AI Content Generation',
      category: 'AI Tech',
      videoUrl: '/restaurant-5.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861961/pexels-photo-3861961.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Natural Language Processing',
      category: 'AI Tech',
      videoUrl: '/restaurant-6.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Computer Vision & Image AI',
      category: 'AI Tech',
      videoUrl: '/restaurant-7.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861963/pexels-photo-3861963.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'AI Video Processing',
      category: 'AI Tech',
      videoUrl: '/restaurant-8.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861967/pexels-photo-3861967.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Generative AI Models',
      category: 'AI Tech',
      videoUrl: '/restaurant-9.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861960/pexels-photo-3861960.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'AI Automation Tools',
      category: 'AI Tech',
      videoUrl: '/restaurant-10.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861965/pexels-photo-3861965.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Reinforcement Learning',
      category: 'AI Tech',
      videoUrl: '/restaurant-11.mp4'
    },
    {
      thumbnail: 'https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'AI Ethics & Future',
      category: 'AI Tech',
      videoUrl: '/restaurant-12.mp4'
    }
  ];

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
                <div className="inline-flex items-center gap-2 bg-[#D100FF] px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span className="text-white text-sm font-semibold">Future of AI Influencers</span>
                </div>

                {/* Main Headline */}
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  style={{
                    textShadow: '0 0 10px rgba(209, 0, 255, 0.8), 0 0 20px rgba(209, 0, 255, 0.6), 0 0 30px rgba(209, 0, 255, 0.4)'
                  }}
                >
                  BUILD YOUR OWN <span 
                    className="text-[#D100FF]"
                    style={{
                      textShadow: '0 0 15px rgba(209, 0, 255, 1), 0 0 30px rgba(209, 0, 255, 0.8), 0 0 45px rgba(209, 0, 255, 0.6)'
                    }}
                  >AI INFLUENCER</span> FOR YOUR BUSINESS
                </h1>

                {/* Sub-headline */}
                <h2 
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{
                    textShadow: '0 0 10px rgba(209, 0, 255, 0.7), 0 0 20px rgba(209, 0, 255, 0.5)'
                  }}
                >
                  SELL 24/7 FOR YOU
                </h2>

                {/* Descriptive Paragraph */}
                <p 
                  className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
                  style={{
                    textShadow: '0 0 5px rgba(209, 0, 255, 0.4), 0 0 10px rgba(209, 0, 255, 0.2)'
                  }}
                >
                  Brand Ambassador Without the Drama. Join us into the future of AI influencers and transform your marketing with authentic, consistent content that converts.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#D100FF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B800E6] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl">
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
                        textShadow: '0 0 10px rgba(209, 0, 255, 0.8), 0 0 20px rgba(209, 0, 255, 0.5)'
                      }}
                    >88+</div>
                    <div className="text-white/70 text-sm md:text-base">AI Campaigns</div>
                  </div>
                  <div>
                    <div 
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(209, 0, 255, 0.8), 0 0 20px rgba(209, 0, 255, 0.5)'
                      }}
                    >105+</div>
                    <div className="text-white/70 text-sm md:text-base">Viral Videos</div>
                  </div>
                  <div>
                    <div 
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(209, 0, 255, 0.8), 0 0 20px rgba(209, 0, 255, 0.5)'
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
                    filter: 'drop-shadow(0 0 20px rgba(209, 0, 255, 0.5)) drop-shadow(0 0 40px rgba(209, 0, 255, 0.3))'
                  }}
                >
                  {/* Video Player */}
                  <div 
                    className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D100FF]/50"
                    style={{
                      boxShadow: '0 0 30px rgba(209, 0, 255, 0.6), 0 0 60px rgba(209, 0, 255, 0.4), 0 0 90px rgba(209, 0, 255, 0.2), inset 0 0 20px rgba(209, 0, 255, 0.1)'
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
                              className="h-full bg-[#D100FF] rounded-full transition-all"
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
                  <button className="w-full mt-4 bg-[#D100FF] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#B800E6] transition-colors shadow-lg hover:shadow-xl">
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B0032] to-[#D100FF] px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-white text-sm font-semibold">Complete AI Business Ecosystem</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span 
                className="text-[#D100FF]"
                style={{
                  textShadow: '0 0 15px rgba(209, 0, 255, 1), 0 0 30px rgba(209, 0, 255, 0.8), 0 0 45px rgba(209, 0, 255, 0.6)'
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
            <div className="bg-gradient-to-br from-[#D100FF] to-[#8B00B8] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#D100FF] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(209, 0, 255, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(209, 0, 255, 0.8), 0 0 40px rgba(209, 0, 255, 0.5), 0 0 60px rgba(209, 0, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(209, 0, 255, 0)';
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
            <div className="bg-gradient-to-br from-[#1B0032] to-[#4C1D95] rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#D100FF] hover:shadow-2xl"
              style={{
                boxShadow: '0 0 0 0 rgba(209, 0, 255, 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(209, 0, 255, 0.8), 0 0 40px rgba(209, 0, 255, 0.5), 0 0 60px rgba(209, 0, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(209, 0, 255, 0)';
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B0032] to-[#D100FF] px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-white fill-white" />
                <span className="text-white text-sm font-semibold">The Complete Package</span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">One </span>
                <span 
                  className="text-[#D100FF]"
                  style={{
                    textShadow: '0 0 15px rgba(209, 0, 255, 1), 0 0 30px rgba(209, 0, 255, 0.8), 0 0 45px rgba(209, 0, 255, 0.6)'
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
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D100FF] rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                {/* Main Icon */}
                <div className="w-24 h-24 rounded-full border-4 border-[#D100FF] flex items-center justify-center bg-[#D100FF]/10">
                  <Settings className="w-12 h-12 text-[#D100FF]" />
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
            <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
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
                <div className="bg-gradient-to-r from-[#D100FF] to-[#8B00B8] rounded-xl p-4">
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
            <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
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
                <div className="bg-gradient-to-r from-[#D100FF] to-[#8B00B8] rounded-xl p-4">
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
            <div className="bg-gradient-to-br from-[#1B0032] to-[#0a0014] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
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
                <div className="bg-gradient-to-r from-[#D100FF] to-[#8B00B8] rounded-xl p-4">
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Learn from <span className="text-[#D100FF]">AI Experts</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Watch exclusive insights, tutorials, and breakthroughs in AI technology and machine learning.
                All videos play automatically. Hover to hear the sound.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#D100FF]" />
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
              {videos.map((video, idx) => (
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
                  className="bg-gradient-to-br from-[#6B21A8] to-[#4C1D95] rounded-2xl p-6 border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-[#D100FF] hover:shadow-2xl"
                  style={{
                    boxShadow: '0 0 0 0 rgba(209, 0, 255, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(209, 0, 255, 0.8), 0 0 40px rgba(209, 0, 255, 0.5), 0 0 60px rgba(209, 0, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 0 rgba(209, 0, 255, 0)';
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-400/20 flex items-center justify-center mb-4 border border-purple-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#D100FF] mb-3">Boost Listing Views</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Properties with AI influencer videos get <span className="font-bold text-[#D100FF]">4x more views</span> and <span className="font-bold text-[#D100FF]">3x more inquiries</span> than traditional listings.
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

      {/* CTA Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#1B0032] to-[#3d0066] rounded-3xl p-12 border-2 border-[#D100FF]/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Build Your Grid?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get personalized strategies and expert guidance for your Amazon store
            </p>
            <button className="bg-[#D100FF] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1B0032] transition-all shadow-lg hover:shadow-xl">
              Start Your Free Consultation
            </button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default InfluencerPage;
