import Layout from 'Layout'
import {
      BrowserRouter,
      Routes,
      Route,
} from "react-router-dom";

import ItemListContainer from 'Components/ItemListContainer'
import ItemDetailContainer from 'Components/ItemDetailContainer'
import Bookmarks from 'views/Bookmarks';
import Cart from 'views/Cart';
import NotFoundError from 'views/404';
import Mypurchases from 'views/Mypurchases';
const RouteComponent = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Layout />}>
                              <Route index element={<ItemListContainer greeting="The images and operation of this site are for demonstration purposes only, all material belongs to their respective authors and no copyright infringement is intended." />} />
                              <Route path='category/:c' element={<ItemListContainer />} />
                              <Route path='product/:gid/:slug' element={<ItemDetailContainer />} />

                              <Route path='bookmarks' element={<Bookmarks />} />

                              <Route path='cart' element={<Cart />} />
                              <Route path='my-purchase' element={<Mypurchases />} />

                              <Route path='*' element={<NotFoundError />} />
                        </Route>
                  </Routes>
            </BrowserRouter>
      )
}

export default RouteComponent;