import React from "react";
import BoxDimension from "./BoxDimension";
import ConfirmCode from "./ConfirmCode";
import SignIn from "./SignIn";

import Report from "./Report";
import Styling from "./Styling";
import BoxReport from "./BoxReport";
import UpdateBox from "./UpdateBox";


class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "sign",
      boxes: {},
      userToken: "",
      boxEditing: {},
      ProcessID: ""

    };
  }
  //function to change page on app
  changeScreen = (newScreen = "") => {
    if (newScreen !== "") this.setState({ screen: newScreen });
  };


  onTokenChange = token => {
    this.setState({ userToken: token });
  };

  onProcessIdChange = Process_ID => {
    this.setState({ ProcessID: Process_ID });
  };

  changetoEdit = box => {
    this.setState({ boxEditing: box });
    this.setState({ screen: "box_update" });
  };


  render() {
    return (
      <div>
        {this.state.screen === "sign" && (

          <SignIn
            changeScreen={this.changeScreen}
            box={this.state.token}
            onTokenChange={this.onTokenChange}
            userToken={this.state.userToken}
          />
        )}
        {this.state.screen === "dashboard" && (
          <Styling
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
          />
        )}
        {this.state.screen === "box" && (
          <BoxDimension
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
          />
        )}
        {this.state.screen === "confirm" && (
          <ConfirmCode
            changeScreen={this.changeScreen}
            onTokenChange={this.onTokenChange}
          />
        )}
        {this.state.screen === "report" && (
          <Report
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
          />
        )}
        {this.state.screen === "box_report" && (
          <BoxReport
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            changetoEdit={this.changetoEdit}
          />
        )}
        {this.state.screen === "box_update" && (
          <UpdateBox
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
            box={this.state.boxEditing}
          />
       
        {this.state.screen === "Display" && (
          <Display changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>
        )}
        {this.state.screen === "addcharge" && (
          <AdditionalCharges changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>
        )}
        {this.state.screen === "location" && (
          <Location changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
        )
      </div>
    );
  }
}

export default UserScreen;
