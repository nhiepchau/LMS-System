import { defineStore } from "pinia";

interface UserInfo {
    name: string,
    role: string,
    email: string
}

const useAuth = defineStore('auth', {
    state: () => {
        return {
            token: null as string | null,
            username: null as string | null,
            password: null as string | null,
            user: { name: null as string | null, role: null as string | null } as UserInfo
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

        setUserInfo(user: string, role: string, email: string) {
            this.user.name = user;
            this.user.role = role;
            this.user.email = email
        }
    }
});

export default useAuth;