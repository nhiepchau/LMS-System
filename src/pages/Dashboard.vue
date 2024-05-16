<template>
    <top-bar />
    <v-container v-if="auth.user.role === 'Teacher'">
        <h1 class="text-primary" >Dashboard</h1>

        <v-row class="mt-5">
            <v-col><course-info-item class="bg-blue-lighten-4 text-blue-darken-4" :info="7" typeInfo="Classes" ></course-info-item></v-col>
            <v-col><course-info-item class="bg-green-lighten-4 text-dark-green" :info="100" typeInfo="Submission Files"></course-info-item></v-col>
            <v-col><course-info-item class="bg-grey-lighten-3 text-dark-grey" :info="1500" typeInfo="Total Students"></course-info-item></v-col>
            <v-col>
                <v-btn class="w-100 bg-blue-lighten-5 h-100 text-center" variant="plain" to="/class/create">
                    <div>
                        <v-icon size="large" >fas fa-circle-plus</v-icon>
                        <p class="mt-2 text-none">Add a new class</p>
                    </div>
                </v-btn>
            </v-col>
        </v-row>

        <div class="d-flex flex-row mt-5">
            <recent-list class="w-33"></recent-list>
            <bar-chart class="w-66 ml-4"></bar-chart>
        </div>
    </v-container>
    <v-container v-else>
        <h1 class="text-primary" >Learning Outcome Support</h1>
        <div class="d-flex flex-row mt-5">
            <performance-chart class="w-50"></performance-chart>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';

const auth = useAuth();
</script>