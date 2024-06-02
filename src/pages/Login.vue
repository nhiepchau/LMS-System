<template>
    <v-container class="bg-grey-lighten-4 h-100" fluid>
        <h1 class="text-center my-10">Learning Outcome Evaluation Support</h1>

        <v-card class="mx-auto px-6 py-8" max-width="400">
            <v-img src="../assets/images/LMS-Ava.png" width="8rem" class="mb-8 mx-auto" />
            <v-form
                v-model="form"
                @submit.prevent="onSubmit"
            >
                <v-text-field
                v-model="username"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Username"
                clearable
                ></v-text-field>

                <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                label="Password"
                placeholder="Enter your password"
                clearable
                type="password"
                ></v-text-field>

                <br>

                <v-btn
                :disabled="!form"
                :loading="loading"
                color="info"
                size="large"
                type="submit"
                variant="elevated"
                block
                >
                Sign In
                </v-btn>

                <p v-if="!authenticated" class="text-error text-sm-center mt-4">Incorrect username or password!</p>

                <v-divider class="mt-8 mb-2"></v-divider>
                <p class="text-center">If you're student, please activate account before login at <a v-bind:href="'/register/'">Activate page</a></p>
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import router from '@/utils/router';
import { ref } from 'vue';
import http from '@/utils/http';
import useAuth from '@/services/auth';

// Store
const auth = useAuth();

// Variables
const form = ref(false);
const username = ref<String>("");
const password = ref<String>("");
const loading = ref(false);
const authenticated = ref(true);

// Methods
async function onSubmit () {
    if (!form.value) return

    loading.value = true

    setTimeout(async () => {
        const usernameVal = username.value.toString();
        const passwordVal = password.value.toString();
        // Authenticate account
        const payload = await http.post('/api/users/login/', { username: username.value, password: password.value })
            .then(function(response) {
                loading.value = false;
                // Set new header for axios
                http.interceptors.request.use(
                    config => {
                        config.headers['Authorization'] = `Bearer ${response.data.access}`;
                            return config;
                        },
                );

                // Save login info
                auth.setLogin(usernameVal, passwordVal, response.data.access);

                // Save user info
                const user = response.data.user;
                const fullname = user.is_teacher ? `${user.first_name} ${user.last_name}`
                    : `${getSecuredName(user.first_name)} ${getSecuredName(user.last_name)}`;
                auth.setUserInfo(fullname
                    , user.is_teacher ? (user.is_head_teacher ? 'Head Lecturer' : 'Teacher') : 'Student'
                    , user.email
                    , user.is_teacher ? '' : user.student_id)

                // Save into session storage
                sessionStorage.setItem('username', usernameVal);
                sessionStorage.setItem('password', passwordVal);
                sessionStorage.setItem('token', response.data.access);
                sessionStorage.setItem('fullname', fullname);
                sessionStorage.setItem('role', user.is_teacher ? (user.is_head_teacher ? 'Head Lecturer' : 'Teacher') : 'Student');
                sessionStorage.setItem('email', user.email);
                sessionStorage.setItem('studentId', user.is_teacher ? '' : user.student_id)

                // Redirect to homepage
                router.push({ name: 'homepage' });
            })
            .catch(() => {
                authenticated.value = false;
                loading.value = false;
            });
    }, 1000)
}

function getSecuredName(hashed: any) {
    const first_char = `${hashed}`.at(0);
    const len = `${hashed}`.length;
    return first_char + "x".repeat(len - 1);
}

function required (v: String) {
    return !!v || 'Field is required'
}
</script>