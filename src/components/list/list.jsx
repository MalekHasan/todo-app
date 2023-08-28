import { useContext } from "react";
import { Card, Text } from "@mantine/core";
import { SettingContext } from "../../context/SettingContext";

export default function List({ item }) {
  const { toggleComplete } = useContext(SettingContext);

  return (
    <>
      <Card p="xl">
        {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
        <Card.Section>Assigned to: {item.assignee}</Card.Section>

        {/* Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card */}
        <Text>Difficulty: {item.difficulty}</Text>

        {/* right, left margins are negative – -1 * theme.spacing.xl */}

        {/* bottom, right, left margins are negative – -1 * theme.spacing.xl */}
        <div onClick={() => toggleComplete(item.id)}>
          Complete: {item.complete.toString()}
        </div>
      </Card>
    </>
  );
}
