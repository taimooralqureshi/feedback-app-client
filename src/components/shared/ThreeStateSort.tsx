import { useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";

export enum SORT_STATE {
  NONE = "none",
  ASC = "asc",
  DESC = "desc",
}

export type SortStateType = (typeof SORT_STATE)[keyof typeof SORT_STATE];

type ThreeStateSortProps = {
  onSortChange: (sortState: SortStateType) => void;
  label: string;
};

const ThreeStateSort: React.FC<ThreeStateSortProps> = ({
  onSortChange,
  label,
}) => {
  const [sortState, setSortState] = useState<SortStateType>(SORT_STATE.NONE);
  const states: SortStateType[] = Object.values(SORT_STATE) as SortStateType[];

  const toggleSortState = () => {
    const nextState = states[(states.indexOf(sortState) + 1) % states.length];
    setSortState(nextState);
    onSortChange(nextState);
  };

  const getIcon = () => {
    switch (sortState) {
      case SORT_STATE.ASC:
        return <HiOutlineArrowNarrowUp />;
      case SORT_STATE.DESC:
        return <HiOutlineArrowNarrowDown />;
      default:
        return <LuArrowUpDown />;
    }
  };

  return (
    <button
      className={`pill flex items-center gap-1 ${
        sortState !== SORT_STATE.NONE && "pill-selected"
      }`}
      onClick={toggleSortState}
    >
      {getIcon()} {label}
    </button>
  );
};

export default ThreeStateSort;
