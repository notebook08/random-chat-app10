// File: client/src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar'; // Assuming this component exists

// Refreshed list of placeholder images for splash screens and ads
const bannerImages = [
  'https://placehold.co/1200x400/7e22ce/FFFFFF?text=Welcome+to+AjnabiCam', // Splash Screen
  'https://placehold.co/1200x400/16a34a/FFFFFF?text=Your+Awesome+Banner+Ad',    // Banner Ad
  'https://placehold.co/1200x400/be123c/FFFFFF?text=Discover+New+Features', // Splash Screen
  'https://placehold.co/1200x400/1d4ed8/FFFFFF?text=Another+Great+Ad+Here',   // Banner Ad
];

const HomeScreen: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // This effect handles the automatic sliding of the banner images
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000); // Slides change every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - AjnabiCam</title>
      </Helmet>
      
      {/* Main container with a subtle gradient background */}
      <main className="flex flex-col items-center min-h-screen w-full bg-gray-50 relative pb-20">

        {/* Native-style Header */}
        <header className="w-full max-w-lg bg-white p-4 border-b border-gray-200 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">AjnabiCam</h1>
        </header>

        {/* Banner and Content Area */}
        <div className="w-full max-w-lg px-4 py-6">
        
          {/* Auto-scrolling Banner Section */}
          <section className="w-full mb-6 relative">
            {/* Image container with overflow hidden */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {bannerImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Promotional banner ${index + 1}`}
                    className="w-full flex-shrink-0 object-cover h-48" // Rectangular banner shape
                  />
                ))}
              </div>
            </div>
            
            {/* Navigation Dots for the Banner */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>

          {/* Main content */}
          <div className="w-full bg-white p-6 rounded-xl border border-gray-200 shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Start Connecting</h2>
            <p className="text-gray-500 mb-6">
              Jump into a conversation or discover amazing people near you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-violet-500 text-white p-4 rounded-lg shadow-md text-left flex flex-col justify-between h-28">
                <h3 className="font-bold text-lg">Start Chat</h3>
                <p className="text-sm text-violet-200">Connect instantly</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg shadow-md text-left flex flex-col justify-between h-28">
                <h3 className="font-bold text-lg">Discover</h3>
                <p className="text-sm text-green-200">Find new friends</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavBar />
      </main>
    </>
  );
};

export default HomeScreen;
