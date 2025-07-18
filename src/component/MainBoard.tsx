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
import { MoreHorizontal } from "@/assets/icons";

const SWIMLANES = [
  { id: "to-do" as TaskStatus, title: "To do" },
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
      <div className="h-full w-full">
        <table className="h-full w-full table-fixed text-sm p-4 border border-gray-300">
          <colgroup>
            {swimlaneData.map((lane) => (
              <col key={lane.id} className="w-1/4 min-w-[300px]" />
            ))}
          </colgroup>
          <thead>
            <tr>
              {swimlaneData.map((lane) => (
                <th
                  key={lane.id}
                  className="px-4 py-2 text-left border-b border-r border-gray-300 last:border-r-0"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="flex flex-row justify-between items-center ">
                    <span
                      className="inline-block rounded-full px-3 py-1 font-semibold"
                      style={{
                        backgroundColor:
                          laneColors[lane.id as keyof typeof laneColors] ||
                          laneColors.default,
                        color: lane.id === "rejected" ? "#ffffff" : "#353945",
                      }}
                    >
                      {lane.title}
                    </span>
                    <div className="flex flex-row items-center gap-2 text-xs text-gray-500">
                      <span
                        className="cursor-pointer font-light text-xl hover:text-gray-700 "
                        title="Add Task"
                      >
                        +
                      </span>
                      <MoreHorizontal />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {swimlaneData.map((lane) => (
                <td
                  key={lane.id}
                  className="align-top px-4 py-2 h-[500px] border-r border-gray-300 last:border-r-0 border-b"
                  style={{ backgroundColor: "#F4F5F6" }}
                >
                  <div className="overflow-y-auto h-full">
                    <Swimlane
                      id={lane.id}
                      title={lane.title}
                      tasks={lane.tasks}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
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

const laneColors = {
  "to-do": "#e6e8ec",
  "in-progress": "#ffa800",
  approved: "#aee753",
  rejected: "#f90430",
  default: "#ffffff",
};
