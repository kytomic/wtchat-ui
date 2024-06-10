import React, { useState } from 'react'
import {Container, Typography, Box, TextField, Button} from '@mui/material';
import '../styles/login.css';
import axios from 'axios';

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username: ", username);
    console.log("Password: ", password);

    const user = {username, password, email};

    axios.post("http://localhost:3000/user/login", user)
      .then((res) => {
        console.log("Login Successfully");
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className='form' onSubmit={handleLogin}>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={5}
            sx={{border: "2px solid grey", borderRadius: "5px"}}
            padding={5}
        >
            <Typography variant="h4" component="h4" fontWeight={500}>Login</Typography>
            <TextField id="username" label="Username" variant='standard' className="textfield" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <TextField id="password" label="Password" variant='standard' className="textfield" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <Button variant='contained' style={{marginTop: "3rem"}} type='submit'>Login</Button>
        </Box>
    </form>
  )
}

export default Login;