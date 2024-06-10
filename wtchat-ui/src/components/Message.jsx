import React, { useState } from 'react';
import {Box, Container, Typography} from '@mui/material';
import '../model/MessageDetail';



const Message = ({_senderName, _body}) => {
  let [senderName, setSenderName] = useState(_senderName);
  let [body, setBody] = useState(_body);

  return (
    <Box
        sx={{border: '2px solid grey', borderRadius: 3}}
        paddingTop={2} paddingBottom={2} paddingLeft={2} paddingRight={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        bgcolor="white"       
    >
        <Typography color="blue" fontWeight="500">{senderName}</Typography>
        <Typography>{body}</Typography>
    </Box>
  )
}

export default Message