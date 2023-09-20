import "./bottom-bar-styles.css";
import autosize from "autosize";
import { useEffect, useRef } from "react";

export default function BottomBar({
  inputValue,
  setInputValue,
  SubmissionHandler,
  sidebarCollapsed,
  currentGptPersona,
  chatSessionOpen,
  loadingPersonas,
  currentTheme,
  AboutToggle,
}) {
  


  
  function ChangeHandler(event) {
    setInputValue(event.target.value);
  } //Tracks changes to the input in real time

  const inputAreaRef = useRef();
  useEffect(() => {
    autosize.update(inputAreaRef.current);
  }, [inputValue]); 
  useEffect(() => {
    autosize(inputAreaRef.current);
  });

  // The above hooks make sure that the text-area apropriately changes in size as the text grows.

  return (
    <div className={sidebarCollapsed ? "bottom-bar fullscreen" : "bottom-bar"}>
      <div
        className={inputValue.length > 1 ? "input-field active" : "input-field"}
      >
        <span className="input-vert-span"></span>
        <form
          className="chat-form"
          onSubmit={(event) => SubmissionHandler(event)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              SubmissionHandler(event);
            }
          }}
        >
          <textarea
            ref={inputAreaRef}
            type="text"
            value={inputValue}
            onChange={ChangeHandler}
            placeholder={
              !chatSessionOpen
                ? `Chat with ${loadingPersonas ? "" : currentGptPersona.name}`
                : "Send Message"
            }
          />

          <button
            className={
              inputValue.length > 0 ? "send-button active" : "send-button"
            }
            type="submit"
          >
            <img
              className={
                inputValue.length > 0 ? "send-icon active" : "send-icon"
              }
              src={`/assets/dmoat_send_icon_${currentTheme}.png`}
            ></img>
          </button>
        </form>
      </div>

      <div className="footer-wrap">
        <p className="footer-disclaimer-text">
          DMoat does not replicate real minds. The behaviour and information
          produced might be inaccurate.{" "}
          <a className="more-info" onClick={() => AboutToggle()}>
            <b>
              <u>More Info</u>
            </b>
          </a>
        </p>
      </div>
    </div>
  );
}
