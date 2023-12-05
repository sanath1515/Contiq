import { FilesUploadedContext } from '@src/App';
import axios from '@src/services/API';
import { useContext } from 'react';
import { postNotifications } from '@src/services';

export function useGoogleDriveFileProcessing() {
  let { count, setFiles } = useContext(FilesUploadedContext);
  const uploadGdriveFile = async (
    file: File,
    userId: number,
    userName: string
  ) => {
    let fileId;
    const notification = {
      actor_id: userId,
      // actor_name: userName,
      action: 'uploaded',
      // file_name: file.name,
      is_read: false,
      created_at: new Date()
    };
    const formData = new FormData();
    formData.append('name', file.name.slice(0, 60));
    formData.append('type', 'pdf');
    formData.append('user_id', userId.toString());
    formData.append('content', file);
    axios
      .post('/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        if (res.status == 200) {
          count++;
          setFiles(count);
        }
        console.log(res);
        fileId = res.data;
        postNotifications({
          ...notification,
          file_id: fileId
        });
      })
      .catch((e) => console.error(e));
  };
  return { uploadGdriveFile };
}
