import {
  fetchNotificationData,
  fetchUserName,
  updateNotificationReadStatus
} from '@src/services';
import React, { useState } from 'react';
import NotificationAvatarIcon from '../../../../public/assets/icons/Avatar.svg';
export interface IMockNotifactions {
  id: number;
  userName: string;
  notificationText: string;
  dateTime: { day: number; month: string; time: string };
  avatarSrc: string;
}
interface NotificationsType {
  id: number;
  user_id: number;
  actor_id: number;
  actor_name: string;
  action: string;
  file_id: number;
  file_name: string;
  is_read: boolean;
  created_at: string;
}
export const useNotification = (currUserId: number,currUserName:string) => {
  const [notificationsData, setNotificationsData] = useState<
    IMockNotifactions[]
  >([]);
  const [allNotifications, setAllNotificationsData] = useState<
    IMockNotifactions[]
  >([]);
  const [notificationCount, setNotificationCount] = useState(0);
  
    const fetchData = async () => {
      try {
        const data = await fetchNotificationData(currUserId);
        let unreadCount = 0;

        const transformedData = await Promise.all(
          data
            .filter((notification: NotificationsType) => {
              return (
                notification.user_id == currUserId && notification.is_read === false
              );
            })
            .map(async (notification: NotificationsType) => {
              const name = await fetchUserName(notification.actor_id);
              unreadCount++;
              return {
                id: notification.id,
                userName: name,
                dateTime: {
                  day: new Date(notification.created_at).getDate(),
                  month: new Date(notification.created_at).toLocaleDateString(
                    'en-US',
                    { month: 'long' }
                  ),
                  time: new Date(notification.created_at).toLocaleTimeString(
                    'en-US',
                    {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    }
                  )
                },
                avatarSrc: NotificationAvatarIcon,
                notificationText: name == currUserName ? `You ${notification.action} ${notification.file_name}` : `has ${notification.action} ${notification.file_name}`
              };
            })
        );
        const sortedData = [...transformedData]
          .sort((a, b) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          })
          .reverse();
        setNotificationsData(sortedData);
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllNotifications = async() => {
      try{
        const data = await fetchNotificationData(currUserId);
        const transformedData = data.map((notification:NotificationsType) => {
          return {
            id: notification.id,
                userName: notification.actor_name,
                dateTime: {
                  day: new Date(notification.created_at).getDate(),
                  month: new Date(notification.created_at).toLocaleDateString(
                    'en-US',
                    { month: 'long' }
                  ),
                  time: new Date(notification.created_at).toLocaleTimeString(
                    'en-US',
                    {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    }
                  )
                },
                avatarSrc: NotificationAvatarIcon,
                notificationText: notification.actor_name == currUserName ? `You ${notification.action} ${notification.file_name}` : `has ${notification.action} ${notification.file_name}`
          }
        })
        const sortedData = [...transformedData]
          .sort((a, b) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          })
          .reverse();
        setAllNotificationsData(sortedData);
      }
      catch(error){
        console.error(error)
      }
    }
  
  const updateNotificationStatus = async () => {
    try {
      const data = await fetchNotificationData(currUserId);
      await Promise.all(
        data
          .filter((notification: NotificationsType) => {
            return (
              notification.user_id == currUserId && notification.is_read === false
            );
          })
          .map(async (notification: NotificationsType) => {
            await updateNotificationReadStatus(notification.id, {
              ...notification,
              is_read: true
            });
          })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    notificationsData: notificationsData,
    notificationCount: notificationCount,
    setNotificationsData: setNotificationsData,
    setNotificationCount: setNotificationCount,
    updateNotificationStatus: updateNotificationStatus,
    fetchNotififcationData:fetchData,
    allNotifications:allNotifications,
    fetchAllNotifications:fetchAllNotifications
  };
};
