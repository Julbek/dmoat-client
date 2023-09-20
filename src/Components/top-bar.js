import "./top-bar-styles.css";
import { useState, useEffect } from "react";


//Top Bar containing sidebar and add chat buttons. When chat session is opened, it also shows the chat tittle currently active

export default function TopBar({
  currentChat,
  chatSessionOpen,
  SidebarHandler,
  sidebarCollapsed,
  currentTheme,
  setChatSessionOpen,
}) {
  let [sidebarBarButtonState, setSideBarButtonState] = useState("");

  useEffect(() => {
    if (!sidebarCollapsed) {
      setSideBarButtonState((prevSideBarButtonState) => " hide");
    } else {
      setSideBarButtonState("");
    }
  }, [chatSessionOpen, sidebarCollapsed]);


  return (
    <div
      className={sidebarCollapsed ? "top-bar-wrap fullscreen" : "top-bar-wrap"}
    >
      <div
        className={`sidebar-button${sidebarBarButtonState}`}
        onClick={() => SidebarHandler()}
      >
        <img
          className="sidebar-icon"
          src={`./assets/sidebar_icon_${currentTheme}.png`}
        ></img>
      </div>

      <h1 className="chat-title">
        {!chatSessionOpen ? "" : currentChat.title}
      </h1>

      <div
        className={chatSessionOpen ? "add-button" : "add-button inactive"}
        onClick={() => setChatSessionOpen((prevChatSessionOpen) => false)}
      >
        <img
          className="add-icon"
          src={`assets/add_icon_${currentTheme}.png`}
        ></img>
      </div>
    </div>
  );
}
