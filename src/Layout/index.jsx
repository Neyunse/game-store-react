import React from "react"
import Header from "./header"
import { Outlet } from "react-router-dom";
import { global, Footer } from "assets/scss"
import { ToastContainer } from 'react-toastify';
import '@kagarisoft/csc' // import my own css Framework
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/global.css'
const Main = () => {

      return (
            <>
                  <div className={`${global.body} fixBody`}>
                        <Header />
                        <Outlet />
                        <ToastContainer
                              position="top-center"
                              autoClose={5000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark"
                        />
                        <footer className={Footer.footer__container}>
                              <div className="kg__container">
                                    <p><small>The images and operation of this site are for demonstration purposes only, all material belongs to their respective authors and no copyright infringement is intended.</small></p>
                              </div>
                        </footer>
                  </div>
            </>
      )
}

export default Main