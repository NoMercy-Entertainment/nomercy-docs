#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, '../src/content/docs');

// Extract title and description from metadata export
function extractMetadata(content) {
  const metadataMatch = content.match(/export\s+const\s+metadata\s*=\s*\{([^}]+)\}/s);
  if (!metadataMatch) return null;

  const metadataStr = metadataMatch[1];
  const titleMatch = metadataStr.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = metadataStr.match(/description:\s*['"]([^'"]+)['"]/s) ||
                    metadataStr.match(/description:\s*\n?\s*['"]([^'"]+)['"]/s);

  // Handle multiline descriptions
  let description = '';
  if (descMatch) {
    description = descMatch[1];
  } else {
    // Try to extract multiline description
    const descMultiMatch = metadataStr.match(/description:\s*\n?\s*['"]([\s\S]*?)['"]\s*,?\s*\}/);
    if (descMultiMatch) {
      description = descMultiMatch[1].replace(/\n\s*/g, ' ').trim();
    }
  }

  return {
    title: titleMatch ? titleMatch[1] : null,
    description: description || null
  };
}

// Add frontmatter to content
function addFrontmatter(content, title, description) {
  // Check if frontmatter already exists
  if (content.trim().startsWith('---')) {
    console.log('  Frontmatter already exists, skipping');
    return content;
  }

  const frontmatter = `---
title: "${title}"
description: "${description}"
---

`;
  return frontmatter + content;
}

// Process a single MDX file
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf-8');

  const metadata = extractMetadata(content);
  if (!metadata || !metadata.title) {
    console.log('  Could not extract metadata, skipping');
    return false;
  }

  console.log(`  Title: ${metadata.title}`);
  console.log(`  Description: ${metadata.description?.substring(0, 50)}...`);

  const newContent = addFrontmatter(content, metadata.title, metadata.description || metadata.title);
  fs.writeFileSync(filePath, newContent);
  return true;
}

// Reorganize files: move section/page.mdx to section.mdx
function reorganizeFiles() {
  const entries = fs.readdirSync(docsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pageMdx = path.join(docsDir, entry.name, 'page.mdx');
      const targetMdx = path.join(docsDir, `${entry.name}.mdx`);

      if (fs.existsSync(pageMdx)) {
        console.log(`Moving: ${entry.name}/page.mdx -> ${entry.name}.mdx`);
        const content = fs.readFileSync(pageMdx, 'utf-8');
        fs.writeFileSync(targetMdx, content);
        fs.unlinkSync(pageMdx);

        // Remove empty directory
        try {
          fs.rmdirSync(path.join(docsDir, entry.name));
          console.log(`  Removed empty directory: ${entry.name}`);
        } catch (e) {
          console.log(`  Directory not empty: ${entry.name}`);
        }
      }
    }
  }
}

// Main
console.log('=== Reorganizing MDX files ===\n');
reorganizeFiles();

console.log('\n=== Adding frontmatter to MDX files ===\n');
const mdxFiles = fs.readdirSync(docsDir)
  .filter(f => f.endsWith('.mdx'))
  .map(f => path.join(docsDir, f));

// Also check subdirectories
const subdirs = fs.readdirSync(docsDir, { withFileTypes: true })
  .filter(d => d.isDirectory());

for (const subdir of subdirs) {
  const subdirPath = path.join(docsDir, subdir.name);
  const files = fs.readdirSync(subdirPath)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(subdirPath, f));
  mdxFiles.push(...files);
}

for (const file of mdxFiles) {
  processFile(file);
}

console.log('\n=== Done ===');
