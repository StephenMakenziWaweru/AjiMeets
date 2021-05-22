import React, { useState, useEffect } from 'react'

export default function Video(props) {
    const [videoSrc, setVideoSrc] = useState("");

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(props.blob);
        reader.onloadend = function () {
            setVideoSrc(reader.result)
        }
    }, [props.blob])
    return (
        <video controls style={{ width: "150px", height: "auto" }}>
            <source src={videoSrc}></source>
        </video>
    )
}
