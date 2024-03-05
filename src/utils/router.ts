import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard,
            name: 'LMS System'
        },
        {
            path: '/course',
            component: () => import("@/pages/Course.vue"),
            children: [
                { path: 'create', component: () => import("@/pages/CreateCourse.vue") }
            ]
        },
        {
            path: '/exercise',
            component: () => import("@/pages/Exercise.vue")
        },
        {
            path: '/submission',
            component: () => import("@/pages/Submission.vue")
        },
        {
            path: '/outcome',
            component: () => import("@/pages/Outcome.vue")
        }
    ]
});

export default router;