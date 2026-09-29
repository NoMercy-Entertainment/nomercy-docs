# Reader: /nomercy-player-core/plugins-adapters/adapter-logger

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-logger.mdx

Reviewed-SHA: b3405f91b87e94be

## Findings

### LogLevel referenced before definition

Line 54 in the Interface section states:

> | `fn level` | With no argument, returns the level. With a `cls LogLevel`, sets it. |

`LogLevel` is used as a type here but is not defined in the Interface table or in the section before it. 

**Cost to reader:** A reader doesn't know what values LogLevel can hold. The text mentions levels (line 34) as "silent, error, warn, info, debug, trace" but doesn't name them as a type or enum.

**Fix:** Add a row to the interface table defining LogLevel, or add text after the table: "LogLevel is one of: 'silent', 'error', 'warn', 'info', 'debug', 'trace'."

### LogSink type not fully defined in Interface

Line 55 introduces LogSink:

> | `fn addSink` | Adds a `cls LogSink` and returns a function that removes it. |

Then line 58 gives a partial definition:

> A `cls LogSink` is `(level, prefix, args) => void`.

**Cost to reader:** The LogSink type appears in the interface row but isn't expanded there. While the definition comes right after the table, it's awkward for a reader scanning the interface section. The table should clarify what LogSink is.

**Fix:** Move the LogSink definition into the Interface section as a note immediately after the table, or expand the table row to include the type signature inline.

