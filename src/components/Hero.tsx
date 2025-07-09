import React, { useEffect, useState } from 'react';
import { Play, Award, Star } from 'lucide-react';

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Develop your skills in a 
                <span className="text-blue-600"> new and unique</span> way
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Over 10,000 video courses taught by real-world experts
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg">
                Explore Courses
              </button>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg">
                Get Certified
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Student learning" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      <AnimatedCounter target={75} suffix="K+" />
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      <AnimatedCounter target={7500} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600">Video Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                      <AnimatedCounter target={4.9} />
                      <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current" />
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 z-0"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-200 rounded-full opacity-50 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;