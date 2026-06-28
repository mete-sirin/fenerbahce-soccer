function Navbar() {
  return (
    <div className="flex h-27 items-center justify-center bg-[rgb(11,30,61)] rounded-b-2xl gap-20 sticky top-0  ">
      <div className="flex items-center gap-4">
        <h2 className="text-accent font-bold text-2xl font-sans">Fenerbahçe</h2>
        <img src="/fb-icon.svg" alt="Fenerbahçe logo" className="h-18 w-18" />
      </div>
      <div>
        <p className="text-xl text-accent text-center">Placeholder Navbar</p>
      </div>
    </div>
  );
}

export default Navbar;
