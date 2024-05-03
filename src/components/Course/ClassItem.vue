<template>
    <v-card
        color="grey-lighten-3"
        variant="outlined"
        class="w-33"
    >
        <v-card-item>
        <div class="text-secondary w-100">
            <div class="d-flex flex-row">
                <v-img :src="imageUrls[props.id % 4]" class="my-2 mr-4" />
                <div class="w-75 my-2 d-flex flex-column align-start">
                    <div class="text-caption mb-auto font-weight-bold text-grey-darken-1">[HK{{ props.semester }}] {{ props.group }}</div>
                    <div class="text-h6">
                    {{ props.name }}
                    </div>
                </div>
            </div>
            <v-text-field                
                bg-color="blue-lighten-5"
                color="blue-darken-2"
                class="w-75 float-end text-blue-darken-2"
                variant="solo"
                flat
                density="compact"
                label="Class Code"
                :model-value="props.course_code"
                readonly
            ></v-text-field>
        </div>
        </v-card-item>
        <v-divider />
        <v-card-actions>
            <v-spacer />
            <div class="mr-2">
                <v-btn :to="`/class/${props.class_code}`" variant="outlined" width="75" class="text-none text-primary">
                    View
                </v-btn>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="flat" width="75" v-bind="activatorProps" class="text-none bg-primary">
                            Select
                        </v-btn>
                    </template>
                    <course-detail @open-dialog="(val: boolean) => dialog = val" :course="props.name" :semester="semester" ></course-detail>
                </v-dialog>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const dialog = ref(false);
const router = useRouter();

const imageUrls = [
    'https://images.unsplash.com/photo-1542903660-eedba2cda473?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1587620931276-d97f425f62b9?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=3155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    class_code: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    }
});
</script>