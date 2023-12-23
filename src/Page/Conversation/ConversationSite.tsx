import { useRef, useState, useContext, useEffect } from "react";

import { ChatContext } from "../../Data/Context";
import { useAiResponse } from "../../Gemini/Response";

import "./styles.css";
import Markdown from "react-markdown";
export function Conversation() {
  const sendMessage = useAiResponse();
  const { chatSequence, setChatSequence } = useContext(ChatContext);

  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [userInputValue, setUserInputValue] = useState<string | undefined>();

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [chatSequence]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (textAreaRef.current?.value) {
      textAreaRef.current.style.height = "30px";
      const textAreaValue: string = textAreaRef.current.value.toString();
      sendMessage(textAreaValue);
      setChatSequence((prevVals) => [
        ...prevVals,
        { role: "user", parts: textAreaValue },
      ]);
      textAreaRef.current.value = "";
      setUserInputValue("");
    }
  };

  return (
    <>
      <div className="__chat-body-container">
        {chatSequence.map((message, indx) => (
          <div
            className={
              message.role === "user" ? "__user-message" : "__model-response"
            }
            key={indx}
          >
            <Markdown>{message.parts.toString()}</Markdown>
          </div>
        ))}
      </div>
      <div className="__input-container">
        <form className="__input-field" onSubmit={handleSubmit}>
          <textarea
            id="__user-input-field"
            autoFocus
            placeholder="Start typing..."
            ref={textAreaRef}
            onInput={() => {
              if (textAreaRef.current) {
                textAreaRef.current.style.height = "30px";
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
              }
              setUserInputValue(textAreaRef.current?.value);
            }}
            className="__input-class"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey)
                handleSubmit(e);
            }}
          />
          <button disabled={!Boolean(userInputValue)}>
            <span className="material-symbols-rounded">send</span>
          </button>
        </form>
      </div>
    </>
  );
}
