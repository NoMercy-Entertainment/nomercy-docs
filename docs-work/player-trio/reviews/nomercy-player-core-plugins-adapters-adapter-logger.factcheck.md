# Fact check: /nomercy-player-core/plugins-adapters/adapter-logger
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-logger.mdx
Reviewed-SHA: b3405f91b87e94be

Source: `nomercy-player-core/src/adapters/logger/` (`ILogger.ts`, `default.ts`, `index.ts`), `src/core/mixins/lifecycle.ts` (`_wireLogger`), `src/core/mixins/plugin-registration.ts` (`makePlayerLogger`), `src/core/plugin/base.ts` (`initialize`), `src/core/mixins/auth.ts`, `src/types/config.ts`, `src/index.ts`, `package.json` `exports`. Source at `e3d2de5`. Example: `src/examples/core-adapter-logger.ts`.

Method: read the page, the example and every Covers file. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo; `--traceResolution` shows `.../adapters/logger` resolved to `src/adapters/logger/index.ts`): `tsc` exit 0. Ran the example (esbuild bundle aliased to the source, Node): output `[ 'info [my-app] player created', 'debug [my-app][queue] item added' ]` and `warn [nmplayer] slow start`, which matches example comments `:33` and `:112`. Ran a scratch probe (outside the repo) on `Logger`: a child made before `addSink` printed to the console only (`[nmplayer][early] child made before sink -> console only`, no `SINK` line); a child made after got both working sinks (`SINK info [nmplayer][late] ...`, `SINK2 info [nmplayer][late]`) with a throwing sink between them; `new Logger().level()` printed `info`. Snippet ranges 16-18, 20-43, 45-112 match `snippet-ranges.lock.json` (scratch script: OK). Em dash / en dash on page and example: none. Headings carry no code spans. No URLs on the page or in the example.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Pass an `ILogger` to `setup` as `logger` | `src/types/config.ts:184-185` | Supported |
| Every plugin gets a child of it, prefixed with the plugin ID | `base.ts:297-301` (`config.logger ?? new Logger(...)`, then `.child(this.id)`); failure path `plugin-registration.ts:80-89,107-108` | Supported |
| Without `logger`: a `Logger` with prefix `[nmplayer]` and your `logLevel` | `lifecycle.ts:621-624`; `default.ts:34` wraps the prefix in brackets | Supported |
| Default level is `info` | `default.ts:33` (`opts?.level ?? 'info'`); no other `logLevel` default in `src` (grep); probe printed `info` | Supported |
| With `logger`, the player does not apply `logLevel` to it | `lifecycle.ts:621`, `base.ts:297`, `plugin-registration.ts:81` use `??`; no `.level(...)` write outside the adapter (grep) | Supported |
| `Logger` writes to the console while it has no sinks; after the first `addSink`, only to sinks | `default.ts:122-134` (`this.sinks.length === 0`); probe | Supported (issue #20 behaviour) |
| A throwing sink is skipped; other sinks still run | `default.ts:136-143`; probe `SINK2` ran after the throwing sink | Supported |
| Player logs every `error` event and every name ending in `Error` at error level | `lifecycle.ts:627-631` | Supported |
| At `debug` it logs every other event except `time` and `progress`; at `trace` those too | `lifecycle.ts:633-637` | Supported |
| Levels quiet to verbose: silent, error, warn, info, debug, trace | `ILogger.ts:9-16,29-36` | Supported |
| `child` copies level and sinks at call time; later parent sinks do not reach it | `default.ts:104-107`; probe | Supported (issue #20 behaviour) |
| Plugin loggers are children, so add sinks before `setup` | `base.ts:301` (child made in `initialize`, called from `plugin-registration.ts:388`) | Supported |
| Interface: five level methods, `level` get/set, `addSink` returns a remover, `child` gains `[suffix]` | `ILogger.ts:62-97`; `default.ts:59-66,104-105` | Supported |
| `LogSink` is `(level, prefix, args) => void` | `ILogger.ts:43` | Supported |
| The player calls `child` on your logger for every plugin | `base.ts:297-301` | Supported |
| Imports: `BasePlayerConfig`, `LogLevel`, `LogSink` from root; `ILogger`, `Logger` from `adapters/logger` | `src/index.ts:360,377-378`; `adapters/logger/index.ts:9-10`; `package.json` exports `./adapters/logger` | Supported |
| Example `setup({ logger })` shape | `config.ts:185`; `tsc` exit 0 | Supported |
| See also: Media Element is the next catalog entry | `adapter-media-element.mdx` exists; map row 66 Next column | Supported |

## Notes

- At level `silent`, the error-event line is still sent to `logger.error` but the built-in `Logger` drops it (`ILogger.ts:30-31`, `default.ts:118`). The page says the logger decides which lines pass the threshold (page line 13), so this is consistent.
- The relative-URL warning goes only to `options.logger` (`auth.ts:149`). The page does not claim otherwise; covered by issue #20.
