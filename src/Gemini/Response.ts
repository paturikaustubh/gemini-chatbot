import { useContext } from "react";

import { ChatContext } from "../Data/Context";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)

export function useAiResponse() {
  const { chatSequence, setChatSequence, setShowLoading } =
    useContext(ChatContext);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyApOcN3i2jU26amZ86Sv3bpe327G92MpEk"
  );

  return async function aiMesage(msg: string) {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

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
      setShowLoading(false);
    } catch (e) {
      console.error(e);

      setChatSequence((prevVals) => [
        ...prevVals,
        {
          role: "model",
          parts: "Text not available. Response was blocked due to SAFETY",
        },
      ]);
      setShowLoading(false);
    }
  };
}
