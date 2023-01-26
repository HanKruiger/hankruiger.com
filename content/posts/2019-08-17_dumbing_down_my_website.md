+++
title = "Dumbing down my website"
description = "Post about my website, and how and why I dumbed it down"
+++

When you're reading this, my website has been updated to be more minimal, simple, and fast.

These days, many websites come with bandwidth-heavy stuff like custom fonts, bundled JavaScript, front-end UI frameworks, and more.

That's cool. But most web pages don't need that.

I have rebuilt my website from skratch using [Zola](https://www.getzola.org), a static site generator made with the [Rust programming language](https://www.rust-lang.org).
It allows me to have my content in [Markdown](https://daringfireball.net/projects/markdown/syntax) format in an easy to manage folder structure.
The Markdown (and some templates) are processed by Zola to build the content that is served over the World Wide Web<sup><a id="fnref:1" href="#fn:1">1</a></sup>.

I decided not to use any of the themes that come with Zola, and instead use my own simple themes and templates, to keep it even more minimalistic.

If you're interested, the source code of my website is public, and can be seen in [this repository](https://github.com/HanKruiger/hankruiger.com).

<div class="footnotes">
  <ol>
    <li id="fn:1">
      I use <a href="https://netlify.com/">Netlify</a> for this. It's free. For my domain name, I used <a href="https://hover.com/">Hover</a>, which is not free, but really easy to use.
      <a href="#fnref:1" class="reversefootnote">↩</a>
    </li>
  </ol>
</div>