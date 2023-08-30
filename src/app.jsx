import React from "react";
import "./app.scss";

import ToDo from "./components/todo/todo.jsx";
import { MantineProvider } from "@mantine/core";
import Setting from "./context/SettingContext.jsx";
import Lists from "./context/ListContext";

export default class App extends React.Component {
  render() {
    return (
      <>
        <MantineProvider>
          <Setting>
            <Lists>
              <nav className="primaryColor">
                <a href="#">
                  <h1>Home</h1>
                </a>
              </nav>
              <ToDo />
            </Lists>
          </Setting>
        </MantineProvider>
      </>
    );
  }
}
