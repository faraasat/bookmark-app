import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CancelIcon from "@material-ui/icons/Cancel"
import "./update-bookmark.styles.css"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { refreshComponent } from "../../store/bookmark.slice"
import { gql } from "graphql-tag"
import { useMutation, useQuery } from "@apollo/client"

const UPDATE_TODO = gql`
  mutation updateBookmark($refId: String!, $task: String!) {
    updateBookmark(refId: $refId, task: $task) {
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

const UpdateBookmarkComponent = ({
  prev,
  openDetail,
  setOpenDetail,
  refObj,
}) => {
  const [addBookmarkData, setAddBookmarkData] = useState<any>()
  const [updateBookmark] = useMutation(UPDATE_TODO)
  const { refetch } = useQuery(GET_DATA)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenDetail(false)
  }

  useEffect(() => {
    dispatch(refreshComponent(addBookmarkData))
  }, [addBookmarkData])

  const addBookmark = async (values: any) => {
    if (prev === values.bookmark || prev === "" || prev.length <= 3) return
    try {
      const res = updateBookmark({
        variables: {
          refId: refObj.refId,
          task: values.bookmark,
          refetchQueries: [{ query: GET_DATA }],
        },
      })
      res.then(data => {
        setAddBookmarkData(data.data)
        refetch()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      bookmark: prev,
    },
    validate: (values: any) => {
      const errors = { bookmark: "" }
      if (!values.bookmark) {
        errors.bookmark = "Required"
        return errors
      } else if (values.bookmark.length >= 1 && values.bookmark.length <= 3) {
        errors.bookmark = "More Than 3 characters are required"
        return errors
      }
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      addBookmark(values)
      setSubmitting(false)
      resetForm()
      setOpenDetail(false)
    },
  })

  return (
    <div className="bookmark-component__update-bookmark">
      <Dialog
        open={openDetail}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Update a Bookmark</DialogTitle>
          <DialogContent className="bookmark-component__update-bookmark__dialog-content">
            <DialogContentText>
              Write the name of bookmark and click Update Bookmark to list your
              bookmark so that you can remember What <b>Bookmark</b>?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Your Bookmark"
              type="text"
              id="bookmark"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.bookmark}
              helperText={
                formik.errors.bookmark && formik.touched.bookmark
                  ? formik.errors.bookmark
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="bookmark-component__btn-cancel"
            >
              <CancelIcon />
              &nbsp;Cancel
            </Button>
            <button
              type="submit"
              className="bookmark-component__btn-add"
              disabled={formik.isSubmitting}
            >
              <AddCircleIcon />
              &nbsp;Update Bookmark
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default UpdateBookmarkComponent
