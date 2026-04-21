import fs from 'node:fs';
import path from 'node:path';

export type ArtifactRecord = {
  artifact_id: string;
  artifact_type: string;
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
