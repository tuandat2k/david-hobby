"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductCarousel.module.css";
import { Locale } from "@/app/dictionaries";

interface ProductCarouselProps {
  products: any[];
  lang: Locale;
  dict: any;
}

export default function ProductCarousel({ products, lang, dict }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={scrollLeft} aria-label="Previous">
        &lt;
      </button>
      
      <div className={styles.carouselTrack} ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className={styles.carouselItem}>
            <ProductCard 
              {...product} 
              name={lang === 'en' ? product.name_en : product.name}
              lang={lang} 
              dict={dict} 
            />
          </div>
        ))}
      </div>

      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={scrollRight} aria-label="Next">
        &gt;
      </button>
    </div>
  );
}
