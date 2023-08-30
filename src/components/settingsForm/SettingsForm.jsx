import {
  Button,
  Card,
  Container,
  Grid,
  Switch,
} from "@mantine/core";

import React, { useContext } from "react";
import "./SettingsForm.scss";
import { SettingContext } from "../../context/SettingContext";
export default function SettingsForm() {
  const { checked, setChecked,setPageNum,pageNum } = useContext(SettingContext);

 function handleSubmit(e){
  e.preventDefault()
 }
  console.log(pageNum);
  return (
    <>
      <Container size="lg" px="xs">
        <header>
          <h1>To Do List: items pending</h1>
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
          <Grid.Col sm={6}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="card-form"
            >
              <Card.Section>
                <form onSubmit={handleSubmit}>
                  <h2>Add To Do Item</h2>
                  <Switch
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  />
                  <label>
                    <span>Item per Page</span>
                    <input onChange={(e)=>setPageNum(e.target.value)}
                      defaultValue={pageNum}
                      className="settingsInput"
                      type="number"
                      placeholder={pageNum}
                    />
                  </label>
                  <label>
                    <span>Sort Keyword</span>
                    <input 
                      className="settingsInput"
                      name="difficulty"
                      type="text"
                      placeholder="difficulty"
                    />
                  </label>
                  <label>
                    <span>Difficulty</span>
                    <input type="range" min={1} max={5} name="difficulty" />
                  </label>
                  <label>
                    <Button
                      type="submit"
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                    >
                      Show New Settings
                    </Button>
                  </label>
                </form>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col sm={6}>
          <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="card-form"
            >
              <Card.Section>
                    <h1>hi</h1>
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
