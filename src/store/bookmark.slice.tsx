import { createSlice } from "@reduxjs/toolkit"

export const BookmarkSlice = createSlice({
  name: "bookmarkSlice",
  initialState: {
    bookmarks: { getBookmarks: [] },
    updateId: {},
    allBookmarks: { getBookmarks: [] },
  },
  reducers: {
    getBookmarks: (state, action) => {
      state.allBookmarks = action.payload
      if (
        state.bookmarks.getBookmarks.length === 0 ||
        state.allBookmarks.getBookmarks !== state.bookmarks.getBookmarks
      ) {
        state.bookmarks = action.payload
      }
    },
    searchBookmarks: (state, action) => {
      const abc = state.allBookmarks.getBookmarks.filter(da => {
        return da.task.toLowerCase().includes(action.payload.toLowerCase())
      })
      state.bookmarks = { getBookmarks: [...abc] }
    },
    refreshComponent: (state, action) => {
      state.updateId = action.payload
    },
    deleteBookmark: (state, action) => {
      const abc = state.allBookmarks.getBookmarks.filter(da => {
        return String(da.refId) !== String(action.payload)
      })
      state.bookmarks = { getBookmarks: [...abc] }
    },
    pinBookmark: (state, action) => {
      state.bookmarks = {
        getBookmarks: state.allBookmarks.getBookmarks.map(datum => {
          if (datum.id === action.payload) {
            var temp = Object.assign({}, datum)
            temp.starred = !temp.starred
            return temp
          }
          return datum
        }),
      }
    },
  },
})

export const {
  searchBookmarks,
  refreshComponent,
  deleteBookmark,
  pinBookmark,
  getBookmarks,
} = BookmarkSlice.actions
export const selectBookmarkData = (state: any) => ({
  bookmarkData: state.bookmarkReducer.bookmarks,
  allBookmarks: state.bookmarkReducer.allBookmarks,
  updateId: state.bookmarkReducer.updateId,
})
export const BookmarkSliceReducer = BookmarkSlice.reducer
