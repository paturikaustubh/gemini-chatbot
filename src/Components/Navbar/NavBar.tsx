import { useContext } from "react";
import "./NavBar.css";
import { ChatContext } from "../../Data/Context";

export function NavBar() {
  const { setChatSequence } = useContext(ChatContext);
  return (
    <nav>
      <span className="heading">
        Google <span className="__gemini">Gemini⚡</span>
      </span>
      <span className="title">
        <span className="med-screen-show">Gemini-</span>Chat
      </span>
      <button
        onClick={() => setChatSequence([])}
        className="material-symbols-outlined"
      >
        restart_alt
      </button>
    </nav>
  );
}
