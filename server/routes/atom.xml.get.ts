import { Feed } from 'feed';
import { kebabCase } from 'change-case';

// get base URL from Netlify env variables
const baseUrl = (process.env.ENV === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL) || 'http://localhost:3000';

const BLOG_LANGUAGE = "en";
const AUTHOR_NAME = "Han Kruiger";
const AUTHORS = [{ name: AUTHOR_NAME } ];
const BLOG_TITLE = "Han's blog";

// this solution for getting a feed is based on https://cmpadden.github.io/articles/nuxt-content-rss-feed

export default defineEventHandler(async (event) => {
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

    // get all posts (excluding the posts index page)
    const articles = await queryCollection(event, 'posts')
      .where('path', '<>', '/posts')
      .where('created', 'IS NOT NULL')
      .order('created', 'DESC')
      .all();

    for (const article of articles) {
      feed.addItem({
        content: article.body ? renderBodyToHtml(article.body as unknown as Body) : "",
        title: article.title,
        id: `${baseUrl}${article.path}/`,
        link: `${baseUrl}${article.path}/`,
        description: article.description,
        author: AUTHORS,
        date: article.updated ? new Date(article.updated) : new Date(article.created!),
        published: new Date(article.created!),
      });
    };

    setResponseHeader(event, 'Content-Type', 'text/xml');

    // generate atom feed xml from the feed object
    return feed.atom1();
});


// This is the backward engineered type (the `MarkDownRoot` type was not correct)

type ContentItem = string | [string, object, ...ContentItem[]];

type Body = {
  type: 'minimal',
  value: ContentItem[],
}

const renderBodyToHtml = (body: Body): string => {
  if (body.type !== 'minimal') throw new Error('Unexpected non-"minimal" body type.');

  return body.value.map(renderToText).join("");
}

const renderToText = (content: ContentItem): string => {
  if (typeof content == "string") {
    return content;
  }

  const tag = content[0];
  const attrs = content[1] as any;
  const children = content.slice(2) as ContentItem[];

  // in the footnote reference, link using fn:x and set id using fnref:x
  const isFootnoteRef = tag === "a"
    && Object.keys(attrs).includes("href")
    && Object.keys(attrs).includes("id")
    && (attrs.href as string).startsWith('#user-content-fn-')
    && (attrs.id as string).startsWith('user-content-fnref-');
  if (isFootnoteRef) {
    attrs.href = (attrs.href as string).replace('#user-content-fn-', '#fn:');
    attrs.id = (attrs.id as string).replace('user-content-fnref-', 'fnref:');
  }

  // in the footnote, set id using fn:x
  const isFootnote = tag === "li"
    && Object.keys(attrs).includes("id")
    && (attrs.id as string).startsWith('user-content-fn-')
  if (isFootnote) {
    attrs.id = attrs.id.replace('user-content-fn-', 'fn:')
  }

  // in the backref, link using fnref:x
  const footnoteBackRef = tag === "a"
    && Object.keys(attrs).includes("href")
    && (attrs.href as string).startsWith('#user-content-fnref-');
  if (footnoteBackRef) {
    attrs.href = (attrs.href as string).replace('#user-content-fnref-', '#fnref:');
  }

  // add the "footnotes" class to the <ol> with the footnotes
  const footnoteList = tag === "ol"
    && ((children[0][0]) as string) === 'li'
    && ((children[0][1] as any).id as string)?.startsWith('user-content-fn-');
  if (footnoteList) {
    attrs.class = "footnotes";
  }

  let attrsString = Object.entries(attrs).map(([k, v]) => {
    const valString: string = Array.isArray(v) ? v.join(" ") : v as string;
    return `${kebabCase(k)}${valString ? `="${valString}"` : ''}` // TODO: Do I need to escape "'s here?
  }).filter(a => a !== null).join(' ');

  return `<${tag}${attrsString ? ` ${attrsString}` : ''}>${
    children.map(renderToText).join("")
  }</${tag}>`;
};
