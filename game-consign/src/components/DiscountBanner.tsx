"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const discounts = [
  { id: 1, text: "20% off on all PC games!" },
  { id: 2, text: "Buy 2 Get 1 Free on Console Games" },
  { id: 3, text: "Flash Sale: 50% off on Gaming Accessories" },
  { id: 4, text: "New Release: Pre-order now and save 10%" },
];

export default function DiscountBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % discounts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % discounts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + discounts.length) % discounts.length);
  };

  return (
    <div className="bg-primary text-white py-2 relative overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <button onClick={prevSlide} className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200" aria-label="Previous discount">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {discounts.map(discount => (
              <div key={discount.id} className="flex-shrink-0 w-full text-center">
                <p className="text-sm sm:text-base md:text-lg font-medium">{discount.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200" aria-label="Next discount">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
