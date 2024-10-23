import { atom } from 'jotai';

export interface InitProfile {
  loading: boolean;
  name: string;
  email: string;
  username: string;
  displayName?: string;
  phoneNumber?: string | number;
}

export const initialProfile: InitProfile = {
  loading: true,
  name: '',
  email: '',
  username: '',
};

export const profileAtom = atom({
  ...initialProfile,
});
