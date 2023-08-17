import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/slices/userSlice";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.auth);
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    await signout();
    dispatch(resetUser())
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        id="navbar_top"
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
           COIN BOUNCE
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto text-center mb-2 d-flex align-items-center  mb-lg-0">
              <li className="nav-item ">
                <NavLink
                end 
               className={({isActive}) => 
               isActive ? 'active-link' : 'inActiveStyle'
              }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink  className={({isActive}) => isActive ? 'active-link' : 'inActiveStyle'} to="/crypto">
                  Cryptocurrencies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink  className={({isActive}) => isActive ? 'active-link' : 'inActiveStyle'} to="/blogs">
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink  className={({isActive}) => isActive ? 'active-link' : 'inActiveStyle'} to="/submit">
                  Submit a blog 
                </NavLink>
              </li>
              {isAuthenticated ? <li className="nav-item">
                <NavLink  className={({isActive}) => isActive ? 'active-link' : 'inActiveStyle'} >
                  <button className="signOut_btn" onClick={handleSignOut}>Sign Out</button> 
                </NavLink>
              </li> : 
              <>
                 <li className="nav-item">
                <NavLink  className={({isActive}) => isActive ? 'active-link' : 'inActiveStyle'} to="/login">
                  <button className="login_btn">Log In</button> 
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink  className={({isActive}) => isActive ? 'active-link' : 'inActiveStyle'} to="/signup">
                  <button className="signup_btn">Sign Up</button>
                </NavLink>
              </li> 
              </>
              }
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
