# Ecosystem memory mode

## Purpose

This branch adds the first ecosystem-facing memory path for the bootstrap spine. `graphify` acts as the downstream registry for artifacts emitted by `spec-to-repo` and `children-of-israel-agent-swarm`.

## Runnable path

```bash
npm install
npm run inspect:artifacts -- --input ../children-of-israel-agent-swarm/demo-output/delegated-bootstrap
```

## What the script does

1. finds emitted `*.artifact.json` files
2. registers them into `.graphify/artifacts.json`
3. queries them back by task id and project id
4. inspects lineage and relations for at least one registered artifact
5. writes a `graphify-summary.json` output

## Query surfaces used

- `src/query/find-by-task.ts`
- `src/query/find-by-project.ts`
- `src/index/artifact-lineage.ts`
- `src/index/artifact-relations.ts`

## Scope note

This is the first ecosystem memory loop only. It does not replace graphify's broader code and knowledge graph workflows.
