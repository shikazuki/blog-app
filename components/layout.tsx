import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export const siteTitle = "Shikazuki's Blog";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700|Noto+Sans+JP:400,700"
          rel="stylesheet"
        />
        <meta name="description" content="IT Blog by shikazuki" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/monokai.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js"></script>
      </Head>
      <header className={styles.header}>
        <div className={styles.siteTitle}>
          <Link href="/">
            <a>{siteTitle}</a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
          <div className={styles.footerInner}>
        <div>About</div>
        <div className={styles.followMe}>
            <span className={utilStyles.marginRightMini}>Follow me</span>
            <a href="https://github.com/shikazuki" target="_blank"><img className={`${styles.snsIcon} ${utilStyles.marginRightMini}`} src="/images/github-logo.png"/></a>
            <a href="https://qiita.com/shikazuki" target="_blank"><img className={`${styles.snsIcon} ${utilStyles.marginRightMini}`} src="/images/qiita_logo.png"/></a>
        </div>
          </div>
      </footer>
    </>
  );
}
