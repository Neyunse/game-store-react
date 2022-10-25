import React, { useState } from 'react'
import { Button } from '@kagarisoft/csc-react'
import 'assets/css/button.css'
const ItemCount = ({ style, stock, initial, onAdd }) => {

      const [count, setCount] = useState(initial)


      /**
       * _HandleIncrease() is a function that increases the count by 1 if the count is less than the
       * stock
       */
      const _HandleIncrease = () => count < stock && setCount(count + 1)
      /**
       * _HandleDecrease() is a function that decreases the count by 1 if the count is greater than the
       * initial value
       */
      const _HandleDecrease = () => count > initial && setCount(count - 1)



      /**
       * ReturnData is a function that returns the value of the onAdd function, which is a function
       * that returns the value of the count variable.
       */
      const ReturnData = () => {
            onAdd(count)
      }
      return (
            <>
                  <div className={style.e_bn__group}>
                        <div>
                              <Button label="-" customClass="e_ui__btn" onClickButton={_HandleDecrease} />

                        </div>
                        <div className={style.e_bn__center}>
                              <span> {count} </span>
                        </div>
                        <div>
                              <Button label="+" customClass="e_ui__btn" onClickButton={_HandleIncrease} />
                        </div>
                  </div>
                  <Button label="Add to cart" styleArg="danger" width={100} onClickButton={ReturnData} />
            </>

      )
}

export default ItemCount;