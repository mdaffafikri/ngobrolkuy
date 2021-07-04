import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as MUI from "@material-ui/core";
import * as MUIcon from "@material-ui/icons";

import Chat, { ChatInput } from "./Chat";
import MemberDrawer from "./MemberDrawer";

//provider
import { GlobalState } from "../providers/Global";
import {
  initiateSocket,
  disconnectSocket,
  getOnlineUser,
  getUserProfile,
  getMember,
  getMessages,
} from "../providers/Socket";

//page
import Profile from "./Profile";

function Room() {
  const [userId, setId] = useState("");
  const [displayName, setDisplayName] = useState("");

  const rooms = ["A", "B", "C"];
  // eslint-disable-next-line
  const [room, setRoom] = useState(rooms[0]);

  let [member, setMember] = useState([]);

  let [onlineUser, setOnlineUser] = useState(0);

  let [messages, setMessages] = useState();

  useEffect(
    () => {
      if (room) {
        initiateSocket(room);
      }

      getUserProfile((err, data) => {
        if (err) return;

        setId(data.id);
        setDisplayName(data.name);
      });

      getMember((err, data) => {
        if (err) return;

        setMember(data);
      });

      getOnlineUser((err, data) => {
        if (err) return;

        setOnlineUser(data);
      }); //subscribe

      getMessages((err, data) => {
        if (err) return;
        setMessages(data);
      });
      return () => {
        disconnectSocket();
      };
    }, // eslint-disable-next-line
    []
  );

  return (
    <div>
      <GlobalState.Provider
        value={{
          userId,
          setId,
          displayName,
          setDisplayName,
          member,
          setMember,
          messages,
          onlineUser, //temp
        }}
      >
        <Router>
          <MUI.AppBar style={{ background: "#009688", position: "fixed" }}>
            <MUI.Toolbar color="secondary">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3>NgobrolKuy</h3>
                <MemberDrawer></MemberDrawer>
              </div>
            </MUI.Toolbar>
          </MUI.AppBar>

          <MUI.Container>
            <div style={{ paddingTop: "72px", paddingBottom: "72px" }}>
              <Switch>
                <Route exact path="/">
                  <Chat></Chat>
                </Route>
                <Route exact path="/profile" component={Profile} />
              </Switch>
            </div>
          </MUI.Container>

          <Switch>
            <Route exact path="/">
              <ChatInput></ChatInput>
            </Route>
          </Switch>

          <MUI.AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
            <MUI.BottomNavigation showLabels style={{ background: "#009688" }}>
              <MUI.BottomNavigationAction
                component={Link}
                to="/"
                style={{ color: "white" }}
                label="Chat"
                value="chat"
                icon={<MUIcon.ChatSharp />}
              />

              <MUI.BottomNavigationAction
                component={Link}
                to="/profile"
                style={{ color: "white" }}
                label="Profile"
                value="profile"
                icon={<MUIcon.AccountBoxSharp />}
              />
            </MUI.BottomNavigation>
          </MUI.AppBar>
        </Router>
      </GlobalState.Provider>
    </div>
  );
}

export default Room;
