"use client";
import useTaskStore from "@/stores/taskStore";

const SearchBox = () => {
  const { setSearchQuery } = useTaskStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search tasks..."
        className="bg-gray-100 h-12  rounded px-3 py-1 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBox;
