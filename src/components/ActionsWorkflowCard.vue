<template>
  <div class="workflow-card">
    <a target="_blank" :href="workflow.html_url">
      <div class="workflow-body">
        <a target="_blank" :href="workflowComputed.last_run.html_url"
           class="workflow-indicator"
           style="padding-top: 0.1em;">
          <ActionsStatusIcon width="22px" height="22px" :run="workflowComputed.last_run"/>
        </a>
        <div>
          <div class="workflow-name">{{ workflow.name }}</div>
          <div class="workflow-repository">{{ workflow.owner }}/{{ workflow.repo }}</div>
        </div>
      </div>
    </a>
    <!-- TODO security findings -->
    <!-- TODO pull requests -->
    <div class="workflow-timetable">
      <a v-for="entryRuns in workflowComputed.runs_timetable"
         target="_blank"
         :href="`${workflow.html_url}?query=${encodeURIComponent(`created:<${entryRuns[0]?.created_at}`)}`"
         class="workflow-timetable-section" :style="{ background: runsStatusBackground(entryRuns)}">
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionsStatusIcon from "@/components/ActionsStatusIcon.vue";
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
    last_run: props.workflow.runs[0],
    runs_timetable: createWorkflowRunTimetable(props.workflow.runs, props.timetableDays)
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

</script>

<style scoped>

.workflow-card {
  border-style: solid;
  border-color: #30363d;
  border-radius: 0.375rem;
  background: #04070a;
  width: 100%;
  max-width: 440px;
  color: #30363d;
}

.workflow-body {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px;
}

.workflow-repository {
  color: #838d97;
  font-weight: 600;
  font-size: 12px;
}

.workflow-name {
  font-weight: 600;
}

.workflow-timetable {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.workflow-timetable-section {
  display: inline-block;
  flex-grow: 1;
  height: 5px;
  border-radius: 2px 2px 0 0;
  background: #232c3d;
  opacity: 0.8;
}

</style>

