import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Gallery = () => {
  // Images for the 2x2 grid (excluding img2 and img5)
  const images = [
    { id: "1", img: "/img1.jpg", alt: "Gallery Image 1" },
    { id: "4", img: "/img4.jpg", alt: "Gallery Image 4" },
    { id: "3", img: "/img3.jpg", alt: "Gallery Image 3" },
    { id: "6", img: "/img6.jpg", alt: "Gallery Image 6" },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#31a9df]">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our world through these captivating moments and discover the experiences that define our journey.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - 2x2 Image Grid */}
          <div className="grid grid-cols-2 gap-6">
            {images.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img 
                  src={image.img} 
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Right Column - Video */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <video 
                autoPlay
                loop
                muted
                controls 
                className="w-full h-auto rounded-lg shadow-lg"
                poster="/img1.jpg" // Using first image as poster
              >
                <source src="/vid1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Link 
            to="/apply" 
            className="group relative px-10 py-5 bg-white text-[#31a9df] rounded-full font-bold text-xl md:text-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3 border-2 border-[#31a9df] hover:border-[#29aae0]"
          >
            <span>Join Our Team</span>
            <div className="w-10 h-10 bg-[#31a9df] rounded-full flex items-center justify-center group-hover:bg-[#29aae0] transition-colors">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
