import { useContext } from "react"
import { navbar } from 'assets/scss' // call sass styles
import CartWidget from 'Components/CartWidget'
import { UserContext } from "Context/UserContext";
import { NavLink } from 'react-router-dom'
import { faRightFromBracket, faStore, faBookmark, faBagShopping, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { Button } from "@kagarisoft/csc-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
      const { userData, isLoggedIn, exitAndLogin, logout } = useContext(UserContext);
      return (
            <header className={[navbar.top__bar, navbar.ap__black__background].join(' ')}>

                  <div className={navbar.wp__container}>
                        <div className={navbar.left}>
                              <div>
                                    <p className={navbar.logo_text}><span className={navbar.logo_text_left}>Game</span> <span className={navbar.logo_text_right}>Store</span></p>
                              </div>
                              <div className={navbar.nav__container}>


                                    <nav>
                                          <ul>
                                                <li>
                                                      <NavLink to="/" className={({ isActive }) => isActive ? navbar.active : ''} end>Store</NavLink>
                                                </li>
                                                {isLoggedIn && (
                                                      <li>
                                                            <NavLink to="/my-purchase" className={({ isActive }) => isActive ? navbar.active : ''} end>My Purchases</NavLink>
                                                      </li>
                                                )}
                                                <li>
                                                      <NavLink to="/bookmarks" className={({ isActive }) => isActive ? navbar.active : ''} end>Bookmarks</NavLink>
                                                </li>
                                          </ul>
                                    </nav>
                              </div>
                        </div>

                        <div className={navbar.right}>
                              <div className={navbar.nav__icons__info}>
                                    <NavLink to="/cart" ><CartWidget style={navbar} /></NavLink>
                              </div>
                              <div className={navbar.user__content__container}>
                                    {isLoggedIn ? (
                                          <>
                                                <div className={navbar.user__container}>
                                                      <div className={navbar.avatar}>
                                                            <img
                                                                  src={userData.photoURL}
                                                                  alt="User Avatar" />
                                                      </div>
                                                      <span>{userData.displayName}</span>
                                                </div>
                                                <Button icon={faRightFromBracket} onClickButton={logout} />
                                          </>
                                    ) : (
                                          <>
                                                <Button label="Log in with github" icon={faGithubAlt} onClickButton={exitAndLogin} />
                                          </>

                                    )}
                              </div>
                        </div>
                  </div>


                  <div className={navbar.phone__nav}>
                        <nav>
                              <ul>
                                    <li>
                                          <NavLink to="/" className={({ isActive }) => isActive ? navbar.active : ''} end>
                                                <FontAwesomeIcon icon={faStore} />
                                          </NavLink>
                                    </li>
                                    {isLoggedIn && (
                                          <li>
                                                <NavLink to="/my-purchase" className={({ isActive }) => isActive ? navbar.active : ''} end>
                                                      <FontAwesomeIcon icon={faBagShopping} />
                                                </NavLink>
                                          </li>
                                    )}
                                    <li>
                                          {isLoggedIn ? (
                                                <>
                                                      <div className={navbar.user__container} onClick={logout}>
                                                            <div className={navbar.avatar}>
                                                                  <img
                                                                        src={userData.photoURL}
                                                                        alt="User Avatar" />
                                                            </div>
                                                      </div>

                                                </>
                                          ) : (
                                                <>

                                                      <NavLink to="#" onClick={exitAndLogin}>
                                                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                                                      </NavLink>

                                                </>

                                          )}
                                    </li>
                                    <li>
                                          <NavLink to="/cart" ><CartWidget style={navbar} /></NavLink>
                                    </li>
                                    <li>
                                          <NavLink to="/bookmarks" className={({ isActive }) => isActive ? navbar.active : ''} end>
                                                <FontAwesomeIcon icon={faBookmark} />
                                          </NavLink>
                                    </li>
                              </ul>
                        </nav>
                  </div>
            </header>
      )
}

export default Header;