import { useEffect, useContext, useState } from "react";
import { db } from 'Api/util/firebase';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { UserContext } from 'Context/UserContext';
import { CartStyle } from "assets/scss"
import Moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner'
import { toast } from 'react-toastify';
const Mypurchases = () => {
      const [data, setData] = useState([])
      const { userData, isLoggedIn } = useContext(UserContext)
      const [loading, setLoading] = useState(true);
      const Navigate = useNavigate()



      useEffect(() => {
            const getPurchases = async () => {
                  try {
                        const productsData = collection(db, "purchases");
                        getDocs(query(productsData, orderBy("date", "desc"), where("uid", "==", userData.uid))).then((data) => {
                              const list = data.docs.map((product) => {
                                    return {
                                          ...product.data(),
                                          id: product.id,
                                    }
                              })
                              setData(list);
                        }).finally(() => {
                              setLoading(false);
                        })
                  } catch (error) {
                        toast.error(error.message)
                  }
            }
            if (isLoggedIn) {
                  getPurchases()
            } else {
                  Navigate("/")
            }

      }, [userData, Navigate, isLoggedIn])

      if (loading) {
            return (
                  <div style={style.load}>
                        <MagnifyingGlass
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="MagnifyingGlass-loading"
                              wrapperStyle={{}}
                              wrapperClass="MagnifyingGlass-wrapper"
                              glassColor='#c0efff'
                              color='#e15b64'
                        />
                  </div>
            )
      }

      return (
            <>

                  {!data.length > 0 ? (
                        <div className="kg__container kg-expanded h-min100">
                              <div className={CartStyle.cart__container}>
                                    <div className={CartStyle.AletCart}>
                                          <div className={CartStyle.AletCart__body}>
                                                <h2>Oops</h2>
                                                <p>You don't has any products here, buy someting...</p>
                                          </div>
                                          <div>
                                                <Link className="kg__button kg-no__decoration kg-primary kg-100" to="/">Return to the home</Link>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  ) : (
                        <div className="kg__container kg-expanded h-min100">
                              <div className={CartStyle.cart__container}>
                                    <div className={CartStyle.cart__productList}>
                                          {data.map((purchase, id) => (
                                                <div key={id} className={CartStyle.cart__productItem__contentContainer}>
                                                      <h2>{Moment(purchase.date).format('D/M/Y H:mma')} - Order id: {purchase.id}</h2>
                                                      {purchase.items.map((product, id) => (
                                                            <article key={id} className={CartStyle.cart__productItem}>
                                                                  <div className={CartStyle.item__product__container}>
                                                                        <div className={CartStyle.item__product__left}>
                                                                              <div className={CartStyle.item__product__left__image}>
                                                                                    <img src={product.details.images.banner} alt={product.details.title} />
                                                                              </div>
                                                                              <div className={CartStyle.item__product__left__title}>
                                                                                    <span>{product.details.title}</span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </article>
                                                      ))}
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  )}
            </>
      )
}

const style = {
      load: {
            width: '100%',
            height: '100%',
            display: "flex",
            justifyContent: 'center',
            minHeight: "100vh"
      }
}
export default Mypurchases