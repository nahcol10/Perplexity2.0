import React from 'react';

const StreamingResponse = ({
  responseStage,
  searchQuery,
  searchResults,
  responseContent,
  isLoading
}) => {
  if (!isLoading && !responseStage) return null;

  return (
    <div className="streaming-response">
      {/* Searching stage */}
      {responseStage === 'searching' && (
        <div className="response-stage searching">
          <div className="stage-header">
            <div className="stage-icon">🔍</div>
            <h3>Searching the web</h3>
          </div>
          <div className="stage-content">
            <p><strong>Query:</strong> {searchQuery}</p>
          </div>
        </div>
      )}

      {/* Reading stage */}
      {responseStage === 'reading' && searchResults.length > 0 && (
        <div className="response-stage reading">
          <div className="stage-header">
            <div className="stage-icon">📚</div>
            <h3>Reading</h3>
          </div>
          <div className="stage-content">
            <p><strong>Sources:</strong></p>
            <ul className="sources-list">
              {searchResults.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url.replace(/^https?:\/\//, '').split('/')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Writing stage */}
      {responseStage === 'writing' && (
        <div className="response-stage writing">
          <div className="stage-header">
            <div className="stage-icon">✍️</div>
            <h3>Writing answer</h3>
          </div>
          <div className="stage-content">
            <div className="answer-text">{responseContent}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .streaming-response {
          width: 100%;
          max-width: 800px;
          margin-bottom: 20px;
          background: white;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .response-stage {
          padding: 16px;
          border-bottom: 1px solid #eee;
        }
        
        .stage-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .stage-icon {
          font-size: 1.5rem;
          margin-right: 10px;
        }
        
        .stage-content {
          padding: 5px 0 5px 30px;
        }
        
        .sources-list {
          list-style-type: none;
          padding-left: 15px;
        }
        
        .sources-list li {
          margin-bottom: 5px;
        }
        
        .sources-list a {
          color: #2563eb;
          text-decoration: none;
          border-bottom: 1px dotted #2563eb;
        }
        
        .sources-list a:hover {
          text-decoration: underline;
        }
        
        .answer-text {
          line-height: 1.6;
          white-space: pre-wrap;
        }
        
        .searching {
          background-color: #f0f7ff;
        }
        
        .reading {
          background-color: #f0fff4;
        }
        
        .writing {
          background-color: #fff7f0;
        }
        
        h3 {
          font-size: 1.2rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default StreamingResponse;
