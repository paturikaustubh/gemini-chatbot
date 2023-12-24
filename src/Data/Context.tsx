import { createContext, useState } from "react";
import { InputContent } from "@google/generative-ai"; // replace with the path to your interface

interface ChatContext {
  chatSequence: InputContent[];
  setChatSequence: React.Dispatch<React.SetStateAction<InputContent[]>>;
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContext>({
  chatSequence: [],
  setChatSequence: () => {},
  showLoading: false,
  setShowLoading: () => {},
});

export const ChatSequence = ({ children }: { children: any }) => {
  const [chatSequence, setChatSequence] = useState<InputContent[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <ChatContext.Provider
      value={{ chatSequence, setChatSequence, showLoading, setShowLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
};
