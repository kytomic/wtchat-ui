import React, { useEffect, useRef, useState } from 'react';
import Message from '../components/Message';
import MessageDetail from '../model/MessageDetail';
import axios from 'axios';
import { Box, TextField, Container, Button } from '@mui/material';



const Chatroom = () => {
  let [messages, setMessages] = useState([]); 
  let [input, setInput] = useState(""); 
  let hasPageBeenRendered = useRef(false);

  const handleSend = () => {
    let newMessage = {
      message: {
        body: input
      },
      senderName: 'test1'
    };
    let messageList = [...messages];
    messageList.push(newMessage);
    setMessages(messageList);
  };

  useEffect(() => {
    if (!hasPageBeenRendered.current) {
        axios("http://localhost:3000/message/all").then((res) => {
            setMessages(res.data);
        }).catch(err => {
            console.log(err);
        });
                
        hasPageBeenRendered = true;
    }
  }, []);
        
  useEffect(() => {
    console.log(messages);
  }, [messages])


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
            { messages.map(msg => <Message senderName={msg.senderName} body={msg.message.body}/>) }
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