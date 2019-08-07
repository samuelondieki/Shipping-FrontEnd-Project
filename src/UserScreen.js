import React from "react";
import BoxDimension from "./BoxDimension";
import ConfirmCode from "./ConfirmCode";
import SignIn from "./SignIn";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "sign",
      boxes: {},
      userToken:""
    };
  }

  changeScreen = (newScreen = "") => {
    if (newScreen !== "") this.setState({ screen: newScreen });
  };

  onTokenChange = token => {
    this.setState({ userToken: token });
  };

  render() {
    return (
      <div>
        {this.state.screen === "sign" && (
          <SignIn
            changeScreen={this.changeScreen}
            box={this.state.token}
            onTokenChange={this.onTokenChange}
          />
        )}
        {this.state.screen === "box" && (
          <BoxDimension
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
          />
        )}
        {this.state.screen === "confirm" && (
          <ConfirmCode changeScreen={this.changeScreen} />
        )}
      </div>
    );
  }
}

export default UserScreen;
