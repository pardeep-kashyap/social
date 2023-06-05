import create from 'zustand';
import { postAPICall } from '../apiService';
import { SAVE_NOTIFICATION } from '../endPoints';
import { NotificationReq } from '../types';

export const useAppStore = create((set) => ({
    data: null,
    isLoading: false,
    error: null,
    userData: null,
    saveNotify: async (body: NotificationReq) => {
        set({ isLoading: true });
        try {
            if (body.user === body.targetUser) {
                return;
            }
            const response = await postAPICall({ baseUrl: SAVE_NOTIFICATION, body });
            const data = await response.json();
            set({ data, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },
    setUserData: (user: any) => {
        console.log(user)
        set({ userData: user })
    }
}));


