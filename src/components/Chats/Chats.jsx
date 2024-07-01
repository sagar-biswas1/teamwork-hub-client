import React, { useEffect, useRef, useState } from "react";
import useSocket from "../../socket";
import { useAuthContext } from "../../context/AuthContext";

const Chats = ({ projectId }) => {
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const chatBoxRef = useRef(null);
  const { authUser } = useAuthContext();
  const socket = useSocket(authUser?._id);
  const [message, setMessage] = useState(null);
  // Function to handle sending a chat message
  const sendMessage = () => {
    if (chatInput.trim() !== "") {
      const newMessage = {
        content: chatInput,
        sender: authUser._id,
        senderName: authUser.name,
        timestamp: new Date().toLocaleString(),
      };
      setMessage({
        chatRoomId: projectId,
        message: newMessage,
      });
      setChatInput("");
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight + 1000;
      }
    }
  };

  useEffect(() => {
    if (!socket || !message) return;
    socket.emit("deliverMessage", {
      chatRoomId: projectId,
      message,
    });
  }, [socket, message]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", ({ message }) => {
      setChatMessages((prevMessages) => [...prevMessages, message.message]);
    });

    // Clean up the effect
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, setChatMessages]);
  console.log(chatMessages);
  // Function to toggle chat drawer
  const toggleChatDrawer = () => {
    setChatDrawerOpen(!chatDrawerOpen); // Toggle chatDrawerOpen state
  };

  //--------- active status
  //see users
  useEffect(() => {
    if (!socket || !projectId) return;

    socket.on("room data", ({ users }) => {
      console.log(users);
      setActiveUsers(users);
    });
    return () => {
      socket.off("room data");
    };
  }, [socket, projectId]);
  //
  useEffect(() => {
    if (!socket || !projectId) return;

    socket.once("loadDocument", (doc) => {
      setCollaborators(doc.collaborators);
    });
    socket.emit("getDocumentId", projectId);
    return () => {
      socket.off("getDocumentId");
    };
  }, [socket, projectId]);

  return (
    <div>
      <div className=" px-3 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Active Collaborators
          </h3>
          <ul id="collaborators-list">
            {collaborators.map((p) => (
              <li key={p._id} className="flex items-center mb-2">
                <span
                  className={`h-2 w-2 ${
                    activeUsers.includes(p._id) ? "bg-green-500" : "bg-gray-500"
                  } rounded-full inline-block mr-2`}
                ></span>
                <span>{p.name}</span>
              </li>
            ))}
            {/* Add more collaborators here */}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Discussion</h3>
          <button
            id="open-chat-btn"
            onClick={toggleChatDrawer} // Toggle chat drawer state
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
          >
            Open Chat
          </button>
        </div>
      </div>
      {/* Chat Drawer */}
      <div
        id="chat-drawer"
        className={`fixed inset-y-0 right-0 w-3/4 md:w-1/3 lg:w-1/4 bg-white shadow-lg overflow-y-scroll chat-drawer p-6 ${
          chatDrawerOpen ? "open" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Chat</h3>
          <button
            id="close-chat-btn"
            onClick={toggleChatDrawer} // Toggle chat drawer state
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div
          id="chat-box"
          ref={chatBoxRef}
          className="h-3/4 overflow-y-scroll mb-4 p-2 border rounded-lg"
        >
          {/* Render chat messages */}
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                message.sender === authUser?._id
                  ? "chat-bubble-right"
                  : "chat-bubble-left"
              } p-2 rounded-lg mb-2 relative`}
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              <span className="absolute rounded-md  -top-2 -left-2 text-xs text-white-500  bg-blue-500 p-1">
                {message.sender === authUser?._id ? "you" : message.senderName}
              </span>
              <span>{message.content}</span>
            </div>
          ))}
        </div>
        <textarea
          id="chat-input"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          rows="2"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-2"
          placeholder="Type a message..."
        ></textarea>
        <button
          id="send-message-btn"
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
