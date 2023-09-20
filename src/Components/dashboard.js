
import "./dashboard-styles.css"
import GptPersonaBox from "./gpt-persona-box";


export default function Dashboard ({gptPersonas, currentGptPersona, GptPersonaSelector, loadingPersonas, currentTheme}) {
    return (
      <div className="dashboard-wrap">
        <div className="introduction">
          <img
            src= {`./assets/dmoat_logo_${currentTheme}.png`}
            className="introduction-logo"
          ></img>
          <div className="introduction-text">

            
            <p className="introduction-text-paragraph">
              DMoat allows you to converse with the <i>GPT analogues </i>of
              some of the greatest minds in history.
            </p>

            <p className="introduction-text-paragraph">
              As you explore DMoat, consider the impact of these historical
              figures, and immerse yourself in enlightening conversations. You
              can even ask them about their times, and if they are curious to
              know about the technological advancements and world events since
              their departure.
            </p>

            <span className="line"></span>

          </div>
        </div>
        <div className="gpt-persona-boxes-wrap">
          
          {loadingPersonas===false && gptPersonas.map((persona)=>{

            return (<GptPersonaBox key={persona.id} id={persona.id} name = {persona.name} image={persona.image} currentGptPersona = {currentGptPersona} GptPersonaSelector={GptPersonaSelector} loadingPersonas={loadingPersonas}   />
            )

          })}
        </div>
      </div>
    );
}