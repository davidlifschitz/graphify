import fs from 'node:fs';
import path from 'node:path';

export type ArtifactRecord = {
  artifact_id: string;
  artifact_type: string;
  title?: string;
  description?: string;
  origin_project: string;
  metadata?: {
    project_id?: string;
    task_id?: string;
    skill_id?: string;
    tags?: string[];
  };
  lineage: {
    source_task_ids: string[];
    source_artifact_ids: string[];
    parent_artifact_id?: string;
    derived_from?: string[];
  };
  relations?: Array<{
    relation_type: string;
    target_kind: string;
    target_id: string;
  }>;
  created_at: string;
};

const STORE_PATH = path.join(process.cwd(), '.graphify', 'artifacts.json');

function ensureStore() {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, '[]\n', 'utf8');
  }
}

export function readArtifacts(): ArtifactRecord[] {
  ensureStore();
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8')) as ArtifactRecord[];
}

export function writeArtifacts(artifacts: ArtifactRecord[]) {
  ensureStore();
  fs.writeFileSync(STORE_PATH, JSON.stringify(artifacts, null, 2) + '\n', 'utf8');
}

export function registerArtifacts(artifacts: ArtifactRecord[]) {
  const existing = readArtifacts();
  const byId = new Map(existing.map((artifact) => [artifact.artifact_id, artifact]));

  for (const artifact of artifacts) {
    const normalizedRelations = [...(artifact.relations ?? [])];
    for (const sourceArtifactId of artifact.lineage.source_artifact_ids ?? []) {
      normalizedRelations.push({
        relation_type: 'derived_from',
        target_kind: 'artifact',
        target_id: sourceArtifactId
      });
    }

    if (artifact.metadata?.task_id) {
      normalizedRelations.push({
        relation_type: 'belongs_to',
        target_kind: 'task',
        target_id: artifact.metadata.task_id
      });
    }

    if (artifact.metadata?.project_id) {
      normalizedRelations.push({
        relation_type: 'belongs_to',
        target_kind: 'project',
        target_id: artifact.metadata.project_id
      });
    }

    byId.set(artifact.artifact_id, {
      ...artifact,
      relations: dedupeRelations(normalizedRelations)
    });
  }

  const merged = [...byId.values()].sort((left, right) => left.created_at.localeCompare(right.created_at));
  writeArtifacts(merged);
  return merged;
}

function dedupeRelations(relations: NonNullable<ArtifactRecord['relations']>) {
  const seen = new Set<string>();
  return relations.filter((relation) => {
    const key = `${relation.relation_type}:${relation.target_kind}:${relation.target_id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
