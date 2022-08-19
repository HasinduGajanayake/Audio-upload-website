import React from 'react'

function FileComponent({ fileName, duration, uploadedTime}) {
    return (
        <div>
            <h1>{fileName}</h1>
            <p>{duration}</p>
            <p>{uploadedTime}</p>
        </div>
    );
}

export default FileComponent;