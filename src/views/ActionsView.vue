<template>
  <div class="actions">
    <h1 style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
      <img src="@/assets/logo.svg"
           style="height: 1.4em; width: 1.4em; border-radius: 50%; background-color: whitesmoke;">
      GitHub Actions Workflows
    </h1>
    <div class="filter-buttons">
      <button @click="toggleStaleWorkflows()"
              :style="{color: workflowFilters.stale ? '#838d97' : ''}">
        Hide Stale Workflows
      </button>
      <button @click="toggleSuccessWorkflows()"
              :style="{color: workflowFilters.success ? '#838d97' : ''}">
        Hide Success Workflows
      </button>
    </div>

    <div class="workflows">
      <ActionsWorkflowCard v-for="workflow in workflowsFiltered" :key="workflow.id" :workflow="workflow"
                           :timetable-days="workflowRunHistoryDays"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from 'vue'
import ActionsWorkflowCard from "@/components/ActionsWorkflowCard.vue"

const workflows = ref<Workflow[]>([])

const workflowRunHistoryDays = ref(14)

const workflowFilters = ref({
  stale: true,
  success: true,
})
const workflowsFiltered = computed(() => {
  let result = workflows.value
  if (!workflowFilters.value.stale) {
    const staleDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * workflowRunHistoryDays.value)
    result = result.filter(workflow => {
      const lastRunDate = new Date(workflow.runs[0]?.created_at)
      return lastRunDate > staleDate
    })
  }
  if (!workflowFilters.value.success) {
    result = result.filter(workflow => {
      return workflow.runs.some(run => run.conclusion !== 'success')
    })
  }
  return result
})

onMounted(async () => {
  const historyDays = 14
  workflows.value = await fetch(`/api/workflows?historyDays=${historyDays}`)
      .then(response => response.json())
})

function toggleStaleWorkflows() {
  workflowFilters.value.stale = !workflowFilters.value.stale
}

function toggleSuccessWorkflows() {
  workflowFilters.value.success = !workflowFilters.value.success
}
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

.filter-buttons {
  display: flex;
  gap: 14px;
}

.filter-buttons > button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background: #0d1117;
  color: #a2a2a2;
  font-weight: 600;
  font-size: 14px;
  border-style: solid;
  border-color: #30363d;
}

.workflows {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, 440px);
  width: min(100%, 1440px);
  justify-content: center;
  margin-top: 2rem;
}

</style>
