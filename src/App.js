import React from "react";
import BoxDimension from "./BoxDimension";
import SignIn from "./SignIn";
import ConfirmCode from "./ConfirmCode";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SignIn />
        {/* <ConfirmCode /> */}
        
      </div>
    );
  }
}

export default App;
