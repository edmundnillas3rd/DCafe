import { AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLibrary } from "react-icons/bi"
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsHouseDoorFill } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { type ReactElement } from "react";

type Props = {
  name?: string;
  icon?: ReactElement<any>;
  size?: string;
};

const Item = ({ name, icon }: Props) => {
  return (
    <button className="d-flex align-items-center gap-2 p-2 border border-0 bg-transparent">
      {icon}
      <div>{name}</div>
    </button>
  );
};

const Drawer = ({ size }: Props) => (
  <div
    className="offcanvas offcanvas-start"
    tabIndex={-1}
    id="offcanvasSidenav"
    aria-labelledby="offcanvasSidenavLabel"
  >
    <div className="offcanvas-header">
      <button
        className="btn btn-primary d-flex justify-content-center align-items-center border border-0 bg-transparent"
        type="button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <GiHamburgerMenu size={size} />
      </button>
      <a className="d-flex gap-2 navbar-brand me-auto" href="#">
        <img src="/logo.png" alt="logo" width={30} height={30} />
        <p className="offcanvas-title">DCafe</p>
      </a>
    </div>

    <div className="offcanvas-body">
      <Item name={"Home"} icon={<BsHouseDoorFill size={size} />} />
      <Item name={"Subscriptions"} icon={<GoPeople size={size} />} />
      <Item name={"Library"} icon={<BiLibrary size={size} />} />
    </div>
  </div>
);

export default function Headers() {
  const iconProps = {
    size: `16px`,
  };

  return (
    <>
      <Drawer {...iconProps} />
      <nav className="d-flex navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="container d-flex justify-content-center align-items-center gap-2">
                <button
                  className="btn btn-primary d-flex justify-content-center align-items-center border border-0 bg-transparent"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSidenav"
                  aria-controls="offcanvasSidenav"
                >
                  <GiHamburgerMenu {...iconProps} />
                </button>
                <a
                  className="d-flex align-items-center gap-2 navbar-brand"
                  href="#"
                >
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
    </>
  );
}
