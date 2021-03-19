import React from "react"
import "./search-bookmarks.styles.css"
import { searchBookmarks } from "../../store/bookmark.slice"
import { useDispatch } from "react-redux"

const SearchTodoComponent = () => {
  const dispatch = useDispatch()
  const handleSearchChange = (event: any) => {
    dispatch(searchBookmarks(event.target.value))
  }

  return (
    <div className="bookmark-component__search-bookmark">
      <input
        type="text"
        className="bookmark-component__search-bookmark__input"
        placeholder="Search Bookmarks"
        id="search-bookmarks"
        onChange={e => handleSearchChange(e)}
      />
    </div>
  )
}

export default SearchTodoComponent
