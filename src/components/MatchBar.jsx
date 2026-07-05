import { Link } from "react-router";
import TeamLogo from "./TeamLogo";

const FENERBAHCE_ID = 8695;

const RESULT_STYLES = {
  G: { background: "#3bb273", color: "#06251a" },
  B: { background: "rgba(245,241,232,.25)", color: "#f5f1e8" },
  M: { background: "#e2574c", color: "#2b0805" },
};

export default function MatchBar({ match }) {
  const homeIsFb = match.home.id === FENERBAHCE_ID;
  let res = null;
  if (match.finished) {
    const fbScore = homeIsFb ? match.home.score : match.away.score;
    const oppScore = homeIsFb ? match.away.score : match.home.score;
    res = fbScore > oppScore ? "G" : fbScore < oppScore ? "M" : "B";
  }

  const clickable = !match.notStarted;
  const Wrapper = clickable ? Link : "div";

  return (
    <Wrapper
      {...(clickable && { to: `/match/${match.id}` })}
      className={`grid h-16.5 grid-cols-[48px_minmax(0,1fr)_86px_minmax(0,1fr)_22px] items-center border-t border-white/5 pr-2 md:grid-cols-[76px_96px_minmax(0,1fr)_118px_minmax(0,1fr)_60px_34px] md:pr-5 ${
        clickable ? "cursor-pointer transition-colors hover:bg-white/4.5" : ""
      }`}
    >
      <span className="flex flex-col items-center gap-0.5 border-r border-white/8 py-2">
        <span
          style={{
            font: "800 20px/1 'Barlow Condensed',sans-serif",
            color: "#f5f1e8",
          }}
        >
          {match.day}
        </span>
        <span
          className="uppercase"
          style={{
            font: "700 10.5px/1 'Barlow',sans-serif",
            letterSpacing: ".14em",
            color: "rgba(245,241,232,.5)",
          }}
        >
          {match.month}
        </span>
      </span>

      <span
        className="hidden px-2 text-center md:block"
        style={{
          font: "600 12px/1.3 'Barlow',sans-serif",
          color: "rgba(245,241,232,.55)",
        }}
      >
        {match.round}
      </span>

      <span className="flex min-w-0 items-center justify-end gap-1.5 md:gap-2.75">
        <span
          className="truncate"
          style={{
            font: "600 15px/1 'Barlow',sans-serif",
            color: homeIsFb ? "#ffd43b" : "#f5f1e8",
          }}
        >
          {match.home.name}
        </span>
        <TeamLogo id={match.home.id} name={match.home.name} size={28} />
      </span>

      <span className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1.75 rounded-lg border border-white/10 bg-white/6 px-2 py-1.75 md:px-3.5">
          {match.notStarted ? (
            <span
              style={{
                font: "700 14px/1 'Barlow Condensed',sans-serif",
                color: "rgba(245,241,232,.8)",
              }}
            >
              {match.time}
            </span>
          ) : (
            <>
              <span
                style={{
                  font: "800 19px/1 'Barlow Condensed',sans-serif",
                  color: "#f5f1e8",
                }}
              >
                {match.home.score}
              </span>
              <span
                style={{
                  font: "700 13px/1 'Barlow Condensed',sans-serif",
                  color: "rgba(245,241,232,.35)",
                }}
              >
                –
              </span>
              <span
                style={{
                  font: "800 19px/1 'Barlow Condensed',sans-serif",
                  color: "#f5f1e8",
                }}
              >
                {match.away.score}
              </span>
            </>
          )}
        </span>
      </span>

      <span className="flex min-w-0 items-center justify-start gap-1.5 md:gap-2.75">
        <TeamLogo id={match.away.id} name={match.away.name} size={28} />
        <span
          className="truncate"
          style={{
            font: "600 15px/1 'Barlow',sans-serif",
            color: !homeIsFb ? "#ffd43b" : "#f5f1e8",
          }}
        >
          {match.away.name}
        </span>
      </span>

      <span className="hidden justify-center md:flex">
        {res && (
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full"
            style={{
              ...RESULT_STYLES[res],
              font: "800 13px/1 'Barlow Condensed',sans-serif",
            }}
          >
            {res}
          </span>
        )}
      </span>

      <span
        className="flex justify-end"
        style={{ color: "rgba(245,241,232,.35)" }}
      >
        {clickable && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </span>
    </Wrapper>
  );
}
