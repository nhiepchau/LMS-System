import { RouteLocationNormalized, createRouter, createWebHistory } from "vue-router";
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
            path: '/course',
            name: 'course',
            children: [
                { path: '', component: () => import("@/pages/Course.vue"), name: 'course-home' },
                { path: 'create', component: () => import("@/pages/CreateCourse.vue") }
            ],
            beforeEnter: [checkRole]
        },
        {
            path: '/class',
            name: 'class',
            children: [
                { path: '', component: () => import("@/pages/AllClass.vue"), name: 'class-home' },
                { path: 'create', component: () => import("@/pages/CreateClass.vue") },
                { path: ':class_code', component: () => import("@/pages/Class.vue") },
                { path: ':class_code/exercise', component: () => import("@/pages/Exercise.vue") },
                { path: ':class_code/submission', component: () => import("@/pages/Submission.vue") },
                { path: ':class_code/outcome', component: () => import("@/pages/Outcome.vue") }
            ],
            beforeEnter: [checkRole]
        },
        {
            path: '/report',
            component: () => import("@/pages/Report.vue"),
            beforeEnter: [checkRole]
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
            name: 'notfound',
            component: () => import("@/pages/NotFound.vue")
        }
    ]
});

function checkRole(to: RouteLocationNormalized) {
    const auth = useAuth();
    if (auth.user.role !== 'Teacher' && auth.user.role !== 'Head Lecturer') {
        return { path: to.path, name: 'notfound' };
    }
}

router.beforeEach((to, from) => {
    const auth = useAuth();

    if (!auth.isAuthenticated && to.name !== 'login' && to.name !== 'register') {
        return { name: 'login' }
    }
})

export default router;