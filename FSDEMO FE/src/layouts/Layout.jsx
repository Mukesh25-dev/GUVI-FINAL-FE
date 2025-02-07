import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/userSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  console.log(user);

  return (
    <div className="">
      <nav className="bg-slate-700 p-4 text-white flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          {!user && (
            <Link to="/register" className="mr-4">
              Register
            </Link>
          )}
          {!user && (
            <Link to="/register-verification" className="mr-4">
              Complete-verification
            </Link>
          )}
          {!user && (
            <Link to="/login" className="mr-4">
              Login
            </Link>
          )}
          {user && user.role === "user" && (
            <>
              <Link to="/candidate/dashboard" className="mr-4">
                DashBoard
              </Link>
              <Link to="/candidate/profile" className="mr-4">
                Profile
              </Link>
              <Link to="/candidate/applications" className="mr-4">
                Applications
              </Link>
              <Link to="/candidate/tickets" className="mr-4">
                My Tickets
              </Link>
            </>
          )}
          {user && user.role === "organiser" && (
            <>
              <Link to="/organiser/dashboard" className="mr-4">
                DashBoard
              </Link>
              <Link to="/organiser/profile" className="mr-4">
                Profile
              </Link>
              <Link to="/organiser/create-events" className="mr-4">
                create-Events
              </Link>
              <Link to="/organiser/manage-registrations" className="mr-4">
                Manage-Registrations
              </Link>
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="mr-4">
                DashBoard
              </Link>
              <Link to="/admin/create-organisers" className="mr-4">
                Create-Organisers
              </Link>
              <Link to="/admin/tickets" className="mr-4">
                Tickets
              </Link>
            </>
          )}
        </div>

        <div>
          {user && (
            <div className="flex items-center">
              <span className="mr-2 font-bold text-white">{user.name}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/logout", { replace: true })}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
