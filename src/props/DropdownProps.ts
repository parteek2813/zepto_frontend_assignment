import ChipData from "./ChipData";

type DropdownProps = {
  items: ChipData[];
  inputValue: string;
  onItemClick: (item: ChipData) => void;
};

export default DropdownProps;
