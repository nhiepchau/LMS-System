<template>
    <div class="d-flex flex-row mt-1 justify-space-between" v-bind="$attrs">
        <div class="d-flex flex-row">
            <v-chip class="mr-4 my-auto text-body-2" color="sub" style="width: 75px;">
                <v-icon size="small" class="mr-2" slot:prepend-icon >fas fa-bolt</v-icon>
                {{ props.exerciseCode }}</v-chip>
            <p class="my-auto text-dark-brown text-md-body-2">{{ props.exerciseName }}</p>
        </div>
        <v-dialog v-model="dialog" class="my-auto">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" variant="flat" width="75" class="text-none text-md-body-2 text-sub-chart">
                    Details
                </v-btn>
            </template>
            <v-sheet class="mx-auto w-50 pa-5 text-right">
                <h2 class="text-primary mb-5 text-left" >Question {{ props.exerciseCode }}</h2>
                <v-divider class="mb-4"></v-divider>
                    <h3 class="text-primary text-left mb-2" >General information</h3>
                    <v-text-field
                        label="Question name"
                        density="comfortable"
                        variant="outlined"
                        class="mt-1"
                        :model-value="props.exerciseName"
                    ></v-text-field>
                    <div class="d-flex flex-row justify-space-between">
                        <v-text-field
                            label="Question code"
                            density="comfortable"
                            variant="outlined"
                            class="w-25 mr-4"
                            :model-value="props.exerciseCode"
                        ></v-text-field>
                        <v-text-field
                            label="Question id"
                            density="comfortable"
                            variant="outlined"
                            class="w-25 mr-4"
                            :model-value="props.exerciseId"
                        ></v-text-field>

                        <v-select
                            label="Level"
                            :model-value="props.level"
                            variant="outlined"
                            density="comfortable"
                            style="width: 100px;"
                        >
                            <template v-slot:selection="{ item, index }">
                                <v-chip :color="getColor(item.title)">
                                    <span>{{ item.title }}</span>
                                </v-chip>
                            </template>
                        </v-select>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <h3 class="text-primary text-left mb-2" >Others</h3>
                    <div class="d-flex flex-row justify-space-between mt-1">
                        <v-text-field
                            label="Topic"
                            density="comfortable"
                            variant="outlined"
                            class="w-25 mr-4"
                            :model-value="props.topic"
                        ></v-text-field>
                        <v-text-field
                            label="Outcome"
                            :model-value="props.outcome"
                            variant="outlined"
                            density="comfortable"
                            style="width: 100px;"
                        >
                        </v-text-field>
                    </div>
                    <div class="d-flex flex-row">
                        <v-text-field
                            label="BKel Link"
                            density="comfortable"
                            variant="outlined"
                            class="mt-1"
                            :model-value="updateBkelUrl()"
                        ></v-text-field>
                        <v-btn class="mt-1 ml-4" icon variant="plain" @click="openBkelPage()">
                            <v-icon size="xsmall" class="text-dark-grey">fas fa-link</v-icon>
                        </v-btn>
                    </div>
                    <v-divider></v-divider>
                    <div class="mt-3 d-flex flex-row justify-end">
                        <v-btn
                            text="Close"
                            class="text-none bg-grey-lighten-3"
                            flat
                            @click="dialog = false"
                        ></v-btn>
                    </div>
            </v-sheet>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const other_urls = [
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258504',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258505',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258520',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258508',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258512',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258529',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258532',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258516',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258517',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258533'
]

function updateBkelUrl() {
    return props.url.replace('https://e-learning-old.hcmut.edu.vn/mod/quiz/view.php?id=', 'https://lms.hcmut.edu.vn/mod/assign/view.php?id=');
}

function openBkelPage() {
    const newUrl = other_urls[props.index % 10]
    window.open(newUrl, '_blank')
}

function getColor(value: string) {
    if (value === 'Hard') return 'red'
    else if (value === 'Medium') return 'orange'
    else return 'green'
}

const dialog = ref(false);

const props = defineProps({
    index: {
        type: Number,
        default: 0
    },
    exerciseCode: {
        type: String,
        default: ''
    },
    exerciseName: {
        type: String,
        default: ''
    },
    exerciseId: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        default: ''
    },
    topic: {
        type: String,
        default: ''
    },
    outcome: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
})
</script>