import React from "react";
import BoxDimension from "./BoxDimension";
import SignIn from "./SignIn";
import ConfirmCode from "./ConfirmCode";
import UserScreen from "./UserScreen";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        
<UserScreen/>
        {/* <SignIn /> */}
        {/* <ConfirmCode/> */}
        {/* <BoxDimension/> */}
      </div>
    );
  }
}

export default App;
