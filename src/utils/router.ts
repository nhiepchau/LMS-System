import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";
import useAuth from "@/services/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard,
            name: 'homepage'
        },
        {
            path: '/class',
            name: 'class',
            children: [
                { path: '', component: () => import("@/pages/Course.vue") },
                { path: 'create', component: () => import("@/pages/CreateCourse.vue") },
                { path: ':class_code', component: () => import("@/pages/Class.vue") },
                { path: ':class_code/exercise', component: () => import("@/pages/Exercise.vue") },
                { path: ':class_code/submission', component: () => import("@/pages/Submission.vue") }
            ]
        },
        {
            path: '/outcome',
            component: () => import("@/pages/Outcome.vue")
        },
        {
            path: '/report',
            component: () => import("@/pages/Report.vue")
        },
        {
            path: '/notification',
            component: () => import("@/pages/Notification.vue")
        },
        {
            path: '/setting',
            component: () => import("@/pages/Setting.vue")
        },
        {
            path: '/',
            name: 'login',
            component: () => import("@/pages/Login.vue")
        },
        {
            path: '/register',
            name: 'register',
            component: () => import("@/pages/Register.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import("@/pages/NotFound.vue")
        }
    ]
});

router.beforeEach((to, from) => {
    const auth = useAuth();

    if (!auth.isAuthenticated && to.name !== 'login' && to.name !== 'register') {
        return { name: 'login' }
    }
})

export default router;