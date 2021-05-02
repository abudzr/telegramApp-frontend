import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { findUserById, getAllUser } from "../../configs/redux/actions/user";
import { getMessages, deleteHistoryChat } from "../../configs/redux/actions/message"

// toast
import { ToastContainer, toast } from 'react-toastify';

// css
import './chat.css'
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2'
// import user from "../../assets/images/user.png"
import iconHumberger from "../../assets/images/Menu.png"
import newGroup from "../../assets/images/Newgroup.png"
import SecretChat from "../../assets/images/SecretChat.png"
import NewChannel from "../../assets/images/Newchannel.png"
import Settings from "../../assets/images/Settings.png"
import Contacts from "../../assets/images/Contacts.png"
import calls from "../../assets/images/calls.png"
import SaveMessage from "../../assets/images/SaveMessage.png"
import Invitefriends from "../../assets/images/Invitefriends.png"
import FAQ from "../../assets/images/FAQ.png"
import Profilemenu from "../../assets/images/Profilemenu.png"
import inputchat from "../../assets/images/inputchat.png"
import deleteChat from "../../assets/images/deleteChat.png"
import Mute from "../../assets/images/Mute.png"
import Search from "../../assets/images/Search.png"


// component
import SettingChat from './SettingChat'

toast.configure()
function ChatList({ socket }) {
    // console.log(socket);
    // env
    const ImgUrl = process.env.REACT_APP_API_URLIMG;

    // redux
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const idUser = localStorage.getItem("id")
    // console.log(idUser);
    const [createChannel, setCreateChannel] = useState(false);
    const [createOption, setcreateOption] = useState(false);
    const [chat, setChat] = useState(false);
    const [icondown, setIcondown] = useState(false);
    const [setting, setSetting] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [idReceiver, setIdReceiver] = useState(null)
    const [dataReceiver, setDataReceiver] = useState({})
    const [keyword, setKeyword] = useState("");

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [lastMessage, setLastMessage] = useState("")
    // const [isDelete, setIsDelete] = useState([]);
    // console.log(messages);

    // Create Channel
    const handleCreateChannel = () => {
        setCreateChannel(!createChannel)
        setcreateOption(false)
    }
    const handleCreateChannelGruop = () => {
        alert("ada")
    }
    // create option
    const handleOptionMenu = () => {
        setcreateOption(!createOption);
        setCreateChannel(false)
    }
    const handleSetting = () => {
        setSetting(true);
    }
    const handleBack = () => {
        setSetting(false);
        setcreateOption(false);
    }
    // edit chat
    const handleEditChat = () => {
        setIcondown(!icondown)
    }
    // create chat
    const handleChat = (data) => {
        setIdReceiver(data)
        setChat(true)
        dispatch(getMessages(idUser, data))
            .then((res) => {
                // console.log(res);
                setMessages(res);
            })
            .catch((err) => {
                console.log(err);
                // Swal.fire({
                //     title: "Error!",
                //     text: err.message,
                //     icon: "error",
                //     confirmButtonText: "Ok",
                //     confirmButtonColor: "#7E98DF",
                // });
            })
    };

    const handleInputMessage = (e) => {
        setMessage(e.target.value);
        setKeyword(e.target.value);
        if (e.keyCode === 13) {
            setKeyword("");
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        socket.emit('sendMessage', {
            chat: message,
            idTo: idReceiver,
            idFrom: idUser
        }, (data) => {
            // console.log('callback', data);
            setMessages(data)
        })
    }

    // chat menu
    const handleChatMenu = () => {
        setProfileMenu(!profileMenu)
    }

    // delete
    // const handleDelete = (id) => {
    //     alert(id)
    // }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this?",
            showDenyButton: true,
            confirmButtonText: `Delete`,
            confirmButtonColor: "#7E98DF",
            denyButtonText: "Cancel",
            denyButtonColor: `#ffba33`,
            focusDeny: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteHistoryChat(id))
                    .then((res) => {
                        Swal.fire({
                            title: "Success!",
                            text: res.message,
                            icon: "success",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#ffba33",
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error!",
                            text: err,
                            icon: "error",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#7E98DF",
                        });
                    });
            } else {
                Swal.fire({
                    title: "delete canceled",
                    text: "",
                    icon: "info",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#7E98DF",
                });
            }
        });
    };








    // socket
    useEffect(() => {
        if (socket) {
            socket.on('receiverMessage', (result) => {
                const lastmessage = result[result.length - 1]
                // console.log(result[result.length - 1].chat);
                const notify = () => {
                    toast.info("You Have New Messages");
                }
                notify();
                // const notify = () => {
                //     toast.info(`${newmessage}`);
                // }
                // notify();
                setMessages(result)
                setLastMessage(lastmessage)
            })
        }
    }, [socket, messages])

    useEffect(() => {
        if (socket) {
            socket.emit('initialUser', localStorage.getItem('id'))
        }
    }, [socket])


    useEffect(() => {
        dispatch(findUserById(idReceiver)).then((res) => {
            setDataReceiver(res)
        });
    }, [dispatch, idReceiver]);

    useEffect(() => {
        dispatch(getAllUser())
        // setDataAllUser(user); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]); // eslint-disable-next-line react-hooks/exhaustive-deps

    return (
        <div className="chatroom">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="row">
                <div className="col-lg-4 aside-left">
                    {setting === false ?
                        <div>
                            <div className="header-chat d-flex justify-content-between">
                                {createChannel === false ?
                                    <h1 onClick={handleCreateChannel} >Telegram</h1>
                                    :
                                    <div className="create-channel d-flex justify-content-between" onClick={handleCreateChannel}>
                                        <img onClick={handleCreateChannelGruop} alt="create channel" src={newGroup} width="31" height="22" />
                                        <img src={SecretChat} alt="create channel" width="14" height="22" />
                                        <img src={NewChannel} alt="create channel" width="20" height="22" />
                                    </div>
                                }
                                <div className="option" >
                                    <div className="hamburger">
                                        <img onClick={handleOptionMenu} src={iconHumberger} alt="option" width="22" height="18" />
                                    </div>
                                    {createOption === true ?
                                        <div className="option-menu">
                                            <div className="d-flex mb-4" onClick={handleSetting}>
                                                <img src={Settings} alt="option" width="22" height="22" />
                                                <p>Setting</p>
                                            </div>
                                            <div className="d-flex mb-4">
                                                <img src={Contacts} alt="contact" width="22" height="22" />
                                                <p>Contact</p>
                                            </div>
                                            <div className="d-flex mb-4">
                                                <img src={calls} alt="calls" width="22" height="22" />
                                                <p>Calls</p>
                                            </div>
                                            <div className="d-flex mb-4">
                                                <img src={SaveMessage} alt="SaveMessage" width="22" height="22" />
                                                <p>Save messages</p>
                                            </div>
                                            <div className="d-flex mb-4">
                                                <img src={Invitefriends} alt="Invitefriends" width="22" height="20" />
                                                <p>Invite Friends</p>
                                            </div>
                                            <div className="d-flex ">
                                                <img src={FAQ} alt="FAQ" width="22" height="22" />
                                                <p>Telegram FAQ</p>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                            <div className="fitur-search d-flex">
                                <form className="search">
                                    <span className="fa fa-search icon-search" />
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                    />
                                </form>
                                <i className="fa fa-plus icon-plus" />
                            </div>
                            <div className="button-sorting d-flex ">
                                <button type="submit">All</button>
                                <button type="submit">Important</button>
                                <button type="submit">Unread</button>
                                <button type="submit">Read</button>
                            </div>
                            <div className="all-list-chatting">
                                {user.length > 1 ?
                                    user.map((item, index) => {
                                        return (
                                            <>
                                                <div className="list-chatting d-flex" key={index} onClick={() => handleChat(item.id)}>
                                                    <img src={`${ImgUrl}${item.image}`} alt="user pict" width="64" height="64" />
                                                    <div className="ml-3">
                                                        <h1>{item.fullName}</h1>
                                                        <p className="last-message">{item.id === lastMessage.idTo ? lastMessage.chat : ""}</p>
                                                    </div>
                                                    <div className="detail-time-delivered">
                                                        <p>{item.id === lastMessage.idTo ? lastMessage.time : ""}</p>
                                                        <div className="icon-notification-delivered d-flex">
                                                            <span className="fa fa-check" />
                                                            <div>
                                                                <span className="fa fa-angle-down icon-down" onClick={handleEditChat} />
                                                                {/* {icondown === true ?
                                                                    <div className="edit-chat">
                                                                        <h1>Save messages</h1>
                                                                        <h1>Delete messages</h1>
                                                                        <h1>Mark as read</h1>
                                                                    </div>
                                                                    :
                                                                    ""
                                                                } */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    }) : ""}
                            </div>
                        </div>
                        :
                        <>
                            <SettingChat
                                back={handleBack}
                            />
                        </>
                    }
                </div>

                {/* aside right */}
                <div className="col-lg-8 aside-right ">
                    {chat === false ?
                        <h1>Please select a chat to start messaging</h1>
                        :
                        <>
                            <div className="aside-chatting">
                                <div className="header-chat-message">
                                    <div className="header-chat-profile d-flex">
                                        <img src={`${ImgUrl}${dataReceiver.image}`} alt="user pict" width="64" height="64" />
                                        <div className="ml-3">
                                            <h2>{dataReceiver.fullName}</h2>
                                            <p>Online</p>
                                        </div>
                                        <div className="profile-menu-message">
                                            <img className="profile-menu" src={Profilemenu} alt="profile-menu" width="20" height="19" onClick={handleChatMenu} />
                                            {profileMenu === false ? "" :
                                                <>
                                                    <div className="chat-menu">
                                                        <div className="d-flex">
                                                            <img src={calls} alt="calls" width="22" height="22" />
                                                            <p>Call</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src={deleteChat} alt="deleteChat" width="22" height="22" />
                                                            <p onClick={handleDelete}>Delete chat history</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src={Mute} alt="Mute" width="22" height="22" />
                                                            <p>Mute notification</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src={Search} alt="Search" width="22" height="22" />
                                                            <p>Search</p>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* isi chat */}
                                <div className="messages-user ">

                                    {messages.map((item, index) =>
                                        item.idFrom === Number(idUser) &&
                                            item.type === "send" &&
                                            item.idTo === idReceiver ? (
                                            <>
                                                <div className="sender d-flex justify-content-end align-items-start" key={index}>
                                                    <p>{item.time}</p>
                                                    <div className="chat-message-from " onClick={() => handleDelete(item.id)}>
                                                        <div >{item.chat}</div>
                                                    </div>

                                                </div>
                                            </>
                                        ) : item.idFrom === Number(idUser) &&
                                            item.type === "receive" &&
                                            item.idTo === idReceiver ? (
                                            <>
                                                <div className="receive d-flex justify-content-start align-items-end" key={index}>

                                                    <div className="chat-message-to " onClick={() => handleDelete(item.id)} >
                                                        <div>{item.chat}</div>
                                                    </div>
                                                    <p>{item.time}</p>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )
                                    )}

                                </div>

                                <div className="footer-chat-message d-flex">
                                    <input type="text" placeholder="Type your message..." name="chat" id="chat" value={keyword} onChange={handleInputMessage} onKeyUp={handleInputMessage} />
                                    <div className="icon-chat d-flex">
                                        <i className="fa fa-plus" />
                                        <i className="fa fa-grin-alt" />
                                        <img src={inputchat} alt="inputchat" />
                                    </div>
                                    <div className="send-message">
                                        <button type="button" onClick={handleSendMessage}>
                                            <i className="fa fa-paper-plane send-message" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatList
