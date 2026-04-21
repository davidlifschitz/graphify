import { readArtifacts } from '../store/artifact-store.js';

export function findArtifactsByProject(projectId: string) {
  return readArtifacts().filter((artifact) =>
    artifact.origin_project === projectId || artifact.metadata?.project_id === projectId
  );
}

export function findLatestArtifactByType(projectId: string, artifactType: string) {
  return findArtifactsByProject(projectId)
    .filter((artifact) => artifact.artifact_type === artifactType)
    .sort((left, right) => right.created_at.localeCompare(left.created_at))[0] ?? null;
}
