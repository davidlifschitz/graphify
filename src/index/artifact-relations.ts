import { readArtifacts } from '../store/artifact-store.js';

export function getArtifactRelations(artifactId: string) {
  const artifacts = readArtifacts();
  const artifact = artifacts.find((entry) => entry.artifact_id === artifactId);
  return artifact?.relations ?? [];
}
