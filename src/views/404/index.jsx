import { CartStyle } from "assets/scss"
import { Link } from 'react-router-dom';

const NotFoundError = () => {
      return (
            <div className={CartStyle.cart__container}>
                  <div className={CartStyle.AletCart}>
                        <div className={CartStyle.AletCart__body}>
                              <h2>404</h2>
                              <p>There is nothing here</p>
                        </div>
                        <div>
                              <Link className="kg__button kg-no__decoration kg-primary kg-100" to="/">Return to the home</Link>
                        </div>
                  </div>
            </div>
      )
}

export default NotFoundError;