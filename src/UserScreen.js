import React from "react";
import BoxDimension from "./BoxDimension";
import ConfirmCode from "./ConfirmCode";
import SignIn from "./SignIn";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "sign"
    };
  }

  changeScreen = (newScreen = "") => {
    if (newScreen !== "") this.setState({ screen: newScreen });
  };

  render() {
    return (
      <div>
        {this.state.screen === "sign" && (
          <SignIn changeScreen={this.changeScreen} />
        )}
        {this.state.screen === "box" && (
          <BoxDimension changeScreen={this.changeScreen} />
        )}
        {this.state.screen === "confirm" && (
          <ConfirmCode changeScreen={this.changeScreen} />
        )}
      </div>
    );
  }
}

export default UserScreen;
