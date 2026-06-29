import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { NavLink } from "react-router";
function Navbar() {
  return (
    <div className="sticky top-0 z-50 flex h-27 items-center justify-around rounded-b-2xl bg-[rgb(11,30,61)] px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-accent font-sans text-4xl font-bold">Fenerbahçe</h2>
        <img src="/fb-icon.svg" alt="Fenerbahçe logo" className="h-18 w-18" />
      </div>
      <ul className="text-text/70 flex gap-6 font-sans font-bold">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-accent" : "text-text/70"
          }
        >
          ANA SAYFA
        </NavLink>
        <NavLink
          to="/squad"
          className={({ isActive }) =>
            isActive ? "text-accent" : "text-text/70"
          }
        >
          KADRO
        </NavLink>
        <NavLink
          to="/tables"
          className={({ isActive }) =>
            isActive ? "text-accent" : "text-text/70"
          }
        >
          PUAN DURUMU
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive ? "text-accent" : "text-text/70"
          }
        >
          HABERLER
        </NavLink>
      </ul>

      <div>
        <ul className="text-text/70 flex gap-8">
          <a
            className="hover:text-accent transition-colors"
            href="https://www.instagram.com/fenerbahce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="h-7 w-7" />
          </a>
          <a
            className="hover:text-accent transition-colors"
            href="https://x.com/Fenerbahce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <FaXTwitter className="h-7 w-7" />
          </a>
          <a
            className="hover:text-accent transition-colors"
            href="https://www.youtube.com/Fenerbahce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube className="h-7 w-7" />
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
