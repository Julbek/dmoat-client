import "./gpt-persona-box-styles.css"
import { useState, useEffect } from "react"


//Component for rendering (and selecting) each GPT persona image and name at the dashboard

export default function GptPersonaBox ({image, name, id, currentGptPersona, GptPersonaSelector, loadingPersonas}) {
    let [selected, setSelected] = useState(false)

    useEffect(()=>{
        currentGptPersona.name===name?setSelected(true): setSelected(false)
    })

    return (

        <div key={id} className="gpt-persona-box-wrap" onClick={()=>GptPersonaSelector(id)}>

            <div className={selected?"gpt-persona-box-img-wrap selected":"gpt-persona-box-img-wrap"}>

            <img className={selected?"gpt-persona-box-img selected":"gpt-persona-box-img"} src={image}></img>


            </div>
            <h2 className="gpt-persona-box-name">{name}</h2>
       

        </div>
    )
}