import React from "react";
import UserScreen from "./UserScreen";
import Styling from "./Styling";
class App extends React.Component {
  render() {
    return (
      <div>
        <UserScreen />
        <Styling />;
      </div>
    );
  }
}

export default App;
