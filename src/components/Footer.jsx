import { Link } from "react-router";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-bg-dark flex flex-col items-center px-6 py-6">
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src="/fb-icon.svg" alt="svg-icon" className="h-12 w-12" />
          <span className="text-accent font-sans text-2xl font-bold">
            Fenerbahçe
          </span>
        </div>
        <ul className="text-text flex gap-6 font-sans text-base font-bold opacity-70">
          <Link to="/about" className="hover:text-accent transition-colors">
            Ana Sayfa
          </Link>
          <Link to="/squad" className="hover:text-accent transition-colors">
            Kadro
          </Link>
          <Link to="/tables" className="hover:text-accent transition-colors">
            Fikstür
          </Link>
          <Link to="/news" className="hover:text-accent transition-colors">
            Haberler
          </Link>
        </ul>
      </div>

      <div className="my-4 h-px w-full max-w-5xl bg-white/15" />

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
  );
}
