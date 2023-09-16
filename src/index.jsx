import React from "react";
import ReactDOM from "react-dom";

import App from "./app.jsx";
import { BrowserRouter } from "react-router-dom";
class Main extends React.Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
// <LoginContext>
// <Login />

// <Auth>
//   <div>Any valid user can see this</div>
// </Auth>

// <Auth capability="create">
//   <div>Users with create access can see this</div>
// </Auth>

// <Auth capability="update">
//   <div>Users with update access can see this</div>
// </Auth>

// <Auth capability="delete">
//   <div>Users with delete access can see this</div>
// </Auth>

// </LoginContext>