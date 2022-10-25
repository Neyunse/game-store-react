import React, { useState, useEffect } from "react"
import ItemList from "Components/ItemList"
import { useParams } from "react-router-dom"
import ItemLoader from "Components/skeleton"
import { ProductStyle } from 'assets/scss'
import { db } from "Api/util/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
const ItemListContainer = ({ greeting }) => {
      const { c } = useParams();
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {

            /* A function that is getting the data from the firebase database. */
            const productsData = collection(db, "products");
            getDocs(c ? query(productsData, where('category', "==", c)) : productsData).then((data) => {
                  const list = data.docs.map((product) => {
                        return {
                              ...product.data(),
                              id: product.id,
                        }
                  })
                  setProducts(list);

            }).finally(() => {
                  setLoading(false);
            })

      }, [c]);


      return (
            <>
                  <div className="kg__container kg-expanded">
                        {greeting && (
                              <div className="kg__alert kg-danger" role="alert">
                                    <p className="kg__text kg-p__0 kg-m__0">
                                          {greeting}
                                    </p>
                              </div>
                        )}
                  </div>
                  <br />
                  {!loading ? <ItemList listProduct={products} /> : (
                        <div className={ProductStyle.productList}>


                              <div className={ProductStyle.container__items}>
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />

                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                              </div>
                        </div>
                  )}

            </>
      )
}

export default ItemListContainer;