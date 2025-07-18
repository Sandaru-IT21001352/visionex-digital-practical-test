import { Thunderbolt } from "@/assets/icons";
import React from "react";

const PriorityTag = ({ priority }: { priority: "high" | "medium" | "low" }) => {
  return (
    <div className="flex w-fit items-center gap-1 p-1 text-[9px] text-(--root-neutral-neutral-5) bg-(--root-neutral-neutral-7) rounded-md">
      <Thunderbolt />
      <span className="">
        {priority === "high"
          ? "High"
          : priority === "medium"
          ? "Medium"
          : "Low"}
      </span>
    </div>
  );
};

export default PriorityTag;
