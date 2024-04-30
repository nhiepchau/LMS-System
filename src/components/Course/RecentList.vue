<template>
    <div class="pa-4 border-sm rounded-lg">
        <div class="d-flex flex-row justify-space-between w-100" v-bind="$attrs">
            <h3 class="my-auto">Recent course</h3>
            <v-btn variant="plain" class="text-none text-blue-lighten-2" >View all</v-btn>
        </div>

        <div class="mt-2">
            <recent-course-item className="CO3005 - Data structure & Algorithm" selectedClass="L01" ></recent-course-item>
            <recent-course-item className="CO2002 - Web Development" selectedClass="L01" class="mt-2"></recent-course-item>
            <recent-course-item className="CO3113 - Principle of Programming Languages" selectedClass="L01" class="mt-2"></recent-course-item>
        </div>
    </div>
</template>