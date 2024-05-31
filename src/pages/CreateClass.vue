<template>
    <top-bar></top-bar>
    <v-container>
        <h1>Create classes</h1>
        <bread-crumb :activeIdx="page" class="my-2"></bread-crumb>
        <div class="border-sm px-3 py-5 rounded mt-4">
            <create-class-form v-if="page === 0" ></create-class-form>
            <submission-form v-if="page === 1"></submission-form>
            <analysis-form :error-message="errorMessage" v-if="page === 2"></analysis-form>
        </div>
        <div class="mt-2 text-right">
            <v-btn
                :disabled="page <= 0"
                variant="plain"
                text="Back"
                prepend-icon="fas fa-arrow-left"
                class="text-none bg-light-blue text-sub mr-3"
                @click.prevent="page--"
            ></v-btn>
            <v-btn
                v-if="page + 1 < maxPages"
                variant="plain"
                append-icon="fas fa-arrow-right"
                class="text-none bg-primary"
                text="Next"
                @click.prevent="page++"
            ></v-btn>
            <v-btn
                v-if="page + 1 >= maxPages"
                variant="plain"
                append-icon="fas fa-arrow-right"
                class="text-none bg-primary"
                text="Finish"
                :disabled="page >= maxPages"
                @click.prevent="submitCreateCourse"
            ></v-btn>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import ClassModel from '@/interface/ClassModel';
import useAuth from '@/services/auth';
import useCourse from '@/services/course';
import http from '@/utils/http';
import { CreateNotification } from '@/utils/notification';
import axios from 'axios';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const page = ref<number>(0);
const maxPages = 2;
const manageCourse = useCourse();
const auth = useAuth();
const router = useRouter();
const baseUrl = import.meta.env.VITE_APP_API_URL
const createNotification = <CreateNotification>inject('create-notification');
const errorMessage = ref<String>();

function isValidClassInfo(classVal: ClassModel) {
    if (classVal.Submission && classVal.Exercise && classVal.Outcomes.length > 0) {
        return true;
    }

    return false;
}

async function submitCreateCourse() {
    page.value++;
    let classes = manageCourse.getValidClasses();
    for (let index = 0; index < classes.length; index++) {
        const classVal = classes[index];
        if (isValidClassInfo(classVal)) {
            await http.post(`/api/courses/${manageCourse.selectedCourse.CourseCode}/classes/`, {
                semester: manageCourse.selectedCourse.SemesterId,
                num_of_lab: manageCourse.selectedCourse.NumOfLabs,
                teacher: auth.user.email,
                role: "Lecturer",
                group: classVal.Name
            })
            .then(async function(response: any) {
                // Submit exercise -> lab contribution + submission
                await submitExerciseFile(classVal, { pk: response.data.pk, class_code: response.data.class_code });

                // Redirect to homepage
                setTimeout(() => {
                    router.push({ name: 'class-home' })
                }, 3000);
            })
            errorMessage.value = ''
        }
        else {
            errorMessage.value = 'Make sure submit all submission file, exercise file and lab contributions!';
        }
    }

}

async function submitExerciseFile(classVal: ClassModel, data: { pk: any, class_code: any }) {
    const formData = new FormData();
    if (classVal.Exercise) {
        formData.append("exercise_file", classVal.Exercise);
        formData.append("class_code", `${data.pk}`);

        // Call API with type form-data
        await axios.post(`${baseUrl}/api/classes/${data.class_code}/exercises/upload`, formData,
        {
            headers: {
                "Authorization": `Bearer ${auth.token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(async function(_) {
            await submitLabLOContribution(classVal, data);
            await submitSubmissionFile(classVal, data);
        })
    }
}

async function submitSubmissionFile(classVal: ClassModel, data: { pk: any, class_code: any }) {
    const formData = new FormData();
    if (classVal.Submission) {
        formData.append("submission_file", classVal.Submission);
        formData.append("class_code", `${data.pk}`);

        // Call API with type form-data
        await axios.post(`${baseUrl}/api/classes/${data.class_code}/submissions/upload`, formData,
        {
            headers: {
                "Authorization": `Bearer ${auth.token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(function(_) {
            createNotification({
                type: 'success',
                message: `Submit for create course successfully! Please wait few minutes for processing and analyzing data!`
            })
        }).catch(function() {
            createNotification({
                type: 'error',
                message: "Something's wrong when uploading!"
            })
        })
    }
}

async function submitLabLOContribution(classVal: ClassModel, data: { pk: any, class_code: any }) {
    const submitData = classVal.Outcomes.map(x => {
        return {
            outcome_code: x.Outcome,
            lab: x.Lab,
            contribution: x.Contribution
        }
    });
    await http.post(`/api/courses/${manageCourse.selectedCourse.CourseCode}/classes/${data.class_code}/labcontributions`, submitData);
}
</script>