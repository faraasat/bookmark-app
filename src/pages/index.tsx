import * as React from "react"
import Layout from "../components/layout/layout.component"
import SEO from "../components/seo"
import "./index.styles.css"
import SmallNavComponent from "../components/small-nav/small-nav.component"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Index Page" />
      <div className="bookmark-page__index">
        <SmallNavComponent />
      </div>
    </Layout>
  )
}

export default IndexPage
