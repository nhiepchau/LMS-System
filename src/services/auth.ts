import { defineStore } from "pinia";

interface UserInfo {
    name: string,
    role: string
}

const useAuth = defineStore('auth', {
    state: () => {
        return {
            token: null as string | null,
            username: null as string | null,
            password: null as string | null,
            user: { name: '', role: '' } as UserInfo
        }
    },
    getters: {
        isAuthenticated: (state) => state.username && state.password
    },
    actions: {
        setLogin(username: string | null, password: string | null, token: string | null) {
            this.username = username;
            this.password = password;
            this.token = token;
        },

        setUserInfo(token: string, user: UserInfo) {
            this.token = token;
            this.user.name = user.name;
            this.user.role = user.role;
        }
    }
});

export default useAuth;