import { useEffect, useState } from "react";
import "./App.css";
import socket from "./configs/socket";

function App() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.auth = { id: 1 };
    socket.connect();
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("recieved", (msg) => {
      setMessage([...message, msg]);
    });
    console.log("EIEI");
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("message", input);
    setInput("");
  };

  return (
    <>
      {message.map((msg) => (
        <>
          <div>{msg}</div>
        </>
      ))}
      <ul id="messages"></ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Send</button>
      </form>
    </>
  );
}

export default App;
