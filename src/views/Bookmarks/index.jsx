import { useContext, useState } from 'react';
import { CartStyle } from "assets/scss"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@kagarisoft/csc-react';
import { CartContext } from 'Context/CartContext';
import { BookMarks } from 'Context/BookMarksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Counter } from 'assets/scss'
import ItemCount from 'Components/ItemCount';
const Bookmarks = () => {
      const { bookMarks, clearBookMarks, unSaveProduct } = useContext(BookMarks)
      const { addCart } = useContext(CartContext)
      const [productData, setProductData] = useState()
      const Navigate = useNavigate()
      if (!bookMarks.length > 0) {
            return (
                  <div className="kg__container kg-expanded h-min100">

                        <div className={CartStyle.cart__container}>

                              <div className={CartStyle.AletCart}>
                                    <div className={CartStyle.AletCart__body}>
                                          <h2>Oops</h2>
                                          <p>You don't has any product here, add someting...</p>
                                    </div>
                                    <div>
                                          <Link className="kg__button kg-no__decoration kg-primary kg-100" to="/">Return to the home</Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }

      const addBookMarkToCart = (product) => {
            setProductData(product)
      }

      const onAddCallback = (quantity) => {
            addCart(productData, quantity)
            unSaveProduct(productData.id)
            setProductData()
            Navigate("/cart")
      }


      return (
            <>
                  <div className="kg__container kg-expanded h-min100">
                        <div className={CartStyle.cart__container}>
                              <div className={CartStyle.cart__productList}>
                                    {bookMarks.map((product, id) => (
                                          <article key={id} className={CartStyle.cart__productItem}>
                                                <div className={`${CartStyle.item__product__container} ${CartStyle.item__product__container_Bookmarks}`}>
                                                      <div className={CartStyle.item__product__left}>
                                                            <div className={CartStyle.item__product__left__image}>
                                                                  <img src={product.details.images.banner} alt={product.details.title} />
                                                            </div>
                                                            <div className={CartStyle.item__product__left__title}>
                                                                  <span>{product.details.title}</span>
                                                            </div>
                                                      </div>
                                                      <div className={CartStyle.item__product__addCart} onClick={() => addBookMarkToCart(product)}>
                                                            <FontAwesomeIcon icon={faShoppingCart} />
                                                      </div>
                                                      <div className={CartStyle.item__product__remove} onClick={() => unSaveProduct(product.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                      </div>
                                                </div>

                                          </article>
                                    ))}
                              </div>
                              <div className={CartStyle.cart__end}>
                                    <div className={CartStyle.end__container}>
                                          <h2>BookMarks</h2>
                                    </div>
                                    <Button label="Clear BookMarks" styleArg="danger" width={100} onClickButton={clearBookMarks} />
                              </div>
                        </div>

                  </div>
                  {productData && (
                        <div className='addModal'>
                              <div className='addModal__container'>
                                    <img src={productData.details.images.banner} alt="" />
                                    <div className='addModal__container__modal'>
                                          <div className={Counter.e_content__container}>
                                                <ItemCount style={Counter} stock={productData.stock} initial={productData.initial} onAdd={onAddCallback} />
                                          </div>

                                    </div>
                              </div>
                              <div className='addModal__mask'></div>
                        </div>
                  )}
            </>
      )
}
export default Bookmarks