import { useState, createContext, useEffect } from "react"
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Github } from "Api/util/auth/authProviders";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';

export const UserContext = createContext()

const UserProvider = ({ children }) => {
      const [isLoggedIn, setIsLoggedIn] = useState(false)
      const [userData, setUserData] = useState([])


      /* Checking if the user is logged in and if the token is expired. */
      useEffect(() => {
            if (localStorage.getItem('LoginOnLoad') === "OK" || isLoggedIn) {
                  setIsLoggedIn(true)
                  setUserData(JSON.parse(localStorage.getItem('userData')))
                  if (userData.accessToken) {

                        const decodedToken = jwtDecode(userData.accessToken);
                        const currentDate = new Date();

                        // JWT exp is in seconds
                        if (decodedToken.exp * 1000 < currentDate.getTime()) {
                              toast.info("Login expired")

                              setIsLoggedIn(false)
                              setUserData([])
                              localStorage.removeItem('userData');
                              localStorage.removeItem('LoginOnLoad');
                        }
                  }
            }


      }, [userData.accessToken, isLoggedIn])




      /**
       * When the user clicks the logout button, sign them out of the app and then sign them into the
       * app again.
       */
      const exitAndLogin = () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                  handleLogin();
            }).catch((error) => {
                  toast.error(error.message)
            });
      }

      /**
       * When the user clicks the logout button, the user is signed out of the application and the
       * user's data is removed from the local storage.
       */
      const logout = () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                  setIsLoggedIn(false)
                  setUserData([])
                  localStorage.removeItem('userData');
                  localStorage.removeItem('LoginOnLoad');
            }).catch((error) => {
                  toast.error(error.message)
            });
      }






      /**
       * When the user clicks the login button, the user is redirected to the Github login page, and if
       * the user successfully logs in, the user is redirected back to the app, and the user's data is
       * stored in local storage.
       */
      const handleLogin = async () => {
            const auth = getAuth();
            signInWithPopup(auth, Github)
                  .then((result) => {

                        if (localStorage.getItem('LoginOnLoad') !== undefined) {
                              localStorage.setItem('LoginOnLoad', "OK")
                        }

                        localStorage.setItem('userData', JSON.stringify(result.user))
                        setUserData(result.user)
                        setIsLoggedIn(true)

                  }).catch((error) => {
                        toast.error(error.message)

                  });


      };

      return (
            <UserContext.Provider value={{ isLoggedIn, userData, exitAndLogin, logout }}>
                  {children}
            </UserContext.Provider>
      )
}
export default UserProvider