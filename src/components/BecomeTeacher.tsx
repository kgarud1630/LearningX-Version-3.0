import React from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const BecomeTeacher = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Are you an instructor?
              </h2>
              <p className="text-xl text-blue-100">
                Join us and start earning by sharing your knowledge with students around the world
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-200" />
                </div>
                <p className="text-blue-100">Reach thousands of eager students</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-200" />
                </div>
                <p className="text-blue-100">Create engaging course content</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-blue-200" />
                </div>
                <p className="text-blue-100">Earn competitive revenue</p>
              </div>
            </div>
            
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg">
              Become a Teacher
            </button>
          </div>
          
          {/* Right Content */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Teacher illustration" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              
              {/* Floating achievement card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Award className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Expert Teachers</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-white bg-opacity-20 rounded-full z-0"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-white bg-opacity-20 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeTeacher;