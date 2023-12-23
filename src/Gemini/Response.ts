import { useContext } from "react";

import { ChatContext } from "../Data/Context";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)

export function useAiResponse() {
  const { chatSequence, setChatSequence } = useContext(ChatContext);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyApOcN3i2jU26amZ86Sv3bpe327G92MpEk"
  );

  return async function aiMesage(msg: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: chatSequence,
    });

    const result = await chat.sendMessage(msg).catch((e) => {
      console.log(e);
      return e;
    });
    const response = result.response;
    try {
      const text = response.text();
      setChatSequence((prevVals) => [
        ...prevVals,
        { role: "model", parts: text },
      ]);
    } catch (e) {
      setChatSequence((prevVals) => [
        ...prevVals,
        {
          role: "model",
          parts:
            "Cannot generate a response. Your message violates our guidelines. ",
        },
      ]);
    }
  };
}
