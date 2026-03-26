import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DOCUMENTS_DIR = join(process.cwd(), 'public', 'laws', 'documents');

function computeSha256(filePath: string): string {
  const buffer = readFileSync(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

function getMimeType(ext: string): string {
  const mimeMap: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.html': 'text/html',
    '.htm': 'text/html',
  };
  return mimeMap[ext] ?? 'application/octet-stream';
}

try {
  const files = readdirSync(DOCUMENTS_DIR).filter(
    (f) => !f.startsWith('.') && statSync(join(DOCUMENTS_DIR, f)).isFile()
  );

  if (files.length === 0) {
    console.log('No files found in public/laws/documents/');
    process.exit(0);
  }

  console.log(`\nFound ${files.length} document(s):\n`);

  for (const file of files.sort()) {
    const filePath = join(DOCUMENTS_DIR, file);
    const stat = statSync(filePath);
    const hash = computeSha256(filePath);
    const ext = extname(file);

    console.log(`  File:     ${file}`);
    console.log(`  Path:     /laws/documents/${file}`);
    console.log(`  Size:     ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
    console.log(`  SHA-256:  ${hash}`);
    console.log(`  MIME:     ${getMimeType(ext)}`);
    console.log('');
  }
} catch (err) {
  if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
    console.error('Directory public/laws/documents/ does not exist.');
    process.exit(1);
  }
  throw err;
}
