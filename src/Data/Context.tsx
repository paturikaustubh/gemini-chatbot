import { createContext, useState } from "react";
import { InputContent } from "@google/generative-ai"; // replace with the path to your interface

export const ChatContext = createContext<{
  chatSequence: InputContent[];
  setChatSequence: React.Dispatch<React.SetStateAction<InputContent[]>>;
}>({
  chatSequence: [],
  setChatSequence: () => {},
});

export const ChatSequence = ({ children }: { children: any }) => {
  const [chatSequence, setChatSequence] = useState<InputContent[]>([]);

  return (
    <ChatContext.Provider value={{ chatSequence, setChatSequence }}>
      {children}
    </ChatContext.Provider>
  );
};
