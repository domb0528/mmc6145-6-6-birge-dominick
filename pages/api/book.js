import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {

    // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
    // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
    // TODO: Respond with 404 for all other requests
    // User info can be accessed with req.session
    // No user info on the session means the user is not logged in

    if (req.method === 'POST') {
      const addBook = JSON.parse(req.body);
      if (!req.session.user) {
        return res.status(401).end();
      }
      try {
        const addBook = await db.addBook.add(req.session.user.id, addBook);
        if (addBook) {
          return res.status(200).end();
        } else {
          req.session.destroy();
          return res.status(400).end();
      } 
    } catch (error) {
      return res.status(400).json({ error: error.message});
    }  
    } else if (req.method === 'DELETE') {

      const addBook =JSON.parse(req.body)
      if (!req.session.user) {
        return res.status(401).end();
      }
      try {
        const removed = await db.book.remove(req.session.user.id, book.id);
        if (removed) {
          return res.status(200).end();
        } else {
          req.session.destroy();
          return res.status(401).end();
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    } else {
  
      return res.status(404).end()
    }
  },
  sessionOptions
)