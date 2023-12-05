import { User } from '@src/utils/interfaces/User';
import API from './API';
interface NotificationType {
  // id: number;
  // user_id: number;
  actor_id: number;
  // actor_name: string;
  action: string;
  // file_name: string;
  is_read: boolean;
  file_id: number;
  created_at: Date;
}
export const getAllUsers = async () => {
  const response = await API.get(`/users`);
  return response.data;
};
export const login = async (email: string, password: string) => {
  const response = await API.post('/users/login', {
    email: email,
    password: password
  });
  return response;
};
export const registerUser = (user: User) => {
  return API.post('/users', user);
};
export const getUserByEmail = (email: string) => {
  return API.get('/users/email?email=' + email);
};

export const fetchNotificationData = async (userId: number) => {
  const response = await API.get(`/notifications?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const fetchUserName = async (id: number) => {
  const response = await API.get(`/users/` + `${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data.name;
};

export const updateNotificationReadStatus = async (
  notificationId: number,
  patchData: any
) => {
  await API.patch(`/notifications/${notificationId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
export const uploadFile = async (file: any) => {
  return await API.post('/files', file);
};

export const postNotifications = async (notification: NotificationType) => {
  try {
    const response = await getAllUsers();
    response.map(async (user: any) => {
      await API.post(
        '/notifications',
        {
          user_id: user.id,
          actor_id: notification.actor_id,
          // actor_name: notification.actor_name,
          action: notification.action,
          // file_name: notification.file_name,
          is_read: notification.is_read,
          file_id: notification.file_id
          // created_at: notification.created_at
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchResults = async (keyword: String) => {
  const response = await API.get(`/files/search?keyword=` + `${keyword}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const fetchParagraphs = async (
  keyword: String,
  fileName: String,
  fileId: number
) => {
  const response = await API.get(
    `/files/search/data?keyword=${keyword.replace(
      /\.pdf$/,
      ''
    )}&fileName=${fileName}&fileId=${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  return response.data;
};
