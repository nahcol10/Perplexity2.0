import { useState, useEffect } from "react";
import ChatArea from "../components/ChatArea";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100%"
      }}>
        <ChatArea isMobile={isMobile} />
      </div>
    </>
  )
}
export default App;