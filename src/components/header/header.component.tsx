import React from "react"
import "./header.styles.css"
import { Link } from "gatsby"

const HeaderComponent = () => {
  return (
    <nav className="bookmark-component__header">
      <div className="bookmark-component__container">
        <Link to="/" className="bookmark-component__header-brand">
          Bookmark Site
        </Link>
        <div className="bookmark-component__header-links">
          <Link to="/">Home</Link>
        </div>
      </div>
    </nav>
  )
}

export default HeaderComponent
