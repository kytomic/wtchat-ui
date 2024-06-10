import React, { useEffect, useRef, useState } from 'react';
import Message from '../components/Message';
import MessageModel from '../model/MessageModel';
import axios from 'axios';
import { Box, TextField, Container, Button } from '@mui/material';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

const Chatroom = () => {
  let [messages, setMessages] = useState([]); 
  let [input, setInput] = useState(""); 
  let stompClientRef = useRef(null);
  let hasPageBeenRendered = useRef(false);

  const handleSend = () => {
    let userId = localStorage.getItem("userId");
    let username = localStorage.getItem("username");
    let newMessage = {
      message: new MessageModel(input, userId),
      senderName: username
    };
    sendMessage(newMessage);
  };

  useEffect(() => {
    if (!hasPageBeenRendered.current) {
      axios("http://localhost:3000/message/all").then((res) => {
          setMessages(res.data);
      }).catch(err => {
          console.log(err);
      });
              
      registerUser();
      hasPageBeenRendered.current = true;
    }

  }, []);

  const registerUser = () => {
    let sock = new SockJS("http://localhost:3000/ws");
    stompClientRef.current = over(sock);
    stompClientRef.current.connect({}, onConnected, onWebSocketError);
  }

  const onConnected = () => {
    stompClientRef.current.subscribe('/chatroom/public', async (res) => {      
      setMessages(preMessages => [...preMessages, JSON.parse(res.body)]);
    });
  };

  const onWebSocketError = (error) => {
    console.error('Error with websocket', error);
  };

  const sendMessage = (newMessage) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send("/app/send", {}, JSON.stringify(newMessage));
    } else {
      console.error('WebSocket connection is not established.');
    }
  }

  return (
    <Box
      width={"50%"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
        >
        <Box
            display="flex"
            flexDirection="column"
            gap={3}>
            { messages.map(msg => <Message _senderName={msg.senderName} _body={msg.message.body}/>) }
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="end"
          height="3rem"
          marginTop={7}>
          <TextField id="input" label="Type..." variant='standard' className="textfield" value={input} onChange={(e) => {setInput(e.target.value)}} height="100%"/>
          <Button variant='contained' type='button' onClick={handleSend}>Send</Button>
        </Box>
    </Box>
  )
}

export default Chatroom