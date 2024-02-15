<!-- This icon is from <https://github.com/Templarian/MaterialDesign>, distributed under Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0) license-->
<template>
  <svg v-if="icon === 'success'"
       width="16" height="16"
       style="fill: #3fb950;"
       viewBox="0 0 16 16">
    <path
        d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z"></path>
  </svg>

  <svg v-else-if="icon === 'failure'"
       width="16" height="16"
       style="fill: #f85148;"
       viewBox="0 0 16 16">
    <path
        d="M2.343 13.657A8 8 0 1 1 13.658 2.343 8 8 0 0 1 2.343 13.657ZM6.03 4.97a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L6.94 8 4.97 9.97a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L8 9.06l1.97 1.97a.749.749 0 0 0 1.275-.326.749.749 0 0 0-.215-.734L9.06 8l1.97-1.97a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L8 6.94Z"></path>
  </svg>

  <svg v-else-if="icon === 'cancelled'"
       width="16" height="16"
       style="fill: #757575;"
       viewBox="0 0 16 16">
    <path
        d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
  </svg>

  <svg v-else-if="icon === 'running'"
       width="16" height="16"
       style="fill: #DBAB0A;"
       class="animate-spin"
       viewBox="0 0 16 16">
    <path d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Z"
          fill="none" stroke="#DBAB0A" stroke-width="2" opacity=".5"></path>
    <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
          fill-rule="evenodd" clip-rule="evenodd"></path>
    <path d="M14 8a6 6 0 0 0-6-6V0a8 8 0 0 1 8 8h-2Z"></path>
  </svg>
</template>

<script setup lang="ts">
import type {PropType} from "vue";

type Icon = 'success' | 'failure' | 'cancelled' | 'running'

defineProps({
  icon: {
    type: String as PropType<Icon>,
    required: true,
  }
})
</script>

<style scoped>

@keyframes rotate-keyframes {
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: rotate-keyframes 1s linear infinite;
}
</style>
```
