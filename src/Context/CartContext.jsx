import { useState, createContext, useEffect } from "react"
import { __Discount } from 'Components/PriceFixer';
import { toast } from 'react-toastify';

export const CartContext = createContext()

const CartProvider = ({ children }) => {
      const [cart, setCart] = useState([])

      /* Checking if the cart is empty or not. If it is not empty, it will set the cart to the local
      storage. */
      useEffect(() => {
            if (localStorage.getItem("cart") !== null) {
                  setCart(JSON.parse(localStorage.getItem("cart")))

            }
      }, [])

      /**
       * IsInCart returns true if the product with the given id is in the cart.
       */
      const isInCart = (id) => cart.find(product => product.id === id)

      /**
       * The function takes in an item and a quantity, and then updates the cart with the new quantity.
       * returns The updated cart.
       */
      const updateCart = (item, quantity) => {
            toast.success(`${item.details.title} quantity was updated.`)
            const updateCart = cart.map(product => {
                  if (product.id !== item.id) return product;
                  const UpdatedQuantity = product.quantity + quantity
                  return { ...product, quantity: UpdatedQuantity }
            })
            localStorage.setItem("cart", JSON.stringify(updateCart))
            return updateCart
      }

      /**
       * The new item has been added to the cart
       * returns The newProduct is being returned.
       */
      const newItem = (item, quantity) => {

            toast.success(`${item.details.title} was added to the cart.`)
            const product = { ...item, quantity: quantity }
            const newProduct = [...cart, product]
            localStorage.setItem("cart", JSON.stringify(newProduct))
            return newProduct
      }

      /**
       * If the item is in the cart, update the quantity. If the item is not in the cart, add it to the
       * cart.
       */
      const addCart = (item, quantity) => {
            if (isInCart(item.id)) setCart(updateCart(item, quantity))
            if (!isInCart(item.id)) setCart(newItem(item, quantity))
      }


      /**
       * The function removes a product from the cart and updates the local storage.
       */
      const removeProduct = (id) => {
            toast.success("The product has been removed from the cart.")
            if (localStorage.getItem("cart") !== null) {

                  let dataLocal = localStorage.getItem("cart")
                  let parseLocalData = JSON.parse(dataLocal)
                  const filterData = parseLocalData.filter(product => product.id !== id)

                  localStorage.setItem("cart", JSON.stringify(filterData))
            }
            setCart(cart.filter(product => product.id !== id))
      }

      /**
       * The function clears the cart by removing all items from the cart and removing the cart from
       * local storage.
       */
      const clearCart = () => {
            toast.info("All cart items have been removed from the cart.")
            setCart([])
            localStorage.removeItem("cart")
      }


      /**
       * If the product is on sale, return the total price of the product with the discount applied,
       * otherwise return the total price of the product without the discount applied.
       * @returns The total price of the cart.
       */
      const totalPrice = () => {
            return cart.reduce((total, product) => {
                  if (product.details.onSale) return total += (__Discount(product.details.sale, product.details.price) * product.quantity)
                  return total += (product.details.price * product.quantity)
            }, 0)
      }


      /**
       * TotalQuantity() is a function that returns the sum of the quantity of each product in the cart.
       */
      const totalQuantity = () => cart.reduce((total, product) => total += product.quantity, 0)

      return (
            <CartContext.Provider value={{ cart, addCart, removeProduct, clearCart, totalPrice, totalQuantity }}>
                  {children}
            </CartContext.Provider>
      )
}
export default CartProvider