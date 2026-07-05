import { useState } from "react";
import { FaBars, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { NavLink } from "react-router";

const NAV_LINKS = [
  { to: "/home", label: "ANA SAYFA" },
  { to: "/squad", label: "KADRO" },
  { to: "/tables", label: "PUAN DURUMU" },
  { to: "/news", label: "HABERLER" },
  { to: "/fixture", label: "FİKSTÜR" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/fenerbahce",
    label: "Instagram",
    Icon: FaInstagram,
  },
  { href: "https://x.com/Fenerbahce", label: "X", Icon: FaXTwitter },
  {
    href: "https://www.youtube.com/Fenerbahce",
    label: "YouTube",
    Icon: FaYoutube,
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 rounded-b-2xl bg-[rgb(11,30,61)]">
      <div className="flex h-16 items-center justify-between px-4 lg:h-27 lg:justify-around lg:px-8">
        <div className="flex items-center gap-2.5 lg:gap-4">
          <h2 className="text-accent font-sans text-2xl font-bold lg:text-4xl">
            Fenerbahçe
          </h2>
          <img
            src="/fb-icon.svg"
            alt="Fenerbahçe logo"
            className="h-10 w-10 lg:h-18 lg:w-18"
          />
        </div>

        <ul className="text-text/70 hidden gap-6 font-sans font-bold lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-text/70"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </ul>

        <ul className="text-text/70 hidden gap-8 lg:flex">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              className="hover:text-accent transition-colors"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon className="h-7 w-7" />
            </a>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-text/80 hover:text-accent flex h-10 w-10 items-center justify-center transition-colors lg:hidden"
          aria-label="Menü"
          aria-expanded={menuOpen}
        >
          <FaBars className="h-6 w-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 px-4 pt-3 pb-5 lg:hidden">
          <ul className="text-text/70 flex flex-col gap-4 font-sans font-bold">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-text/70"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </ul>
          <ul className="text-text/70 mt-5 flex gap-8">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                className="hover:text-accent transition-colors"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
