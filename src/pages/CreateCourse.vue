<template>
    <top-bar></top-bar>
    <v-container>
        <h1>Create classes</h1>
        <bread-crumb :activeIdx="page" class="my-2"></bread-crumb>
        <div class="border-sm px-3 py-5 rounded mt-4">
            <create-course-form v-if="page === 0" ></create-course-form>
            <submission-form v-if="page === 1"></submission-form>
            <analysis-form v-if="page === 2"></analysis-form>
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
                @click.prevent="submitCreateCourse"
            ></v-btn>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import useCourse from '@/services/course';
import http from '@/utils/http';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const page = ref<number>(0);
const maxPages = 2;
const manageCourse = useCourse();
const auth = useAuth();
const router = useRouter();

async function submitCreateCourse() {
    page.value++;
    let classes = manageCourse.getValidClasses();
    for (let index = 0; index < classes.length; index++) {
        const classVal = classes[index];
        await http.post(`/api/courses/${manageCourse.selectedCourse.CourseCode}/classes/`, {
            semester: manageCourse.selectedCourse.SemesterId,
            num_of_lab: manageCourse.selectedCourse.NumOfLabs,
            teacher: auth.user.email,
            role: "Lecturer",
            group: classVal.Name
        })
        .then(function(response) {
            // Redirect to homepage
            setTimeout(() => {
                router.push({ name: 'class-home' })
            }, 1000);
        })
        .catch(() => {
        });
    }

}
</script>