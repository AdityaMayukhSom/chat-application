import Form from "./components/Form";
import { useState } from "react";

function App() {
  const [chat, setChat] = useState([]);
  return (
    <>
      <div id="message-container">
        {chat.map((chat, idx) => {
          return <div key={idx}>{chat}</div>;
        })}
      </div>
      <Form setChat={setChat}></Form>
    </>
  );
}

export default App;
