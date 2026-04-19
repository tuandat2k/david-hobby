"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Locale } from "@/app/dictionaries";

interface Product {
  id: string;
  name: string;
  name_en: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
}

interface SearchProductListProps {
  initialProducts: Product[];
  lang: Locale;
  dict: Record<string, any>;
}

export default function SearchProductList({ initialProducts, lang, dict }: SearchProductListProps) {
  const [visibleCount, setVisibleCount] = useState(20);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  return (
    <>
      <div className="product-grid">
        {initialProducts.slice(0, visibleCount).map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            name={lang === 'en' ? product.name_en : product.name}
            lang={lang} 
            dict={dict} 
          />
        ))}
      </div>
      
      {visibleCount < initialProducts.length && (
        <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '1rem' }}>
          <button 
            onClick={handleLoadMore} 
            style={{
              padding: '12px 32px',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
          >
            {dict.search?.loadMore || 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}
