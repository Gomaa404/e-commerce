"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { getCart } from "@/app/Api/cart.api";

export default function Navbar() {
  const { data: session, status } = useSession();
  const path = usePathname();
  const [hasLocalUser, setHasLocalUser] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getStoredToken = () => {
    if (typeof window === "undefined") return undefined;
    return (
      localStorage.getItem("token") ??
      localStorage.getItem("userToken") ??
      undefined
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setHasLocalUser(!!localStorage.getItem("user"));
    check();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === null) check();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (status === "loading") return;

      const token = session?.user?.token ?? getStoredToken();
      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const cart = await getCart(token);
        if (cart?.products) {
          const count = cart.products.reduce((sum, item) => sum + item.count, 0);
          setCartCount(count);
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    };

    fetchCartCount();

    const interval = setInterval(fetchCartCount, 30000);
    return () => clearInterval(interval);
  }, [session?.user?.token, status, path]);

  const isLoggedIn = !!(session?.user || hasLocalUser);

  const isActive = (route: string) => {
    if (route === "/") return path === "/";
    return path.startsWith(route);
  };

  const handleLogout = () => {
    const prefixes = ["user", "auth", "token", "favorite"];

    Object.keys(localStorage).forEach((key) => {
      if (prefixes.some((prefix) => key.startsWith(prefix))) {
        localStorage.removeItem(key);
      }
    });
    setHasLocalUser(false);
    setCartCount(0);
    signOut({ callbackUrl: "/" });
  };

  const navLinks = [
    { href: "/Products", label: "Products", icon: "fa-box" },
    { href: "/Categories", label: "Categories", icon: "fa-layer-group" },
    { href: "/brands", label: "Brands", icon: "fa-tags" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white shadow-lg border-b border-gray-200"
        : "bg-white/90 backdrop-blur-lg border-b border-gray-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="bg-gradient-to-br from-black to-gray-800 text-white w-11 h-11 flex items-center justify-center rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent tracking-tight hidden sm:block">
              ShopMart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.href)
                  ? "bg-black text-white shadow-md"
                  : "text-gray-700 hover:text-black hover:bg-white"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <i className={`fa-solid ${link.icon} text-sm`} />
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2.5">

            {/* User Actions (Logged In) */}
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <Link
                  href="/Favorite"
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${isActive("/Favorite")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-rose-600"
                    }`}
                  title="Wishlist"
                >
                  <i className="fa-solid fa-heart text-lg" />
                </Link>

                <Link
                  href="/Cart"
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${isActive("/Cart")
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  title="Cart"
                >
                  <i className="fa-solid fa-shopping-cart text-lg" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white shadow-sm">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* User Menu Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${isLoggedIn
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <i className="fa-solid fa-user text-lg" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-white rounded-xl w-56 mt-3 border border-gray-100"
              >
                {isLoggedIn ? (
                  <>
                    <li className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {session?.user?.name || "My Account"}
                      </p>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive("/orders")
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <i className="fa-solid fa-box text-sm w-4" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/change-password"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive("/change-password")
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <i className="fa-solid fa-key text-sm w-4" />
                        <span className="font-medium">Change Password</span>
                      </Link>
                    </li>
                    <li className="mt-1 border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition w-full"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket text-sm w-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Welcome
                      </p>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive("/login")
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <i className="fa-solid fa-arrow-right-to-bracket text-sm w-4" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive("/register")
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <i className="fa-solid fa-user-plus text-sm w-4" />
                        <span className="font-medium">Create Account</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
            >
              <i
                className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"
                  } text-lg`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-2 border border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium ${isActive(link.href)
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-white"
                  }`}
              >
                <i className={`fa-solid ${link.icon} text-sm w-4`} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
