const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb"),
  q = faunadb.query
const dotenv = require("dotenv")
dotenv.config()
const cuid = require("cuid")

const typeDefs = gql`
  type Query {
    getBookmarks: [Bookmarks!]
  }
  type Mutation {
    addBookmark(task: String!): Bookmarks
    deleteBookmark(refId: String!): Bookmarks
    updateBookmark(refId: String!, task: String!): Bookmarks
    updateStarred(refId: String!, starred: Boolean!): Bookmarks
  }
  type Bookmarks {
    refId: String!
    collectionName: String!
    id: String!
    task: String!
    starred: Boolean!
  }
`

const resolvers = {
  Query: {
    getBookmarks: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Map(
              q.Paginate(q.Match(q.Index("bookmarkId"))),
              q.Lambda(x => q.Get(x))
            )
          )
        )

        let bookmarkArr = []
        JSON.parse(result).data.forEach(element => {
          bookmarkArr = [
            ...bookmarkArr,
            {
              refId: element.ref["@ref"].id,
              collectionName: element.ref["@ref"].collection["@ref"].id,
              id: element.data.id,
              task: element.data.task,
              starred: element.data.starred,
            },
          ]
        })

        return bookmarkArr
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { task }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Create(q.Collection("bookmarkApp"), {
              data: {
                id: cuid(),
                task: task,
                starred: false,
              },
            })
          )
        )

        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes.ref["@ref"].id,
          collectionName: parsedRes.ref["@ref"].collection["@ref"].id,
          id: parsedRes.data.id,
          task: parsedRes.data.task,
          starred: parsedRes.data.starred,
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteBookmark: async (_, { refId }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Delete(q.Ref(q.Collection("bookmarkApp"), refId))
          )
        )
        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes.ref["@ref"].id,
          collectionName: parsedRes.ref["@ref"].collection["@ref"].id,
          id: parsedRes.data.id,
          task: parsedRes.data.task,
          starred: parsedRes.data.starred,
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateBookmark: async (_, { refId, task }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Update(q.Ref(q.Collection("bookmarkApp"), refId), {
              data: { task: task },
            })
          )
        )
        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes.ref["@ref"].id,
          collectionName: parsedRes.ref["@ref"].collection["@ref"].id,
          id: parsedRes.data.id,
          task: parsedRes.data.task,
          starred: parsedRes.data.starred,
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateStarred: async (_, { refId, starred }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Update(q.Ref(q.Collection("bookmarkApp"), refId), {
              data: { starred: starred },
            })
          )
        )
        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes.ref["@ref"].id,
          collectionName: parsedRes.ref["@ref"].collection["@ref"].id,
          id: parsedRes.data.id,
          task: parsedRes.data.task,
          starred: parsedRes.data.starred,
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
