<template>
    <v-card class="w-66 mx-auto text-secondary">
        <v-card-item>
            <div class="d-flex flex-row text-primary mb-2">
                <h2 class="my-auto">Import new file</h2>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">Exercises</v-chip>
            </div>
            <v-divider />
            <p class="mt-4">Please import more question data for the student </p>
            <div class="border-sm rounded pa-4 my-4 mx-auto" style="height: 250px;">
                <div class="d-flex flex-row text-primary">
                    <v-icon class="mr-2">fas fa-file-alt</v-icon>
                    <h3>Exercise file</h3>
                </div>
                <div class="mt-15">
                    <file-input :idx="0" type="Exercise" @upload-file="(value: File) => file = value" ></file-input>
                </div>
            </div>
        </v-card-item>
        <v-divider class="my-1" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                class="text-none bg-blue-lighten-5 text-blue-darken-2"
                @click="emit('openImportCard', false)"
            ></v-btn>

            <v-btn
                class="text-none bg-primary"
                text="Save"
                @click="handleUploadFile"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import { CreateNotification } from '@/utils/notification';
import axios from 'axios';
import { inject, ref } from 'vue';

const emit = defineEmits<{
    (e: 'openImportCard', value: boolean): void
}>();

const auth = useAuth();
const file = ref<File>();
const createNotification = <CreateNotification>inject('create-notification');

async function handleUploadFile(value: File) {
    emit('openImportCard', false)

    const formData = new FormData();
    formData.append("submission_file", value);
    formData.append("class_code_id", "1");

    console.log('FormData ', formData)
    await axios.post('http://127.0.0.1:8000/api/submission/', formData,
    {
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            "Content-Type": "multipart/form-data"
        }
    }).then(function(data) {
        console.log('After send file: ', data);
    }).catch(function() {
        createNotification({
            type: 'error',
            message: "Something's wrong when uploading!"
        })
    })
}
</script>