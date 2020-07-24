import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import styles from "./about.module.css";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{`${siteTitle} | About`}</title>
      </Head>
        <div className={utilStyles.container}>

        <section className={styles.hero}>
            <div className={styles.heroImg}>
                <img src="/images/profile.jpg"/>
            </div>
            <div className={styles.heroDescription}><div className={styles.heroName}>Shikazuki</div>
                <p>フロントエンドが一番得意です。最近は機械学習、DeepLearningがメインです。<br/>水族館が好きです。</p>
            </div>
        </section>
        <section>
            <h3>Qualification</h3>
            <ul>
                <li>データベーススペシャリスト</li>
                <li>ネットワークスペシャリスト</li>
                <li>プロジェクトマネージャー</li>
                <li>Project Manager Professional（PMP）</li>
                <li>統計検定2級</li>
            </ul>
        </section>
        <section>
            <h3>Specialty</h3>
            <ul>
                <li>Web全般</li>
                <li>JavaScript > Python > C# > Java</li>
                <li>AWS</li>
            </ul>
        </section>
        </div>
    </Layout>
  );
}

