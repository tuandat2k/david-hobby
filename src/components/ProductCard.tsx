import Link from 'next/link';
import FallbackImage from './FallbackImage';
import styles from './ProductCard.module.css';
import { Locale } from '@/app/dictionaries';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
  lang: Locale;
  dict: any;
}

export default function ProductCard({ id, name, price, image, category, inStock, lang, dict }: ProductCardProps) {
  return (
    <Link href={`/${lang}/products/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <FallbackImage 
          src={image} 
          alt={name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image} 
        />
        {!inStock && <div className={styles.outOfStock}>{dict.productDetail.outOfStock}</div>}
        <div className={styles.category}>{category}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.price}>{price}</p>
      </div>
    </Link>
  );
}
