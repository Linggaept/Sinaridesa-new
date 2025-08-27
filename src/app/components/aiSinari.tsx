"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spinner } from "@/components/ui/spinner";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Ambil API key dari environment

if (!apiKey) {
  throw new Error("Missing OpenAI API key");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export function AiSinari() {
  const [messages, setMessages] = useState<{ user: string; ai: string }[]>([]);
  const [message2, setMessage2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTextAi, setShowTextAi] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    const userMessage = message.trim();
    if (!userMessage || loading) return;

    setLoading(true);
    setShowTextAi(true);
    setMessage2("");

    // Add user message to the list, with a placeholder for the AI response
    setMessages((prev) => [...prev, { user: userMessage, ai: "" }]);

    let aiResponse = "";
    if (userMessage.toLowerCase().includes("siapa kamu")) {
      aiResponse =
        "Saya adalah **Sinari Desa AI**, asisten cerdas yang siap membantu Anda dalam segala hal terkait kemajuan desa. Ada yang bisa saya bantu?";
      // Simulate network delay for a more natural feel
      await new Promise((resolve) => setTimeout(resolve, 500));
    } else {
      try {
        const chatSession = model.startChat({ generationConfig });
        const result = await chatSession.sendMessage(userMessage);
        aiResponse = result.response.text();
      } catch (error) {
        console.error("Error getting AI response:", error);
        aiResponse = "Maaf, terjadi kesalahan. Coba lagi nanti.";
      }
    }

    // Update the last message in the array with the actual AI response
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1].ai = aiResponse;
      return newMessages;
    });
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(message2);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const suggestedPrompts = [
    "Buatkan saya kerangka pidato untuk pemuda desa.",
    "Jelaskan blockchain dengan analogi sederhana.",
    "Beri 5 ide bisnis kreatif untuk dikembangkan di desa.",
    "Bagaimana cara meningkatkan pariwisata lokal?",
  ];

  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-6 right-6 z-50 focus:outline-none">
        <Image
          src={"/img/logoAi.png"}
          width={200}
          height={200}
          alt="logo"
          className="w-14 md:w-20 h-auto animate-gentle-bounce shadow-lg shadow-indigo-600 cursor-pointer rounded-2xl animate-bounce"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-800 font-bold">Sinari Desa Ai</DialogTitle>
          <DialogDescription className="h-[70vh] overflow-hidden overflow-y-auto pr-4">
            {showTextAi ? (
              <Pengembangan messages={messages} />
            ) : (
              <div className="flex flex-col w-full mx-auto gap-4 h-full items-center justify-center p-4">
                <Image
                  src={"/img/logo/logo.png"}
                  width={80}
                  height={80}
                  alt="logo"
                  className="rounded-xl bg-gray-800 opacity-80 mb-2"
                />
                <p className="text-gray-800 font-semibold text-lg text-center">
                  Ada yang bisa saya bantu?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-xs text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-gray-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form
            onSubmit={handleSubmit}
            className="flex w-full"
          >
            <div className="flex w-full gap-2">
              <textarea
                placeholder="Tanya apa saja..."
                name="text"
                value={message2}
                onChange={(e) => setMessage2(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Mencegah newline
                    handleSendMessage(message2);
                  }
                }}
                className="w-full rounded-md p-2 border-none bg-gray-200 resize-none focus:outline-none text-black"
                required
              />
              <button
                type="submit"
                className={`bg-gray-800 rounded-md py-2 px-4 text-white transition-colors duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-gray-500"
                    : "cursor-pointer hover:bg-gray-700"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="px-2 py-1">
                    <Spinner size={"small"} />
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Pengembangan = ({
  messages,
}: {
  messages: { user: string; ai: string }[];
}) => {
  return (
    <div className="flex flex-col gap-5 w-full mt-4">
      {messages.map((msg, index) => (
        <div key={index} className="flex flex-col gap-5">
          {/* User Message */}
          <div className="w-full flex justify-end items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-2 bg-gray-200 rounded-md w-auto max-w-[80%]">
              <p className="text-black text-sm text-left font-normal break-words">
                {msg.user}
              </p>
            </div>
            <div className="w-10 h-10 flex-shrink-0">
              <Image
                src={"/img/logo/logo.png"}
                width={40}
                height={40}
                alt="logo"
                className="rounded-xl bg-black object-cover"
              />
            </div>
          </div>

          {/* AI Message */}
          <div className="w-full items-start flex justify-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
            <div className="w-10 h-10 flex-shrink-0">
              <Image
                src={"/img/logoAi.png"}
                width={40}
                height={40}
                alt="logo"
                className="rounded-full object-cover"
              />
            </div>
            <div className="p-2 item-start bg-gray-200 rounded-md w-auto max-w-[80%] min-h-[40px] flex items-center">
              {msg.ai ? (
                <div className="prose prose-sm max-w-none text-black">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ p: ({...props}) => <p className="my-0" {...props} /> }}
                  >{msg.ai}</ReactMarkdown>
                </div>
              ) : (
                <Spinner size="small" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
