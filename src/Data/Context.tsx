import { createContext, useState } from "react";
import { InputContent } from "@google/generative-ai"; // replace with the path to your interface

interface ChatContext {
  chatSequence: InputContent[];
  setChatSequence: React.Dispatch<React.SetStateAction<InputContent[]>>;
  disableSend: boolean;
  setDisableSend: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContext>({
  chatSequence: [],
  setChatSequence: () => {},
  disableSend: false,
  setDisableSend: () => {},
});

export const ChatSequence = ({ children }: { children: any }) => {
  const [chatSequence, setChatSequence] = useState<InputContent[]>([]);
  const [disableSend, setDisableSend] = useState(false);

  return (
    <ChatContext.Provider
      value={{ chatSequence, setChatSequence, disableSend, setDisableSend }}
    >
      {children}
    </ChatContext.Provider>
  );
};
