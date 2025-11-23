"use client";

import { useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(userInput: string) {
    if (!userInput.trim()) return;

    setLoading(true);

    const updatedMessages = [...messages, { from: "user", text: userInput }];
    setMessages(updatedMessages);

    try {
      // Ask OpenAI for the response
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: updatedMessages.map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await resp.json();
      const reply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);

    } catch (error) {
      console.log("Chat error:", error);
    }

    setLoading(false);
  }

  return { messages, loading, sendMessage };
}
