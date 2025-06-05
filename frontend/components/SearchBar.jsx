import React, { useState, useEffect } from 'react';
import StreamingResponse from './StreamingResponse';

export default function SearchBar({ chatId, onNewChat }) {
  const [query, setQuery] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [responseStage, setResponseStage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkpointId, setCheckpointId] = useState(null);

  // Reset state when chatId changes
  useEffect(() => {
    resetResponse();
    setCheckpointId(null);
  }, [chatId]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const setupSSEConnection = (encodedQuery) => {
    setIsLoading(true);
    setResponseContent('');

    const baseUrl = "http://127.0.0.1:8000/chat_stream/";
    const url = checkpointId
      ? `${baseUrl}${encodedQuery}?checkpoint_id=${checkpointId}`
      : `${baseUrl}${encodedQuery}`;

    // Close any existing connections
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'checkpoint':
            setCheckpointId(data.checkpoint_id);
            break;

          case 'search_start':
            setSearchQuery(data.query);
            setResponseStage('searching');
            break;

          case 'search_results':
            setSearchResults(data.urls);
            setResponseStage('reading');
            break;

          case 'content':
            setResponseStage('writing');
            setResponseContent(prev => prev + data.content);
            break;

          case 'end':
            setIsLoading(false);
            eventSource.close();
            break;

          default:
            console.log("Unknown event type:", data.type);
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      setIsLoading(false);
      eventSource.close();
    };

    return eventSource;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentQuery = query;
    setQuery("");

    const encodedQuery = encodeURIComponent(currentQuery);
    const eventSource = setupSSEConnection(encodedQuery);

    return () => {
      eventSource.close();
    };
  };

  const resetResponse = () => {
    setResponseContent('');
    setSearchQuery('');
    setSearchResults([]);
    setResponseStage(null);
  };

  const newChat = () => {
    resetResponse();
    setCheckpointId(null);
    onNewChat();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Ask me anything..."
          className="w-full border border-black-300 rounded px-4 py-2 mb-2 sm:mb-0 focus:outline-none focus:ring focus:border-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`w-full sm:w-auto px-4 py-2 rounded transition-colors ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Ask'}
        </button>
      </form>

      <StreamingResponse
        responseStage={responseStage}
        searchQuery={searchQuery}
        searchResults={searchResults}
        responseContent={responseContent}
        isLoading={isLoading}
      />

      <style jsx>{`
        .search-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1000px;
          transition: max-width 0.3s ease-in-out;
        }
        
        .search-form {
          width: 100%;
          margin-bottom: 20px;
          padding: 1em;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .new-chat-btn {
          margin-left: 8px;
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .new-chat-btn:hover {
          background-color: #45a049;
        }
        
        @media (min-width: 640px) {
          .search-form {
            flex-direction: row;
            align-items: center;
          }
        }
        
        @media (max-width: 480px) {
          .search-form {
            padding: 0.5em;
          }
        }
      `}</style>
    </div>
  );
}
