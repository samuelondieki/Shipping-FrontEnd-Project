import React from "react";
import BoxDimension from "./BoxDimension";
import ConfirmCode from "./ConfirmCode";
import SignIn from "./SignIn";
import AdditionalCharges from "./AdditionalCharges";
import Location from "./Location"
import Report from "./Report";
import Styling from "./Styling";
import BoxReport from "./BoxReport";
import UpdateBox from "./UpdateBox";
import PalletSize from "./PalletSize";
import CurrentPallet from "./CurrentPallet";
import CurrentPrice from "./CurrentPrice";
import ShipmentPrice from "./ShipmentPrice";
import SingleReport from "./SingleReport";

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

  onProcessIdChange = processID => {
    this.setState({ ProcessID: processID });
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
            onProcessIdChange={this.onProcessIdChange}
          />
        )}
        
        {this.state.screen === "dashboard" && (
          <Styling
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
            box={this.state.boxEditing}
          />
        )}
        {this.state.screen === "box" && (
          <BoxDimension
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
            box={this.state.boxEditing}
          />
        )}
        {this.state.screen === "confirm" && (
          <ConfirmCode
            changeScreen={this.changeScreen}
            onTokenChange={this.onTokenChange}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
            box={this.state.boxEditing}
          />
        )}
        {this.state.screen === "report" && (
          <Report
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
            box={this.state.boxEditing}
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
        )}
        )}
        {this.state.screen === "addcharge" && (
          <AdditionalCharges
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            onTokenChange={this.onTokenChange}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
          />
        )}
        {this.state.screen === "location" && (
          <Location
            changeScreen={this.changeScreen}
            userToken={this.state.userToken}
            onTokenChange={this.onTokenChange}
            onProcessIdChange={this.onProcessIdChange}
            ProcessID={this.state.ProcessID}
          />
        )}
        {this.state.screen === "PalletSize" && (
          <PalletSize changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
        {this.state.screen === "Pallet" && (
          <CurrentPallet changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
        {this.state.screen === "currentprice" && (
          <CurrentPrice changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
        {this.state.screen === "price" && (
          <ShipmentPrice changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
        {this.state.screen === "singlereport" && (
          <SingleReport changeScreen={this.changeScreen}  
          userToken={this.state.userToken}
          onTokenChange={this.onTokenChange}
          onProcessIdChange={this.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
      </div>
    );
  }
}

export default UserScreen;
