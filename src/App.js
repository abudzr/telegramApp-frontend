import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import Login from './pages/auth/login'
import Register from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgotPassword'
import ResetPassword from './pages/auth/resetPassword'

// import ChatRoom from './page/main/ChatRoom'
// import Dashboard from './page/main/Dasboard'

function App() {
  const [socket, setSocket] = useState(null)
  // const [message, setMessage] = useState('')
  // const [messages, setMessages] = useState([])

  const setupSocket = () => {
    // console.log('hello');
    const newSocket = io("http://localhost:8080")
    // console.log(newSocket);
    // newSocket.on("connect", ()=>{
    //   console.log('connect');
    // })
    setSocket(newSocket)
  }

  useEffect(() => {
    setupSocket()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:email/:token" component={ResetPassword} />


        {/* <Route path="/chatroom/:room" render={(props) => <ChatRoom {...props} socket={socket} />} /> */}
        {/* <Route path="/dashboard" render={(props) => <Dashboard {...props} socket={socket} />} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;