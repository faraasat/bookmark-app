import * as React from "react"
import Layout from "../components/layout/layout.component"
import SEO from "../components/seo"
import "./index.styles.css"
import SmallNavComponent from "../components/small-nav/small-nav.component"
import BookmarkListComponent from "../components/bookmark-list/bookmark-list.component"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Index Page" />
      <div className="bookmark-page__index">
        <SmallNavComponent />
        <div className="bookmark-page__index__bookmarks-list">
        <BookmarkListComponent />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
