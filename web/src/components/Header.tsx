import { AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Headers() {
  const iconProps = {
    size: `16px`,
  };

  return (
    <nav className="d-flex navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="container">
              <a className="d-flex navbar-brand" href="#">
                <img src="/logo.png" alt="logo" width={30} height={30} />
                DCafe
              </a>
            </li>
          </ul>
          <form className="d-flex flex-fill p-2" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="d-flex justify-content-center align-items-center btn btn-outline-success"
              type="submit"
            >
              <AiOutlineSearch {...iconProps} />
            </button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="d-flex justify-content-center align-items-center nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgProfile />
              </a>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="d-flex justify-content-center align-items-center nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FiSettings {...iconProps} />
              </a>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="d-flex justify-content-center align-items-center nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <IoIosNotificationsOutline />
              </a>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
