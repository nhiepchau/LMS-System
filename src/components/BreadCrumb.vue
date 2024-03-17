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
const items = [
    {
        title: 'Course & Exercises',
        icon: 'fas fa-book',
        disabled: false,
        color: '#6F9CEB'
    },
    {
        title: 'Submissions',
        icon: 'fas fa-file-code',
        disabled: true
    },
    {
        title: 'Analysis',
        icon: 'fas fa-chart-pie',
        disabled: true
    }
]
</script>