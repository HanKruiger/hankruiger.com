import { Feed } from 'feed';
import { kebabCase } from 'change-case';

const runtimeConfig = useRuntimeConfig();

const BLOG_LANGUAGE = "en";
const AUTHOR_NAME = "Han Kruiger";
const AUTHORS = [{ name: AUTHOR_NAME }];
const BLOG_TITLE = "Han's blog";

// this solution for getting a feed is based on https://cmpadden.github.io/articles/nuxt-content-rss-feed

export default defineEventHandler(async (event) => {
  const atomLink = `${runtimeConfig.baseUrl}/atom.xml`;

  const feed = new Feed({
    title: BLOG_TITLE,
    id: atomLink,
    link: runtimeConfig.baseUrl,
    language: BLOG_LANGUAGE,
    favicon: `${runtimeConfig.baseUrl}/favicon.jpg`,
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
      content: article.body ? renderBodyToHtml(article.body as unknown as MinimalBody) : "",
      title: article.title,
      id: `${runtimeConfig.baseUrl}${article.path}/`,
      link: `${runtimeConfig.baseUrl}${article.path}/`,
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

type MinimalBody = {
  type: 'minimal',
  value: ContentItem[],
}

const renderBodyToHtml = (body: MinimalBody): string => {
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

  let attrsString = Object.entries(attrs).map(([k, v]: [string, unknown]) => {
    let valString: string | undefined;
    if (typeof v === 'string') {
      valString = v;
    } else if (Array.isArray(v)) {
      valString = v.join(" ");
    } else if (typeof v === 'boolean') {
      // ignore so the attribute key is added as a flag
    } else if (typeof v === 'number') {
      valString = `${v}`;
    } else {
      throw new Error(`Unexpceted attribute value ${v}`);
    }

    // escape double quotes
    valString = valString?.replaceAll('"', '\\"');

    // TODO: Find out why this is necessary (do other attributes require this?)
    if (k === 'className') k = 'class';

    return `${kebabCase(k)}${valString ? `="${valString}"` : ''}`;
  }).join(' ');

  let innerContent: string;
  let attributes: string | undefined;

  if (tag === 'pre' && Object.keys(attrs).includes('code')) {
    // render the contents of a <pre> with the escaped text content
    // of what the "code" attribute contains.
    innerContent = attrs['code']
      .replaceAll("<", '&lt;')
      .replaceAll(">", '&gt;')
    // also, leave out the unnecessary attributes (which also broke things?)
    attributes = undefined;
  } else {
    innerContent = children.map(renderToText).join("");
    attributes = attrsString;
  }

  return `<${tag}${attributes ? ` ${attributes}` : ''}>${innerContent}</${tag}>`
};
