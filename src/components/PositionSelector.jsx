export default function PositionSelector({ position, setPosition }) {
  function handlePositionSelect(key) {
    setPosition(key);
  }
  const zones = [
    { key: "attackers", label: "Forvet", top: "12px", height: "80px" },
    { key: "midfielders", label: "Orta Saha", top: "96px", height: "94px" },
    { key: "defenders", label: "Defans", top: "194px", height: "94px" },
    { key: "keepers", label: "Kaleci", top: "292px", height: "76px" },
  ];

  const line = "rgba(255,255,255,.14)";

  return (
    <div
      style={{
        fontFamily: "'Barlow',sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "40px 24px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          font: "700 11px/1 'Barlow',sans-serif",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "rgba(255,236,0,.7)",
          textAlign: "center",
        }}
      >
        · Mevki seç ·
      </div>

      <div
        style={{
          position: "relative",
          width: "240px",
          height: "380px",
          borderRadius: "10px",
          overflow: "hidden",
          background: "linear-gradient(180deg,#0e2742 0%,#0a1d33 100%)",
          border: "1px solid rgba(255,255,255,.06)",
          boxShadow: "0 24px 60px -24px rgba(0,0,0,.7)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,.02) 0 48px, transparent 48px 96px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "12px",
            border: `1.5px solid ${line}`,
            borderRadius: "3px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "12px",
            right: "12px",
            top: "50%",
            height: "1.5px",
            background: line,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "80px",
            height: "80px",
            transform: "translate(-50%,-50%)",
            border: `1.5px solid ${line}`,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "5px",
            height: "5px",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background: line,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "12px",
            width: "120px",
            height: "56px",
            transform: "translateX(-50%)",
            border: `1.5px solid ${line}`,
            borderTop: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "12px",
            width: "60px",
            height: "24px",
            transform: "translateX(-50%)",
            border: `1.5px solid ${line}`,
            borderTop: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "12px",
            width: "120px",
            height: "56px",
            transform: "translateX(-50%)",
            border: `1.5px solid ${line}`,
            borderBottom: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "12px",
            width: "60px",
            height: "24px",
            transform: "translateX(-50%)",
            border: `1.5px solid ${line}`,
            borderBottom: "none",
          }}
        />

        {zones.map((z) => {
          const isActive = z.key === position;
          return (
            <div
              key={z.key}
              onClick={() => handlePositionSelect(z.key)}
              className={`group flex cursor-pointer items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-[rgba(255,236,0,.1)] shadow-[inset_0_0_24px_rgba(255,236,0,.3)]"
                  : "bg-transparent hover:bg-[rgba(255,236,0,.08)] hover:shadow-[inset_0_0_24px_rgba(255,236,0,.25)]"
              }`}
              style={{
                position: "absolute",
                left: "12px",
                right: "12px",
                top: z.top,
                height: z.height,
              }}
            >
              <span
                className="transition-colors duration-200 group-hover:text-[rgba(255,236,0,.9)]"
                style={{
                  font: "800 15px/1 'Barlow Condensed',sans-serif",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: isActive
                    ? "rgba(255,236,0,.95)"
                    : "rgba(255,255,255,.55)",
                  textShadow: "0 1px 4px rgba(0,0,0,.5)",
                }}
              >
                {z.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
