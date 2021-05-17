import React, { useEffect, useState } from 'react'
import { Redirect, Route } from "react-router-dom";
import io from 'socket.io-client'

function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = localStorage.getItem("token");
  const [socket, setSocket] = useState(null)

  const setupSocket = () => {
    const newSocket = io("https://be-telegramapp.fwdev.online")
    setSocket(newSocket)
  }

  useEffect(() => {
    setupSocket() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} socket={socket} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
