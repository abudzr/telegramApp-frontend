import React, { useState } from 'react'
// css
import './chat.css'

import user from "../../assets/images/user.png"
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

function ChatList() {
    const [createChannel, setCreateChannel] = useState(false);
    const [createOption, setcreateOption] = useState(false);
    const [chat, setChat] = useState(false);
    const [icondown, setIcondown] = useState(false);
    const [setting, setSetting] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    // Create Channel
    const handleCreateChannel = () => {
        setCreateChannel(!createChannel)
        setcreateOption(false)
    }
    const handleCreateChannelGruop = () => {
        alert("ada")
    }
    // End Channel

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

    // end option

    // edit chat
    const handleEditChat = () => {
        setIcondown(!icondown)
    }
    // create chat
    const handleChat = () => {
        setChat(true)
    }

    // chat menu
    const handleChatMenu = () => {
        setProfileMenu(!profileMenu)
    }


    return (
        <div className="chatroom">
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
                                <div className="list-chatting d-flex" onClick={handleChat}>
                                    <img src={user} alt="user pict" width="64" height="64" />
                                    <div className="ml-3">
                                        <h1>Theresa Webb</h1>
                                        <p>why did you do that?</p>
                                    </div>
                                    <div className="detail-time-delivered">
                                        <p>14.08</p>
                                        <div className="icon-notification-delivered d-flex">
                                            <span className="fa fa-check" />
                                            <div>
                                                <span className="fa fa-angle-down icon-down" onClick={handleEditChat} />
                                                {icondown === true ?
                                                    <div className="edit-chat">
                                                        <h1>Save messages</h1>
                                                        <h1>Delete messages</h1>
                                                        <h1>Mark as read</h1>
                                                    </div>
                                                    :
                                                    ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        <img src={user} alt="user pict" width="64" height="64" />
                                        <div className="ml-3">
                                            <h2>Theresa Webb</h2>
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
                                                            <p>Delete chat history</p>
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

                                <div className="footer-chat-message">
                                    <input type="text" placeholder="Type your message..." />
                                    <div className="icon-chat d-flex">
                                        <i className="fa fa-plus" />
                                        <i className="fa fa-grin-alt" />
                                        <img src={inputchat} alt="inputchat" />
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
