import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <div
        className="relative flex min-h-screen flex-col overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #163461, #0b1e3d 55%, #081730)",
        }}
      >
        <Navbar></Navbar>

        <span
          className="text-text/4 pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 text-center leading-none font-extrabold tracking-tighter select-none"
          style={{ fontSize: "clamp(16rem, 40vw, 44rem)" }}
        >
          1907
        </span>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="text-accent mb-7 flex items-center gap-3.5">
            <span className="bg-accent h-0.5 w-12" />
            <span
              className="uppercase"
              style={{
                font: "600 13px/1 'Barlow',sans-serif",
                letterSpacing: ".24em",
              }}
            >
              Fenerbahçe S.K. · 1907'den Bugüne
            </span>
            <span className="bg-accent h-0.5 w-12" />
          </span>

          <h1
            className="m-0 uppercase"
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 800,
              lineHeight: ".9",
              letterSpacing: ".005em",
              color: "#f5f1e8",
              textShadow: "0 6px 28px rgba(0,0,0,.55)",
            }}
          >
            <span className="block text-6xl md:text-8xl">Bir Kulüp Değil,</span>
            <span
              className="block text-6xl md:text-8xl"
              style={{ color: "#ffd43b" }}
            >
              Bir Tutku
            </span>
          </h1>

          <p className="text-text/80 mt-8 max-w-2xl text-lg leading-relaxed font-medium md:text-xl">
            Bir asrı aşan onurlu bir geçmiş, milyonların yüreğinde yaşayan bir
            sevda. Sarı-lacivertin hikâyesi; tutkunun, dayanışmanın ve hiç
            sönmeyen bir inancın hikâyesidir.
          </p>

          <span className="bg-accent mt-10 block h-0.75 w-24" />
        </div>
      </div>

      <div className="bg-bg relative flex items-center justify-center overflow-hidden">
        <div className="relative flex h-screen w-full max-w-7xl items-center justify-center gap-24 px-16">
          <div className="border-accent shrink-0 rounded-sm border p-3">
            <img
              src="trophy.jpeg"
              alt="Player Lifting Trophy"
              className="h-85 w-105 object-cover"
            />
          </div>

          <div className="relative flex max-w-2xl flex-col gap-10">
            <span className="text-text/5 pointer-events-none absolute -top-24 left-0 z-0 text-[20rem] leading-none font-extrabold select-none">
              1907
            </span>
            <h2 className="relative z-10 flex flex-col text-5xl font-extrabold tracking-wide">
              <span className="text-text">BİR</span>
              <span className="text-accent">EFSANENİN</span>
              <span className="text-text">DOĞUŞU</span>
            </h2>
            <p className="text-text/90 relative z-10 font-sans text-lg leading-relaxed">
              1907 yılında İstanbul'un kalbinde kurulan Fenerbahçe, yalnızca bir
              futbol kulübü değil; bir milletin tutku, onur ve dayanışma
              sembolüdür. Her nesil, sarı-lacivert formanın altında aynı ateşi
              taşımış; bu köklü gelenek bugün de milyonlarca taraftarın
              yüreğinde yaşamaya devam ediyor.
            </p>
            <div className="relative z-10 flex gap-16">
              <div className="flex flex-col">
                <span className="text-accent text-4xl font-bold">28x</span>
                <span className="text-text text-sm">
                  Süper Lig Şampiyonluğu
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-accent text-4xl font-bold">117</span>
                <span className="text-text text-sm">Yıllık Tarih</span>
              </div>
              <div className="flex flex-col">
                <span className="text-accent text-4xl font-bold">25</span>
                <span className="text-text text-sm">Milyon Taraftar</span>
              </div>
            </div>
            <a
              href="https://tr.wikipedia.org/wiki/Fenerbah%C3%A7e_(futbol_tak%C4%B1m%C4%B1)"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent mt-2 w-fit cursor-pointer rounded-xl px-8 py-4 font-sans text-lg font-bold text-black transition-shadow hover:shadow-[0_0_24px_var(--color-accent)]"
            >
              Tarihi Öğren
            </a>
          </div>
        </div>
      </div>

      <div className="bg-bg flex flex-col items-center px-6 py-24 md:px-20">
        <span className="text-accent text-sm font-semibold tracking-wide">
          Fenerbahçe S.K. · Hall of Fame
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-wide">
          <span className="text-text">EFSANE</span>{" "}
          <span className="text-accent">OYUNCU</span>
        </h2>

        <div className="mt-8 flex w-full max-w-5xl items-center gap-4">
          <span className="bg-accent/40 h-px flex-1" />
          <span className="text-accent rotate-45 text-xs">◆</span>
          <span className="bg-accent/40 h-px flex-1" />
        </div>

        <div className="mt-16 flex w-full max-w-5xl flex-col items-center gap-16 md:flex-row md:items-center">
          <div className="border-accent shrink-0 rounded-sm border p-3">
            <div className="overflow-hidden rounded-sm">
              <img
                src="alex.jpg"
                alt="Alex de Souza"
                className="h-110 w-100 object-cover object-top blur-[0.4px] brightness-95 contrast-105"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-accent text-sm font-bold tracking-widest">
              2004 – 2012
            </span>
            <h3 className="text-text text-5xl font-extrabold">Alex de Souza</h3>
            <span className="text-text/60 text-lg">Orta Saha</span>
            <span className="text-accent text-3xl font-extrabold">164 Gol</span>
            <div className="text-text flex flex-col gap-4 text-lg leading-relaxed">
              <p>
                Fenerbahçe tarihinin en büyük yabancı futbolcusu olarak kabul
                edilen Alex de Souza, sarı-lacivertli formayı 8 yıl boyunca
                giydirdi.
              </p>
              <p>
                Brezilya'nın Minas Gerais eyaletinden çıkan bu dehayı dünyaya
                tanıtan Fenerbahçe oldu. Serbest vuruş ustalığı, yaratıcı
                pasları ve liderliğiyle taraftarların kalbine taht kurdu.
              </p>
              <p>
                Fenerbahçe'nin 3 şampiyonluğunda kilit rol oynayan Alex, 2007'de
                Türkiye'nin en iyi futbolcusu seçildi. Kulübün efsaneler
                galerisinde hâlâ en parlak isim olarak yer alıyor.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
