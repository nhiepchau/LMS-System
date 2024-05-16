<template>
    <v-card class="w-66 mx-auto text-secondary">
        <v-card-item>
            <div class="d-flex flex-row text-primary mb-2">
                <h2 class="my-auto">{{ props.course_name }}</h2>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">HK{{ props.semester }}</v-chip>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">{{ props.group }}</v-chip>
            </div>
            <v-divider />
            <div class="mt-4 d-flex flex-row">
                <div class="w-50 px-2">
                    <div class="d-flex flex-row">
                        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-info-circle</v-icon>
                        <h3 class="my-auto">General Information</h3>
                    </div>
                    <v-container class="px-1">
                        <v-row>
                            <v-col><course-info-item class="bg-green-lighten-5 text-dark-green" :info="props.num_of_labs" typeInfo="Labs"></course-info-item></v-col>
                            <v-col><course-info-item class="bg-blue-lighten-5 text-sub" :info="props.num_of_exercises" typeInfo="Exercises"></course-info-item></v-col>
                        </v-row>
                        <v-row class="d-flex">
                            <v-col><course-info-item class="bg-green-lighten-5 text-dark-green" :info="props.num_submit_file" typeInfo="Submission files"></course-info-item></v-col>
                            <v-col><course-info-item class="bg-blue-lighten-5 text-sub" :info="props.num_of_submissions" typeInfo="Submissions"></course-info-item></v-col>
                        </v-row>
                    </v-container>
                </div>
                <div class="w-50 px-2">
                    <div class="d-flex flex-row">
                        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-bookmark</v-icon>
                        <h3 class="my-auto">Lab</h3>
                    </div>
                    <v-container class="px-1">
                        <lab-item :label="`Lab ${x}`" v-for="x in props.num_of_labs"></lab-item>
                    </v-container>
                </div>
            </div>
            <div>
                <div class="d-flex flex-row">
                    <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-check-circle</v-icon>
                    <h3 class="my-auto">Learning outcome distribution</h3>
                </div>
                <lab-contribution 
                    :class_code="props.class_code" 
                    :course_code="props.course_code"
                    :num_of_labs="props.num_of_labs"
                ></lab-contribution>
            </div>
        </v-card-item>
        <v-divider class="my-1" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                class="text-none bg-blue-lighten-5 text-blue-darken-2"
                @click="emit('openDialog', false)"
            ></v-btn>

            <v-btn
                class="text-none bg-primary"
                text="Save"
                @click="emit('openDialog', false)"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
    course_name: String,
    course_code: String,
    semester: String,
    group: String,
    class_code: String,
    num_of_labs: Number,
    num_submit_file: Number,
    num_of_submissions: Number,
    num_of_exercises: Number
});

const emit = defineEmits<{
    (e: 'openDialog', value: boolean): void
}>();
</script>