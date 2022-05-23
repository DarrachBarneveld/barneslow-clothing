import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsCartOpen } from "../../../store/cart/cart.selector.js";

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigation.styles.jsx";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";

import CartIcon from "../../../components/cart-icon/cart-icon.component";

import CartDropdown from "../../../components/cart-dropdown/cart-dropdown.component";

// import { UserContext } from "../../../contexts/user.context";
// import { CartContext } from "../../../contexts/cart.context";
// import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { signOutStart } from "../../../store/user/user.action.js";

const Nav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext);
  // const { currentUser } = useContext(UserContext);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Nav;
