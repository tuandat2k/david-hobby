import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import styles from "./page.module.css";
import { getDictionary, Locale } from "../../dictionaries";
import SortSelect from "@/components/SortSelect";
import Link from "next/link";
import { Metadata } from "next";

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);
  
  return generateSEOMetadata({
    path: '/products',
    title: dict.products.title,
    description: dict.products.subtitle,
    openGraph: {
      title: `${dict.products.title} | David Hobby`,
      description: dict.products.subtitle,
    }
  });
}
export default async function ProductsPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);
  
  const { page, sort } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const itemsPerPage = 20;

  let sortedProducts = [...productsData];
  if (sort === 'name_asc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  } else if (sort === 'name_desc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
  } else if (sort === 'price_asc') {
    sortedProducts.sort((a, b) => parseInt(a.price.replace(/\D/g, '') || '0') - parseInt(b.price.replace(/\D/g, '') || '0'));
  } else if (sort === 'price_desc') {
    sortedProducts.sort((a, b) => parseInt(b.price.replace(/\D/g, '') || '0') - parseInt(a.price.replace(/\D/g, '') || '0'));
  } else if (sort === 'newest') {
    sortedProducts.reverse();
  }

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const buildPaginationUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set('page', pageNum.toString());
    if (sort) params.set('sort', sort);
    const qs = params.toString();
    return `/${lang}/products${qs ? `?${qs}` : ''}#product-list`;
  };

  const getPageNumbers = (current: number, total: number) => {
    if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const paginationControls = totalPages > 1 ? (
    <div className={styles.pagination}>
      {/* < Prev Page */}
      {currentPage > 1 && (
        <Link 
          href={buildPaginationUrl(currentPage - 1)} 
          className={styles.pageBtn} 
          aria-label={dict.pagination?.prev || 'Prev'}
          rel="prev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
      )}

      {/* Smart Range Numbers */}
      {pageNumbers.map((num, i) => {
        if (num === '...') {
          return <span key={`ellipsis-${i}`} className={styles.ellipsis}>&hellip;</span>;
        }
        if (num === currentPage) {
          return <span key={`page-${num}`} className={`${styles.pageBtn} ${styles.active}`}>{num}</span>;
        }
        return (
          <Link key={`page-${num}`} href={buildPaginationUrl(num as number)} className={styles.pageBtn}>
            {num}
          </Link>
        );
      })}

      {/* > Next Page */}
      {currentPage < totalPages && (
        <Link 
          href={buildPaginationUrl(currentPage + 1)} 
          className={styles.pageBtn} 
          aria-label={dict.pagination?.next || 'Next'}
          rel="next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      )}
    </div>
  ) : null;

  return (
    <>
      {currentPage > 1 && (
        <link rel="prev" href={buildPaginationUrl(currentPage - 1)} />
      )}
      {currentPage < totalPages && (
        <link rel="next" href={buildPaginationUrl(currentPage + 1)} />
      )}
      <Header lang={lang} dict={dict} />
      <main className={`container ${styles.main}`}>
        <div className={styles.breadcrumb}>
          <Link href={`/${lang}`}>{dict.header.home}</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{dict.header.products}</span>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{dict.products.title}</h1>
          <p className={styles.subtitle}>{dict.products.subtitle}</p>
        </div>
        <div id="product-list">
          <SortSelect dict={dict} />
          
          {paginationControls}
          
          <div key={`${currentPage}-${sort || 'default'}`} className="product-grid animate-fade-in">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              name={lang === 'en' ? product.name_en : product.name}
              lang={lang} 
              dict={dict} 
            />
          ))}
          </div>

          {paginationControls}
        </div>
      </main>
      <Footer dict={dict} />
    </>
  );
}
