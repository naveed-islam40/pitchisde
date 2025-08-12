import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { sortPlayerStats } from "./StatsSorting";
import clsx from "clsx";

const FirstColumn = ({
  activeToggle,
  sortConfig,
  setSortConfig,
  playerRows,
  setPlayerRows,
}) => {
  const columns = {
    rating: "Rating",
    age: "Age",
    country: "Country",
  };

  const handleSort = (key) => {
    let isAscending = true;

    if (sortConfig.header === columns[key]) {
      isAscending = !sortConfig.isAscending;
    }

    const sorted = sortPlayerStats(playerRows, key, isAscending);
    setPlayerRows(sorted);
    setSortConfig({ header: columns[key], isAscending });
  };

  const renderSortableHeader = (key) => (
    <th
      scope="col"
      className="w-32 px-2 border-r last:border-r-0 border-gray-300 whitespace-normal break-words text-center leading-4"
      onClick={() => handleSort(key)}
    >
      <div className="flex items-center justify-center flex-col">
        {columns[key]}
        {/* <IoMdArrowDropdown
          className={clsx(
            sortConfig.header === columns[key] && sortConfig.isAscending
              ? "rotate-180"
              : "rotate-0"
          )}
          title="text-center"
        /> */}
      </div>
    </th>
  );

  return <>{renderSortableHeader(activeToggle)}</>;
};

export default FirstColumn;
