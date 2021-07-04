import React, { useState, useContext } from "react";
import * as MUI from "@material-ui/core";
import * as MUIcon from "@material-ui/icons";

import { sendMessage, clearMessage } from "../providers/Socket";
import { GlobalState } from "../providers/Global";

function Chat() {
  let chatList = useContext(GlobalState).messages;
  let userId = useContext(GlobalState).userId;

  let clear = () => {
    clearMessage();
  };

  return (
    <div>
      {!chatList
        ? "Loading..."
        : chatList.map((item, i) => (
            <MUI.Grid
              container
              direction="column"
              alignItems={item.id === userId ? "flex-end" : "flex-start"}
              key={i}
            >
              <small style={{ marginBottom: "5px" }} className="text-secondary">
                <strong>{item.name}</strong>
              </small>
              <MUI.Paper
                elevation={3}
                style={{
                  padding: 12,
                  background: "aquamarine",
                  maxWidth: "50%",
                  textAlign: "left",
                }}
              >
                {item.msg}
              </MUI.Paper>
              <br />
              <br />
            </MUI.Grid>
          ))}

      <MUI.Tooltip title="Clear" arrow>
        <MUI.IconButton
          style={{ position: "fixed", top: "10vh" }}
          onClick={clear}
        >
          <MUIcon.DeleteSharp color="secondary" />
        </MUI.IconButton>
      </MUI.Tooltip>
    </div>
  );
}

export function ChatInput() {
  let [message, setMessage] = useState("");

  let onType = (e) => {
    setMessage(e.target.value);
  };

  let onEnter = (e) => {
    if (e.key === "Enter") send();
  };

  let send = () => {
    if (!message) return false;
    setMessage("");

    sendMessage(message); //socket send

    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  };

  return (
    <MUI.FormControl
      fullWidth
      style={{
        background: "white",
        position: "fixed",
        padding: "0 20px 0 20px",
        left: "0",
        top: "auto",
        bottom: "80px",
        width: "95%",
      }}
    >
      <MUI.Input
        value={message}
        onKeyPress={onEnter}
        onChange={onType}
        placeholder="Type here..."
        endAdornment={
          <MUI.InputAdornment position="end">
            <MUI.Button onClick={send}>
              <MUIcon.Send />
            </MUI.Button>
          </MUI.InputAdornment>
        }
      />
    </MUI.FormControl>
  );
}

export default Chat;
