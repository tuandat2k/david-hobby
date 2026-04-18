import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import styles from "../products/page.module.css";
import { getDictionary, Locale } from "../../dictionaries";
import Link from "next/link";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const lang = (await params).lang as Locale;
  const { q } = await searchParams;
  const dict = await getDictionary(lang);

  const query = q?.toLowerCase() || '';

  const filteredProducts = productsData.filter((product) => {
    if (!query) return false;
    const searchString = `
      ${product.name.toLowerCase()} 
      ${product.name_en.toLowerCase()} 
      ${product.brand.toLowerCase()} 
      ${product.series.toLowerCase()} 
      ${product.category.toLowerCase()}
    `;
    return searchString.includes(query);
  });

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className={`container ${styles.main}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {dict.search.title} "{q}"
          </h1>
          <Link href={`/${lang}/products`} style={{ color: 'var(--accent)', fontWeight: 500 }}>
            &larr; {dict.search.back}
          </Link>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product} 
                name={lang === 'en' ? product.name_en : product.name}
                lang={lang} 
                dict={dict} 
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <p>{dict.search.noResult}</p>
          </div>
        )}
      </main>
      <Footer dict={dict} />
    </>
  );
}
