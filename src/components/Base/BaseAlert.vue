<template>
    <v-snackbar  
        :type="type" 
        :text="message"
        v-model="alert"
        location="top"
        :color="getColorAlert()"
        :timeout="autoClose ? duration : -1"
        @update:model-value="emitCloseEvent"
    >
        <template v-slot:actions>
            <v-btn
                :color="getColorText()"
                variant="text"
                @click="emitCloseEvent"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const alert = ref(true)

const emit = defineEmits<{
    (e: "close"): void
}>()

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'info',
        required: false
    },
    title: {
        type: String,
        default: 'Info',
        required: false
    },
    message: {
        type: String,
        default: '',
        required: false
    },
    autoClose: {
        type: Boolean,
        default: true,
        required: false
    },
    duration: {
        type: Number,
        default: 3000,
        required: false
    }
})

function emitCloseEvent() {
    alert.value = false;

    if (!alert.value) {
        console.log('Close alert!!!')
        emit('close');
    }
}

function getColorAlert() {
    if (props.type === 'success') {
        return 'green-lighten-5';
    }
    else if (props.type === 'info') {
        return 'blue-lighten-5'
    }
    else if (props.type === 'warning') {
        return 'orange-lighten-5'
    }
    else {
        return 'red-lighten-5'
    }
}

function getColorText() {
    if (props.type === 'success') {
        return 'green';
    }
    else if (props.type === 'info') {
        return 'blue'
    }
    else if (props.type === 'warning') {
        return 'orange'
    }
    else {
        return 'red'
    }
}
</script>