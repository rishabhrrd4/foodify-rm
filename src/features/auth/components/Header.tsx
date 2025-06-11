import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { logout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login — replace with real auth later
    navigate("auth/login");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">Foodify</h1>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleLogin}
                className="bg-orange-500 font-bold text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Login
              </button>
              <button className="text-orange-600 font-semibold hover:underline">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-700">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
