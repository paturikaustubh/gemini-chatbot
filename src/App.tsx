import "./App.css";
import { Conversation } from "./Page/Conversation/ConversationSite";
import { NavBar } from "./Components/Navbar/NavBar";
import { ChatSequence } from "./Data/Context";

function App() {
  return (
    <ChatSequence>
      <NavBar />
      <Conversation />
    </ChatSequence>
  );
}

export default App;
