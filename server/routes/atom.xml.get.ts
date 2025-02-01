import { Feed } from 'feed';

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

    const articles = await queryCollection(event, 'posts').where('path', '<>', '/posts').all();

    for (const article of articles) {
      feed.addItem({
        content: article.body ? renderBodyToHtml(article.body as unknown as Body) : "",
        title: article.title ? article.title : "Missing Title",
        id: `${baseUrl}${article.path}/`,
        link: `${baseUrl}${article.path}/`,
        description: article.description,
        author: AUTHORS,
        date: article.updated ? new Date(article.updated) : new Date(article.created),
        published: new Date(article.created),
      });
    };

    setResponseHeader(event, 'Content-Type', 'text/xml');

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

  // in the footnote in the article, link using
  const footnoteAnchor = tag === "a"
    && Object.keys(attrs).includes("dataFootnoteRef")
    && Object.keys(attrs).includes("href");
  if (footnoteAnchor) {
    attrs.href = (attrs.href as string).replace('#user-content-fn-', '#fn:');
  }

  const footnoteLi = tag === "li"
    && Object.keys(attrs).includes("id")
    && (attrs.id as string).startsWith('user-content-fn-')
  if (footnoteLi) {
    attrs.id = attrs.id.replace('user-content-fn-', 'fn:')
  }

  // in the backlink IN the footnote, link to #fnref:
  const footnoteAnchorBacklink = tag === "a"
    && Object.keys(attrs).includes("dataFootnoteBackref")
    && Object.keys(attrs).includes("href");
  if (footnoteAnchorBacklink) {
    attrs.href = (attrs.href as string).replace('#user-content-fnref-', '#fnref:');
  }

  const footnoteSup = tag === "sup"
    && Object.keys(children[0][1]).includes("dataFootnoteRef")
    && Object.keys(children[0][1]).includes("id");
  if (footnoteSup) {
    attrs.id = ((children[0][1] as any).id as string).replace('user-content-fnref-', 'fnref:');
  }

  const footnoteList = tag === "ol"
    && ((children[0][1] as any).id as string)?.startsWith('user-content-fn-')
  if (footnoteList) {
    attrs.class = "footnotes";
  }

  let attrsString = Object.entries(attrs).map(([k, v]) => {
    if (footnoteAnchor && k === 'id') return null;
    const valString: string = Array.isArray(v) ? v.join(" ") : v as string;
    return `${k}="${valString}"` // TODO: Do I need to escape "'s here?
  }).filter(a => a !== null).join(' ')

  if (footnoteAnchor) {
    attrsString += ' rel="footnote"';
  }

  return `<${tag} ${attrsString}>${
    children.map(renderToText).join("")
  }</${tag}>`;
};
