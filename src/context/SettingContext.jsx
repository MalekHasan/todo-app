import { createContext, useState } from "react";

export const SettingContext = createContext({});

export default function Setting(props) {
  const [list, setList] = useState([]);
  const [counterPage, setCounterPage] = useState(1);
  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    let myCounter = counterPage;
    setCounterPage(myCounter++);
    setList(items);
  }

  return (
    <SettingContext.Provider value={{ list,counterPage, setList, toggleComplete }}>
      {props.children}
    </SettingContext.Provider>
  );
}
