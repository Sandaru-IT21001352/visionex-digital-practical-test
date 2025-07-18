"use client";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Folder,
  Grid3X3,
  HelpCircle,
  Image,
  LogOut,
  MessageCircle,
  Users,
} from "@/assets/icons";
import React, { useState } from "react";

const Sidebar = () => {
  const [boardsOpen, setBoardsOpen] = useState(true);

  return (
    <div className="flex flex-col w-72 justify-between p-6 text-base/tight line">
      <div>
        <div className="flex items-center justify-between  px-3 py-2 mb-4 rounded-[6px] border-2 border-(--root-neutral-neutral-7)">
          <div className="flex items-center space-x-2">
            <div className="w-11 h-11 bg-(--root-neutral-neutral-3) rounded-full flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-(--root-neutral-neutral-5) text-sm">
                workspace
              </span>
              <span className="font-medium text-(--root-neutral-neutral-3)">
                Root folder
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-(--root-neutral-neutral-3)" />
        </div>

        <nav className="space-y-[14px]">
          <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
            <Grid3X3 className="w-6 h-6" />
            <span className="">Dashboard</span>
          </div>

          {/* Drop down */}
          <div>
            <div
              className={`flex items-center justify-between p-3 text-blue-600 hover:bg-gray-50 rounded-md cursor-pointer
              ${
                boardsOpen
                  ? "rounded-[6px] border-2 border-(--root-neutral-neutral-7)"
                  : ""
              }`}
              onClick={() => setBoardsOpen(!boardsOpen)}
            >
              <div className="flex items-center space-x-3">
                <Folder className="w-6 h-6" />
                <span className=" font-medium">Boards</span>
              </div>
              {boardsOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
            {boardsOpen && (
              <div className="flex flex-col gap-3 p-3">
                <div className="flex items-center gap-[10px] px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
                  <ChevronRight className="w-3 h-3" />
                  <span>Create routes</span>
                </div>
                <div className="flex items-center gap-[10px] px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
                  <ChevronRight className="w-3 h-3" />
                  <span>Deployment React App</span>
                </div>
                <div className="flex items-center gap-[10px] px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-md cursor-pointer">
                  <ChevronRight className="w-3 h-3" />
                  <span>Sport Xi Project</span>
                </div>
                <div className="flex items-center gap-[10px] px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
                  <ChevronRight className="w-3 h-3" />
                  <span>Wordpress theme</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6" />
              <span className="">Messages</span>
            </div>
            <div className="w-6 h-6 bg-(--primary-orange) rounded-full flex items-center justify-center">
              <span className="text-xs leading-[24px] text-white font-medium">
                3
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
            <Calendar className="w-6 h-6" />
            <span className="">Calendar</span>
          </div>

          <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
            <Users className="w-6 h-6" />
            <span className="">Team members</span>
          </div>
        </nav>
      </div>

      {/* Bottom section */}
      <div>
        <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
          <HelpCircle className="w-6 h-6" />
          <span className="">Support</span>
        </div>

        <div className="flex items-center space-x-3 px-3 py-2 text-white bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700">
          <LogOut className="w-6 h-6" />
          <span className="">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
