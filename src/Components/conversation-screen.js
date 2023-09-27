import "./conversation-screen-styles.css"
import { useState, useEffect, useRef, cloneElement } from "react";

export default function ConversationScreen({
  userMessage,
  aiResponse,
  messageSubmitted,
  setMessageSubmitted,
  responseRecieved,
  setResponseRecieved,
  currentChat,
  setCurrentChat,
  ChatsHistoryHandler,
  messageTime,
}) {
  /*For clarity, user and ai response wraps 
    within the chat session are defined like separate internal components. 
    These contain the styles of each response (a bit different)  and the image of the interlocutor*/

  
  
  const messagesEndRef = useRef(null); // This allows the chat to always auto-scroll when each messsage is added
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const [aiIsTyping, setAiIsTyping] = useState(false); // State variable for the time window of the response from the API (simulated as if the Ai is thinking or typing)

  useEffect(() => {
    if (aiIsTyping) {
      scrollToBottom();
    }
  }, [aiIsTyping]);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);
  


  // The above code allows the chat to always auto-scroll when each messsage is added


  
  
  useEffect(() => {
    if (userMessage && messageSubmitted) {
   
      setAiIsTyping(true);
    }
  }, [userMessage, messageSubmitted]);

  useEffect(() => {
    if (responseRecieved && aiResponse) {
      setAiIsTyping(false);
    }
  }, [aiResponse, messageSubmitted]);

  //The Above hooks track the time window of API response from the moment the userMessage is sent until there is responseRecieved from the API.
  //This is particularly usefull for simulating a "thinking" or "typing" visual effect of the ai interlocutor in order to improve the user experience. 



  useEffect(() => {
    if (userMessage && messageSubmitted) {
      let message = { time: messageTime, content: userMessage, role: "user" };
      setCurrentChat((prevCurrentChat) => {
        return {
          ...prevCurrentChat,
          conversation: [...prevCurrentChat.conversation, message],
        };
      });
      ChatsHistoryHandler();
      scrollToBottom();
      setMessageSubmitted(false);
    }
  }, [userMessage, messageSubmitted]); 
  // This hook handles the user message, from sending it to the next stages to storing it in the conversation of the each chat in chatHistory.

  useEffect(() => {
    if (responseRecieved && aiResponse) {
      let message = { time: messageTime, content: aiResponse, role: "assistant" };
      setCurrentChat((prevCurrentChat) => {
        return {
          ...prevCurrentChat,
          conversation: [...prevCurrentChat.conversation, message],
        };
      });
      ChatsHistoryHandler();
      scrollToBottom()
      setResponseRecieved(false)
    }
  }, [aiResponse, messageSubmitted]);

  // Similarly to userMessage, This hook handles the AiMessage from the API response and stores it into chatHistory. 

  let PersonaIntroWrap = ({ text }) => {
    return (
      <div className="persona-intro-wrap">
        <div className="persona-intro-text-wrap">
          <h3 className="persona-intro-text">{text}</h3>
        </div>
      </div>
    );
  }; //This is a default introduction at the begging of each chat of the public figure the GPT persona is based on. 

  let UserMessageWrap = ({ text }) => {
    return (
      <div className="message-wrap">
        <div className="message-avatar-wrap" id="user-avatar">
          <img className="message-img" src=""></img>
        </div>
        <div className="message-text-wrap">
          <h3 className="message-text">{text}</h3>
        </div>
      </div>
    );
  }; 

  let AiResponseWrap = ({ text }) => {
    return (
      <div className="message-wrap" id="ai-response-wrap">
        <div className="message-avatar-wrap">
          <img className="message-img" src={currentChat.persona.image}></img>
        </div>
        <div className="message-text-wrap" id="ai-text-wrap">
          <h3 className="message-text">{text}</h3>
        </div>
      </div>
    );
  }; 

  // The above components for rendering userMessage and AiResponse are kept separate as they are differen (and it also helps with readability) 

  return (
    <div className="conversation-screen-wrap">
      <PersonaIntroWrap text={currentChat.persona.presentation} />
  
      {currentChat.conversation.map((message) =>
        message.role === "user" ? (
          <UserMessageWrap key={message.time} text={message.content} />
        ) : (
          <AiResponseWrap key={message.time}  text={message.content} />
        )
      )}

      
  
      {aiIsTyping && 
        <div className="message-wrap pulsating" id="ai-response-wrap">
          <div className="message-avatar-wrap">
            <img className="message-img" src={currentChat.persona.image}></img>
          </div>
        </div>
      }

      <div className="end-ref" ref={messagesEndRef} />
    </div>
  );
} 

/* IT MUST BE NOTED that this app renders in real time the conversation directly from the chatHistory, 
instead of separately rendering it from a temporaray variable and leaving the chatHistory on the background
This makes ensures that the passage from one chat to another is smooth and straightforward */