import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from 'Context/CartContext'

const CartWidget = ({ style }) => {

      const { totalQuantity } = useContext(CartContext)

      return (
            <div className={style.Cart}>
                  <div className={style.Cart__container}>
                        {totalQuantity() > 0 && <span className={style.span}>{totalQuantity()}</span>}
                        <FontAwesomeIcon icon={faCartShopping} />
                  </div>
            </div>
      )
}

export default CartWidget;