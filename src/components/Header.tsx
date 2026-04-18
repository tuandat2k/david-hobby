'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Locale } from '@/app/dictionaries';
import SearchBar from './SearchBar';

interface HeaderProps {
  lang: Locale;
  dict: any;
}

export default function Header({ lang, dict }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href={`/${lang}`} className={styles.logo}>
          DAVID<span>HOBBY</span>
        </Link>
        
        <div className={styles.searchContainer}>
          <SearchBar placeholder={dict.header.searchPlaceholder} lang={lang} />
        </div>

        <button 
          className={`${styles.menuToggle} ${isMenuOpen ? styles.toggleActive : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
          <Link href={`/${lang}`} className={styles.link} onClick={closeMenu}>
            {dict.header.home}
          </Link>
          <Link href={`/${lang}/products`} className={styles.link} onClick={closeMenu}>
            {dict.header.products}
          </Link>
          <a href="#contact" className={styles.link} onClick={closeMenu}>
            {dict.header.contact}
          </a>
          <div className={styles.langSwitch}>
            <Link 
              href="/vi" 
              className={lang === 'vi' ? styles.activeLang : ''}
              onClick={closeMenu}
            >
              VI
            </Link>
            <span>|</span>
            <Link 
              href="/en" 
              className={lang === 'en' ? styles.activeLang : ''}
              onClick={closeMenu}
            >
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
