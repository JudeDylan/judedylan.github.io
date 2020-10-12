module.exports = {
  plugins: {
    "@fullhuman/postcss-purgecss": {
      content: ["./layouts/**/*.html", "./assets/*.js"],
      whitelist: [
        "highlight",
        "language-bash",
        "pre",
        "video",
        "code",
        "content",
        "h3",
        "h4",
        "ul",
        "li",
        "iframe",
        "img",
        "blockquote"
      ],
      whitelistPatterns: [/fancybox/]
    },
    autoprefixer: {},
    cssnano: { preset: "default" }
  }
};
