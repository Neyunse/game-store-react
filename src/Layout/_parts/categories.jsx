import { useState, useEffect } from "react";
import { Button } from '@kagarisoft/csc-react';
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { CategoriesStyle } from "assets/scss"
import { Link } from "react-router-dom";

import { db } from "Api/util/firebase"
import { collection, getDocs } from "firebase/firestore"


const Categories = () => {
      const [data, setData] = useState([]);
      const [showCategories, setShowcategories] = useState(false);

      useEffect(() => {

            const categoriesData = collection(db, "categories");
            getDocs(categoriesData).then((data) => {
                  const list = data.docs.map((category) => {
                        return {
                              ...category.data(),
                              id: category.id,
                        }
                  })
                  setData(list);

            })
      }, [])

      const showModal = () => {
            setShowcategories(!showCategories)

      }

      return (
            <>
                  <Button icon={faFilter} styleArg="danger" onClickButton={showModal} />
                  {showCategories && (
                        <div className={CategoriesStyle.category__modal__container}>
                              <div className={CategoriesStyle.category__modal}>
                                    <h3>Categories</h3>
                                    <ul>
                                          {data.map((categories, id) => <li key={id}><Link onClick={showModal} to={`/category/${categories.slug}`} >{categories.name}</Link></li>)}

                                    </ul>
                              </div>
                              <div className={CategoriesStyle.mask} onClick={showModal}></div>
                        </div>

                  )}
            </>
      )
}
export default Categories;