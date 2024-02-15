<template>
  <div class="workflow-card">
    <a :href="workflowComputed.html_url">
      <div class="workflow-repository">{{ workflowComputed.owner }}/{{ workflowComputed.repo }}</div>
      <div style="display: flex; align-items: center;">
        <a :href="workflowComputed.last_run.html_url" class="workflow-indicator"
           style="display: inline-flex; margin-right: 8px;">
          <IconGitHubActions :icon="runStatusIcon(workflowComputed.last_run)"/>
        </a>
        <span class="workflow-name">{{ workflow.name }}</span>
      </div>
    </a>
    <div>
      <div v-for="entryRuns in workflowComputed.runs_timetable"
           class="run-indicator" :style="{ background: runsStatusBackground(entryRuns)}">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconGitHubActions from "@/components/ActionsIcon.vue";
import {computed, type PropType} from "vue";

const props = defineProps({
  workflow: {
    type: Object as PropType<Workflow>,
    required: true,
  },
  timetableDays: {
    type: Number,
    default: 14
  }
})

const workflowComputed = computed(() => {
  return {
    ...props.workflow,
    last_run: props.workflow.runs[0],
    runs_timetable: createWorkflowRunTimetable(props.workflow.runs.slice(1), props.timetableDays)
  }
})

function createWorkflowRunTimetable(runs: WorkflowRun[], days: number = 14) {
  const dayRuns: WorkflowRun[][] = new Array(days).fill(null).map(_ => [])
  const daysSinceEpoch = epochDays(new Date())
  runs.forEach(run => {
    const dayOffset = daysSinceEpoch - epochDays(new Date(run.created_at))
    if (dayOffset < dayRuns.length) {
      dayRuns[dayOffset].push(run)
    }
  })

  return dayRuns

  function epochDays(date: Date) {
    return Math.floor(date.getTime() / 1000 / 60 / 60 / 24)
  }
}

function runsStatusBackground(runs: { status: WorkflowRunStatus, conclusion: WorkflowRunConclusion }[]) {
  if (runs.length === 0) {
    return undefined
  }

  const runStatusColorMap = runs.map(run => runStatusColor(run)).reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, <Record<string, number>>{});

  const linearGradientSteps: string[] = Object.entries(runStatusColorMap).flatMap(([color, count], index, entries) => {
    return [
      `${color} ${index / entries.length * 100}%`,
      `${color} ${(index + 1) / entries.length * 100}%`,
    ]
  })
  return `linear-gradient(-90deg, ${linearGradientSteps.join(', ')})`
}

function runStatusColor({status, conclusion}: { status: WorkflowRunStatus, conclusion: WorkflowRunConclusion }) {
  switch (status) {
    case "queued":
    case "in_progress":
      return "#dbab07"
    case "completed":
      switch (conclusion) {
        case "success":
        case "neutral":
          return "#3fb950"
        case "failure":
        case "action_required":
        case "timed_out":
          return "#f85148"
        case "cancelled":
        case "skipped":
          return "#757575"
      }
  }

  return "#ff00d0"
}

function runStatusIcon({status, conclusion}: { status: WorkflowRunStatus, conclusion: WorkflowRunConclusion }) {
  switch (status) {
    case "queued":
    case "in_progress":
      return "running"
    case "completed":
      switch (conclusion) {
        case "success":
        case "neutral":
          return "success"
        case "failure":
        case "action_required":
        case "timed_out":
          return "failure"
        case "cancelled":
        case "skipped":
          return "cancelled"
      }
  }

  return "failure"
}
</script>

<style scoped>

.workflow-card {
  border-style: solid;
  border-color: #30363d;
  border-radius: 0.375rem;
  padding: 0.8rem;
  background: #0d1117;
  width: 100%;
  max-width: 440px;
}

.workflow-repository {
  color: #838d97;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
}

.workflow-name {
  font-weight: 600;
}

.run-indicator {
  display: inline-block;
  width: 20px;
  height: 4px;
  border-radius: 2px;
  background: #151a23;
  margin: 14px 4px 0;
  opacity: 0.8;
}

.workflow-indicator {

}

</style>

