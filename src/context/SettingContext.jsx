import { createContext, useState } from "react";

export const SettingContext = createContext({});

export default function Setting(props) {
  const [list, setList] = useState([]);
  const [activePage, setPage] = useState(1);
  // const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(3);
  const [isComplet, setIsComplet] = useState(false);
  const [checked, setChecked] = useState(false);

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    let myCounter = activePage;
    setPage(myCounter++);
    setList(items);
  }

  return (
    <SettingContext.Provider value={{ list,setList, activePage, toggleComplete,setPage,pageNum, setPageNum,isComplet, setIsComplet,checked, setChecked }}>
      {props.children}
    </SettingContext.Provider>
  );
}
