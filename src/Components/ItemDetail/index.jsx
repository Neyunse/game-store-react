import { useState, useContext, useEffect } from 'react';
import { ProductDetail, Counter } from 'assets/scss'
import { Button } from '@kagarisoft/csc-react';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import Pricefixer from 'Components/PriceFixer';
import YouTube from 'react-youtube';
import ItemCount from 'Components/ItemCount';
import { Link } from 'react-router-dom'
import { CartContext } from 'Context/CartContext';
import { BookMarks } from 'Context/BookMarksContext'
import 'assets/css/bodyFix.css'
const ItemDetail = ({ data }) => {

      const [isOnCart, setIsOnCart] = useState(false);
      const [isOnBookMark, setBookMark] = useState(false);
      const [banner, setBanner] = useState();
      const [videoSettings, setVideoSettings] = useState({})

      const { addCart } = useContext(CartContext)
      const { isInBookMarks, addBookMark, unSaveProduct } = useContext(BookMarks)


      useEffect(() => {
            setBookMark(isInBookMarks(data.id))

            setVideoSettings({
                  playerVars: {
                        height: "auto",
                        autoplay: 1,
                        loop: 1,
                  },
            })

      }, [data, isInBookMarks, banner])

      const _onReady = (event) => {
            event.target.pauseVideo();
      }

      /**
       * When the user clicks the add to cart button, the function will set the state of the button to
       * true, and then add the item to the cart.
       */
      const onAddCallback = (quantity) => {
            setIsOnCart(true);
            addCart(data, quantity)
      }

      /**
       * When the user clicks on a button, update the banner image.
       */
      const updateBanner = (url) => {
            setBanner(url)
      }

      return (
            <>
                  <div className={ProductDetail.header__top}>

                        {data.details.onSale ? (
                              <div className={ProductDetail.header__sale}>
                                    <h3 >{data.details.sale} % OFF</h3>
                              </div>
                        ) : null}

                        <div className={ProductDetail.header__cover}>
                              <div className={ProductDetail.img__container}>
                                    <img className={ProductDetail.img} src={banner ? banner : data.details.images.banner} alt={data.details.title} />
                              </div>
                              <div className={ProductDetail.mask}></div>
                        </div>
                        <div className={ProductDetail.buttonAndDetails}>

                              <Pricefixer Style={ProductDetail} product={data} />

                              <div className={ProductDetail.flexButtons} >
                                    {isOnBookMark ? <Button icon={faHeartBroken} onClickButton={() => {
                                          unSaveProduct(data.id)
                                    }} /> : <Button icon={faHeart} styleArg="danger" onClickButton={() => {
                                          addBookMark(data)
                                    }} />}

                              </div>
                        </div>
                  </div>
                  <div className={ProductDetail.screenshots}>
                        {data.details.media.screenshots.map((screenshot, index) => (
                              <div key={index} onClick={() => updateBanner(screenshot)}>
                                    <img src={screenshot} alt={data.details.title} />
                              </div>
                        ))}
                  </div>

                  <div className={`kg__container ${ProductDetail.Container}`}>
                        <div className={ProductDetail.Container__video}>
                              <div>
                                    <div>
                                          <YouTube className={ProductDetail.videoPlayer} videoId={data.details.media.videoID} opts={videoSettings} onReady={_onReady} />
                                    </div>
                                    <div className={ProductDetail.desc}>
                                          <h4>About This Game</h4>
                                          <p>{data.details.description.about}</p>
                                          {data.details.description.story && (
                                                <>
                                                      <p><b>STORY</b></p>
                                                      <p>{data.details.description.story}</p>
                                                </>
                                          )}
                                    </div>
                              </div>
                              <div>
                                    <img className={ProductDetail.img__left} src={data.details.images.banner} alt={data.details.title} />
                                    <span className={ProductDetail.short__desc}>{data.details.description.short}</span>
                                    <br /><br />

                                    <div className={Counter.e_content__container}>
                                          {isOnCart ? <Link className='kg__button kg-no__decoration kg-primary kg-100' to="/cart">End Purchase</Link> : <ItemCount style={Counter} stock={data.stock} initial={data.initial} onAdd={onAddCallback} />}
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default ItemDetail;