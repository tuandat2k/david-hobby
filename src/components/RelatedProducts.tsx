import ProductCarousel from "./ProductCarousel";
import styles from "./RelatedProducts.module.css";
import productsData from "@/data/products.json";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  lang: any;
  dict: any;
}

export default function RelatedProducts({ currentProductId, category, lang, dict }: RelatedProductsProps) {
  // Find products in the same category or just random ones if not enough
  const related = productsData
    .filter((p) => p.id !== currentProductId && p.category === category)
    .slice(0, 10); // Increase count for carousel

  // If we don't have enough related products in the same category, fill with others
  if (related.length < 10) {
    const others = productsData
      .filter((p) => p.id !== currentProductId && p.category !== category)
      .slice(0, 10 - related.length);
    related.push(...others);
  }

  if (related.length === 0) return null;

  return (
    <section className={styles.relatedSection}>
      <h2 className={styles.title}>Sản phẩm liên quan</h2>
      <ProductCarousel products={related} lang={lang} dict={dict} />
    </section>
  );
}
