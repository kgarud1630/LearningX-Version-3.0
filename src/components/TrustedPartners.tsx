import React from 'react';

const TrustedPartners = () => {
  const partners = [
    'Google',
    'Microsoft',
    'Apple',
    'Amazon',
    'Netflix',
    'Spotify'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by industry leaders</h2>
          <p className="text-lg text-gray-600">Join thousands of professionals learning with us</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
            >
              <div className="text-2xl font-bold text-gray-400 hover:text-gray-700 transition-colors">
                {partner}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;