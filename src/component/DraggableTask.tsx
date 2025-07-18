import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import { Calendar, Image, MessageCircle, MoreHorizontal } from "@/assets/icons";
import PriorityTag from "./atoms/PriorityTag";

const DraggableTask = ({
  id,
  task,
  isDragging = false,
}: {
  id: number;
  task: Task;
  isDragging?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex items-center justify-center bg-white
        border border-(--root-neutral-neutral-6) rounded-xl p-2 mb-4 cursor-move w-full 
        hover:shadow-md transition-shadow duration-200
        ${isDragging ? "rotate-2" : ""}
      `}
    >
      <div className="min-h-35 w-full flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between text-(--root-neutral-neutral-5)">
          <div className="flex flex-row items-center h-full gap-2">
            <div
              className={`h-2 w-2 rounded-xs`}
              style={{ backgroundColor: categoryColors[task.category] }}
            ></div>
            <p className="text-xs ">{task.category}</p>
          </div>
          <div className="">
            <MoreHorizontal className="w-4 h-4" />
          </div>
        </div>
        <div
          className="
        font-medium
        "
        >
          {task.title}
        </div>
        <div className="flex items-center gap-2 mb-auto">
          <div className="flex flex-row items-center gap-0">
            {task.firstThreeAssigneesImages?.map((image, index) => (
              <div
                key={index}
                className="w-5 h-5 bg-(--root-neutral-neutral-3) rounded-full flex items-center justify-center border-2 border-white"
                style={{
                  marginLeft: index === 0 ? 0 : -10, // overlap by 15px to the left
                  zIndex: index + 1,
                }}
              >
                <Image className="w-2 h-2 text-white" />
              </div>
            ))}
            {task.numberOfAssignees && task.numberOfAssignees > 3 && (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center border-2 border-white text-[9px] bg-(--root-neutral-neutral-6)"
                style={{
                  marginLeft: -10,
                  zIndex: (task.firstThreeAssigneesImages?.length || 0) + 1,
                }}
              >
                +
                {task.numberOfAssignees -
                  (task.firstThreeAssigneesImages?.length || 0)}
              </div>
            )}
          </div>
          <PriorityTag priority={task.priority} />
        </div>
        {task.image && (
          <div className="w-full h-[90px] bg-(--root-neutral-neutral-3) rounded-md flex items-center justify-center">
            <Image className="w-4 h-4 text-white" />
          </div>
        )}
        <hr className="my-2 border-(--root-neutral-neutral-6)" />
        <div className="flex  text-(--root-neutral-neutral-4)">
          <MessageCircle className="w-4 h-4 " />
          <span className="text-xs ml-1">{task.comments}</span>
          {task.dueDate && (
            <>
              <Calendar className="w-4 h-4  ml-2" />
              <span className="text-xs  ml-1">
                {(() => {
                  if (!task.dueDate) return null;
                  const due = new Date(task.dueDate);
                  const today = new Date("2022-04-09T00:00:01Z"); //TODO: hardcoded date for testing
                  today.setHours(0, 0, 0, 0);
                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1);

                  if (due.getDate() === today.getDate()) {
                    return "Today";
                  } else if (due.getDate() === tomorrow.getDate()) {
                    return "Tomorrow";
                  } else {
                    return due.toISOString().slice(0, 10);
                  }
                })()}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraggableTask;

// MARK : temporary category color mapping
const categoryColors: Record<string, string> = {
  Research: "#aee753",
  Design: "#f90430",
  Other: "#777e90",
  Feedback: "#3772ff",
  Presentation: "#ff5c00",
  "UX Research": "#ffa800",
  Interface: "#353945",
};
