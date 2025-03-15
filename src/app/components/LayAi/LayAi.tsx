"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import AI SDK

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

export default function LayAi() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState<{ user: string; ai: string }[]>([]);
  const [message2, setMessage2] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
  };

  const Pengembangan = ({
    messages,
  }: {
    messages: { user: string; ai: string }[];
  }) => {
    return (
      <div className="flex flex-col gap-5">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="w-full flex justify-end mb-5 items-start">
              <div className="p-2 bg-gray-200 rounded-md duration-300 w-8/12">
                <Text
                  fontWeight="normal"
                  className="duration-300  text-md text-left"
                >
                  {msg.user}
                </Text>
              </div>
              <div className="w-2/12">
                <Image
                  src={"/icon.png"}
                  width={40}
                  height={40}
                  alt="logo"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="w-full items-start flex justify-start">
              <div className="w-2/12">
                <Image
                  src={"/img/logoAi.png"}
                  width={40}
                  height={40}
                  alt="logo"
                  className="rounded-full"
                />
              </div>
              <div className="p-2 item-start bg-gray-200 rounded-md duration-300 w-8/12">
                <Text fontWeight="normal" className="duration-300 text-left">
                  {msg.ai}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <Image
          onClick={onOpen}
          src={"/img/logoAi.png"}
          width={1000}
          height={1000}
          alt="logo"
          className="w-14 h-auto animate-bounce shadow-lg shadow-indigo-600 cursor-pointer rounded-2xl"
        />
      </div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent className="h-5/6">
          <ModalHeader className="text-indigo-600">Sinari Desa Ai</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="overflow-y-auto overflow-hidden">
            <Text fontWeight="semibold" mb="1rem" className="duration-300">
              <Pengembangan messages={messages} />
            </Text>
          </ModalBody>

          <ModalFooter>
            <form onSubmit={(e) => handleSubmit(e)} className="flex w-full">
              <div className="flex w-full gap-2">
                <textarea
                  placeholder="Your Text"
                  name="text"
                  value={message2}
                  onChange={(e) => setMessage2(e.target.value)}
                  className="w-full rounded-md p-2 border-none bg-gray-200"
                  required
                />
                <button
                  type="submit"
                  className={`bg-indigo-600 rounded-md py-2 px-4 text-white ${
                    loading ? "cursor-default" : "cursor-pointer"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="px-2 py-2">
                      <Spinner color="white" size={"md"} />
                    </div>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
