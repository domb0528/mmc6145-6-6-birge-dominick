import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {

    
     if (!req.session.user) {

      return res.status(401).json({ error: "User Not Found" })
    }

      // User info can be accessed with req.session
    // No user info on the session means the user is not logged in

    switch (req.method) {
      // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
      case 'POST':
        try {
          const addBook = JSON.parse(req.body)
          const addedBook = await db.book.add(req.session.user.id, addBook)
          
          
         
          if (addedBook === null) {
            req.session.destroy()
            return res.status(401).json({error: "User not found"})
          }

          return res.status(200).json(addBook)
        }

        catch (error) {
          console.log(error)
          return res.status(400).json({ error: error.message })
        }

      case 'DELETE':
        // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)

        try {
          const removeBook = JSON.parse(req.body)
          const removedBook = await db.book.remove(req.session.user.id, removeBook.id)

          if (removedBook === null) {
            req.session.destroy()
            return res.status(401).json({ error: "User Not Found" })
          }

          return res.status(200).json(removeBook)
        }
        catch (error) {

          return res.status(400).json({ error: error.message })
        }




      // TODO: Respond with 404 for all other requests
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)