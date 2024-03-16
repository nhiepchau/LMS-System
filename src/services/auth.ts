import { defineStore } from "pinia";

interface UserInfo {
    name: string,
    role: string
}

const useAuth = defineStore('auth', {
    state: () => {
        return {
            token: "" as String,
            username: "" as String,
            password: "" as String,
            user: { name: '', role: '' } as UserInfo
        }
    },
    actions: {
        setUserInfo(token: String, user: UserInfo) {
            this.token = token;
            this.user.name = user.name;
            this.user.role = user.role;
        }
    }
});

export default useAuth;