import { useContext } from "react";
import { Card, Text, CloseButton, Group } from "@mantine/core";
import { ListsContext } from "../../context/ListContext";
import Auth from '../auth/auth';

export default function List({ item }) {
  const { toggleComplete, deleteItem } = useContext(ListsContext);
  return (
    <>
      <Card
        p="xl"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="card-item"
      >
        <Card.Section className="card-close-flex" withBorder>
          <div>
            <span
              className={`divname ${item.complete ? "dangerous" : "sucess"}`}
            >
              {item.complete ? "Complete" : "Pending"}
            </span>
            <span className="namSpan">{item.assignee}</span>
          </div>
          <Group position="right">
            <Auth capability="delete">
            <CloseButton
              title="Close popover"
              onClick={() => deleteItem(item.id)}
            />
            </Auth>
          </Group>
        </Card.Section>
        <Text>Difficulty: {item.difficulty}</Text>

        <div
          onClick={() => {
            toggleComplete(item.id);
          }}
        >
          Complete: {item.complete.toString()}
        </div>
      </Card>
    </>
  );
}
