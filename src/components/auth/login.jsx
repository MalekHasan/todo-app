// import React from 'react';
// import {When} from 'react-if';

// import { LoginContext } from './context';

// class Login extends React.Component {
//   static contextType = LoginContext;

//   constructor(props) {
//     super(props);
//     this.state = { username: '', password: '' };
//   }

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.context.login(this.state.username, this.state.password);
//   };

//   render() {
//     return (
//       <>
//         <When condition={this.context.loggedIn}>
//           <button onClick={this.context.logout}>Log Out</button>
//         </When>

//         <When condition={!this.context.loggedIn}>
//           <form onSubmit={this.handleSubmit}>
//             <input
//               placeholder="UserName"
//               name="username"
//               onChange={this.handleChange}
//             />
//             <input
//               placeholder="password"
//               name="password"
//               onChange={this.handleChange}
//             />
//             <button>Login</button>
//           </form>
//         </When>
//       </>
//     );
//   }
// }

// export default Login;

import  { useState, useContext } from "react";
import { When } from "react-if";

import { LoginContext } from "./context.jsx";
import { Button, Input } from "@mantine/core";

function Login() {
  const loginSetting = useContext(LoginContext);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });
//   const [password, setPassword] = useState("");
  function handleChange(e) {
    setUser({ ...user,[e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginSetting.login(user.username, user.password).then((result)=>'');
  }

  return (
    <>
      <When condition={loginSetting.state.loggedIn}>
        <Button color="red.6" onClick={loginSetting.logout}>Log Out</Button>
      </When>

      <When condition={!loginSetting.state.loggedIn}>
        <form onSubmit={handleSubmit} className="loginForm">
          <Input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <Button color="red.6" type="submit">Login</Button>
        </form>
      </When>
    </>
  );
}

export default Login;
