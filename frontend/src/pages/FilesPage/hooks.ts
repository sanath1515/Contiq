import { postNotifications, uploadFile } from '@src/services';
import { useUserContext } from '@src/utils/ThemeContext';
import axios from '@src/services/API';
import { fileTabItems } from '@src/utils/constants';
import { useEffect, useState } from 'react';

export interface FileResponseData {
  name: string;
  type: string;
  lastModifiedDate: string;
}
interface NotificationsType {
  id: number;
  user_id: number;
  actor_id: number;
  actor_name: string;
  action: string;
  file_name: string;
  is_read: number;
  created_at: string;
}
export const useFileUpload = () => {
  const [isLoading, setisLLoading] = useState(true);
  let fileId;

  const upload = async (
    file: File,
    userId: number,
    userName: string,
    isPostNotification: boolean
  ) => {
    const fileData = {
      name: file.name,
      type: file.type,
      uploaded_by: userId,
      created_at: new Date(),
      updated_at: new Date(),
      thumbnail_url: 'assets/images/Document1.png'
    };
    const notification = {
      actor_id: userId,
      // actor_name: userName,
      action: 'uploaded',
      // file_name: file.name,
      is_read: false,
      created_at: new Date()
    };
    console.log('file name', file.name);
    const formData = new FormData();
    formData.append('name', file.name.slice(0, 60));
    formData.append('type', 'pdf');
    formData.append('user_id', userId.toString());
    formData.append('content', file);
    try {
      const response = await axios.post('/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      fileId = response.data;
      if (isPostNotification) {
        postNotifications({
          ...notification,
          file_id: fileId
        });
      }
      setisLLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading,
    setisLLoading,
    upload
  };
};
//total page will be handle later
