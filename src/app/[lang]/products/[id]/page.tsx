import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productsData from "@/data/products.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { getDictionary, Locale } from "../../../dictionaries";
import ProductGallery from "@/components/ProductGallery";
import ProductInfoTabs from "@/components/ProductInfoTabs";
import RelatedProducts from "@/components/RelatedProducts";

type Props = {
  params: Promise<{ id: string; lang: string }>;
};

export async function generateStaticParams() {
  const locales = ['en', 'vi'];
  const params = [];
  for (const locale of locales) {
    for (const product of productsData) {
      params.push({ lang: locale, id: product.id });
    }
  }
  return params;
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const lang = (await params).lang as Locale;
  const product = productsData.find((p) => p.id === id);
  const dict = await getDictionary(lang);

  if (!product) {
    notFound();
  }

  const name = lang === 'en' ? product.name_en : product.name;
  const description = lang === 'en' ? product.description_en : product.description;

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className={`container ${styles.main}`}>
        <div className={styles.breadcrumb}>
          <Link href={`/${lang}`}>{dict.productDetail.home}</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/${lang}/products`}>{dict.productDetail.products}</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{name}</span>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Gallery */}
          <div className={styles.imageGallery}>
            <ProductGallery images={product.images || [product.image]} productName={name} />
          </div>

          {/* Right Column: Title, Price, Status, Actions */}
          <div className={styles.info}>
            <div className={styles.badge}>{product.category}</div>
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{product.price}</span>
              <span className={`${styles.status} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                {product.inStock ? dict.productDetail.inStock : dict.productDetail.outOfStock}
              </span>
            </div>
            
            <div className={styles.featuresList}>
              <h3 className={styles.featuresTitle}>{dict.productDetail.keyFeatures || dict.productDetail.features}:</h3>
              <ul className={styles.featuresUl}>
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx} className={styles.featureItem}>
                    <span className={styles.featureBullet}>✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.actions}>
              <a 
                href={product.shopeeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`btn btn-shopee ${styles.actionBtn}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6L16.5 10H7.5L5 6H19ZM4 8L5.5 18H18.5L20 8H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {dict.productDetail.buyShopee}
              </a>
              <a 
                href={product.fanpageLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`btn btn-fanpage ${styles.actionBtn}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {dict.productDetail.contactFanpage}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs for Info & Description */}
        <ProductInfoTabs dict={dict} product={product} description={description} />
        
        {/* Bottom Section: Related Products */}
        <RelatedProducts currentProductId={product.id} category={product.category} lang={lang} dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
