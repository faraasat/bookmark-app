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
import "./add-bookmark.styles.css"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { refreshComponent } from "../../store/bookmark.slice"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import { gql } from "graphql-tag"
import { useMutation, useQuery } from "@apollo/client"

const ADD_TODO = gql`
  mutation addBookmark($task: String!) {
    addBookmark(task: $task) {
      refId
      collectionName
      id
      task
      starred
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

const AddBookmarkComponent = () => {
  const [open, setOpen] = React.useState(false)
  const [addBookmarkData, setAddBookmarkData] = useState<any>()
  const dispatch = useDispatch()
  const [addBookmark] = useMutation(ADD_TODO)
  const { refetch } = useQuery(GET_DATA)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(refreshComponent(addBookmarkData))
  }, [addBookmarkData])

  const addMyBookmark = async (values: any) => {
    try {
      const res = addBookmark({
        variables: {
          task: values,
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
    initialValues: { bookmark: "" },
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
      addMyBookmark(values.bookmark)
      setSubmitting(false)
      resetForm()
      setOpen(false)
    },
  })

  return (
    <div className="bookmark-component__add-bookmark">
      <button
        className="bookmark-component__add-bookmark__btn"
        onClick={handleClickOpen}
      >
        <BookmarkIcon />
        &nbsp;Add Bookmark
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a Bookmark</DialogTitle>
          <DialogContent className="bookmark-component__add-bookmark__dialog-content">
            <DialogContentText>
              Write the name of bookmark and click Add Bookmark to list your bookmark so
              that you can remember What <b>Bookmark</b>?
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
              &nbsp;Add Bookmark
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AddBookmarkComponent
