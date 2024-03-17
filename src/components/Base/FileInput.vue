<template>
  <v-file-input
    v-model="files"
    :show-size="1000"
    color="#C8D6F9"
    label="File input"
    placeholder="Choose your file"
    prepend-icon="fas fa-paperclip"
    variant="outlined"
    counter
    density="compact"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="(fileName, index) in fileNames" :key="fileName">
        <v-chip
          v-if="index < 2"
          class="me-2"
          color="#6F9CEB"
          size="small"
          label
        >
          {{ fileName }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="text-overline text-grey-darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </template>
  </v-file-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const files = ref<File[]>([]);
</script>