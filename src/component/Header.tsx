import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-20  flex justify-between items-center px-6">
      <Image
        src="/logo.png"
        alt="Board App Logo"
        width={97.6}
        height={24}
        className="h-6"
      />
      <div className="">
        <button>Create new board</button>
      </div>
    </header>
  );
};

export default Header;
