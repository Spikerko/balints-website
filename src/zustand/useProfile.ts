import { create } from 'zustand'

type ProfileContent = {
  username: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
  interfaceContent: any;
}

interface ProfileState {
  content: ProfileContent;
  update: (content: Partial<ProfileContent>) => void
}

export const useProfile = create<ProfileState>((set) => ({
  content: {
    username: undefined,
    avatar: undefined,
    banner: undefined,
    interfaceContent: undefined,
  },
  update: (content: Partial<ProfileContent>) => set(state => ({
    content: { ...state.content, ...content }
  }))
}))