# Fact check: /nomercy-player-core/plugins-adapters/adapter-logger
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-logger.mdx
Reviewed-SHA: 52b5c19e403af58b
Previous verdict: PASS (Reviewed-SHA b3405f91b87e94be, equal to the page at `7f53a5d`); fixes verified: none open. Scope of this review: only the sentences changed since `7f53a5d` (page lines 58-59). The rest of the page stands on the previous PASS.

Source: nomercy-player-core `src` at `e3d2de5`. Example unchanged since `7f53a5d`; type check exit 0; snippet ranges "3 OK, 0 bad".

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L58 `LogLevel` is one of `silent`, `error`, `warn`, `info`, `debug`, `trace` | `src/adapters/logger/ILogger.ts:8-15` (`LOG_LEVEL`), `:23` (`LogLevel = typeof LOG_LEVEL[keyof typeof LOG_LEVEL]`) | Supported |
| L58 ordered from quiet to verbose | `ILogger.ts:29-36` (`LEVEL_RANK`: silent -1, error 0, warn 1, info 2, debug 3, trace 4) | Supported |
| L59 `LogSink` is `(level: LogLevel, prefix: string, args: unknown[]) => void` | `ILogger.ts:43` | Supported |
