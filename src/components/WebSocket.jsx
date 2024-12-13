import { useEffect, useRef, useState } from "react";
import "./App.css";


function WebSocketCompo() {
  const socketRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState([])

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    
    newSocket.onmessage = (message) => {
      const tempMsg = message.data.split("\n");
      setMessage((prev) => [...prev, ...tempMsg])
      console.log("Message received:", message.data);
    };

    socketRef.current = newSocket;

    return () => newSocket.close();
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(inputText);
      setInputText("");
    } else {
      console.error("WebSocket is not open");
    }
  };


  return (
    <>
      <div>
        <input type="text" value={inputText} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <div>{JSON.stringify(message)}</div>
      </div>
    </>
  );
}

export default WebSocketCompo;
