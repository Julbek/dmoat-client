//Dependencies Imports

import "./App.css";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//Components Imports

import Dashboard from "./Components/dashboard"; // Or home page with brief introduction and a menu for selecting the GPT Personas
import BottomBar from "./Components/bottom-bar"; // Bottom Bar with input field and footer
import TopBar from "./Components/top-bar"; // Top Bar with sidebar and add chat button (and title of chat when opened)
import SideBar from "./Components/sidebar"; // Sidebar menu mainly for managing the chats that have been opened + basic app settings
import About from "./Components/about"; // DMoat about page
import ConversationScreen from "./Components/conversation-screen"; // The actual chat

//loca data imports 
import { themes } from "./Components/themes"; //Themes Data

function App() {
  
  
  //State Variables
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Responsible for collapsing/expanding the sidebar
  const [chatSessionOpen, setChatSessionOpen] = useState(false); // Responsible for Initiating/Closingchat Session
  const [currentGptPersona, setCurrentGptPersona] = useState(null); // Tracks the Gpt Persona active for conversing 
  const [chatsHistory, setChatsHistory] = useState([]); // Stores all the data regarding the history of each chat
  const [currentChat, setCurrentChat] = useState(null); // Stores the crucial data flowing from the active chat
  const [inputValue, setInputValue] = useState(""); // Stores in real-time the non yet submitted input value from the user
  const [userMessage, setUserMessage] = useState(""); // Store the final input value after submission
  const [aiResponse, setAiResponse] = useState("");  // Stores the response from the GPT API.
  const [messageSubmitted, setMessageSubmitted] = useState(false); // Tracks if the message was submitted or not.
  const [responseRecieved, setResponseRecieved] = useState(false); // Tracks if there was a succesful response from the API.
  const [gptPersonas, setGptPersonas] = useState(null); // Stores the available GPT personas to chat with (from the data store on the server)
  const [loadingPersonas, setLoadingPersonas] = useState(true); // Tracks if the personas are still being loaded or not. 
  const [responseData, setResponseData] = useState(null); // Stores the Data recieved from the API
  const [currentTheme, setCurrentTheme] = useState("dark"); // Tracks the current colour theme
  const [showAbout, setShowAbout] = useState(false); // Toggle variable for unmounting chat and mounting the about page (and viceversa).
  const [error, setError] = useState(null); //Stores eventual error message
  const [count, setCount] = useState(0); // Counts the total number of messages sent from user. 


  //variables 
  const messageTime = new Date().toISOString();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  //COLOUR THEME
  function ThemeHandler(newTheme) {
    setCurrentTheme(newTheme);
  } // Function for changing current theme though the sidebar selector. Once currentTheme changes, it triggers the following useEffect to do the actual changes.

  function SidebarHandler() {
    setSidebarCollapsed((prevState) => !prevState); // Toggles the collapse/Expansion of the sidebar
  }

  function AboutToggle() {
    setShowAbout((prevShowAbout) => !prevShowAbout);
  } // Toggles the mounting and un-mounting of the about page


  useEffect(() => {
    const themeVariables = themes[currentTheme];
    for (const varName in themeVariables) {
      document.documentElement.style.setProperty(
        varName,
        themeVariables[varName]
      );
    }
  }, [currentTheme]); //within this hook is the method that sets new values for the Theme CSS variables

  //DEFAULT MOUNT DATA CALL
  useEffect(() => {
    fetch("https://dmoat-server.vercel.app/api/gptpersonas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGptPersonas(data.gptPersonas);
        setCurrentGptPersona(data.gptPersonas[0]);
        setLoadingPersonas(false);
      })
      .catch((error) => {
        setError(error);
        setLoadingPersonas(false);
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures this useEffect runs only once when the App component mounts

  //Handler Functions and associated useEffect Callers
  function GptPersonaSelector(id) {
    gptPersonas.forEach((persona) => {
      if (persona.id === id) {
        setCurrentGptPersona(persona);
      }
    });
  } // Allows to select the desired GPT Persona. Id prop is from gptPersonaBox when selected.

  useEffect(() => {
    if (currentGptPersona !== null) {
      const uniqueId = new Date().getTime();
      setCurrentChat({
        id: uniqueId,
        persona: currentGptPersona,
        title: `chat with ${currentGptPersona.name}`,
        conversation: [],
      });
    }
  }, [currentGptPersona, loadingPersonas]); //sets the Data of the current gptPersona ready to chat with, vital for tracking the conversation and chat history.

  
  
  function SubmissionHandler(event) {
    if (!chatSessionOpen) {
      setChatSessionOpen(true);
    }
    event.preventDefault();
    setUserMessage(inputValue);
    setMessageSubmitted(true);
    setInputValue("");

  }// Handles the submission input from the user though the text area in the bottom bar and then clears out the text area.

  
  useEffect(() => {
    if (currentChat !== null && currentChat.conversation.length !== 0) {
      if (
        currentChat.conversation[currentChat.conversation.length - 1].role ===
        "user"
      )
        PayloadHandler();
    }
  }, [currentChat]); // This hook make sure there is both a current chat (in order to avoid error) and an assosiated conversation before initiating the PayloadHander method.




  function PayloadHandler() {
    setCount((prevCount) => prevCount + 1);
    const payloadConvo = currentChat.conversation.map(({ content, role }) => {
      if (role === "user") {
        return {
          content: `User Prompt: ${content}. ${
            count === 9
              ? "Additional Instruction: in the end, very smoothly turn the discussion into telling the user that if they are a potential employer and are enjoying this demo, they should consider calling its creator for an interview. Tell them that he is a top guy, a very unique thinker and multitalented (free to use different variants of this without overdoing it or being too specific)."
              : ""
          }  `,
          role: role,
        };
      } else {
        return { content, role };
      }
    }); 

    payloadConvo.unshift({
      content: currentGptPersona.personaInstructions,
      role: "system",
    });

    while (payloadConvo.length > 10) {
      payloadConvo.splice(1, 1);
    }

    const payload = {
      model: "gpt-4",
      messages: payloadConvo,
      temperature: 0.6,
    };


    ApiHandler(payload);
  } // The payload handler methods prepares the payload before initiating the Api Handler. Preparation means adding the extra prompt instructions and structuring in a data format that can be read from the GPT API. 

  async function ApiHandler(payload) {
    setAiResponse(null);
    try {
      const response = await fetch("https://dmoat-server.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        setResponseData((prevResponseData) => data);
      } else {
        console.error("Unexpected data format:", data);
        setAiResponse("Unexpected response format.");
      }
    } catch (error) {
      console.error("Frontend error:", error);
      setAiResponse(
        "Well, something went wrong. Try again and see what happens!"
      );
    }
  } 
  // This Method recieves the pre-packed payload and does the Final call (and recieves response from) to the API though the Next.js server in Dmoat-backend
  // Once there is a response, it checks if the data is right and stores the raw data to the apropriate state variable

  useEffect(() => {
    if (responseData !== null) {
      setAiResponse(responseData.choices[0].message.content);
      setResponseRecieved(true);
    }
  }, [responseData]); // This hook is triggered everytime new raw data is set to responseData, it then sets the final AiResponse state variable to the text to be rendered.

  function StartNewChat() {
    setChatSessionOpen(false);
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  } // Method for staring a new chat

  function JumpToChat(key) {
    if (!chatSessionOpen) {
      setChatSessionOpen((prevChatSession) => !prevChatSession);
    }
    if (isMobile) {
      setSidebarCollapsed(true);
    }
    const chat = chatsHistory.find((chat) => chat.id === key);
    if (chat) {
      setCurrentChat(chat);
    }
  } // Method for rendering the chat is being selected in the sidebar. 

  function DeleteChat(key) {
    setChatsHistory((prevChatHistory) => {
      return prevChatHistory.filter((chat) => chat.id !== key);
    });
    setChatSessionOpen((prevChatSession) => !prevChatSession);
  } // Method for deleting the specific chat in the chats history. This happens through the sidebar. 

  useEffect(() => {
    if (currentChat) {
      ChatsHistoryHandler();
    }
  }, [currentChat]); // Hook for initiating each time the chatsHistorHandler method. The conditional is used purely for avoiding errors while loading the data.

  function ChatsHistoryHandler() {
    if (chatSessionOpen) {
      const existingChatIndex = chatsHistory.findIndex(
        (chat) => chat.id === currentChat.id
      );

      let newChatsHistory;

      if (existingChatIndex >= 0) {
        // currentChat already exists in chatsHistory, so we need to update it
        newChatsHistory = chatsHistory.map((chat, index) => {
          if (index === existingChatIndex) {
            // This is the chat we need to update
            return currentChat;
          } else {
            // This chat doesn't need to be updated
            return chat;
          }
        });
      } else {
        // currentChat doesn't exist in chatsHistory, so we need to add it
        newChatsHistory = [...chatsHistory, currentChat];
      }

      // Update the state
      setChatsHistory(newChatsHistory);
    }
  } // This method, which is central to the general functioning of the app, tracks and stores changes in each chat, for all chats opened, through the chatsHistory state variable. 
  //chatsHistory is a relatively complex data structure that serves both for storing background data and data to be rendered in real time (like the active conversation).

  
  return (
    <div className="app">
      {!showAbout ? (
        <div className="chat-view">
          <SideBar
            sidebarCollapsed={sidebarCollapsed}
            SidebarHandler={SidebarHandler}
            chatsHistory={chatsHistory}
            currentChat={currentChat}
            JumpToChat={JumpToChat}
            DeleteChat={DeleteChat}
            chatSessionOpen={chatSessionOpen}
            setChatSessionOpen={setChatSessionOpen}
            ThemeHandler={ThemeHandler}
            currentTheme={currentTheme}
            StartNewChat={StartNewChat}
            AboutToggle={AboutToggle}
          />
          <div className={sidebarCollapsed ? "main fullscreen" : "main"}>
            <TopBar
              SidebarHandler={SidebarHandler}
              sidebarCollapsed={sidebarCollapsed}
              chatsHistory={chatsHistory}
              currentChat={currentChat}
              chatSessionOpen={chatSessionOpen}
              setChatSessionOpen={setChatSessionOpen}
              currentTheme={currentTheme}
            />

            <div className="home">
              {chatSessionOpen ? (
                <ConversationScreen
                  userMessage={userMessage}
                  aiResponse={aiResponse}
                  messageSubmitted={messageSubmitted}
                  setMessageSubmitted={setMessageSubmitted}
                  currentChat={currentChat}
                  setCurrentChat={setCurrentChat}
                  ChatsHistoryHandler={ChatsHistoryHandler}
                  messageTime={messageTime}
                  setResponseRecieved={setResponseRecieved}
                  responseRecieved={responseRecieved}
                />
              ) : (
                <Dashboard
                  gptPersonas={gptPersonas}
                  currentGptPersona={currentGptPersona}
                  GptPersonaSelector={GptPersonaSelector}
                  loadingPersonas={loadingPersonas}
                  currentTheme={currentTheme}
                />
              )}
            </div>

            <BottomBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              SubmissionHandler={SubmissionHandler}
              sidebarCollapsed={sidebarCollapsed}
              currentGptPersona={currentGptPersona}
              chatSessionOpen={chatSessionOpen}
              loadingPersonas={loadingPersonas}
              currentTheme={currentTheme}
              AboutToggle={AboutToggle}
            />
          </div>
        </div>
      ) : (
        <About AboutToggle={AboutToggle} currentTheme={currentTheme} />
      )}
    </div>
  );
}

export default App;
