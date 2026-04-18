import styles from './Footer.module.css';

interface FooterProps {
  dict: any;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.container}`}>
        <div className={styles.about}>
          <h2 className={styles.brand}>DAVID<span>HOBBY</span></h2>
          <p className={styles.desc}>
            {dict.footer.desc}
          </p>
        </div>
        <div className={styles.links}>
          <h3>{dict.footer.links}</h3>
          <a href="https://shopee.vn/davidhobby" target="_blank" rel="noopener noreferrer">{dict.footer.shopee}</a>
          <a href="https://facebook.com/davidhobby" target="_blank" rel="noopener noreferrer">{dict.footer.facebook}</a>
        </div>
        <div className={styles.contact}>
          <h3>{dict.footer.contact}</h3>
          <p>Email: contact@davidhobby.com</p>
          <p>Phone: 0123 456 789</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} David Hobby. All rights reserved.</p>
      </div>
    </footer>
  );
}
