<template>
  <div class="actions">
    <h1>GitHub Actions Workflows</h1>
    <div class="workflows">
      <ActionsWorkflowCard v-for="workflow in workflows" :key="workflow.id" :workflow="workflow"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue'
import ActionsWorkflowCard from "@/components/ActionsWorkflowCard.vue";

const workflows = ref<Workflow[]>([])

onMounted(async () => {
  const historyDays = 14
  workflows.value = await fetch(`/api/workflows?historyDays=${historyDays}`)
      .then(response => response.json())
})
</script>

<style scoped>
.actions {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.actions {
  min-height: 128px;
  display: flex;
  align-items: center;
}

.workflows {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, 440px);
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
}

</style>
