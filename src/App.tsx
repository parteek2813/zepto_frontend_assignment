import { KeyboardEvent, useState } from "react";
import UserInput from "./components/UserInput/UserInput";
import Dropdown from "./components/Dropdown/Dropdown";
import Chips from "./components/ChipComponent/Chips";
import ChipData from "./props/ChipData";
import usersData from "./data/usersData";

function App() {
  const [items, setItems] = useState<ChipData[]>(usersData);
  const [inputValue, setInputValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [chips, setChips] = useState<ChipData[]>([]);
  const [highilightChip, setHighilightChip] = useState<ChipData | null>();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setHighilightChip(null);
  }

  function toggleModal() {
    setShowModal((value) => !value);
    console.log(showModal);
  }

  function handleChipClick(item: ChipData) {
    setChips((prevChips) => [...prevChips, item]);
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setInputValue("");
    toggleModal();
    setHighilightChip(null);
  }

  const removeChip = (item: ChipData) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== item.id));
    setItems((prevItems) => [...prevItems, item]);
  };

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      if (highilightChip) {
        const lastChip = chips[chips.length - 1];
        removeChip(lastChip);
        setHighilightChip(null);
      } else {
        setHighilightChip(chips[chips.length - 1]);
      }
    }
  }

  return (
    <div className="text-center items-center flex flex-col">
      <h1 className="text-3xl pt-10 pb-10 text-blue-800 font-serif font-bold">
        Pick Users
      </h1>
      <div className="flex items-center flex-wrap gap-2 border-b-blue-800 border-b-[3px] w-[900px] max-sm:w-60 max-lg:w-[600px]">
        {chips.map((chip) => (
          <Chips
            key={chip.id}
            item={chip}
            onRemove={() => removeChip(chip)}
            highlightedChip={highilightChip}
          />
        ))}
        <UserInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onClick={toggleModal}
        >
          {showModal && (
            <Dropdown
              items={items}
              inputValue={inputValue}
              onItemClick={handleChipClick}
            />
          )}
        </UserInput>
      </div>
    </div>
  );
}

export default App;
