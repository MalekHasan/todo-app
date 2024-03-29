// import React from 'react';
// import cookie from 'react-cookies';
// import jwt_decode from 'jwt-decode';

// const testUsers = {
//   Administrator: {
//     password: 'admin',
//     name: 'Administrator',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
//   },
//   Editor: {
//     password: 'editor',
//     name: 'Editor',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
//   },
//   Writer: {
//     password: 'writer',
//     name: 'Writer',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
//   },
//   User: {
//     password: 'user',
//     name: 'User',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
//   },
// };

// export const LoginContext = React.createContext();

// class LoginProvider extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedIn: false,
//       can: this.can,
//       login: this.login,
//       logout: this.logout,
//       user: { capabilities: [] },
//       error: null,
//     };
//   }

//   can = (capability) => {
//     return this?.state?.user?.capabilities?.includes(capability);
//   }

//   login = async (username, password) => {
//     let { loggedIn, token, user } = this.state;
//     let auth = testUsers[username];

//     if (auth && auth.password === password) {
//       try {
//         this.validateToken(auth.token);
//       } catch (e) {
//         this.setLoginState(loggedIn, token, user, e);
//         console.error(e);
//       }
//     }
//   }

//   logout = () => {
//     this.setLoginState(false, null, {});
//   };

//   validateToken = token => {
//     try {
//       let validUser = jwt_decode(token);
//       this.setLoginState(true, token, validUser);
//     }
//     catch (e) {
//       this.setLoginState(false, null, {}, e);
//       console.log('Token Validation Error', e);
//     }

//   };

//   setLoginState = (loggedIn, token, user, error) => {
//     cookie.save('auth', token);
//     this.setState({ token, loggedIn, user, error: error || null });
//   };

//   componentDidMount() {
//     const qs = new URLSearchParams(window.location.search);
//     const cookieToken = cookie.load('auth');
//     const token = qs.get('token') || cookieToken || null;
//     this.validateToken(token);
//   }

//   render() {
//     return (
//       <LoginContext.Provider value={this.state}>
//         {this.props.children}
//       </LoginContext.Provider>
//     );
//   }
// }

// export default LoginProvider;
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import superagent from "superagent";
import base64 from "base-64";

// const testUsers = {
//   Administrator: {
//     password: "admin",
//     name: "Administrator",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ",
//   },
//   Editor: {
//    password: "editor",
//     name: "Editor",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s",
//   },
//   Writer: {
//     password: "writer",
//     name: "Writer",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68",
//   },
//   User: {
//     password: "user",
//     name: "User",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go",
//   },
// };
export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [state, setState] = useState({
    loggedIn: false,
    user: { capabilities: [] },
    error: null,
  });
  function can(capability) {
    return state?.user?.capabilities?.includes(capability);
  }

  async function login(username, password) {
    let { loggedIn, token, user } = state;
    try {
      const response = await superagent
          .post('https://auth-api-z0cf.onrender.com/signin')
          // .post('http://localhost:4000/signin')
          .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`)
      console.log("body>>>>>", response.body)
      validateToken(response.body.user);
    } catch (e) {
      setLoginState(loggedIn, token, user, e);
      console.error(e);
    }
  }

  function logout() {
    setLoginState(false, null, {});
  }

  function validateToken(body) {
    console.log(body);
    try {
      let validUser = jwt_decode(body.token);
      setLoginState(true, body.token, validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  }

  function setLoginState(loggedIn, token, user, error) {
    cookie.save("auth", token);
    setState({ token, loggedIn, user, error: error || null });
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
    // (JSON.parse(localStorage.getItem("todos")));
  }, []);

  return (
    <LoginContext.Provider value={{ state, can, login, logout }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
