import { useRef, useState, useContext, useEffect } from "react";

import { ChatContext } from "../../Data/Context";
import { useAiResponse } from "../../Gemini/Response";

import "./styles.css";
import Markdown from "react-markdown";
import { Loading } from "../../Components/Loading Animation/Loading";
export function Conversation() {
  const sendMessage = useAiResponse();
  const { chatSequence, setChatSequence, showLoading, setShowLoading } =
    useContext(ChatContext);

  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [userInputValue, setUserInputValue] = useState<string | undefined>();

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [chatSequence]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (textAreaRef.current?.value) {
      setShowLoading(true);
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
          {!showLoading ? (
            <button disabled={!Boolean(userInputValue) || showLoading}>
              <span className="material-symbols-rounded">send</span>
            </button>
          ) : (
            <Loading />
          )}
        </form>
      </div>
    </>
  );
}
