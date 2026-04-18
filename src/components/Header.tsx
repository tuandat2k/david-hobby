import Link from 'next/link';
import styles from './Header.module.css';
import { Locale } from '@/app/dictionaries';
import SearchBar from './SearchBar';

interface HeaderProps {
  lang: Locale;
  dict: any;
}

export default function Header({ lang, dict }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href={`/${lang}`} className={styles.logo}>
          DAVID<span>HOBBY</span>
        </Link>
        <div className={styles.searchContainer}>
          <SearchBar placeholder={dict.header.searchPlaceholder} lang={lang} />
        </div>
        <nav className={styles.nav}>
          <Link href={`/${lang}`} className={styles.link}>{dict.header.home}</Link>
          <Link href={`/${lang}/products`} className={styles.link}>{dict.header.products}</Link>
          <a href="#contact" className={styles.link}>{dict.header.contact}</a>
          <div className={styles.langSwitch}>
            <Link href="/vi" className={lang === 'vi' ? styles.activeLang : ''}>VI</Link>
            <span>|</span>
            <Link href="/en" className={lang === 'en' ? styles.activeLang : ''}>EN</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
