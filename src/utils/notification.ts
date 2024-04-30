import { ref } from "vue";
import { v4 } from "uuid";

export interface Notification {
    id: string,
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    autoClose: boolean,
    duration: number
}

export type CreateNotification = {
    (options: {
      type?: 'success' | 'error' | 'warning' | 'info';
      title?: string;
      message?: string;
      autoClose?: boolean;
      duration?: number;
    }): void;
};

const defaultNotificationOptions = {
    type: "info",
    title: "Info Notification",
    message:
      "Ooops! A message was not provided.",
    autoClose: true,
    duration: 5000,
};

export default function useNotifications() {
    const notifications = ref<Notification[]>([]);
    
    const createNotification : CreateNotification = (options) => {
        const _options = Object.assign({ ...defaultNotificationOptions }, options);

        notifications.value.push(
        ...[
            {
                id: v4(),
                ..._options,
            },
        ]
        );
    };

    const removeNotification = (id: string) => {
        const index = notifications.value.findIndex((item) => item.id === id);
        if (index !== -1) notifications.value.splice(index, 1);
    };

    return {
        notifications,
        createNotification,
        removeNotification
    }
}