import React from 'react'
import ChatList from '../../parts/Chat'

function chat({ socket }) {
    return (
        <ChatList
            socket={socket} />
    )
}

export default chat
