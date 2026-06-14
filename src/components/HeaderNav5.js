import styles from "./HeaderNav5.module.css";

const HeaderNav5 = () => {
  return (
    <header className={styles.headerNav}>
      <img
        className={styles.logoIcon }
        loading="lazy"
        alt=""
        src="/logo2@2x.png"
      />
      <nav className={styles.nav} style={{ marginLeft: '1000px' }}>
        <button className={styles.nav1}>
          <div className={styles.home}>Home</div>
        </button>
        <div className={styles.nav2}>
          <div className={styles.home1}>About us</div>
        </div>
        <div className={styles.nav3}>
          <div className={styles.home2}>Contact us</div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderNav5;
