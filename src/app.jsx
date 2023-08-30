import React from "react";
import "./app.scss";

import ToDo from "./components/todo/todo.jsx";
import { MantineProvider } from "@mantine/core";
import Setting from "./context/SettingContext.jsx";
import Lists from "./context/ListContext";
import { Route, Routes } from "react-router-dom";
import Header from './components/header/header';
import SettingsForm from "./components/settingsForm/SettingsForm";

export default class App extends React.Component {
  render() {
    return (
      <>

        <MantineProvider>
          <Setting>
            <Lists>
            <Header/>
              <Routes>
                <Route path="/" element={<ToDo/> }/>
                <Route path="/settings" element={<SettingsForm/> }/>
            </Routes>
            </Lists>
          </Setting>
        </MantineProvider>
      </>
    );
  }
}
