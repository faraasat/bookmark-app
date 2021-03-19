import React from "react"
import "./bookmark-stick-loading.styles.css"

const BookmarkStickLoadingComponent = () => {
  return (
    <div className="bookmark-component__stick-loading">
      <div className="bookmark-component__stick-loading_box"></div>
      <div className="bookmark-component__stick-loading_text">
        Please be patient! Loading your Bookmarks...
      </div>
      <div className="bookmark-component__stick-loading_box"></div>
      <div className="bookmark-component__stick-loading_box"></div>
    </div>
  )
}

export default BookmarkStickLoadingComponent
