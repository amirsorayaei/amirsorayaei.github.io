import styles from "./page.module.scss";
import "@/app/global.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <div>
        <p>Hi, this is</p>
        <h1>Amir Sorayaei</h1>
        <h2>
          Frontend Developer at&nbsp;
          <a href="https://www.roomvu.com" target="blank">
            Roomvu
          </a>
        </h2>
      </div>
    </main>
  );
};

export default Home;
