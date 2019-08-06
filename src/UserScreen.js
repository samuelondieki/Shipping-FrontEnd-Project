import React from "react";
import BoxDimension from "./BoxDimension";
import ConfirmCode from "./ConfirmCode";
import SignIn from "./SignIn";
import Display from "./Display";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "sign",
      userBoxes:{},
    };
  }

  changeScreen = (newScreen = "") => {
    if (newScreen !== "") this.setState({ screen: newScreen });
  };

  render() {
    return (
      <div>
        {this.state.screen === "sign" && (
          <SignIn changeScreen={this.changeScreen}  />
        )}
        {this.state.screen === "box" && (
          <BoxDimension changeScreen={this.changeScreen} />
        )}
        {this.state.screen === "confirm" && (
          <ConfirmCode changeScreen={this.changeScreen} />
        )}
        {this.state.screen === "Display" && (
          <Display changeScreen={this.changeScreen} box={this.state.userBoxes}/>
        )}
      </div>
    );
  }
}

export default UserScreen;
