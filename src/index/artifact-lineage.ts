import { readArtifacts } from '../store/artifact-store.js';

export function getArtifactLineage(artifactId: string) {
  const artifacts = readArtifacts();
  const artifact = artifacts.find((entry) => entry.artifact_id === artifactId);

  if (!artifact) {
    return null;
  }

  return {
    artifact_id: artifact.artifact_id,
    source_task_ids: artifact.lineage.source_task_ids,
    source_artifact_ids: artifact.lineage.source_artifact_ids,
    parent_artifact_id: artifact.lineage.parent_artifact_id ?? null,
    derived_from: artifact.lineage.derived_from ?? []
  };
}
