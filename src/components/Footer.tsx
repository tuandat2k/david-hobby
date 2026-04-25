import styles from './Footer.module.css';

interface FooterProps {
  dict: any;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.container}`}>
        <div className={styles.about}>
          <h2 className={styles.brand}>DAVID <span>HOBBY</span></h2>
          <p className={styles.desc}>
            {dict.footer.desc}
          </p>
        </div>
        <div className={styles.links}>
          <h3>{dict.footer.links}</h3>
          <div className={styles.socialIcons}>
            <a href="https://shopee.vn/davidhobby" target="_blank" rel="noopener noreferrer" title={dict.footer.shopee} className={styles.iconLink}>
              <img src="/icons8-shopee.svg" alt="Shopee" className={styles.socialImg} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567655060469" target="_blank" rel="noopener noreferrer" title={dict.footer.facebook} className={styles.iconLink}>
              <img src="/icons8-facebook.svg" alt="Facebook" className={styles.socialImg} />
            </a>
          </div>
        </div>
        <div className={styles.contact}>
          <h3>{dict.footer.contact}</h3>
          <p className={styles.hotlineText}>Hotline: <a href="tel:0355264301" className={styles.hotlineLink}>0355 264 301</a> (David Pham)</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} David Hobby. All rights reserved.</p>
      </div>
    </footer>
  );
}
