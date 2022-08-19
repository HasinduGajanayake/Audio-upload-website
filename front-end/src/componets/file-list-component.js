import React, { useCallback, useEffect, useState } from 'react';
import FileComponent from './file-component';
import { message } from 'antd';
import 'antd/dist/antd.less';

function FileListComponent({ reload }) {
    const [fileList, setFileList] = useState([]);

    const fetchData = useCallback(
        async () => {
            const response = await fetch('http://localhost:3001/recordings', {
                method: 'get'
            });
            const data = await response.json();
            setFileList(data.data);
            message.success(`Data fetch success`)
        },
        [reload]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div>
            {
                fileList.length < 1 ? 
                <p>No file to show</p> :
                fileList.map((file) => {
                    return <FileComponent key={file.uploadedTime} fileName={file.fileName} duration={file.duration} uploadedTime={file.uploadedTime} />
                })
            }
        </div>
    );
}

export default FileListComponent;