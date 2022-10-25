import { useContext } from 'react';
import { CartStyle } from "assets/scss"
import { CartContext } from 'Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Pricefixer from 'Components/PriceFixer';

const CartItem = (props) => {
      const { data } = props
      const { removeProduct } = useContext(CartContext)
      return (
            <article className={CartStyle.cart__productItem}>
                  <div className={CartStyle.item__product__container}>
                        <div className={CartStyle.item__product__left}>
                              <div className={CartStyle.item__product__left__image}>
                                    <img src={data.details.images.banner} alt={data.details.title} />
                              </div>
                              <div className={CartStyle.item__product__left__title}>
                                    <span>{data.details.title}</span>
                              </div>
                        </div>
                        <div className={CartStyle.item__product__r}>
                              <span><b>Quantity</b></span>
                              {data.quantity}
                        </div>
                        <div className={CartStyle.item__product__r}>
                              <span><b>Price</b></span>
                              <div>
                                    <Pricefixer Style={CartStyle} product={data} />
                              </div>
                        </div>
                        <div className={CartStyle.item__product__remove} onClick={() => removeProduct(data.id)}>
                              <FontAwesomeIcon icon={faTrash} />
                        </div>
                  </div>

            </article>
      )
}

export default CartItem