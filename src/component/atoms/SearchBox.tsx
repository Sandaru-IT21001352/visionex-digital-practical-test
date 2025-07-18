"use client";
import useTaskStore from "@/stores/taskStore";

const SearchBox = () => {
  const { setSearchQuery } = useTaskStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
