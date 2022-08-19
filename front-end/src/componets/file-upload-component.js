import React, { useState } from "react";
import { message } from 'antd';
import 'antd/dist/antd.less';
import FileListComponet from './file-list-component'

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [duration, setDuration] = useState(0);
  const [reload, setReload] = useState(false);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = (evt) => {
        if (evt.target.readyState === FileReader.DONE) {
            const arrayBuffer = evt.target.result;
            const audioContext = new AudioContext();
            audioContext.decodeAudioData(arrayBuffer, (buffer) => {
                const duration = buffer.duration;
                setDuration(duration);
            });
        }
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('duration', duration);
    form.append('file', selectedFile);

    const request = {
        method: 'post',
        body: form,
    }

    const response = await fetch('http://localhost:3001/recordings', request);
    const responseBody = await response.json();
    if (responseBody.status !== 200) {
        message.error(`Upload failed. Error: ${responseBody.message}`);
    } else {
        message.success(`Upload success`);
    }
    setDuration(0);
    setSelectedFile(null);
    setReload(!reload);
  };

  return (
    <div>
        <form className="file-uploader" onSubmit={submitForm}>
            <input type="file" onChange={handleFileInput} />
            <button>Upload file</button>
        </form>
        <FileListComponet reload={reload} />
    </div>
  );
};

export default App;