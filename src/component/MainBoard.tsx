"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useTaskStore from "@/stores/taskStore";
import Swimlane from "@/component/Swimlane";
import DraggableTask from "@/component/DraggableTask";
import { TaskStatus } from "@/types";
import { get } from "http";

const SWIMLANES = [
  { id: "to-do" as TaskStatus, title: "Todo" },
  { id: "in-progress" as TaskStatus, title: "In Progress" },
  { id: "approved" as TaskStatus, title: "Done" },
  { id: "rejected" as TaskStatus, title: "Rejected" },
];

const MainBoard = () => {
  const { getFilteredTasks, updateTaskStatus } = useTaskStore();
  const [activeId, setActiveId] = useState<number | null>(null);

  // Hydration state to avoid SSR issues
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const filteredTask = getFilteredTasks();
  const swimlaneData = useMemo(() => {
    return SWIMLANES.map((lane) => ({
      ...lane,
      tasks: filteredTask.filter((task) => task.status === lane.id),
    }));
  }, [filteredTask]);

  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find which swimlane a task belongs to
  const findContainer = (id: number | string): TaskStatus | null => {
    const taskId = typeof id === "string" ? parseInt(id) : id;
    const task = filteredTask.find((t) => t.id === taskId);
    return task?.status || null;
  };

  // Find swimlane by droppable id (title)
  const findSwimlaneByTitle = (title: string): TaskStatus | null => {
    const swimlane = SWIMLANES.find((lane) => lane.title === title);
    return swimlane?.id || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    //TODO
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id;

    // Determine target swimlane
    let targetStatus: TaskStatus | null = null;

    // Check if dropping on a swimlane (over.id is swimlane title)
    if (typeof overId === "string") {
      targetStatus = findSwimlaneByTitle(overId);
    } else {
      // Dropping on another task, find that task's swimlane
      targetStatus = findContainer(overId);
    }

    if (!targetStatus) return;

    const currentTask = filteredTask.find((t) => t.id === activeId);
    if (!currentTask) return;

    // Only update if status actually changed
    if (currentTask.status !== targetStatus) {
      updateTaskStatus(activeId, targetStatus);
    }
  };

  const activeTask = activeId
    ? filteredTask.find((t) => t.id === activeId)
    : null;

  if (!hydrated) {
    return <div>Loading...</div>;
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row justify-between items-start p-4 space-x-4 bg-gray-100 min-h-screen text-sm">
        {swimlaneData.map((lane) => (
          <Swimlane
            key={lane.id}
            id={lane.id}
            title={lane.title}
            tasks={lane.tasks}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <DraggableTask
            id={activeTask.id}
            task={activeTask}
            isDragging={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default MainBoard;
