<template>
  <v-file-input
    v-model="files"
    :show-size="1000"
    color="sub"
    label="File input"
    placeholder="Choose your file"
    prepend-icon="fas fa-paperclip"
    variant="outlined"
    counter
    density="compact"
    @update:modelValue="getFiles()"
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
import { ref, onMounted } from 'vue';
import useCourse from '@/services/course';

const manageCourse = useCourse();
const files = ref<File[]>([]);

const props = defineProps({
  idx: {
    type: Number,
    default: -1
  },
  type: {
    type: String,
    default: ''
  }
});

onMounted(() => {
  var classes = manageCourse.getValidClasses();

  if (props.type !== 'Submission' && props.type !== 'Exercise')
    return;

  if (props.idx >= 0 && classes.length > props.idx) {
    files.value = [];

    const storedFile = classes[props.idx][props.type];
    if (storedFile) {
      files.value.push(storedFile)
    }
  }
})

// Record files
async function getFiles() {
  if (files.value.length > 0) {
    let file = files.value.at(0);
    // let content = await file?.arrayBuffer();

    if (file) {
      manageCourse.setClassFile(props.idx, file, props.type);
    }
  }
}
</script>