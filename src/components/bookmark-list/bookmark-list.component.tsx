import React from "react"
import BookmarkStickLoadingComponent from "../bookmark-stick-loading/bookmark-stick-loading.component"
import BookmarkStickComponent from "../bookmark-stick/bookmark-stick.component"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import cuid from "cuid"
import "./bookmark-list.styles.css"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { getBookmarks, selectBookmarkData } from "../../store/bookmark.slice"

const GET_DATA = gql`
  query {
    getBookmarks {
      refId
      collectionName
      id
      task
      starred
    }
  }
`

const BookmarkListComponent = () => {
  const { data, loading, error } = useQuery(GET_DATA)
  let sortedBookmarks = { data: [] }
  const dispatch = useDispatch()
  const { bookmarkData, allBookmarks } = useSelector(selectBookmarkData)

  if (data && data !== allBookmarks) {
    dispatch(getBookmarks(data))
  }

  if (
    typeof data != "undefined" &&
    !loading &&
    bookmarkData.getBookmarks.length !== 0
  ) {
    sortedBookmarks = {
      data: [
        ...bookmarkData.getBookmarks.filter(bookmarkData => {
          return bookmarkData.starred === true
        }),
        ...bookmarkData.getBookmarks.filter(bookmarkData => {
          return bookmarkData.starred === false
        }),
      ],
    }
  }

  if (error) {
    console.log(error)
    return <div>Error</div>
  }

  return (
    <>
      {loading && typeof data == "undefined" ? (
        <>
          <BookmarkStickLoadingComponent key={cuid()} />
          <BookmarkStickLoadingComponent key={cuid()} />
          <BookmarkStickLoadingComponent key={cuid()} />
          <BookmarkStickLoadingComponent key={cuid()} />
        </>
      ) : typeof data != "undefined" && sortedBookmarks.data.length !== 0 ? (
        sortedBookmarks.data.map((bookmarkData: any) => {
          return <BookmarkStickComponent key={bookmarkData.id} refObj={bookmarkData} />
        })
      ) : (
        !loading &&
        typeof data != "undefined" && (
          <div className="crud-component__bookmark-list__nothing">
            <MoodBadIcon />
            Ooops! Nothing To show...
          </div>
        )
      )}
    </>
  )
}

export default BookmarkListComponent
