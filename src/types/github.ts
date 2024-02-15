type Workflow = {
    id: number
    owner: string
    repo: string
    name: string
    state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually"
    html_url: string
    runs: WorkflowRun[]
}

type WorkflowRun = {
    id: number
    html_url: string
    conclusion: WorkflowRunConclusion
    status: WorkflowRunStatus
    created_at: string
}

type WorkflowRunStatus = "queued" | "in_progress" | "completed"

type WorkflowRunConclusion =
    "success"
    | "failure"
    | "neutral"
    | "cancelled"
    | "skipped"
    | "timed_out"
    | "action_required"
