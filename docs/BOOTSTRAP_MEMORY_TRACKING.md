# Bootstrap Memory Tracking

This document tracks the `graphify` side of the first end-to-end bootstrap execution loop.

## Goal
Use `graphify` as the downstream memory layer for the first delegated bootstrap flow:
- bootstrap task originates from `agentic-os`
- execution/delegation happens through `children-of-israel-agent-swarm` and `spec-to-repo`
- resulting artifacts are registered and queried in `graphify`

## Checklist
- [ ] Add `scripts/inspect-artifacts.ts`
- [ ] Register artifacts emitted by the bootstrap demo
- [ ] Verify `src/query/find-by-task.ts`
- [ ] Verify `src/query/find-by-project.ts`
- [ ] Verify `src/index/artifact-lineage.ts`
- [ ] Verify `src/index/artifact-relations.ts`
- [ ] Add `docs/ecosystem-mode.md`
- [ ] Add placeholders for `templates/repo_graph_config.yaml`
- [ ] Add placeholders for `tools/export_ecosystem_summary.py`
- [ ] Add placeholders for `tools/link_repo_graphs.py`

## Acceptance criteria
- bootstrap-flow artifacts can be registered into `graphify`
- artifacts can be queried back by task and by project
- at least one artifact has useful lineage and relation output
