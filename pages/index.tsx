import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import styles from "./index.module.css";
import { getSortedPostsData } from "../lib/posts";
import hljs from "highlight.js";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    description: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.container}>
        {allPostsData.map(({ id, date, title, description }) => (
          <div className={styles.blog} key={id}>
            <div className={styles.blogTitle}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </div>
            <div>{description}</div>
            <small
              className={`${styles.blogDate} ${utilStyles.textRight} ${utilStyles.lightText}`}
            >
              <Date dateString={date}></Date>
            </small>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
