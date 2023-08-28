import { useEffect, useState, useContext } from "react";
import "./todo.scss";
import useForm from "../../hooks/form.jsx";

import { v4 as uuid } from "uuid";
import { Container, Pagination } from "@mantine/core";
import List from "../list/list.jsx";
import { SettingContext } from "../../context/SettingContext";
const ToDo = () => {
  const { list,counterPage, setList, toggleComplete, } = useContext(SettingContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Container size="md" px="xs">
        <header>
          <h1>To Do List: {incomplete} items pending</h1>
        </header>
      </Container>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input
              onChange={handleChange}
              name="text"
              type="text"
              placeholder="Item Details"
            />
          </label>

          <label>
            <span>Assigned To</span>
            <input
              onChange={handleChange}
              name="assignee"
              type="text"
              placeholder="Assignee Name"
            />
          </label>

          <label>
            <span>Difficulty</span>
            <input
              onChange={handleChange}
              defaultValue={defaultValues.difficulty}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </label>

          <label>
            <button type="submit">Add Item</button>
          </label>
        </form>
      </div>

      <div className="myGrid">
        {list.map((item) => (
          <List item={item} toggleComplete={toggleComplete} key={item.id} />
        ))}
      </div>
      <Pagination total={list < 2 ? 1 : Math.ceil(list.length / 3)} />
    </>
  );
};

export default ToDo;
