import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import { ApolloProvider } from "@apollo/client"
import { Provider } from "react-redux"
import { BookmarkSliceReducer } from "./store/bookmark.slice"
import { client } from "./apollo/client"

const store = configureStore({
  reducer: {
    bookmarkReducer: BookmarkSliceReducer,
  },
})

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{element}</Provider>
    </ApolloProvider>
  )
}
