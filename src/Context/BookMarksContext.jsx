import { useState, createContext, useEffect } from "react"
import { toast } from 'react-toastify';

export const BookMarks = createContext()

const BookMarksProvider = ({ children }) => {
      const [bookMarks, setBookMark] = useState([])

      /* Checking if the localStorage is not null, if it is not null, it will set the bookMarks to the
      localStorage. */
      useEffect(() => {
            if (localStorage.getItem("BookMarks") !== null) {
                  setBookMark(JSON.parse(localStorage.getItem("BookMarks")))
            }
      }, [])

      /**
       * The function addBookMark takes an item as an argument and then adds it to the bookMarks array.
       */
      const addBookMark = (item) => {

            toast.success("The product has been saved in your BookMarks.")
            const saveProduct = [...bookMarks, item]
            localStorage.setItem("BookMarks", JSON.stringify(saveProduct))
            setBookMark(saveProduct)
      }

      /**
       * If the product is in the BookMarks, remove it from the BookMarks and update the state.
       */
      const unSaveProduct = (id) => {
            toast.success("The product has been removed from your BookMarks.")
            if (localStorage.getItem("BookMarks") !== null) {
                  const local = JSON.parse(localStorage.getItem("BookMarks"))
                  localStorage.setItem("BookMarks", JSON.stringify(local.filter(product => product.id !== id)))
            }
            setBookMark(bookMarks.filter(product => product.id !== id))
      }

      /**
       * It takes an id as an argument and returns true if the id is found in the bookMarks array
       */
      const isInBookMarks = (id) => bookMarks.find(product => product.id === id)

      /**
       * When the user clicks the clear button, the bookmarks are cleared and the local storage is
       * cleared.
       */
      const clearBookMarks = () => {
            toast.success("All products has been removed from your BookMarks.")
            setBookMark([])
            localStorage.removeItem("cart")
      }

      return (
            <BookMarks.Provider value={{
                  bookMarks,
                  addBookMark,
                  unSaveProduct,
                  isInBookMarks,
                  clearBookMarks
            }}>
                  {children}
            </BookMarks.Provider>
      )
}
export default BookMarksProvider