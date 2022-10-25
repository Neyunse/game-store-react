import Item from "Components/Item";
import { ProductStyle } from 'assets/scss'
import Categories from "Layout/_parts/categories"

const ItemList = ({ listProduct }) => {
      return (
            <div className={ProductStyle.productList}>
                  <Categories />

                  <div className={ProductStyle.container__items}>
                        {listProduct.map(item => <Item Style={ProductStyle} key={item.id} product={item} />)}
                  </div>
            </div>
      )
}

export default ItemList;