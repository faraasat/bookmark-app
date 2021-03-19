import React, { useEffect, useState } from "react"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import DeleteIcon from "@material-ui/icons/Delete"
import UpdateIcon from "@material-ui/icons/Update"
import { useDispatch } from "react-redux"
import UpdateBookmarkComponent from "../update-bookmark/update-bookmark.component"
import {
  deleteBookmark as deleteMyBookmark,
  refreshComponent,
  pinBookmark,
} from "../../store/bookmark.slice"
import "./bookmark-stick.styles.css"
import { gql } from "graphql-tag"
import { useMutation, useQuery } from "@apollo/client"

const DELETE_TODO = gql`
  mutation deleteBookmark($refId: String!) {
    deleteBookmark(refId: $refId) {
      id
      refId
      collectionName
      task
      task
    }
  }
`

const STARRED_TODO = gql`
  mutation updateStarred($refId: String!, $starred: Boolean!) {
    updateStarred(refId: $refId, starred: $starred) {
      id
      refId
      collectionName
      task
      task
    }
  }
`

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

const BookmarkStickComponent = ({ refObj }) => {
  const [changeBookmarkData, setChangeBookmarkData] = useState<any>()
  const [changeStarredData, setChangeStarredData] = useState<any>()
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [deleteBookmark] = useMutation(DELETE_TODO)
  const [updateStarred] = useMutation(STARRED_TODO)
  const { refetch } = useQuery(GET_DATA)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshComponent(changeBookmarkData))
    dispatch(refreshComponent(changeStarredData))
  }, [changeBookmarkData, changeStarredData])

  const handleBookmarkDelete = async () => {
    dispatch(deleteMyBookmark(refObj.refId))
    try {
      const res = deleteBookmark({
        variables: {
          refId: refObj.refId,
          refetchQueries: [{ query: GET_DATA }],
        },
      })
      res.then(data => {
        setChangeBookmarkData(data.data)
        refetch()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleStarredUpdate = async value => {
    try {
      dispatch(pinBookmark(refObj.id))
      const res = updateStarred({
        variables: {
          refId: refObj.refId,
          starred: value,
          refetchQueries: [{ query: GET_DATA }],
        },
      })
      res.then(data => {
        setChangeStarredData(data.data)
        refetch()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleBookmarkUpdate = () => {
    setOpenDetail(true)
  }

  return (
    <>
      <div className="bookmark-component__bookmark-stick">
        <div className="bookmark-component__bookmark-stick__content">
          <span className="bookmark-component__bookmark-stick__content-star">
            {refObj.starred ? (
              <StarIcon
                onClick={() => handleStarredUpdate(false)}
                style={{ color: "#7a9dff" }}
              />
            ) : (
              <StarBorderIcon
                onClick={() => handleStarredUpdate(true)}
                style={{ color: "#ff7ad3" }}
              />
            )}
          </span>
          <span className="bookmark-component__bookmark-stick__content-task">
            {refObj.task}
          </span>
          <div className="bookmark-component__bookmark-stick__content-icons">
            <span
              className="bookmark-component__bookmark-stick__content-delete"
              title="Delete"
              onClick={() => {
                handleBookmarkDelete()
              }}
            >
              {<DeleteIcon />}
            </span>
            <span
              className="bookmark-component__bookmark-stick__content-update"
              title="Update"
              onClick={() => {
                handleBookmarkUpdate()
              }}
            >
              {<UpdateIcon />}
            </span>
          </div>
        </div>
      </div>
      <UpdateBookmarkComponent
        prev={refObj.task}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        refObj={refObj}
      />
    </>
  )
}

export default BookmarkStickComponent
