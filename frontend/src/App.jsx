import Form from "./components/Form";
import { useState, useEffect } from "react";
import { socket } from "./socket";
function App() {
    const [chat, setChat] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function handleBroadcastMessage(message) {
            console.log(message)
            setChat(chat => [...chat, message.text]);
        }


        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('broadcast-message', handleBroadcastMessage)
        socket.connect()

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('broadcast-message', handleBroadcastMessage)
            socket.disconnect()
        };
    }, []);

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
