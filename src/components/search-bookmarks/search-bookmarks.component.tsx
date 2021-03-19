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
    <div className="bookmark-component__search-todo">
      <input
        type="text"
        className="bookmark-component__search-todo__input"
        placeholder="Search Todos"
        id="search-todos"
        onChange={e => handleSearchChange(e)}
      />
    </div>
  )
}

export default SearchTodoComponent
