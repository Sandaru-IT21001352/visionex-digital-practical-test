import React from "react";
import SearchBox from "./atoms/SearchBox";
import { SettingsIcon, NotificationIcon, ImageIcon } from "@/assets/icons";

const Header = () => {
  return (
    <header className="w-full h-20 flex justify-between items-center px-6">
      <img
        src="/logo.png"
        alt="Board App Logo"
        className="w-[97.6px] h-[24px]"
      />
      <div className="flex items-center space-x-4">
        <button className="flex items-center bg-(--primary-primary) rounded-md h-12 hover:bg-blue-700 text-white  py-2 px-4 transition-colors">
          Create new board
          <span className="ml-2 text-lg">+</span>
        </button>
        <SearchBox />
        <SettingsIcon />
        <NotificationIcon />
        <div className="w-11 h-11 bg-(--root-neutral-neutral-3) rounded-full flex items-center justify-center">
          <ImageIcon className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
