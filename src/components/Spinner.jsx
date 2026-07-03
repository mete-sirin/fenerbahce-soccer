export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="border-t-accent h-12 w-12 animate-spin rounded-full border-4 border-white/10" />
      <span className="text-text/50 font-sans text-xs font-bold tracking-[0.18em] uppercase">
        Yükleniyor
      </span>
    </div>
  );
}
