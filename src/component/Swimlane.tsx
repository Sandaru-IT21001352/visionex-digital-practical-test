import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";
import { Task, TaskStatus } from "@/types";

interface SwimlaneProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

const Swimlane: React.FC<SwimlaneProps> = ({ id, title, tasks }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: title, // Use title as droppable id for easier identification
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <div
      ref={setNodeRef}
      className={`
        border border-gray-300 rounded-lg p-4 mb-4 w-full min-h-[200px]
        transition-colors duration-200
        ${isOver ? "bg-blue-50 border-blue-300" : "bg-white"}
      `}
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tasks.map((task) => (
            <DraggableTask key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </SortableContext>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No tasks</p>
        </div>
      )}
    </div>
  );
};

export default Swimlane;
