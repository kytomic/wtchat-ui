import React, { useRef, useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  const alertRef = useRef(null);

  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {username, password, email};

    axios.post("http://localhost:3000/user/login", user)
      .then((res) => {
        if (res.data == "") {
          alertRef.current.hidden = false;
          return;
        }
        
        let {username, id} = res.data;
        localStorage.setItem("username", username);
        localStorage.setItem("userId", id);
        navigate("/chat");
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
          <Typography ref={alertRef} variant="h6" component="h6" fontWeight={500} fontStyle={{color: "red"}} fontSize={15} hidden>Username or password is incorrect.</Typography>
        </Box>
    </form>
  )
}

export default Login;