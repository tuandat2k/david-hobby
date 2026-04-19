import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import styles from "./page.module.css";
import { getDictionary, Locale } from "../../dictionaries";
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
  
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(productsData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productsData.slice(startIndex, endIndex);

  return (
    <>
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
        
        <div className="product-grid">
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

        {totalPages > 1 && (
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <Link href={`/${lang}/products?page=${currentPage - 1}`} className="btn btn-outline">
                &larr; {dict.pagination?.prev || 'Prev'}
              </Link>
            )}
            <span className={styles.pageInfo}>
              {dict.pagination?.page || 'Page'} {currentPage} {dict.pagination?.of || 'of'} {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link href={`/${lang}/products?page=${currentPage + 1}`} className="btn btn-outline">
                {dict.pagination?.next || 'Next'} &rarr;
              </Link>
            )}
          </div>
        )}
      </main>
      <Footer dict={dict} />
    </>
  );
}
