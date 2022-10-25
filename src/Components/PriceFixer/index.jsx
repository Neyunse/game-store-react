const __Discount = (sale, price) => {
      let discount = sale / 100;
      return price - (price * discount)
}

const PriceFormat = (amount) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
const Pricefixer = ({ Style, product }) => {

      return (
            <>
                  {product.details.onSale ? (
                        <>
                              <span className={Style.saleOldText}>{PriceFormat(product.details.price)}</span>
                              <span className={Style.saleText}>{PriceFormat(__Discount(product.details.sale, product.details.price))}</span>

                        </>
                  ) : <span className={Style.price}>{PriceFormat(product.details.price)}</span>}
            </>
      )
}


export default Pricefixer
export {
      __Discount,
      PriceFormat
}
