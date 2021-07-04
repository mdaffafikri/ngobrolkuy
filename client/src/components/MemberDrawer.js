import React, { useState, useContext } from "react";
import { GlobalState } from "../providers/Global";

import * as MUI from "@material-ui/core";
import * as MUIcon from "@material-ui/icons";

function MemberDrawer() {
  let [open, setOpen] = useState(false);
  let globalState = useContext(GlobalState);

  let openDrawer = (status) => {
    // console.log(globalState.member);
    setOpen(status);
  };

  return (
    <>
      <MUI.IconButton onClick={() => openDrawer(true)}>
        <MUI.Badge
          color="secondary"
          badgeContent={globalState.onlineUser}
          showZero
        >
          <MUIcon.PeopleSharp style={{ color: "white" }} />
        </MUI.Badge>
      </MUI.IconButton>
      <MUI.Drawer anchor="right" open={open} onClose={() => openDrawer(false)}>
        <h4>Online User</h4>
        <MUI.Grid container direction="column" alignItems="left">
          {globalState.member.map((item) => (
            <span key={item.id}> - {item.name}</span>
          ))}
        </MUI.Grid>
        <span style={{ position: "fixed", bottom: 20 }}>&copy; daps</span>
      </MUI.Drawer>
    </>
  );
}

export default MemberDrawer;
