// import React from 'react';
// import {When} from 'react-if';

// import { LoginContext } from './context.jsx';

// class Auth extends React.Component {

//   static contextType = LoginContext;

//   render() {

//     const isLoggedIn = this.context?.loggedIn;
//     const canDo = this.props.capability ? this.context.can(this.props.capability) : true;
//     const okToRender = isLoggedIn && canDo;
// // console.log;
//     return (
//       <When condition={okToRender}>
//         {this.props.children}
//       </When>
//     );
//   }
// }

// export default Auth;
import  { useContext } from 'react';
import {When} from 'react-if';

import { LoginContext } from './context';

function Auth (props) {

  const loginSetting = useContext(LoginContext);


    const isLoggedIn = loginSetting?.state?.loggedIn;
    const canDo = props.capability ? loginSetting.can(props.capability) : true;
    const okToRender = isLoggedIn && canDo;

    return (
      <When condition={okToRender}>
        {props.children}
      </When>
    );
  }

export default Auth;