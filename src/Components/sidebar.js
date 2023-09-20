import "./sidebar-styles.css";
import { useState, useEffect } from "react";


//The following SideBar component offers the following features: New Chat Button, Chats History, Basic Settings

export default function SideBar({
  SidebarHandler,
  sidebarCollapsed,
  chatsHistory,
  currentChat,
  JumpToChat,
  DeleteChat,
  StartNewChat,
  currentTheme,
  ThemeHandler,
  AboutToggle,
}) {
  let [deletingChatId, setDeletingChatId] = useState(null);

  function DelettingToggle(id) {
    if (deletingChatId === id) {
      setDeletingChatId(null); 
    } else {
      setDeletingChatId(id); 
    }
  } // This method track of the chat to be deleted and at the same time defines the moment between asking for deletion and confirming (or revert) it. 

  let ThemeSelector = () => {
    return (
      <div className="theme-selector-wrap">
        <label className="theme-selector-label">[*]Theme</label>
        <div className="theme-buttons-wrap">
          <button
            className={
              currentTheme === "dark" ? "theme-button selected" : "theme-button"
            }
            key={0}
            onClick={() => ThemeHandler("dark")}
          >
            Dark
          </button>
          <button
            className={
              currentTheme === "light"
                ? "theme-button selected"
                : "theme-button"
            }
            key={1}
            onClick={() => ThemeHandler("light")}
          >
            Light
          </button>
        </div>
      </div>
    );
  }; //This internal component allows the selection of dark/light UI theme through ThemeHandler method.

  let ChatHistoryElement = ({ chatTitle, currentChat, id }) => {
    return deletingChatId !== id ? (
      <div
        key={id}
        className={
          id === currentChat.id
            ? "chat-history-el active"
            : "chat-history-el"
        }
      > <div className="chat-title-text-wrap" onClick={() => JumpToChat(id)}>
        <h1
          className={
            id === currentChat.id
              ? "chat-title-text active"
              : "chat-title-text"
          }
        >
          {chatTitle}
        </h1></div>
        <div className="delete-button-wrap" onClick={() => DelettingToggle(id)}>
          <img
            className={
              id === currentChat.id
                ? "delete-button inverted"
                : "delete-button hidden"
            }
            src={`./assets/delete_icon_${currentTheme}.png`}
          ></img>
        </div>
      </div>
    ) : (
      <div key={id} className="chat-history-el deleting">
        <h1 className="chat-title-text deleting">Delete this chat?</h1>
        <h1
          className="chat-title-text deleting option"
          onClick={() => DeleteChat(id)}
        >
          Yes
        </h1>
        <h1 className="chat-title-text deleting">/</h1>
        <h1
          className="chat-title-text deleting option"
          onClick={() => DelettingToggle()}
        >
          No
        </h1>
        <img
          className={
            id === currentChat.id
              ? "delete-button hidden"
              : "delete-button"
          }
          src={`./assets/delete_icon_${currentTheme}.png`}
        ></img>
      </div>
    );
  }; /*Single component rappresenting each chat opened by the user at the chats History section
  It shows the title of the chat and  allows selection and deletion of itself though JumpToChat 
  and DeleteChat methods at the App level (described at App.js)*/

  return (
    <div className={`sidebar-wrap${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="sidebar-top-section">
        <div className="side-bar-top-section-group">
          <div className="new-chat-button" onClick={() => StartNewChat()}>
            <a className="new-chat-text">[+] New Chat</a>
          </div>

          <div className="sidebar-close-button" onClick={() => SidebarHandler()}>
            <img
              className="close-icon"
              src= {`./assets/sidebar_icon_${currentTheme}.png`}
            ></img>
          </div>
        </div>
      </div>

      <div className="sidebar-chat-history-section">
        {chatsHistory.length > 0 ? (
          chatsHistory.map((chat) => {
            return (
              <ChatHistoryElement
                key={chat.id}
                id={chat.id}
                chatTitle={chat.title}
                currentChat={currentChat}
              />
            );
          })
        ) : (
          <div className="no-history">
            {" "}
            <p>No Chat History yet</p>
          </div>
        )}
      </div>

      <div className="sidebar-bottom-section">
        <div className="sidebar-bottom-section-group">
          <ThemeSelector />
          <div className="horizontal-line"></div>
          <a className="about-ancor" onClick={() => AboutToggle()}>
            [i]About Dmoat
          </a>
        </div>
      </div>
    </div>
  ); /* In the sidebar component rendering 1) The new chat button calls the NewChat method. 2)A sidebar button allows to collapse
  the sidebar again through SideBarHandler. 3) the chatHistory state variable gets iterated in order to feed the relevant
  data to each chatsHistoryElement instance. 4) In the bottom section is reserved for theme selection and about page ancor*/
}
