import { createContext, useState } from "react";
export const ListsContext = createContext({});
import { v4 as uuid } from "uuid";

export default function Lists(props) {
  const [list, setList] = useState([]);

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items)

  }
  function addItem(item) {
    item.complete = false;
    item.id=uuid();

    setList([...list,item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  return (
    <ListsContext.Provider value={{ list,setList, toggleComplete,addItem,deleteItem}}>
      {props.children}
    </ListsContext.Provider>
  );
}
