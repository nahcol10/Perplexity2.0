import { useState } from "react";
import SearchBar from "./SearchBar";

const ChatArea = ({ isMobile }) => {
  const [currentChatId, setCurrentChatId] = useState("default");

  const startNewChat = () => {
    setCurrentChatId(`chat_${Date.now()}`);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h1 className="mt-4 text-gray-700 font-bold">Perplexity 2.o</h1>
      </div>
      <div className="chat-container">
        <SearchBar chatId={currentChatId} onNewChat={startNewChat} />
      </div>

      <style jsx>{`
        .chat-area {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${isMobile ? '8px 10px' : '12px 20px'};
          background-color: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .new-chat-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .new-chat-button:hover {
          background-color: #45a049;
        }
        
        .chat-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding: ${isMobile ? '10px' : '20px'};
          align-items: center;
          overflow-y: auto;
          padding-bottom: 40px;
        }
      `}</style>
    </div>
  );
};

export default ChatArea;