import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B0032]/90 via-[#1B0032]/80 to-[#1B0032]/90"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              AI Tech <span className="text-[#D100FF]">Video Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Explore cutting-edge AI technology, machine learning, and innovative solutions
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
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
      </section>

      {/* Video Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
