import fs from 'node:fs';
import path from 'node:path';
import { getArtifactLineage } from '../src/index/artifact-lineage.js';
import { getArtifactRelations } from '../src/index/artifact-relations.js';
import { findArtifactsByProject } from '../src/query/find-by-project.js';
import { findArtifactsByTask } from '../src/query/find-by-task.js';
import { registerArtifacts, type ArtifactRecord } from '../src/store/artifact-store.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed: Record<string, string> = {};

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];
    if (!current.startsWith('--')) continue;
    const key = current.slice(2);
    const value = args[index + 1] && !args[index + 1].startsWith('--') ? args[++index] : 'true';
    parsed[key] = value;
  }

  return parsed;
}

function collectArtifactFiles(root: string): string[] {
  const files: string[] = [];

  function walk(currentPath: string) {
    if (!fs.existsSync(currentPath)) return;
    const stat = fs.statSync(currentPath);
    if (stat.isFile()) {
      if (currentPath.endsWith('.artifact.json')) files.push(currentPath);
      return;
    }

    for (const entry of fs.readdirSync(currentPath)) {
      walk(path.join(currentPath, entry));
    }
  }

  walk(root);
  return files.sort();
}

const args = parseArgs();
const inputRoot = path.resolve(args.input ?? '../children-of-israel-agent-swarm/demo-output/delegated-bootstrap');
const artifactFiles = collectArtifactFiles(inputRoot);
const artifacts = artifactFiles.map((filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8')) as ArtifactRecord);
const registered = registerArtifacts(artifacts);

const taskId = args.task ?? artifacts[0]?.metadata?.task_id ?? artifacts[0]?.lineage?.source_task_ids?.[0] ?? '';
const projectId = args.project ?? 'children-of-israel-agent-swarm';
const artifactsByTask = taskId ? findArtifactsByTask(taskId) : [];
const artifactsByProject = findArtifactsByProject(projectId);
const lineage = artifactsByTask[0] ? getArtifactLineage(artifactsByTask[0].artifact_id) : null;
const relations = artifactsByTask[0] ? getArtifactRelations(artifactsByTask[0].artifact_id) : [];

const summary = {
  ok: true,
  input_root: inputRoot,
  registered_count: registered.length,
  registered_artifact_ids: artifacts.map((artifact) => artifact.artifact_id),
  task_id: taskId,
  project_id: projectId,
  by_task_count: artifactsByTask.length,
  by_project_count: artifactsByProject.length,
  lineage,
  relations
};

const outputPath = path.resolve(args.output ?? path.join(inputRoot, 'graphify-summary.json'));
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(summary, null, 2));
