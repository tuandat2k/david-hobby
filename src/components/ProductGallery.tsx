"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setIsModalOpen(false);
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image */}
      <div className={styles.mainImageWrapper} onClick={() => setIsModalOpen(true)}>
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.mainImage}
        />
        <div className={styles.zoomHint}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbnailList}>
          <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous image">
            &lt;
          </button>
          <div className={styles.thumbnails}>
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`${styles.thumbnailWrapper} ${idx === currentIndex ? styles.active : ""}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
          <button className={styles.navBtn} onClick={handleNext} aria-label="Next image">
            &gt;
          </button>
        </div>
      )}

      {/* Modal Lightbox */}
      {isModalOpen && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setIsModalOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          autoFocus
        >
          <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)} aria-label="Close modal">
            &times;
          </button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalNavBtn} onClick={handlePrev} aria-label="Previous image">&lt;</button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={images[currentIndex]}
                alt={`${productName} - Fullscreen`}
                fill
                sizes="100vw"
                className={styles.modalImage}
              />
            </div>
            <button className={styles.modalNavBtn} onClick={handleNext} aria-label="Next image">&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
}
