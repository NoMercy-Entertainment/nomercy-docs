// Astro 7's `preview` always daemonizes: it prints the address and exits, and
// Playwright treats a webServer command that exits as a server that died. The
// site is a static build, so this serves `dist/` itself and stays in the
// foreground - the gate still asserts against real build output, because the
// production build runs first.
import { spawnSync } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const port = Number(
	process.argv.includes('--port')
		? process.argv[process.argv.indexOf('--port') + 1]
		: 4323,
);
const root = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
	'.xml': 'application/xml; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8',
};

function run(command, args) {
	// shell: true so this resolves npm/npx the way a terminal does; without it
	// Windows finds neither and the wrapper dies before the build starts.
	const result = spawnSync(command, args, { stdio: 'inherit', shell: true });
	if (result.status !== 0)
		process.exit(result.status ?? 1);
}

run('npm', ['run', 'build:search']);
run('npx', ['astro', 'build']);

// Astro writes `/page/index.html`, so a request for `/page` or `/page/` has to
// find it the same way the deployed host does.
function resolve(pathname) {
	const candidate = normalize(join(root, decodeURIComponent(pathname)));
	if (!candidate.startsWith(normalize(root)))
		return null;

	if (existsSync(candidate) && statSync(candidate).isFile())
		return candidate;

	const indexed = join(candidate, 'index.html');
	if (existsSync(indexed))
		return indexed;

	return null;
}

createServer((request, response) => {
	const { pathname } = new URL(request.url, `http://localhost:${port}`);
	const file = resolve(pathname);

	if (!file) {
		response.writeHead(404, { 'content-type': 'text/plain' });
		response.end('Not found');
		return;
	}

	response.writeHead(200, {
		'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
	});
	createReadStream(file).pipe(response);
}).listen(port, () => {
	console.log(`Preview ready at http://localhost:${port}/`);
});
