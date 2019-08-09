import React from "react";
import UserScreen from "./UserScreen";
import Styling from "./Styling";
import SignIn from "./SignIn";

class App extends React.Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    console.log(isLoggedIn);
    return (
      <div>
        {/* {isLoggedIn ? (
          <Styling
            onTokenChange={this.props.onTokenChange}
            user={this.props.isLoggedIn}
          />
        ) : (
          <SignIn
            onTokenChange={this.props.onTokenChange}
            
          />
        )} */}
        <UserScreen />
      </div>
    );
  }
}

export default App;
