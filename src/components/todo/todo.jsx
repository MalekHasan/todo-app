import { useEffect, useState, useContext } from "react";
import "./todo.scss";
import useForm from "../../hooks/form.jsx";

import { Button, Card, Container, Grid, Input, Pagination } from "@mantine/core";
import List from "../list/list.jsx";
import { SettingContext } from "../../context/SettingContext";
import { ListsContext } from '../../context/ListContext';

const ToDo = () => {
  const { activePage, toggleComplete, setPage,pageNum } =
    useContext(SettingContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const {  list,addItem } = useContext(ListsContext);

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);



  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Container size="lg" px="xs">
        <header>
          <h1>To Do List: {incomplete} items pending</h1>
        </header>
        <Grid
        gutter={5}
        gutterXs="md"
        gutterMd="xl"
        gutterXl={50}
        justify="flex-start"
        align="flex-start"
        className="grid-margin"
      >
        <Grid.Col  sm={4}>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="card-form" >
      <Card.Section>
      <form onSubmit={handleSubmit}>
            <h2>Add To Do Item</h2>

            <label>
              <span>To Do Item</span>
              <Input 
                className="input"
                onChange={handleChange}
                name="text"
                type="text"
                placeholder="Item Details"
              />
            </label>

            <label>
              <span>Assigned To</span>
              <Input 
                className="input"
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
              <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Add Item</Button>
            </label>
          </form>
      </Card.Section>
    </Card>
        </Grid.Col>
        <Grid.Col  sm={8} >
          {list.slice(activePage * pageNum - pageNum, activePage * pageNum).map((item, idx) => (
            <List item={item} toggleComplete={toggleComplete} key={idx} />
          ))}
        </Grid.Col>
      </Grid>
      </Container>

      <Pagination
        value={activePage}
        onChange={setPage}
        total={Math.ceil(list.length / pageNum) || activePage}
      />
    </>
  );
};

export default ToDo;
