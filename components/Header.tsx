import Image from "next/image";

const Header = () => {
  return (
    <header className="py-1 border-b shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-3 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.webp"}
            alt="Logo"
            width={40}
            height={40}
            className="md:w-auto md:h-auto"
            priority
          />
          <h1 className="md:text-xl font-bold">QRCodiuM</h1>
        </div>
      </div>
    </header>
  );
};
export default Header;
