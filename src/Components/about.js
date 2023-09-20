import "./about-styles.css";

export default function About({AboutToggle, currentTheme}) {
  return (
    <div className="about-wrap">
      <div className="about-top-section">
        <button onClick={() => AboutToggle()} className="x-button">
          <img
            className="x-icon"
            src={`./assets/close_icon_${currentTheme}.png`}
          ></img>
        </button>
      </div>

      <div className="text-wrap">
        <div className="about-logo-wrap">
          <img
            className="about-logo"
            src={`./assets/dmoat_logo_${currentTheme}.png`}
          ></img>
        </div>
        <div className="about-bottom-space"></div>
        <div className="about-bottom-space"></div>
        <div className="about-bottom-space"></div>
        <div className="about-bottom-space"></div>
        <h1 className="about-header">
          Engaging with <i>GPT analogues</i> of some of the Deepest Minds of All Time
        </h1>

        <p className="about-paragraph">
          DMoat is a small experiment born out of sheer curiosity. As we stand
          on the brink of an AI-driven world, one can wonder about the possibility
          of conversing with AI renditions of those we've lost one day? Well,
          this idea might be a bit too controversial for now. But what if we
          could, at the very least, engage with renowned public figures? Or,
          to put it in more relatable terms, with our scientific or literary
          heroes? As technology becomes increasingly pervasive, DMoat offers a
          respite, a sanctuary for reflection and depth. It serves as both a
          tribute to the spirit of inquiry and a deep dive into the human-AI
          dynamic, particularly our perception of and relationship with AI
          entities that appear "human".
        </p>

        <h1 className="about-header">How it Works</h1>

        <p className="about-paragraph">
          DMoat operates as a straightforward chat platform, letting you engage
          with a selection of GPT Personas. These are currently restricted to
          several eminent figures from Science and Literature. The GPT personas
          you converse with are in a kind of timeless dimension, possessing
          knowledge only up to the time of their historical counterparts'
          demise. Crafted meticulously through prompt engineering, these
          personas, albeit very limited LLM simulations, aspire to encapsulate
          the essence of these extraordinary minds.
        </p>

        <h1 className="about-header">Engage, Inform, and Ponder!</h1>

        <p className="about-paragraph">
          While primarily an educational platform, DMoat is not just about
          consumption of information. It celebrates the rhythm of dialogue, the
          dynamics of conversation, and the joy of informally discussing
          personal histories, philosophies, and experiences. All the while, we
          "educate" our beloved GPT analogues about the present. Imagine George
          Orwell's reaction upon learning about the fall of the Iron Curtain, or
          Einstein's exhilaration hearing about the discovery of gravitational
          waves!
        </p>

        <h1 className="about-header">
          Note of Caution: Understanding the Boundaries of DMoat’s Experience
        </h1>

        <p className="about-paragraph">
          As you embark on conversations within DMoat, it’s essential to
          approach these interactions with awareness and a discerning mind:
        </p>

        <p className="about-paragraph">
          <ul>
            <li>
              <b>Artistic Interpretation, Not Historical Record</b>: The
              personas on DMoat are crafted using OpenAI's GPT-4 technology.
              They draw inspiration from historical figures but are not flawless
              replicas. Today's AI can't fully grasp the depth, intricacies, and
              unique traits of a human mind. They represent a blend of
              historical data and AI's interpretation, and cannot guarantee a
              fully factual representation of these individuals' thoughts or
              beliefs. When in doubt, corroborate with trustworthy historical
              references
            </li>

            <li>
              <b>Engage with Sensitivity</b>: With a wide array of topics and
              figures, some discussions might touch on delicate matters.
              Navigate these with care, respect, and cognizance that the AI's
              response, being algorithmically produced, may not always
              encapsulate the nuance of human sentiment or historical backdrop.
            </li>

            <li>
              <b>Respect for Legacy</b>:DMoat was conceived as both an
              educational instrument and an homage to history's luminaries. It
              does not seek to diminish or distort their legacies in any way.
              Interacting with this understanding will elevate your experience
              and maintain the respect these icons rightfully command.
            </li>
          </ul>
        </p>
        <div className="about-bottom-space"></div>
      </div>
    </div>
  );
}
