import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ ...otherProps }) => {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const onClick = () => {
    setActive(!active);
  };

  return (
    <header className="bg-white shadow-md  z-50 w-full px-5 py-2 ">
      <div className=" w-full mx-auto flex items-center justify-between p-2.5">
        <div className="w-14 " onClick={() => history.push("/")}>
          <img
            src="http://rubee.com.vn/admin/webroot/upload/image//images/tin-tuc/the-coffee-house-logo-2.jpg"
            className="w-full"
            alt="logo"
          />
        </div>

        <div
          onClick={onClick}
          className={`
          md:hidden uppercase
        `}
        >
          Menu
        </div>

        <nav
          className={`
          ${!active && "hidden"}
          absolute flex flex-col bg-white top-full w-full left-0 z-20
          md:static md:w-auto md:flex
        `}
        >
          <ul className="md:flex-row md:flex">
            <li className="list-none md:mr-5">
              <a
                href="/"
                className="flex w-full text-base uppercase hover:text-red-600 cursor-pointer
                pt-2.5 px-2.5
              "
              >
                TRANG CHỦ
              </a>
            </li>

            <li className="list-none md:mr-5">
              <Link
                className="flex w-full text-base uppercase hover:text-red-600 cursor-pointer
                pt-2.5 px-2.5
              "
                to={"/admin"}
              >
                TỚI TRANG QUẢN LÝ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
