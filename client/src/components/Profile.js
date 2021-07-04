import React, { useContext } from "react";
import { GlobalState } from "../providers/Global";
import * as MUI from "@material-ui/core";

import { changeProfile } from "../providers/Socket";

function Profile() {
  let globalState = useContext(GlobalState);

  let changeDisplayName = (e) => {
    globalState.setDisplayName(e.target.value);
  };

  let applyChangeToServer = () => {
    changeProfile(globalState.displayName);
  };

  return (
    <>
      <MUI.FormControl style={{ marginTop: "30vh", marginBottom: "30vh" }}>
        <MUI.TextField
          id="outlined-basic"
          // color="inherit"
          size="medium"
          label="Display Name"
          aria-describedby="component-helper-text"
          value={globalState.displayName}
          onChange={changeDisplayName}
          onBlur={applyChangeToServer}
        />
        <MUI.FormHelperText id="component-helper-text">
          Change your display name here.
        </MUI.FormHelperText>
      </MUI.FormControl>
    </>
  );
}

export default Profile;
