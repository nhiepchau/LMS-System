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
        loading.value = false;

        const usernameVal = username.value.toString();
        const passwordVal = password.value.toString();
        auth.setLogin(usernameVal, passwordVal);

        // Save into session storage
        sessionStorage.setItem('username', usernameVal);
        sessionStorage.setItem('password', passwordVal);

        // Authenticate account
        const payload = await http.post('api-auth/login', { username: username.value, password: password.value })
            .catch(function(response) {
                console.log('Testing ', response);

                let token = btoa(`${username.value}:${password.value}`);
                auth.setUserInfo(token, { name: 'Minh Chau', role: 'Teacher' })

                // Set new header for axios
                http.interceptors.request.use(
                    config => {
                        config.headers['Authorization'] = `Basic ${btoa(auth.username + ':' + auth.password)}`;
                            return config;
                        },
                );

                // Redirect to homepage
                router.push({ name: 'homepage' });
            });
    }, 1000)
}
function required (v: String) {
    return !!v || 'Field is required'
}
</script>