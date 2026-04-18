import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCarousel from "@/components/ProductCarousel";
import productsData from "@/data/products.json";
import Link from "next/link";
import { getDictionary, Locale } from "../dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const dict = await getDictionary(lang);
  
  const featuredProducts = productsData.slice(0, 4);

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
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
                <a href="#featured" className="btn btn-outline">
                  {dict.home.featured}
                </a>
              </div>
            </div>
          </div>
          <div className={styles.heroOverlay}></div>
        </section>

        {/* Featured Products */}
        <section id="featured" className={styles.featured}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{dict.home.featured}</h2>
              <Link href={`/${lang}/products`} className={styles.viewAll}>
                {dict.home.viewAllLink} &rarr;
              </Link>
            </div>
            <ProductCarousel products={featuredProducts} lang={lang} dict={dict} />
          </div>
        </section>
      </main>
      <Footer dict={dict} />
    </>
  );
}
