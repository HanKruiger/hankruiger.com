[![Build Status](https://travis-ci.org/HanKruiger/hankruiger.github.io.svg?branch=develop)](https://travis-ci.org/HanKruiger/hankruiger.github.io)

# My Personal Website

The `content` folder contains most of the content, in Markdown format.

## How to test/build?

Testing and building requires [`zola`](https://www.getzola.org).

To test the website locally:
```
zola serve
```

To build the website locally:
```
zola build
```

## How is it deployed?

Travis CI is set up to build the website and push it to the `master` branch.
GitHub Pages makes sure that the contents of the `master` branch are deployed to my domain.
