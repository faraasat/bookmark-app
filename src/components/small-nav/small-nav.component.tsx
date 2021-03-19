import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import AddBookmarkComponent from "../add-bookmark/add-bookmark.component"
// import SearchTodoComponent from "../search-todo/search-todo.component"
import "./small-nav.styles.css"

const SmallNavComponent = () => {
  return (
    <div className={"bookmark-component__small-nav"}>
      <AppBar position="static">
        <Toolbar className="bookmark-component__alignment">
          {/* <SearchTodoComponent /> */}
          <AddBookmarkComponent />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default SmallNavComponent
