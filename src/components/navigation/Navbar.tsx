import { FC } from "react";
import { loginUserAction, logoutUserAction } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { userAuth } = auth;

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div>
        {userAuth ? (
          <button
            onClick={() => dispatch(logoutUserAction())}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => dispatch(loginUserAction())}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;