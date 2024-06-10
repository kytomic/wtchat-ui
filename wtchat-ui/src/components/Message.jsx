import React, { useState } from 'react';
import {Box, Container, Typography} from '@mui/material';
import '../model/MessageDetail';

function temp() {
    const temp = new MessageDetail("name", "name", "name");
}

const Message = (props) => {
  let [senderName, setSenderName] = useState(props.senderName);
  let [body, setBody] = useState(props.body);

  return (
    <Box
        sx={{border: '2px solid grey', borderRadius: 3}}
        paddingTop={2} paddingBottom={2} paddingLeft={2} paddingRight={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"       
    >
        <Typography color="blue" fontWeight="500">{senderName}</Typography>
        <Typography>{body}</Typography>
    </Box>
  )
}

export default Message