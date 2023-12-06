import { FC, useState } from "react";
import { GiClothes } from "react-icons/gi";
import { loginUserAction, logoutUserAction } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../cart/CartIcon";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [mobileView, setMobileView] = useState(false);

  const { userAuth } = auth;

  return (
    <nav className="flex flex-wrap items-center justify-between bg-indigo-900 p-3">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <GiClothes className="mr-2 text-4xl" />
        <span className="text-xl font-semibold tracking-tight">
          Barneslow Clothing
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center rounded border border-sky-400 px-3 py-2 text-sky-200 hover:border-white hover:text-white"
          onClick={() => setMobileView((prev) => !prev)}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          mobileView ? "block" : "hidden"
        } w-full flex-grow lg:flex lg:w-auto lg:items-center`}
      >
        <div className="text-sm lg:flex-grow">
          <NavLink
            className="mr-1 mt-4 block rounded-md px-2 py-1 text-base text-slate-50 hover:bg-sky-600 lg:mt-0 lg:inline-block"
            to={`shop/hats`}
          >
            Hats
          </NavLink>
          <NavLink
            className="mr-1 mt-4 block rounded-md px-2 py-1 text-base text-slate-50 hover:bg-sky-600 lg:mt-0 lg:inline-block"
            to={`shop/jackets`}
          >
            Jackets
          </NavLink>
          <NavLink
            className="mr-1 mt-4 block rounded-md px-2 py-1 text-base text-slate-50 hover:bg-sky-600 lg:mt-0 lg:inline-block"
            to={`shop/sneakers`}
          >
            Sneakers
          </NavLink>
          <NavLink
            className="mr-4 mt-4 block rounded-md px-2 py-1 text-base text-slate-50 hover:bg-sky-600 lg:mt-0 lg:inline-block"
            to={`shop/womens`}
          >
            Womens
          </NavLink>
          <NavLink
            className="mr-1 mt-4 block rounded-md px-2 py-1 text-base text-slate-50 hover:bg-sky-600 lg:mt-0 lg:inline-block"
            to={`shop/mens`}
          >
            Mens
          </NavLink>
        </div>
        <div>
          <div className="mt-2 flex items-center justify-between gap-4">
            {userAuth ? (
              <button
                onClick={() => dispatch(logoutUserAction())}
                className="rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-700 focus:bg-amber-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => dispatch(loginUserAction())}
                className="rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-700 focus:bg-amber-700"
              >
                Login
              </button>
            )}
            <CartIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
