import create from 'zustand';
import { postAPICall } from '../apiService';
import { SAVE_NOTIFICATION } from '../endPoints';
import { NotificationReq } from '../types';

export const useNotificationStore = create((set) => ({
    data: null,
    isLoading: false,
    error: null,
    saveNotify: async (body: NotificationReq) => {
        set({ isLoading: true });
        try {
            const response = await postAPICall({ baseUrl: SAVE_NOTIFICATION, body });
            const data = await response.json();
            set({ data, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },
}));