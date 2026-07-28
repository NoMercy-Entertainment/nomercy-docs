#!/usr/bin/env node
// The Kotlin snippets, compiled.
//
//   node scripts/check-examples-kmp.mjs
//
// The native twin of `check:examples`, which is `tsc` over src/examples. A
// Kotlin block on a page is exactly as capable of being wrong as a TypeScript
// one and rather more likely to be, since nobody writing docs has a Kotlin
// compiler in their editor by reflex.
//
// It compiles src/examples-kmp against the PUBLISHED coordinates, so a snippet
// that only works against a source checkout fails here. That is the whole point:
// what a reader copies resolves the same way they will resolve it.
//
// A machine with no JDK cannot answer this question, and pretending otherwise
// would be worse than not asking. It says so and exits non-zero, because a gate
// that passes when it could not run is a gate nobody can trust.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.join(root, 'native-examples');
// The wrapper by absolute path. Windows resolves a bare `gradlew.bat` against
// PATH rather than against cwd, so the relative form reports "not recognized"
// and the gate reads as a broken snippet rather than as a broken invocation.
const wrapper = path.join(project, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');

if (!existsSync(path.join(project, 'build.gradle.kts'))) {
  console.error(`no snippet build at ${project}`);
  process.exit(2);
}

if (!process.env.JAVA_HOME) {
  console.error('JAVA_HOME is not set, so the Kotlin snippets were not compiled.');
  console.error('Install a JDK 21 and set JAVA_HOME, or run this on a machine that has one.');
  process.exit(1);
}

const result = spawnSync(wrapper, ['assemble', '--console=plain', '-q'], {
  cwd: project,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status !== 0) {
  console.error('\nA Kotlin snippet under src/examples-kmp does not compile.');
  console.error('The page renders that file verbatim, so what a reader copies would not build either.');
  process.exit(result.status ?? 1);
}

console.log('kmp examples: every Kotlin snippet compiles against the published coordinates');
