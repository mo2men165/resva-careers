import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Gallery = () => {
  // Images for the 2x3 grid
  const images = [
    { id: "1", img: "/img1.jpg", alt: "Gallery Image 1" },
    { id: "4", img: "/img4.jpg", alt: "Gallery Image 4" },
    { id: "3", img: "/img3.jpg", alt: "Gallery Image 3" },
    { id: "6", img: "/img6.jpg", alt: "Gallery Image 6" },
    { id: "9681", img: "/IMG_9681.jpg", alt: "Gallery Image 5" },
    { id: "9765", img: "/IMG_9765.jpg", alt: "Gallery Image 6" },
  ];

  return (
    <section id="gallery" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our world through these captivating moments and discover the experiences that define our journey.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column - 2x3 Image Grid */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {images.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img 
                  src={image.img} 
                  alt={image.alt}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Right Column - Video (constrained height to match images) */}
          <div className="flex justify-center items-start h-full">
            <div className="relative w-full">
              <video 
                autoPlay
                loop
                muted
                controls 
                className="w-full rounded-lg shadow-lg object-cover"
                style={{ height: 'calc(3 * 14rem + 2 * 1rem)' }}
                poster="/img1.jpg"
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
            className="group relative px-10 py-5 bg-[#31a9df] text-white font-bold text-xl md:text-2xl transition-all duration-300 shadow-2xl flex items-center gap-3"
          >
            <span>Join Our Team</span>
            <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
