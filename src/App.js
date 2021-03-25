import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState('')
  const [toSend, setToSend] = useState("");
  useEffect(() => {
    const socketIo = socketIOClient("127.0.0.1:1025")
    console.log("Connecting")
    console.log(socketIo.connected);
    socketIo.on('connect', socket => {
      console.log('connnected to socket', socket);
    });
    socketIo.on("conversation", (msg) => {
      
      setnewMessage(msg);
    });
    return () => socketIo.disconnect()
  }, []);
  useEffect(() => {
    setMessages([...messages,newMessage])
    
  }, [newMessage])
  const sendMessage = () => {
    console.log(toSend)
    const socketIo = socketIOClient("127.0.0.1:1025")

    socketIo.emit('message', toSend);
  };
  return (
    <div className="App" style={{backgroundColor:"#f5f5f5"}}>
      <Paper style={{margin:'auto' ,minHeight:500,maxHeight:600,minWidth:400,maxWidth:500}}>
        <div style={{minHeight:500,maxHeight:600,minWidth:400,maxWidth:500}}>
          {messages?.map((e,i) => {
            return <Typography key={i}>{e}</Typography>;
          })}
        </div>
        <TextField
          label="Message"
          value={toSend}
          type="string"
          multiline
          rows='4'
          style={{
            minWidth:400
          }}
          onChange={(e) => setToSend(e.target.value)}
        />
     
      </Paper>
      <Button  style={{marginTop:40}} color="primary" variant={"contained"} onClick={sendMessage}>
          {" "}
          Send{" "}
        </Button>
    </div>
  );
}

export default App;
