import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import highlight from "remark-highlight.js";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(): {
  id: string;
  date: string;
  title: string;
  description: string;
}[] {
  // Get file names under /posts
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => path.extname(fileName).toLowerCase() === ".md");
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as {
        date: string;
        title: string;
        description: string;
      }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(): { params: { id: string } }[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(
  id: string
): Promise<{
  id: string;
  contentHTML: string;
  date: string;
  title: string;
  description: string;
}> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(highlight)
    .use(html)
    .process(matterResult.content);

  const contentHTML = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHTML,
    ...(matterResult.data as {
      date: string;
      title: string;
      description: string;
    }),
  };
}
