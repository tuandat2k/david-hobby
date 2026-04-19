'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';
import { Locale } from '@/app/dictionaries';

interface HeroSliderProps {
  lang: Locale;
  dict: any;
}

const images = [
  '/images/hero-banner-gundam-showcase.png',
  '/images/hero-banner-mech-collection.png',
  '/images/hero-banner-action-figures.png',
  '/images/hero-banner-optimus-goku-rx782.png'
];

export default function HeroSlider({ lang, dict }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className={styles.hero}>
      <div className={styles.sliderContainer}>
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>
      
      <div className={styles.heroOverlay}></div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={`animate-fade-in ${styles.heroContent}`}>
          <h1 className={styles.title}>
            {dict.home.title} <br />
            <span className={styles.highlight}>{dict.home.highlight}</span>
          </h1>
          <p className={styles.subtitle}>
            {dict.home.subtitle}
          </p>
          <div className={styles.heroActions}>
            <Link href={`/${lang}/products`} className="btn btn-primary">
              {dict.home.viewAll}
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.indicators}>
        {images.map((_, index) => (
          <button 
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
