import React from "react";
import "./app.scss";
import ToDo from "./components/todo/todo.jsx";
import { MantineProvider } from "@mantine/core";
import Setting from "./context/SettingContext.jsx";
import Lists from "./context/ListContext";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import SettingsForm from "./components/settingsForm/SettingsForm";
import LoginContext from "./components/auth/context";
import Auth from "./components/auth/auth";

export default function App() {
        // const async response = await superagent
        // .post(`https://localhost:4000/signin`)
        // .set(
        //   "authorization",
        //   `Basic ${base64.encode(`User:user`)}`
        // );
  return (
    <>
      <LoginContext>
        <MantineProvider>
          <Header />
          <Auth >
            <Setting>
              <Lists>
                <Routes>
                  <Route path="/" element={<ToDo />} />
                  <Route path="/settings" element={<SettingsForm />} />
                </Routes>
              </Lists>
            </Setting>
          </Auth>
        </MantineProvider>
      </LoginContext>
    </>
  );
}
