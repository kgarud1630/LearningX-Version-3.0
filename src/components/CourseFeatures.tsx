import React from 'react';
import { Award, Users, Clock, Infinity } from 'lucide-react';

const CourseFeatures = () => {
  const features = [
    {
      icon: Award,
      title: 'Certificate of Completion',
      description: 'Get certified when you complete courses and showcase your skills'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience'
    },
    {
      icon: Clock,
      title: 'Learn at Your Pace',
      description: 'Study whenever and wherever you want, at your own speed'
    },
    {
      icon: Infinity,
      title: 'Lifetime Access',
      description: 'Get unlimited access to course materials and updates'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why choose LearnX?
          </h2>
          <p className="text-lg text-gray-600">
            We provide the best learning experience with these amazing features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;