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
                v-model="studentId"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Student ID"
                clearable
                ></v-text-field>

                <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Email"
                type="email"
                clearable
                ></v-text-field>

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
                :rules="passwordRules"
                label="Password"
                placeholder="Enter your password"
                clearable
                type="password"
                ></v-text-field>

                <v-text-field
                v-model="confirmedPassword"
                :readonly="loading"
                :rules="againPasswordRules"
                label="Confirmed Password"
                placeholder="Enter your password again"
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
                Sign Up
                </v-btn>

                <p v-if="false" class="text-error text-sm-center mt-4">Incorrect username or password!</p>
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import router from '@/utils/router';
import { ref } from 'vue';

const auth = useAuth();

// Variables
const form = ref(false);
const username = ref<String>("");
const studentId = ref<String>("");
const email = ref<String>("");
const password = ref<String>("");
const confirmedPassword = ref<String>("");
const loading = ref(false);

const passwordRules = [
    function (value: any) {
        if (!value) return 'Password is required.'
        if (`${value}`.length < 8) return 'Minimum password length is 8.'

        return true
    }
]

const againPasswordRules = [
    function (value: any) {
        if (!value) return 'Password is required.'
        if (value !== password.value) return 'Passwords do not match.'

        return true
    }
]

// Methods
async function onSubmit () {
    if (!form.value) return

    loading.value = true

    setTimeout(() => {
        auth.setLogin(username.value.toString(), password.value.toString(), '')

        // Redirect to homepage
        router.push({ name: 'homepage' });
    }, 1000)
}
function required (v: String) {
    return !!v || 'Field is required'
}
</script>