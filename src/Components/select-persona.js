import "./select-persona-styles.css";
import GptPersonaBox from "./gpt-persona-box";
import { gptPersonas } from "./local-data";

export default function SelectPersona({
  GptPersonaSelector,
  currentGptPersona,
  showSelectPersona,
  SelectPersonaToggle,
  StartNewChat,
  loadingPersonas
}) {
  return (
    <div className={showSelectPersona ? "select-persona-wrap" : "select-persona-wrap hidden"}>
    <div
      className= "select-persona-el"
      
    >
      <div className="select-persona-top-bar">
        <h1> Select a GPT mind</h1>

        <div className="select-persona-close-button" onClick={()=>SelectPersonaToggle()}>
          <img
            className="select-persona-close-button-icon"
            src="./assets/dmoat_close_icon.png"
          ></img>
        </div>
      </div>

      <div className="select-persona-boxes-wrap">
        {!loadingPersonas && gptPersonas.map((persona) => {
          return (
            <GptPersonaBox
              key={persona.id}
              name={persona.name}
              image={persona.image}
              currentGptPersona={currentGptPersona}
              GptPersonaSelector={GptPersonaSelector}
            />
          );
        })}

        <div className="select-persona-bottom-bar">
          <button className="select-persona-button" onClick={()=>StartNewChat()}>Start Chatting</button>
        </div>
      </div>
    </div>
    </div>
  );
}
