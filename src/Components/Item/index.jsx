import { Link } from "react-router-dom";
import Pricefixer from "Components/PriceFixer";
const Item = ({ Style, product }) => {
      return (
            <>
                  <Link className={Style.itemLink} to={`/product/${product.id}/${product.details.slug}`}>
                        <div className={Style.card}>
                              <div className={Style.image_container}>
                                    <img className={Style.image} src={product.details.images.cover} alt={product.details.title} />
                              </div>
                              <div>
                                    <h3>{product.details.title}</h3>
                                    <Pricefixer Style={Style} product={product} />

                              </div>
                        </div>
                  </Link>
            </>
      )
}

export default Item;