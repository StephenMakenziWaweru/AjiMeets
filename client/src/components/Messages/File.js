import React, { useState, useEffect } from 'react'
import file from '../../img/doc.png'

export default function File(props) {
    const [fileSrc, setFileSrc] = useState("");

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(props.blob);
        reader.onloadend = function () {
            setFileSrc(reader.result)
        }
    }, [props.blob])
    return (
        <div>
            <a href={fileSrc} download>
                <img src={file} alt="file" style={{ width: "80px", height: "80px" }} alt={props.fileName} />
            </a>
            <p>{props.fileName}</p>
        </div>

    )
}
