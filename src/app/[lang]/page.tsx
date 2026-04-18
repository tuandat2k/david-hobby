import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
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
        {/* Hero Slider */}
        <HeroSlider lang={lang} dict={dict} />

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
