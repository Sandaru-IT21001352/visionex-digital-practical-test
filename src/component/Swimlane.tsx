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
    <div ref={setNodeRef}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tasks.map((task) => (
            <DraggableTask key={task.id} id={task.id} task={task} />
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
