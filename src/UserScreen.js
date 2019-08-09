import React from "react";
import BoxDimension from "./BoxDimension";
import ConfirmCode from "./ConfirmCode";
import SignIn from "./SignIn";
import Display from "./Display";
import AdditionalCharges from "./AdditionalCharges";
import Location from "./Location";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "sign",
      boxes:{},
      userToken:"",
      processID:"",
    };
  }
  //function to change page on app
  changeScreen = (newScreen = "") => {
    if (newScreen !== "") this.setState({ screen: newScreen });
  };

  //add function to export the token 
  onTokenChange = token => {
    this.setState({userToken:token});
  };

  //add function to export process ID
  onProcessIdChange = Process_ID => {
    this.setState({ProcessID:Process_ID})
  }

  render() {
    return (
      <div>
        {this.state.screen === "sign" && (
          <SignIn 
          changeScreen={this.changeScreen}  
          box={this.state.token}
          onTokenChange={this.onTokenChange} />
        )}
        {this.state.screen === "box" && (
          <BoxDimension 
          changeScreen={this.changeScreen}  
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange} />
        )}
        {this.state.screen === "confirm" && (
          <ConfirmCode 
          changeScreen={this.changeScreen}   
          onTokenChange={this.onTokenChange}/>
        )}
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
