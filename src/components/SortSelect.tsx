'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

export default function SortSelect({ dict }: { dict: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: '', label: dict.sort?.default || 'Mặc định' },
    { value: 'name_asc', label: dict.sort?.name_asc || 'Tên A → Z' },
    { value: 'name_desc', label: dict.sort?.name_desc || 'Tên Z → A' },
    { value: 'price_asc', label: dict.sort?.price_asc || 'Giá tăng dần' },
    { value: 'price_desc', label: dict.sort?.price_desc || 'Giá giảm dần' },
    { value: 'newest', label: dict.sort?.newest || 'Mới nhất' },
  ];

  const currentSort = searchParams.get('sort') || '';
  const currentOption = options.find(o => o.value === currentSort) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value) {
      current.set('sort', value);
    } else {
      current.delete('sort');
    }
    
    current.set('page', '1');
    
    const search = current.toString();
    const query = search ? `?${search}` : '';
    
    router.push(`${pathname}${query}#product-list`, { scroll: true });
    setIsOpen(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', justifyContent: 'flex-end' }}>
      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {dict.sort?.label || 'Sắp xếp theo:'}
      </span>
      
      <div ref={dropdownRef} style={{ position: 'relative', width: '200px' }}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            backgroundColor: 'var(--card-bg)',
            border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border-color)'}`,
            borderRadius: '10px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isOpen ? '0 0 0 3px rgba(220, 38, 38, 0.15)' : 'var(--shadow-sm)',
          }}
        >
          {currentOption.label}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ 
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              color: 'var(--text-secondary)'
            }}
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: '100%',
            marginTop: '8px',
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 50,
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '6px' }}>
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    onClick={() => handleSelect(option.value)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      backgroundColor: currentSort === option.value ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
                      color: currentSort === option.value ? 'var(--accent)' : 'var(--text-primary)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      fontWeight: currentSort === option.value ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) => {
                      if (currentSort !== option.value) {
                        e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentSort !== option.value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
