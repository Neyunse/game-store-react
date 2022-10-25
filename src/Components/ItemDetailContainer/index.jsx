import { useEffect, useState } from "react";
import ItemDetail from "Components/ItemDetail";
import { useParams } from "react-router-dom"
import { db } from "Api/util/firebase"
import { collection, getDoc, doc } from "firebase/firestore"
import { MagnifyingGlass } from 'react-loader-spinner'
const ItemDetailContainer = () => {
      const { gid, slug } = useParams()

      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
            /* Getting the data from the firebase database. */
            const productsData = collection(db, "products");
            const searchID = doc(productsData, gid)
            getDoc(searchID).then((result) => {
                  setData({
                        id: result.id,
                        ...result.data()
                  })
            }).finally(() => {
                  setLoading(false);
            })
      }, [gid, slug]);

      return (
            <>
                  {!loading ? <ItemDetail data={data} /> : (
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

export default ItemDetailContainer;