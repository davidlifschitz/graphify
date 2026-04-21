import { readArtifacts, writeArtifacts, type ArtifactRecord } from '../store/artifact-store.js';

export function registerArtifact(artifact: ArtifactRecord) {
  const artifacts = readArtifacts();
  const withoutExisting = artifacts.filter((entry) => entry.artifact_id !== artifact.artifact_id);
  withoutExisting.push(artifact);
  writeArtifacts(withoutExisting);

  return {
    ok: true,
    artifact_id: artifact.artifact_id,
    total_artifacts: withoutExisting.length
  };
}
