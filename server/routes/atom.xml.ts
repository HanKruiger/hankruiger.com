import { serverQueryContent } from '#content/server';
import { Feed } from 'feed';
import { MarkdownNode, MarkdownRoot } from '@nuxt/content';

const BLOG_LANGUAGE = "en";
const AUTHOR_NAME = "Han Kruiger";
const AUTHORS = [{ name: AUTHOR_NAME } ];
const BLOG_TITLE = "Han's blog";

// this solution for getting a feed is from https://cmpadden.github.io/articles/nuxt-content-rss-feed

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

    const baseUrl = url.origin;
    const atomLink = `${baseUrl}/atom.xml`;

    const feed = new Feed({
      title: BLOG_TITLE,
      id: atomLink,
      link: baseUrl,
      language: BLOG_LANGUAGE,
      favicon: `${baseUrl}/favicon.jpg`,
      copyright: `All rights reserved, ${new Date().getFullYear()}, ${AUTHOR_NAME}`,
      updated: new Date(),
      generator: "Nuxt static site generation + Feed for Node.js",
      feedLinks: {
        atom: atomLink
      },
      author: AUTHORS[0]
    });

    const articles = await serverQueryContent(event, '/posts/').find();

    for (const article of articles) {
      feed.addItem({
        content: article.body ? renderRootToText(article.body!) : "",
        title: article.title ? article.title : "Missing Title",
        id: `${baseUrl}${article._path}`,
        link: `${baseUrl}${article._path}`,
        description: article.description,
        author: AUTHORS,
        date: new Date(article.updated ?? article.created),
        published: new Date(article.created),
      });
    };

    setResponseHeader(event, 'Content-Type', 'text/xml');

    return feed.atom1();
});

const renderRootToText = (node: MarkdownRoot): string => {
  return node.children.map(renderToText).join("");
}

// from: https://github.com/nuxt/content/issues/2019#issuecomment-1519039868
// I should keep track of this issue for a better solution.
const renderToText = (node: MarkdownNode): string => {
  if (node.type === "text") {
    return node.value!;
  }

  if (!node.children?.length) {
    return `<${node.tag}>`;
  }

  return `<${node.tag}>${
    node.children?.map(renderToText).join("") || ""
  }</${node.tag}>`;
};
