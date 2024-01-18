import { useRef, useState, useContext, useEffect } from "react";
import Markdown from "react-markdown";

import { ChatContext } from "../../Data/Context";
import { useAiResponse } from "../../Gemini/Response";
import { Loading } from "../../Components/Loading Animation/Loading";
import "./styles.css";
import Logo from "/Gemini Logo No BG.png";

export function Conversation() {
  const sendMessage = useAiResponse();
  const { chatSequence, setChatSequence, showLoading, setShowLoading } =
    useContext(ChatContext);

  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [userInputValue, setUserInputValue] = useState<string | undefined>();

  useEffect(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
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
      <section className="__chat-body-container">
        {chatSequence.length > 0 ? (
          chatSequence.map((message, indx) =>
            message.role === "user" ? (
              <div className={"__user-message"} key={indx}>
                <p>{message.parts.toString()}</p>
              </div>
            ) : (
              <div
                className={
                  message.role === "user"
                    ? "__user-message"
                    : "__model-response"
                }
                key={indx}
              >
                <Markdown>{message.parts.toString()}</Markdown>
              </div>
            )
          )
        ) : (
          <div
            className="__blank-screen-fill"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: 12,
            }}
          >
            <img src={Logo} alt="Gemini Logo" width={"250rem"} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontWeight: 500, fontSize: "1.3rem" }}>
                Gemini at your service.
              </span>
              <span
                style={{ fontWeight: 500, color: "rgba(227, 227, 227, 0.5)" }}
              >
                How can I help you today?
              </span>
            </div>
          </div>
        )}
      </section>
      <div className="__input-container">
        <div
          style={{
            backdropFilter: "blur(3px)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.2rem",
            paddingTop: "0.3rem",
          }}
        >
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
          <div style={{ fontSize: "0.8rem", marginBlock: "5px" }}>
            Developed by Kaustubh Paturi
          </div>
        </div>
        <button
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          style={{
            fontSize: "2.5rem",
            paddingInline: "0.5rem",
            marginLeft: "auto",
            border: 0,
            outline: 0,
            backgroundColor: "transparent",
          }}
        >
          ⬇️
        </button>
      </div>
    </>
  );
}
