'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@prisma/client';
import Image from 'next/image';

interface ProductSlideshowProps {
  products: (Product & { category: { name: string } })[];
}

export function ProductSlideshow({ products }: ProductSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Filter out products without images
  const validProducts = products.filter((p) => p.image);

  useEffect(() => {
    if (!isAutoplay || validProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validProducts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoplay, validProducts.length]);

  if (validProducts.length === 0) {
    return null;
  }

  const currentProduct = validProducts[currentIndex];

  const goToPrevious = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + validProducts.length) % validProducts.length);
  };

  const goToNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % validProducts.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Slideshow Container */}
      <div className="relative h-full w-full">
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={currentProduct.image}
            alt={currentProduct.name}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative flex h-full flex-col items-center justify-center px-6 py-8 text-center sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-300">
            Featured Product
          </p>
          <h2 className="mt-2 max-w-4xl text-4xl font-bold text-yellow-100 sm:text-5xl lg:text-6xl drop-shadow-lg">
            {currentProduct.name}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-yellow-50 drop-shadow">
            {currentProduct.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/products/${currentProduct.slug}`}
              className="inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-900 shadow-lg hover:bg-yellow-300 text-lg transition"
            >
              View Product
            </Link>
            <Link
              href="/products"
              className="inline-flex rounded-xl bg-white/20 px-8 py-4 font-semibold text-yellow-100 hover:bg-white/30 text-lg transition border-2 border-yellow-300"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 sm:left-6"
          aria-label="Previous product"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 sm:right-6"
          aria-label="Next product"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 bg-slate-900 px-4 py-4">
        {validProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoplay(false);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition ${
              index === currentIndex ? 'w-8 bg-sky-500' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
