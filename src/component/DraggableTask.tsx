import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DraggableTaskProps = {
  id: number;
  title: string;
  isDragging?: boolean;
};

const DraggableTask: React.FC<DraggableTaskProps> = ({
  id,
  title,
  isDragging = false,
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
        border border-gray-300 rounded-lg p-4 mb-4 cursor-move w-full 
        flex items-center justify-center bg-white shadow-sm
        hover:shadow-md transition-shadow duration-200
        ${isDragging ? "rotate-2" : ""}
      `}
    >
      <span className="text-sm font-medium text-gray-800">{title}</span>
    </div>
  );
};

export default DraggableTask;
