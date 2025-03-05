import {create} from 'zustand';

export const useStore = create((set) => ({
    phoneNumber: '',
    setPhoneNumber: (value) => set({ phoneNumber: value }),
    otp: ['', '', '', '', '', ''],
    setOtp: (value) => set({ otp: value }),
}));