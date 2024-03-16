<template>
    <v-container class="bg-grey-lighten-4 h-screen" fluid>
        <h1 class="text-center my-10">Learning Outcome System Support</h1>

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

                <p v-if="!correctAccount" class="text-error text-sm-center mt-4">Incorrect username or password!</p>
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import router from '@/utils/router';
import { ref, inject, onMounted } from 'vue';

// Variables
const form = ref(false);
const username = ref<String>("");
const password = ref<String>("");
const loading = ref(false);
const correctAccount = ref(true);

const auth = inject<(a: String, b: String) => Boolean>('auth', (_, __) => false);

onMounted(() => {
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
})

// Methods
function onSubmit () {
    if (!form.value) return

    loading.value = true

    setTimeout(() => {
        loading.value = false;

        const userNameVal = username.value.toString();
        const passwordVal = password.value.toString();

        // Authenticate account
        if (auth(userNameVal, passwordVal)) {
            correctAccount.value = true;

            // Save login info to local storage
            localStorage.setItem("username", username.value.toString());
            localStorage.setItem("password", password.value.toString());

            router.push('/home');
        }
        else {
            correctAccount.value = false;
        }
    }, 1000)
}
function required (v: String) {
    return !!v || 'Field is required'
}
</script>