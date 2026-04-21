import { readArtifacts } from '../store/artifact-store.js';

export function findArtifactsByTask(taskId: string) {
  return readArtifacts().filter((artifact) =>
    artifact.lineage.source_task_ids.includes(taskId) || artifact.metadata?.task_id === taskId
  );
}
