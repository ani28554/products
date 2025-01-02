import { FiPlus } from "react-icons/fi";
import { PiBookmarksBold } from "react-icons/pi";
import { GrBasket } from "react-icons/gr";
import { Link } from "react-router";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = [
    {
      text: "Products",
      href: "/products",
      icon: <GrBasket />,
    },
    {
      text: "Favorites",
      href: "/favorites",
      icon: <PiBookmarksBold />,
    },
    {
      text: "Create Product",
      href: "/create-product",
      icon: <FiPlus />,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);   
  };

  return (
    <nav
      className={`${
        isMenuOpen ? "h-52" : "h-16"
      } "border-gray-200 md:h-16 bg-gray-50 dark:bg-gray-600 dark:border-gray-600`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="../public/logo.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-30"
          aria-controls="navbar"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm0 5h14a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1a1 1 0 011-1zm0 5h14a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {menuList &&
              menuList.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="flex justify-center gap-2 items-center py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-200"
                    aria-current="page"
                  >
                    <div>{item.icon}</div>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
