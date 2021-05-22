import React, { useState, useEffect } from 'react'

export default function Image(props) {
    const [imgSrc, setImageSrc] = useState("");

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(props.blob);
        reader.onloadend = function () {
            setImageSrc(reader.result)
        }
    }, [props.blob])
    return (
        <img src={imgSrc} style={{ height: "auto", width: 150 }} alt={props.fileName} />
    )
}
