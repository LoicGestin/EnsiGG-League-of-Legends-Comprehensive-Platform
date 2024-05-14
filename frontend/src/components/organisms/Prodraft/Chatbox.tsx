import React, {useEffect, useRef, useState} from "react";
import io, {Socket} from "socket.io-client";

export default function Chatbox() {
    const [username, setUsername] = useState<string>("USER" + Math.floor(Math.random() * 1000));
    const [room, setRoom] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {

        socketRef.current = io("http://localhost:3000");
        socketRef.current.on("connect", () => {
            const newUsername = "USER" + Math.floor(Math.random() * 1000);
            setUsername(newUsername);

            const urlPath = window.location.pathname;
            const roomFromUrl = urlPath.substring(urlPath.lastIndexOf('/') + 1);
            setRoom(roomFromUrl);
            socketRef.current?.emit("join_room", roomFromUrl);
        });

        socketRef.current.on("message", (message: string) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);


    const sendMessage = (message: string, isSystemMessage: boolean = false) => {
        if (message && room !== "") {
            const fullMessage = isSystemMessage ? message : `${message}`;
            socketRef.current?.emit("message", {username, room, message: fullMessage });
            setMessageInput("");
        }
    };

    const handleSendMessage = () => {
        sendMessage(messageInput);
    };
    return (
        <div className="bg-slate-900 text-gray-300 flex flex-col justify-between   w-[54%] ">
            <div id="chat" className="overflow-auto p-3 space-y-2 flex-grow">
                {messages.map((message, index) => (
                    <p key={index} className="text-gray-300 py-1">{message}</p>
                ))}
            </div>
            <div className="flex border-t border-gray-700">
                <input
                    id="message"
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="px-3 w-full outline-none text-white bg-slate-900"
                    placeholder="Enter a message..."
                />
                <button
                    className="px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 transition-colors"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}