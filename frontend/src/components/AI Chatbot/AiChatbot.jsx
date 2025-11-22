import React, { useState, useRef, useEffect } from "react";
import { Bot, X, StepForward } from "lucide-react";
import OpenAI from "openai";
import { LoaderPinwheel } from 'lucide-react';

const AiChatbot = () => {
  const [openChat, setOpenChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋, how can I help you today?" }
  ]);

  const [loading, setLoading] = useState(false)

  const chatEndRef = useRef(null);

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true
  });

  // Auto scroll to bottom whenever message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    const prompt = userMessage;
    setUserMessage("");
    setLoading(true)
    try {
      const response = await client.chat.completions.create({
        model: "z-ai/glm-4.5-air:free",
        messages: [
          {
            role: "system",
            content:
              "Your name is Invy. You are a friendly, helpful chatbot that guides users to use Invoicy platform: 1) Sign up/login, 2)Complete profile setup, 3) Create invoice manually OR using 'Create with AI'. Keep answers short and easy."
          },
          { role: "user", content: prompt }
        ]
      });

      const aiReply = response.choices[0].message.content.trim();
      setMessages(prev => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong. Please try again." }
      ]);
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Chat Window */}
      {openChat && (
        <div className="w-80 h-96 bg-white flex flex-col border border-neutral-300 rounded-lg shadow-lg mb-3 overflow-hidden">

          {/* Header */}
          <div className="p-3 flex items-center justify-between border-b bg-gray-100">
            <h2 className="text-sm font-semibold text-neutral-700">Support Assistant</h2>
            <X size={18} className="cursor-pointer text-neutral-600 hover:text-red-500" onClick={() => setOpenChat(false)} />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 bg-gray-50">

            {/* Render previous messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 text-sm rounded-lg shadow 
        ${msg.sender === "user"
                      ? "bg-[#8a0194] text-white"
                      : "bg-white border border-neutral-300 text-neutral-800"
                    }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {/* AI is typing... */}
            {loading && (
              <div className="flex items-center gap-2 text-neutral-400">
                <LoaderPinwheel className="animate-spin" size={18} />
                <span className="text-xs">Invy is typing...</span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>


          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
            <div className="relative w-full">
              <input
                type="text"
                name="message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full pr-10 px-4 py-2 bg-gray-50 text-sm border border-neutral-300 rounded-lg focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 rounded-lg bg-[#8a0194] hover:bg-[#a800b7] transition-all duration-200 cursor-pointer"
              >
                <StepForward className="text-white" size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpenChat((prev) => !prev)}
        className="bg-[#8a0194] p-3 rounded-full shadow-md border border-white cursor-pointer hover:bg-[#a800b7] transition-all duration-300 hover:rotate-180"
      >
        <Bot className="text-white" size={30} />
      </button>
    </div>
  );
};

export default AiChatbot;
