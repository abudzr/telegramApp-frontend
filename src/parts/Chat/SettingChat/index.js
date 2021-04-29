import React, { useState } from 'react'
import UserProfile from "../../../assets/images/UserProfile.png"
import Union from "../../../assets/images/Union.png"
import PrivacySecurity from "../../../assets/images/security.png"
import dataStorage from "../../../assets/images/dataStorage.png"
import Chat from "../../../assets/images/Chat.png"
import Device from "../../../assets/images/Device.png"


import './settingchat.css'

function SettingChat(props) {
    const [disabled, setDisabled] = useState(true);

    const handleDisabledFalse = () => {
        setDisabled(!disabled);
    };
    const handleSave = () => {
        alert("ada")
    }
    return (
        <div className="setting-profile">
            <div className="header-setting d-flex">
                <i className="fa fa-angle-left" onClick={props.back} />
                <h1>@wdlam</h1>
            </div>
            <div className="pict-user">
                <img alt="pict profile" src={UserProfile} />
            </div>
            <div className="info-username">
                <h3>Gloria Mckinney</h3>
                <p>@wdlam</p>
            </div>
            <div className="container">
                <div className="account-profile">
                    <h1>Account</h1>
                    <input type="text" placeholder="+62822-6076-4044" disabled={disabled} />
                    {disabled === true ? "" : <i className="fa fa-check " onClick={handleSave} />}
                    <p onClick={handleDisabledFalse}>Tap to change phone number</p>
                    <hr />
                    <h2>@wdlam</h2>
                    <span>username</span>
                    <hr />
                    <h2>I’m Senior Frontend Developer from Microsoft</h2>
                    <span>bio</span>
                    <h1>Settings</h1>

                    <div className="setting">
                        <div className="d-flex mt-3">
                            <img alt="bell pict" src={Union} width="22" height="20" />
                            <p>Notification and Sounds</p>
                        </div>
                        <div className="d-flex mt-3 privacy">
                            <img alt="Privacy and security" src={PrivacySecurity} width="16" height="20" />
                            <p>Privacy and Security</p>
                        </div>
                        <div className="d-flex mt-3">
                            <img alt="dataStorage pict" src={dataStorage} width="22" height="20" />
                            <p>Data and Storage</p>
                        </div>
                        <div className="d-flex mt-3">
                            <img alt="Chat settings pict" src={Chat} width="22" height="20" />
                            <p>Chat settings</p>
                        </div>
                        <div className="d-flex mt-3">
                            <img alt="Devices pict" src={Device} width="22" height="17" />
                            <p>Devices</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingChat
