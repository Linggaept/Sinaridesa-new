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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const chatSession = model.startChat({ generationConfig });
    const result = await chatSession.sendMessage(message2);

    // Tambahkan pesan ke array messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: message2, ai: result.response.text() },
    ]);

    setMessage2(""); // Reset input

    setLoading(false);
    setShowTextAi(true);
  };

  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-6 right-6 z-50 focus:outline-none">
        <Image
          src={"/img/logoAi.png"}
          width={200}
          height={200}
          alt="logo"
          className="w-14 h-auto animate-bounce shadow-lg shadow-indigo-600 cursor-pointer rounded-2xl"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-800 font-bold">Sinari Desa Ai</DialogTitle>
          <DialogDescription className="h-[70vh] overflow-hidden overflow-y-auto">
            {showTextAi ? (
              <Pengembangan messages={messages} />
            ) : (
              <div className="flex flex-col w-full mx-auto gap-2 h-full items-center justify-center">
                <Image
                  src={"/img/logo/logo.png"}
                  width={100}
                  height={100}
                  alt="logo"
                  className="rounded-xl bg-gray-800 opacity-80"
                />
                <p className="text-gray-600 text-sm text-center flex items-center">
                  Coba chat dengan Sinari Desa Ai
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={(e) => handleSubmit(e)} className="flex w-full">
            <div className="flex w-full gap-2">
              <textarea
                placeholder="Your Text"
                name="text"
                value={message2}
                onChange={(e) => setMessage2(e.target.value)}
                className="w-full rounded-md p-2 border-none bg-gray-200 resize-none focus:outline-none"
                required
              />
              <button
                type="submit"
                className={`bg-gray-800 rounded-md py-2 px-4 text-white ${
                  loading ? "cursor-default" : "cursor-pointer"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="px-2 py-2">
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
    <div className="flex flex-col gap-5  w-full mt-4">
      {messages.map((msg, index) => (
        <div key={index}>
          <div className="w-full flex justify-end mb-5 items-start gap-4">
            <div className="p-2 bg-gray-200 rounded-md duration-300 w-8/12">
              <p className="duration-300 text-black  text-md text-left font-normal">
                {msg.user}
              </p>
            </div>
            <div className="w-1/12">
              <Image
                src={"/img/logo/logo.png"}
                width={40}
                height={40}
                alt="logo"
                className="rounded-xl bg-black"
              />
            </div>
          </div>
          <div className="w-full items-start flex justify-start gap-4">
            <div className="w-1/12">
              <Image
                src={"/img/logoAi.png"}
                width={40}
                height={40}
                alt="logo"
                className="rounded-full"
              />
            </div>
            <div className="p-2 item-start bg-gray-200 rounded-md duration-300 w-8/12">
              <p className="duration-300 text-left font-normal text-black">
                {msg.ai}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
