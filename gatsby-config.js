module.exports = {
  siteMetadata: {
    title: `Gatsby Bookmark App`,
    description: `This is a bookmark app developed using Gatsby, FaunaDB and Netlify.`,
    author: `@farasat`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.gif`, // This path is relative to the root of the site.
      },
    },
  ],
}
