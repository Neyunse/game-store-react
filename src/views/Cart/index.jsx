import { useContext } from 'react';
import { CartStyle } from "assets/scss"
import { Link } from 'react-router-dom';
import { Button } from '@kagarisoft/csc-react';
import { CartContext } from 'Context/CartContext';
import { UserContext } from 'Context/UserContext';
import CartItem from 'Components/CartItem';
import { db } from 'Api/util/firebase';
import { collection, addDoc } from "firebase/firestore";
import { PriceFormat } from "Components/PriceFixer"
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { toast } from 'react-toastify';

const Cart = () => {
      const { cart, totalPrice, clearCart } = useContext(CartContext)

      const { userData, isLoggedIn, exitAndLogin } = useContext(UserContext)

      /**
       * When the user clicks the 'Purchase' button, the function will add a document to the
       * 'purchases' collection in the database, with the buyer's information, the items in the cart,
       * the date, and the total price.
       */
      const finishPurchase = () => {
            const PurchaseCollection = collection(db, "purchases")
            const localDate = new Date().toISOString()
            addDoc(PurchaseCollection, {
                  uid: userData.uid,
                  buyer: {
                        name: userData.displayName,
                        email: userData.email
                  },
                  items: cart,
                  date: localDate,
                  total: PriceFormat(totalPrice()).split('$')[1],
            }).then((r) => {
                  toast.success("Your purchase has been successfully completed.")
                  clearCart();
            }).catch((err) => {
                  toast.error(err.message)
            });
      }

      if (!cart.length > 0) {
            return (
                  <div className="kg__container kg-expanded h-min100">

                        <div className={CartStyle.cart__container}>

                              <div className={CartStyle.AletCart}>
                                    <div className={CartStyle.AletCart__body}>
                                          <h2>Oops</h2>
                                          <p>You don't has any product here, add someting... This cart is alone and are criying</p>
                                    </div>
                                    <div>
                                          <Link className="kg__button kg-no__decoration kg-primary kg-100" to="/">Return to the home</Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }

      return (
            <div className="kg__container kg-expanded h-min100">

                  <div className={CartStyle.cart__container}>
                        <div className={CartStyle.cart__productList}>
                              {cart.map((product, id) => <CartItem key={id} data={product} />)}
                        </div>
                        <div className={CartStyle.cart__end}>
                              <div className={CartStyle.end__container}>
                                    <h2>Cart</h2>
                                    <div>
                                          <span><b>Total:</b>{PriceFormat(totalPrice())}</span>
                                    </div>
                              </div>
                              <Button label="Clear cart" styleArg="danger" width={100} onClickButton={clearCart} />
                              {isLoggedIn ? <Button label="Finish Purchase" styleArg="danger" width={100} onClickButton={finishPurchase} /> : <Button icon={faGithubAlt} label="Log in with github" width={100} onClickButton={exitAndLogin} />
                              }

                        </div>
                  </div>
            </div>
      )
}
export default Cart