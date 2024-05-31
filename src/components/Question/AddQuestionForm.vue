<template>
    <v-sheet class="mx-auto w-50 pa-5 text-right">
        <h2 class="text-primary mb-5 text-left" >Add new question?</h2>
        <v-divider class="mb-4"></v-divider>
        <v-form validate-on="submit lazy" @submit.prevent="onSubmit">
            <h3 class="text-primary text-left mb-2" >General information</h3>
            <v-text-field
                label="Question name"
                density="comfortable"
                variant="outlined"
                class="mt-1"
                :rules="[required]"
                v-model="state.question.description"
            ></v-text-field>
            <div class="d-flex flex-row justify-space-between">
                <v-text-field
                    label="Question code"
                    density="comfortable"
                    variant="outlined"
                    class="w-25 mr-4"
                    :rules="[required]"
                    v-model="state.question.question_code"
                ></v-text-field>
                <v-text-field
                    label="Question id"
                    density="comfortable"
                    variant="outlined"
                    class="w-25 mr-4"
                    :rules="[required]"
                    v-model="state.question.question_id"
                ></v-text-field>

                <v-select
                    label="Level"
                    :items="levels"
                    v-model="state.question.level"
                    variant="outlined"
                    density="comfortable"
                    :rules="[required]"
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
                    :rules="[required]"
                    v-model="state.question.topic"
                ></v-text-field>
                <v-select
                    label="Lab"
                    :items="getLabs()"
                    v-model="select_lab"
                    variant="outlined"
                    density="comfortable"
                    :rules="[required]"
                    class="w-25 mr-4"
                >
                </v-select>

                <v-select
                    label="Outcome"
                    :items="outcomes"
                    item-title="code"
                    item-value="pk"
                    v-model="select_outcome"
                    variant="outlined"
                    density="comfortable"
                    :rules="[required]"
                    style="width: 100px;"
                >
                </v-select>
            </div>
            <v-text-field
                label="BKel Link"
                density="comfortable"
                variant="outlined"
                class="mt-1"
                :rules="[required]"
                v-model="state.question.url"
            ></v-text-field>
            <v-divider></v-divider>
            <div class="mt-3 d-flex flex-row justify-end">
                <v-btn
                    text="Close"
                    class="text-none bg-grey-lighten-3 mr-3"
                    flat
                    @click="emit('openQuestionForm', false)"
                    :disabled="loading"
                ></v-btn>
                <v-btn
                    class="text-none bg-light-blue"
                    text="Submit"
                    type="submit"
                    flat
                    :loading="loading"
                ></v-btn>
            </div>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { CreateNotification } from '@/utils/notification';
import { inject, onMounted, reactive, ref } from 'vue';

const emit = defineEmits<{
    (e: 'openQuestionForm', value: boolean): void
}>();

const props = defineProps({
    numOfLab: {
        type: Number,
        default: 0
    },
    classCode: {
        type: String,
        default: ''
    }
});

const levels = [
    { title: "Easy", value: 1 },
    { title: "Medium", value: 2 },
    { title: "Hard", value: 3 }
];
const loading = ref(false);
const select_lab = ref<string>();
const select_outcome = ref<number>();
const outcomes = ref<{ pk: number, code: string }[]>();
const state = reactive({
    question: { 
        description: '' as string, 
        lab: '' as string,
        topic: '' as string, 
        level: undefined as number | undefined, 
        question_id: '' as string, 
        question_code: '' as string,
        url: '' as string
    }
});
function getLabs() {
    const num_labs = Array.from({length: props.numOfLab}, (_, i) => i + 1).map(x => x);
    let result = [] as string[]
    num_labs.forEach(lab => {
        result.push(`${lab}-pre`)
        result.push(`${lab}-in`)
        result.push(`${lab}-post`)
    })
    return result
}

function getColor(value: string) {
    if (value === 'Hard') return 'red'
    else if (value === 'Medium') return 'orange'
    else return 'green'
}

function compareString (a: { code: string }, b: { code: string }) {
    return ('' + a.code).localeCompare(b.code);
}

function required (v: String) {
    return !!v || 'Field is required'
}

async function getOutcomesByCourse() {
    const courseCode = props.classCode.substring(6, 12);
    await http.get(`/api/courses/${courseCode}/outcomes`)
    .then(function(response) {
        const { data } = response
        outcomes.value = data.map((x: { pk: any, outcome_code: any }) => {
            return {
                pk: x.pk,
                code: x.outcome_code
            }
        }).sort(compareString);
    });
}

const createNotification = <CreateNotification>inject('create-notification');
async function onSubmit () {
    loading.value = true

    setTimeout(async () => {
        await http.post(`/api/classes/${props.classCode}/labs/${select_lab.value}/exercises/`, 
        { 
            exercise_id: state.question.question_id, 
            exercise_code: state.question.question_code,
            exercise_name: state.question.description,
            class_code: props.classCode,
            level: state.question.level,
            topic: state.question.topic,
            outcome: select_outcome.value,
            url: state.question.url
        })
        .then(function(_) {
            loading.value = false;
            createNotification({
                type: 'success',
                message: `Create question successfully!`
            });
            emit('openQuestionForm', false);
        })
        .catch(() => {
            loading.value = false;
            createNotification({
                type: 'error',
                message: `Failed to create new question!`
            });
            emit('openQuestionForm', false);
        });
    }, 1000)
}

onMounted(() => {
    getOutcomesByCourse();
})
</script>