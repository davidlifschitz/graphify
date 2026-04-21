# Ecosystem Integration Plan

## Role in the ecosystem

[graphify](https://github.com/davidlifschitz/graphify) should be the shared context and memory layer for the ecosystem. Its purpose is to turn code, docs, PDFs, images, and mixed corpora into reusable structure that other repos and agents can consume.

## Connected repos

- [agentic-os](https://github.com/davidlifschitz/agentic-os) — stores the top-level dependency model and shared operating rules
- [ScheduleOS](https://github.com/davidlifschitz/ScheduleOS) — should query graph summaries before acting
- [children-of-israel-agent-swarm](https://github.com/davidlifschitz/children-of-israel-agent-swarm) — should load graph context before execution
- [autoresearch-genealogy](https://github.com/davidlifschitz/autoresearch-genealogy) — should be graphified as a domain knowledge/research corpus
- [workout-planner](https://github.com/davidlifschitz/workout-planner) — should be graphified for product and content structure
- [Bttr](https://github.com/davidlifschitz/Bttr) — should be graphified for product and event model structure
- [fastest-growing-finance-repos](https://github.com/davidlifschitz/fastest-growing-finance-repos) — should be graphified for pipeline and publishing structure
- [davidlifschitz.github.io](https://github.com/davidlifschitz/davidlifschitz.github.io) — should surface links to graph-backed products and architecture content

## How graphify should connect

### 1. Produce standard repo summaries

For each repo in the ecosystem, graphify should produce an exportable summary containing at minimum:

- repo name
- critical nodes
- communities
- surprising connections
- likely impact areas
- summary links to `GRAPH_REPORT.md` and `graph.json`

### 2. Support ecosystem-wide meta-graphing

Graphify should support linking multiple repo graphs into an ecosystem graph.

Purpose:

- understand where the repos overlap
- identify duplicated logic and shared concepts
- improve orchestration and planning accuracy

### 3. Feed downstream operator and agent systems

Primary consumers:

- [ScheduleOS](https://github.com/davidlifschitz/ScheduleOS)
- [children-of-israel-agent-swarm](https://github.com/davidlifschitz/children-of-israel-agent-swarm)
- [agentic-os](https://github.com/davidlifschitz/agentic-os)

## Files to add next

- `docs/ecosystem-mode.md`
- `templates/repo_graph_config.yaml`
- `tools/export_ecosystem_summary.py`
- `tools/link_repo_graphs.py`

## Example flow

1. run graphify on a repo
2. produce `GRAPH_REPORT.md`, `graph.json`, and an ecosystem summary export
3. [ScheduleOS](https://github.com/davidlifschitz/ScheduleOS) or [children-of-israel-agent-swarm](https://github.com/davidlifschitz/children-of-israel-agent-swarm) reads the summary before acting
4. [agentic-os](https://github.com/davidlifschitz/agentic-os) links multiple repo summaries into a portfolio-wide operating map

## Acceptance criteria

- every ecosystem repo can be graphified using a repeatable config
- repo-level graph summaries can be exported for external systems
- multiple repo graphs can be linked into a top-level ecosystem graph
