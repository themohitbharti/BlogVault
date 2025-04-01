import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../container/Container";
import { Logo, LogoutBtn } from "../index";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

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
                <Logo width="90px" />
              </Link>
            </div>
            <div className="hidden md:block text-[#e85254] text-3xl font-bold ml-auto">
              BlogVault
            </div>
          </div>
          <ul className="flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 duration-200 ${
                      location.pathname === item.slug
                        ? "bg-[#e85254] font-bold border-b-2 border-[#fabbbf]"
                        : "bg-[#a52c35] hover:bg-[#e85254]"
                    } rounded-full mx-1 text-[#fabbbf]`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
