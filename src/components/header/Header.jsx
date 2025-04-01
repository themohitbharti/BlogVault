import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../container/Container";
import { Logo, LogoutBtn } from "../index";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the common button style to a variable for consistency
  const buttonBaseStyle = "inline-block px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-base duration-200 rounded-full mx-0.5 sm:mx-1 text-[#fabbbf]";
  const buttonActiveStyle = "bg-[#e85254] font-bold border-b-2 border-[#fabbbf]";
  const buttonInactiveStyle = "bg-[#a52c35] hover:bg-[#e85254]";

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow" style={{ backgroundColor: "#5e1e2c" }}>
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            <div className="hidden md:block text-[#e85254] text-3xl font-bold ml-auto">
              BlogVault
            </div>
          </div>
          <ul className="flex flex-wrap justify-end gap-1 sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="shrink-0">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`${buttonBaseStyle} ${
                      location.pathname === item.slug
                        ? buttonActiveStyle
                        : buttonInactiveStyle
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="shrink-0">
                <LogoutBtn className={`${buttonBaseStyle} ${buttonInactiveStyle}`} />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
