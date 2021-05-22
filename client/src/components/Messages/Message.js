import React from 'react';

import file from '../../img/doc.png'

import './Message.css';

import ReactEmoji from 'react-emoji';
import Image from './Image';
import Video from './Video';
import File from './File'

const Message = ({ message: { text, user, type, privacy, fileName, file_extension }, name }) => {
    let isSentByCurrentUser = false;
    let blob;

    if (type === 'document' || type === 'image' || type === 'video') {
        if (file_extension.toLowerCase() === 'docx' || file_extension.toLowerCase() === 'doc') {
            blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        } else if (file_extension.toLowerCase() === 'pdf') {
            blob = new Blob([text], { type: 'application/pdf' })
        } else if (file_extension.toLowerCase() === 'xlsx') {
            blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        } else if (file_extension.toLowerCase() === 'pptx' || file_extension.toLowerCase() === 'ppt') {
            blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' })
        } else {
            blob = new Blob([text], { type: 'file' })
        }
    }


    if (user === name) {
        isSentByCurrentUser = true;
    }

    if (type === 'text') {
        return (
            isSentByCurrentUser
                ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{name}</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}{privacy === 'private' ? <p style={{ color: "rgb(22, 238, 3)" }}>(privately)</p> : ""}</p>
                        </div>

                    </div>
                )
                : (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox backgroundLight">
                            <p className="messageText colorDark">{ReactEmoji.emojify(text)}{privacy === 'private' ? <p style={{ color: "red" }}>(privately)</p> : ""}</p>
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )
        );

    } else if (type === 'image') {
        return (
            isSentByCurrentUser
                ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{name}</p>
                        <div className="messageBox2 backgroundLight">
                            <Image fileName={fileName} blob={blob} />
                            {privacy === 'private' ? <p style={{ color: "red", marginTop: 2, textAlign: "center" }}>(privately)</p> : ""}
                        </div>
                    </div>
                )
                : (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox2 backgroundLight">
                            <Image fileName={fileName} blob={blob} />
                            {privacy === 'private' ? <p style={{ color: "red", marginTop: 2, textAlign: "center" }}>(privately)</p> : ""}
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )
        );
    } else if (type === 'video') {
        return (
            isSentByCurrentUser
                ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{name}</p>
                        <div className="messageBox2">
                            <Video blob={blob} />
                        </div>
                    </div>
                )
                : (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox2">
                            <Video blob={blob} />
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )
        );
    } else if (type === 'document') {
        return (
            isSentByCurrentUser
                ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{name}</p>
                        <div className="messageBox2">
                            <File fileName={fileName} blob={blob} />
                            {privacy === 'private' ? <p style={{ color: "red", textAlign: "center", marginTop: 0 }}>(privately)</p> : ""}
                        </div>
                    </div>
                )
                : (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox2">
                            <File fileName={fileName} blob={blob} />
                            {privacy === 'private' ? <p style={{ color: "red", textAlign: "center", marginTop: 0 }}>(privately)</p> : ""}
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )
        );

    } else {
        return (
            isSentByCurrentUser
                ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{name}</p>
                        <div className="messageBox2">
                            <File fileName={fileName} blob={blob} />
                            {privacy === 'private' ? <p style={{ color: "red", textAlign: "center", marginTop: 0 }}>(privately)</p> : ""}
                        </div>
                    </div>
                )
                : (
                    <div className="messageContainer justifyStart">
                        <div className="messageBox2">
                            <File fileName={fileName} blob={blob} />
                            {privacy === 'private' ? <p style={{ color: "red", textAlign: "center", marginTop: 0 }}>(privately)</p> : ""}
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                )
        );
    }


}

export default Message;