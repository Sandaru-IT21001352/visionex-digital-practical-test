import React from "react";

const Header = () => {
  return (
    <header className="w-full h-20  flex justify-between items-center px-6">
      <img
        src="/logo.png"
        alt="Board App Logo"
        className="w-[97.6px] h-[24px]"
      />
      <div className="">
        <button>Create new board</button>
      </div>
    </header>
  );
};

export default Header;
