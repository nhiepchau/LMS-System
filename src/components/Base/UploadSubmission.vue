<template>
    <v-card class="w-66 mx-auto text-secondary">
        <v-card-item>
            <div class="d-flex flex-row text-primary mb-2">
                <h2 class="my-auto">Import new file</h2>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">Submissions</v-chip>
            </div>
            <v-divider />
            <p class="mt-4">Please import more submission data for the class {{ route.params.class_code.toString().substring(6) }}</p>
            <div class="border-sm rounded pa-4 my-4 mx-auto" style="height: 250px;">
                <div class="d-flex flex-row text-primary">
                    <v-icon class="mr-2">fas fa-file-alt</v-icon>
                    <h3>Submission file</h3>
                </div>
                <div class="mt-15" v-if="!loading">
                    <file-input :idx="0" type="Submission" @upload-file="(value: File) => file = value" ></file-input>
                </div>
                <div v-else class="text-center mt-10">
                    <v-progress-circular
                        :size="100"
                        :width="7"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </div>
            </div>
        </v-card-item>
        <v-divider class="my-1" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                class="text-none bg-blue-lighten-5 text-blue-darken-2"
                @click="emit('openSubmissionCard', false)"
                :disabled="loading"
            ></v-btn>

            <v-btn
                class="text-none bg-primary"
                text="Save"
                @click="handleUploadFile"
                :disabled="loading"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import { CreateNotification } from '@/utils/notification';
import axios from 'axios';
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits<{
    (e: 'openSubmissionCard', value: boolean): void
}>();

const props = defineProps({
    classId: {
        type: Number,
        required: true
    }
});

const route = useRoute();
const auth = useAuth();
const file = ref<File>();
const loading = ref(false);
const createNotification = <CreateNotification>inject('create-notification');
const baseUrl = import.meta.env.VITE_APP_API_URL

async function handleUploadFile() {
    if (file.value) {
        const formData = new FormData();
        formData.append("submission_file", file.value);
        formData.append("class_code", `${props.classId}`);

        console.log('FormData ', formData)
        loading.value = true;
        // Call API with type form-data
        await axios.post(`${baseUrl}/api/classes/${route.params.class_code}/submissions/upload`, formData,
        {
            headers: {
                "Authorization": `Bearer ${auth.token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(function(data) {
            loading.value = false;
            emit('openSubmissionCard', false)
            createNotification({
                type: 'success',
                message: `Sent file ${file.value?.name} successfully! Please wait few minutes for processing and analyzing data!`
            })
        }).catch(function() {
            loading.value = false;
            emit('openSubmissionCard', false)
            createNotification({
                type: 'error',
                message: "Something's wrong when uploading!"
            })
        })
    }
}
</script>