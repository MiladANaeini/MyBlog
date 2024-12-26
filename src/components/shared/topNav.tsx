import Link from "next/link";

const TopNav = () => {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-2 shadow-xl text-black">
      <Link href="/">
        <h3 className="text-lg font-bold">VISUAL</h3>
      </Link>
      <div>
        <Link href="/auth/signin">
          <p className="text-sm font-medium">Signin</p>
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
