<template>
    <v-breadcrumbs :items="items" rounded class="bg-grey py-6 border-sm">
        <template v-slot:divider>
            <v-icon size="xsmall">fas fa-chevron-right</v-icon>
        </template>
        <template v-slot:title="{ item }">
            <v-icon size="small">{{ item.icon }}</v-icon>&nbsp;
            {{ item.title }}
        </template>
    </v-breadcrumbs>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

const props = defineProps({
    activeIdx: {
        type: Number,
        default: 0
    }
});

interface BreadCrumbItem {
    title: string,
    icon: string,
    color: string,
    disabled: boolean
}

const items = ref<BreadCrumbItem[]>([
    {
        title: 'Course & Exercises',
        icon: 'fas fa-book',
        color: '#6F9CEB',
        disabled: false
    },
    {
        title: 'Submissions',
        icon: 'fas fa-file-code',
        color: '',
        disabled: true
    },
    {
        title: 'Analysis',
        icon: 'fas fa-chart-pie',
        color: '',
        disabled: true
    }
]);

watch(() => props.activeIdx, (newIdx, oldIdx) => {
    items.value.forEach(x => {
        items.value[oldIdx].color = '';
        items.value[oldIdx].disabled = true;

        items.value[newIdx].color = '#6F9CEB';
        items.value[newIdx].disabled = false;
    });
});
</script>