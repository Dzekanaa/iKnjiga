import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUser, handleLogout } from "../services";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const { auth, id, setAuthState } = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await handleLogout();

    if (!res) {
      return alert("Došlo je do greške prilikom odjave.");
    }

    if (res.Status === "Success") {
      navigate("/");
    } else {
      alert(res.Error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser(id);
        if (res && res.Status === "Success") {
          console.log(res.user);
          setUsername(res.user.Username);
        } else if (res && res.Error) {
          console.error(res.Error);
        } else {
          console.error("Unexpected response:", res);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (auth && id) {
      fetchUserData();
    }
  }, [auth, id]);

  return (
    <>
      <div className="w-full  border-b border-b-base-300">
        <div className="navbar bg-base-100 container py-2">
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/">Početna</NavLink>
                </li>
                <li>
                  <NavLink to={"profile"}>Profil</NavLink>
                </li>
                <li>
                  <NavLink to={"mylibrary"}>Moja Biblioteka</NavLink>
                </li>

                {/* <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
            <NavLink to={"/"} className="btn btn-ghost text-xl">
              iKnjiga
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal text-lg gap-2">
              <li>
                <NavLink to="/">Početna</NavLink>
              </li>
              <li>
                <NavLink to={"mylibrary"}>Moja Biblioteka</NavLink>
              </li>
              <li>
                <NavLink to={"profile"}>Profil</NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end menu menu-horizontal">
            {auth ? (
              <li className="relative">
                <details>
                  <summary className="text-lg text-text cursor-pointer">
                    {username}
                  </summary>
                  <ul className=" absolute -left-36 p-2 mt-2 bg-base-100 shadow-lg text-text rounded-box w-52">
                    <li>
                      <label className="flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-neutral"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>

                        <Link to={"profile"}>Profil</Link>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-neutral"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="square"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>

                        <Link to={"settings"}>Postavke</Link>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-neutral"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>

                        <Link to={"help"}>Pomoć</Link>
                      </label>
                    </li>
                    <li onClick={handleClick}>
                      <label className="flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-neutral"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                          />
                        </svg>

                        <a>Odjava</a>
                      </label>
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <Link className={"btn btn-primary"} to={"/login"}>
                Prijavi se!
              </Link>
            )}
          </div>
        </div>
      </div>

      <main className="text-xl h-[90vh] flex justify-center items-center container text-center">
        <Outlet />
      </main>
    </>
  );
};
