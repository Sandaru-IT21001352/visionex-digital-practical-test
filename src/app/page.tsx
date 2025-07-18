import { ImageIcon, EditIcon } from "@/assets/icons";
import MainBoard from "@/component/MainBoard";
import React from "react";

const Home = () => {
  return (
    <div className="h-full flex flex-col  ">
      <div className="flex flex-col p-4 gap-2 text-(--root-neutral-neutral-4)">
        <div className="">
          <span className="text-black text-2xl font-semibold">
            Sport Xi Project
          </span>
          <span className="ml-4 px-3 py-1 rounded bg-(--task-5) text-(--root-neutral-neutral-3) text-xs font-medium">
            In Progress
          </span>
        </div>

        <div className="">even production</div>
        <div className="flex flex-row items-center gap-0">
          assigned:
          <div className="flex flex-row items-center gap-0">
            {[1, 2, 3]?.map((image, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-(--root-neutral-neutral-3) rounded-full flex items-center justify-center border-2 border-white"
                style={{
                  marginLeft: index === 0 ? 0 : -10, // overlap by 15px to the left
                  zIndex: index + 1,
                }}
              >
                <ImageIcon className="w-2 h-2 text-white" />
              </div>
            ))}

            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white text-[9px] bg-(--root-neutral-neutral-6)"
              style={{
                marginLeft: -10,
                zIndex: 3,
              }}
            >
              +3
            </div>
          </div>
          <button
            className="ml-2 px-2 py-1 rounded-full bg-white text-(--root-neutral-neutral-4) text-xs flex items-center gap-1 border border-(--root-neutral-neutral-6)"
            style={{ zIndex: 10 }}
          >
            <EditIcon className="w-3 h-3 text-(--root-neutral-neutral-4)" />
            Manage
          </button>
        </div>
        <hr className="my-2 border-(--root-neutral-neutral-6)" />
        <div className="">Last updated on: 04 April, 2022</div>
      </div>
      <MainBoard />
    </div>
  );
};

export default Home;
