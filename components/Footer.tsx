import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          RE <span>USE</span>
        </div>
        <div className={styles.footerTagline}>
          Novas histórias para a tecnologia. Um futuro melhor para todos.
        </div>
        <div>
          © 2026 ReUse · Feito para circular.
        </div>
      </div>
    </footer>
  );
}
