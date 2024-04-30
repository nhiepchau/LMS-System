<template>
    <v-sheet class="mx-auto w-50 pa-5 text-right">
        <h3 class="text-primary mb-5 text-left" >Add new question?</h3>
        <v-form validate-on="submit lazy">
        <v-text-field
            label="Question"
        ></v-text-field>

        <v-btn
            class="mt-2 text-none bg-light-blue"
            text="Submit"
            type="submit"
            variant="elevated"
        ></v-btn>
        </v-form>
    </v-sheet>
</template>