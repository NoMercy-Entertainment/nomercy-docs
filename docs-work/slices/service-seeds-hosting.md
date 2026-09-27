# Slice: service-seeds-hosting
Files given: 31
Files opened: 31

## Files opened
- src/NoMercy.Service/Seeds/CertificationsSeed.cs
- src/NoMercy.Service/Seeds/ConfigSeed.cs
- src/NoMercy.Service/Seeds/CountriesSeed.cs
- src/NoMercy.Service/Seeds/DatabaseBackupService.cs
- src/NoMercy.Service/Seeds/DatabaseSeeder.cs
- src/NoMercy.Service/Seeds/Dto/FolderSeedDto.cs
- src/NoMercy.Service/Seeds/Dto/LibrarySeedDto.cs
- src/NoMercy.Service/Seeds/Dto/ServerUserDto.cs
- src/NoMercy.Service/Seeds/EncodingPresetsSeed.cs
- src/NoMercy.Service/Seeds/FolderRootsSeed.cs
- src/NoMercy.Service/Seeds/GenresSeed.cs
- src/NoMercy.Service/Seeds/LanguagesSeed.cs
- src/NoMercy.Service/Seeds/LibrariesSeed.cs
- src/NoMercy.Service/Seeds/MusicGenresSeed.cs
- src/NoMercy.Service/Seeds/ServerUserApiClient.cs
- src/NoMercy.Service/Seeds/ServerUserSyncService.cs
- src/NoMercy.Service/Seeds/UsersSeed.cs
- src/NoMercy.Service/Seeds/V1DriverBridgeSeed.cs
- src/NoMercy.Service/Hosting/BootstrapStorageFactory.cs
- src/NoMercy.Service/Hosting/HostLifecycleHooks.cs
- src/NoMercy.Service/Hosting/IPluginLoader.cs
- src/NoMercy.Service/Hosting/IPortManager.cs
- src/NoMercy.Service/Hosting/IServerRunner.cs
- src/NoMercy.Service/Hosting/IShutdownCoordinator.cs
- src/NoMercy.Service/Hosting/PluginLoader.cs
- src/NoMercy.Service/Hosting/PortManager.cs
- src/NoMercy.Service/Hosting/ServerBootstrapper.cs
- src/NoMercy.Service/Hosting/ServerRunner.cs
- src/NoMercy.Service/Hosting/ShutdownCoordinator.cs
- src/NoMercy.Service/Hosting/StartupAbortException.cs
- src/NoMercy.Service/Hosting/WebHostFactory.cs

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| DatabaseSeeder.InitSchema | `public static async Task InitSchema(IStorage storage)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:38 |
| DatabaseSeeder.SeedOfflineData | `public static async Task SeedOfflineData(IStorage storage, IStorageDriver storageDriver)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:154 |
| DatabaseSeeder.Run | `public static async Task Run(IStorage storage, IStorageDriver storageDriver)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:193 |
| DatabaseSeeder.LoadDiskOverlaysAsync | `public static async Task LoadDiskOverlaysAsync(MediaContext context)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:236 |
| DatabaseSeeder.SeedSystemLocalDriver | `public static async Task SeedSystemLocalDriver(MediaContext mediaContext)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:294 |
| DatabaseSeeder.RunBundleSlugRenamePassAsync | `public static async Task RunBundleSlugRenamePassAsync(IStorageFactory storageFactory, ILogger<BundleSlugRenamer> logger)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:321 |
| DatabaseSeeder.SeedAuthData | `public static async Task SeedAuthData(IStorage storage, string? accessToken)` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:351 |
| DatabaseBackupService.BackupRoot | `public static string BackupRoot { get; set; } = Path.Combine(AppFiles.DataPath, "backups");` | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:32 |
| DatabaseBackupService.RetainCount | `public static int RetainCount { get; set; } = 5;` | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:35 |
| DatabaseBackupService.BackupBeforeMigration | `public static bool BackupBeforeMigration(string dbPath, int pendingMigrationCount)` | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:45 |
| DatabaseBackupService.BackupNow | `public static bool BackupNow(string dbPath, string reason)` | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:62 |
| CertificationsSeed.Init | `public static async Task Init(this MediaContext dbContext)` | src/NoMercy.Service/Seeds/CertificationsSeed.cs:24 |
| ConfigSeed.Init | `public static async Task Init(this AppDbContext dbContext)` | src/NoMercy.Service/Seeds/ConfigSeed.cs:23 |
| CountriesSeed.Init | `public static async Task Init(this MediaContext dbContext)` | src/NoMercy.Service/Seeds/CountriesSeed.cs:23 |
| EncodingPresetsSeed.Init | `public static async Task Init(MediaContext context, IStorage storage)` | src/NoMercy.Service/Seeds/EncodingPresetsSeed.cs:29 |
| FolderRootsSeed.Init | `public static async Task Init(this MediaContext dbContext, IStorage storage, IStorageDriver storageDriver)` | src/NoMercy.Service/Seeds/FolderRootsSeed.cs:26 |
| GenresSeed.Init | `public static async Task Init(this MediaContext dbContext)` | src/NoMercy.Service/Seeds/GenresSeed.cs:28 |
| LanguagesSeed.Init | `public static async Task Init(this MediaContext dbContext)` | src/NoMercy.Service/Seeds/LanguagesSeed.cs:23 |
| LibrariesSeed.Init | `public static async Task Init(this MediaContext dbContext, IStorage storage, IStorageDriver storageDriver)` | src/NoMercy.Service/Seeds/LibrariesSeed.cs:27 |
| MusicGenresSeed.Init | `public static async Task Init(this MediaContext dbContext)` | src/NoMercy.Service/Seeds/MusicGenresSeed.cs:24 |
| IServerUserApiClient.GetServerUsersAsync | `Task<ServerUserDtoData[]> GetServerUsersAsync(string accessToken, CancellationToken cancellationToken = default)` | src/NoMercy.Service/Seeds/ServerUserApiClient.cs:26 |
| ServerUserApiClient.ParseResponse | `internal static ServerUserDtoData[] ParseResponse(string response)` | src/NoMercy.Service/Seeds/ServerUserApiClient.cs:70 |
| ServerUserSyncResult | `public readonly record struct ServerUserSyncResult(bool Attempted, int UpstreamUserCount, int RevokedCount);` | src/NoMercy.Service/Seeds/ServerUserSyncService.cs:31 |
| IServerUserSyncService.SyncAsync | `Task<ServerUserSyncResult> SyncAsync(MediaContext dbContext, IStorage storage, string? accessToken, CancellationToken cancellationToken = default)` | src/NoMercy.Service/Seeds/ServerUserSyncService.cs:47 |
| UsersSeed.Init | `public static async Task Init(this MediaContext dbContext, IStorage storage, string? accessToken, IServerUserSyncService? syncService = null)` | src/NoMercy.Service/Seeds/UsersSeed.cs:30 |
| V1DriverBridgeSeed.RunAsync | `public static async Task RunAsync(MediaContext context)` | src/NoMercy.Service/Seeds/V1DriverBridgeSeed.cs:45 |
| BootstrapStorageFactory.Create | `public static (IStorage storage, IStorageDriver driver) Create()` | src/NoMercy.Service/Hosting/BootstrapStorageFactory.cs:20 |
| HostLifecycleHooks.Register | `public static void Register(WebApplication app, Stopwatch stopWatch)` | src/NoMercy.Service/Hosting/HostLifecycleHooks.cs:20 |
| IPluginLoader.LoadPlugins | `Task<IReadOnlyList<PluginLoadResult>> LoadPlugins(CancellationToken ct);` | src/NoMercy.Service/Hosting/IPluginLoader.cs:18 |
| IPortManager | `Task EnsurePortAvailable(int port); int FindNextAvailablePort(int startPort); bool IsPortAvailable(int port); Task<bool> HandlePortInUse(int port, IOException ex);` | src/NoMercy.Service/Hosting/IPortManager.cs:16-19 |
| IServerRunner | `Task<bool> RunWithHttpsRestart(WebApplication httpHost, StartupOptions options, Setup.Boot.BootOrchestrator orchestrator); Task<bool> RunHost(WebApplication host);` | src/NoMercy.Service/Hosting/IServerRunner.cs:16-22 |
| IShutdownCoordinator | `CancellationToken Token { get; } void RequestShutdown(); void ForceShutdown();` | src/NoMercy.Service/Hosting/IShutdownCoordinator.cs:16-18 |
| PluginLoader.LoadPlugins | `public async Task<IReadOnlyList<PluginLoadResult>> LoadPlugins(CancellationToken ct)` | src/NoMercy.Service/Hosting/PluginLoader.cs:41 |
| PortManager.EnsurePortAvailable | `public async Task EnsurePortAvailable(int port)` | src/NoMercy.Service/Hosting/PortManager.cs:32 |
| PortManager.FindNextAvailablePort | `public int FindNextAvailablePort(int startPort)` | src/NoMercy.Service/Hosting/PortManager.cs:123 |
| PortManager.IsPortAvailable | `public bool IsPortAvailable(int port)` | src/NoMercy.Service/Hosting/PortManager.cs:139 |
| PortManager.HandlePortInUse | `public async Task<bool> HandlePortInUse(int port, IOException ex)` | src/NoMercy.Service/Hosting/PortManager.cs:159 |
| ServerBootstrapper.RunAsync | `public async Task RunAsync(StartupOptions options)` | src/NoMercy.Service/Hosting/ServerBootstrapper.cs:34 |
| ServerRunner.RunWithHttpsRestart | `public async Task<bool> RunWithHttpsRestart(WebApplication httpHost, StartupOptions options, BootOrchestrator orchestrator)` | src/NoMercy.Service/Hosting/ServerRunner.cs:40 |
| ServerRunner.RunHost | `public async Task<bool> RunHost(WebApplication host)` | src/NoMercy.Service/Hosting/ServerRunner.cs:258 |
| ShutdownCoordinator.RequestShutdown | `public void RequestShutdown()` | src/NoMercy.Service/Hosting/ShutdownCoordinator.cs:30 |
| ShutdownCoordinator.ForceShutdown | `public void ForceShutdown()` | src/NoMercy.Service/Hosting/ShutdownCoordinator.cs:41 |
| StartupAbortException | `public class StartupAbortException : Exception` | src/NoMercy.Service/Hosting/StartupAbortException.cs:14 |
| WebHostFactory.Create | `public static WebApplication Create(StartupOptions options, bool forceHttp = false)` | src/NoMercy.Service/Hosting/WebHostFactory.cs:28 |

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| DatabaseBackupService.BackupRoot | `Path.Combine(AppFiles.DataPath, "backups")` | `Directory.CreateDirectory(BackupRoot)` in BackupNow | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:32, read at :69 |
| DatabaseBackupService.RetainCount | `5` | `int toDelete = existing.Length - RetainCount;` in PruneOldBackups | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:35, read at :132 |
| Backup filename pattern | `$"{dbName}.{timestamp}.db"` where `timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss")` | BackupNow builds `backupPath`; PruneOldBackups globs `Directory.GetFiles(BackupRoot, $"{dbName}.*.db")` | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:72-74, glob at :128 |
| LibrarySeedDto.Order | `public int Order { get; set; } = 99;` | `Order = librarySeedDto.Order` when building `Library` | src/NoMercy.Service/Seeds/Dto/LibrarySeedDto.cs:31, read at src/NoMercy.Service/Seeds/LibrariesSeed.cs:57 |
| ServerUserDtoData.Enabled | `public bool Enabled { get; set; } = true;` | On upsert INSERT only: `AudioTranscoding = serverUser.Enabled, NoTranscoding = serverUser.Enabled, VideoTranscoding = serverUser.Enabled` | src/NoMercy.Service/Seeds/Dto/ServerUserDto.cs:34, read at src/NoMercy.Service/Seeds/ServerUserSyncService.cs:111-113 |
| HostOptions.ShutdownTimeout | `TimeSpan.FromSeconds(10)` | ASP.NET Core host shutdown sequencing (not itself re-read in this slice) | src/NoMercy.Service/Hosting/WebHostFactory.cs:93 |
| ServerRunner host-stop grace window | `TimeSpan.FromSeconds(10)` passed to `httpHost.StopAsync(...)` (two call sites) | `WebApplication.StopAsync` | src/NoMercy.Service/Hosting/ServerRunner.cs:168 and :212 |
| ServerRunner SSO-callback delay | `await Task.Delay(3000);` — fixed 3-second wait before tearing down the HTTP host for the HTTPS restart | inline, no named field | src/NoMercy.Service/Hosting/ServerRunner.cs:191 |
| PortManager port-free wait | loop `for (int i = 0; i < 50; i++) { await Task.Delay(100); ... }` — up to 5s total | `KillAndWaitAsync` | src/NoMercy.Service/Hosting/PortManager.cs:192-197 |
| PortManager.FindNextAvailablePort ceiling | `const int MaxPort = 65535;` | loop bound in `FindNextAvailablePort` | src/NoMercy.Service/Hosting/PortManager.cs:125 |
| Curated migration→table map (self-heal gate) | `["20260416210105_AddEncodingHistoryTable"] = "EncodingHistory", ["20260417010426_AddEncodingPresetTable"] = "EncodingPresets", ["20260417011900_AddContentSegmentTable"] = "ContentSegments"` | `UnstampMigrationsMissingTables` via `GetExpectedTablesPerMigration` | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:631-634, read at :562-611 |

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| "Backup failure is never fatal: a prominent warning is logged and the caller continues with the migration." (class doc) | `BackupNow`'s catch block logs at `LogEventLevel.Warning` and returns `false`; no exception escapes. Matches — confirmed, not a drift. | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:23, catch at :108-116 |
| "Only backs up when there are pending migrations — clean boots (up-to-date schema) are skipped." | `BackupBeforeMigration` returns `false` immediately `if (pendingMigrationCount == 0)`. Matches. | src/NoMercy.Service/Seeds/DatabaseBackupService.cs:21-22, code at :47-48 |
| DatabaseSeeder.Run's doc comment: "Requires the caller to have already run SeedOfflineData... Re-running it here doubled all six sub-seeds ... on every boot for no reason." | `Run` indeed does not call `SeedOfflineData`; the only caller, `ServerBootstrapper.RunAsync`, calls `SeedOfflineData` at :102 before `Run` at :158. Matches — confirmed by tracing the one call site. | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:186-192; caller at src/NoMercy.Service/Hosting/ServerBootstrapper.cs:102,158 |
| UsersSeed doc: "this seed intentionally never re-runs once any user exists locally" | `Init` returns early `if (hasUsers) return;` with no further reconciliation call. Matches. | src/NoMercy.Service/Seeds/UsersSeed.cs:23-29, code at :39-41 |
| EncodingPresetsSeed doc: "Built-ins always seed on every startup" | `Init` has no existence guard — it unconditionally calls `new BuiltinPresetSeeder(context).SeedAsync()` every time `Run`/`SeedOfflineData` executes it. Matches as far as this file goes (internal pruning logic lives in `BuiltinPresetSeeder`, outside this slice — not verified). | src/NoMercy.Service/Seeds/EncodingPresetsSeed.cs:21-26, code at :35 |
| ServerBootstrapper comment on the DI-storage seed call: "Must run AFTER CreateWebApplication so HttpClientProvider is bound to the real IHttpClientFactory (otherwise seed HTTP calls fall back to a bare HttpClient with no registered headers, and MusicBrainz returns 403 for anonymous UAs)." | `DatabaseSeeder.Run(diStorage, dIStorageDriver)` is called at line 158, after `WebHostFactory.Create` builds `app` at line 120 — order matches the stated requirement. | src/NoMercy.Service/Hosting/ServerBootstrapper.cs:152-158 |
| DatabaseSeeder.Migrate SyncMigrationHistory failure path logs `Logger.Setup(..., LogEventLevel.Fatal)` inside an empty `catch` with no `throw` | Despite the "Fatal" level name, the exception is swallowed and the loop continues to the next migration — the process does not stop. This is a naming/severity mismatch, not a functional contradiction of any prose comment, but is worth flagging under Traps too. | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:704-711 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| A migration failure that is neither an "already exists" nor a "FOREIGN KEY constraint failed" `Exception.Message` match propagates **uncaught** out of `Migrate()` → `InitSchema()` → `ServerBootstrapper.RunAsync()`, which wraps none of this in try/catch. There is no `StartupAbortException` here (unlike `PortManager`'s deliberate use of it) — a bad schema init crashes the process with a raw unhandled exception. | Answers "what does a failed schema init do to the start": it is fatal to the boot, but via an unhandled exception rather than the codebase's own `StartupAbortException` convention used elsewhere in this same slice (`PortManager.cs`). | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:504-540 (call site: src/NoMercy.Service/Hosting/ServerBootstrapper.cs:95, no surrounding try/catch) |
| On a genuine FOREIGN KEY constraint failure, the catch block logs violations at `LogEventLevel.Fatal` and then explicitly `throw;`s the original exception — the only catch clause in `Migrate()` that re-raises. | Every other catch in this file (orphan pre-flight, SyncMigrationHistory, per-seed catches) swallows and continues; this is the one path that actually aborts startup, and it's easy to assume (given the sibling swallow-and-log-Fatal pattern below) that "Fatal" always just means "loud log line". | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:525-540 |
| The self-heal step (`UnstampMigrationsMissingTables`) that detects "stamped applied but table missing" migrations only recognizes three hardcoded migration IDs (`AddEncodingHistoryTable`, `AddEncodingPresetTable`, `AddContentSegmentTable`). Any other migration in this half-applied state is treated as "unknown migration ⇒ safe, don't unstamp" and is never repaired. | The self-heal reads as general-purpose from its surrounding doc comment ("Scan the applied list for migrations whose expected tables don't exist and unstamp them"), but it is a curated allow-list that the comment at :626-630 admits "grows as new tables are added" — silently inert for anything not yet added to the list. | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:614-642 |
| Foreign-key orphan cleanup (`ForeignKeyOrphanCleaner.Clean`) only ever runs inside the `pendingMigrations.Count != 0` branch, i.e. only immediately before applying pending migrations. On an up-to-date schema (no pending migrations) it never runs, even though orphaned FK rows could in principle accumulate outside a migration cycle. | A one-line reading of "orphan cleanup runs before migration" could suggest it runs on every boot; it only runs on boots that also have schema changes queued. | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:456-502 |
| Every seed's own catch block (`ConfigSeed`, `EncodingPresetsSeed`, `FolderRootsSeed`, `LibrariesSeed`, `V1DriverBridgeSeed`'s callers, etc.) logs at `LogEventLevel.Fatal` and then simply returns — no rethrow, no process abort, no `StartupAbortException`. Meanwhile the *caller* (`DatabaseSeeder.SeedOfflineData`/`Run`/`SeedAuthData`) wraps each seed delegate in its own try/catch that logs at `LogEventLevel.Warning` on failure — but that outer catch never fires for these seeds because the inner one already swallowed the exception. | "Fatal" reads as boot-ending everywhere else in the codebase's own vocabulary (see the FK-constraint path above, which really does rethrow), but here it is just a log-level choice with no different runtime effect than "Warning" — a maintainer skimming the logs would reasonably expect a Fatal-labeled seed failure to have stopped the server. | src/NoMercy.Service/Seeds/ConfigSeed.cs:48-51; src/NoMercy.Service/Seeds/EncodingPresetsSeed.cs:37-40; src/NoMercy.Service/Seeds/FolderRootsSeed.cs:51-54; src/NoMercy.Service/Seeds/LibrariesSeed.cs:86-89,109-112,130-133 |
| `PortManager.EnsurePortAvailable`: when the blocking process is not a stale `NoMercyMediaServer` instance and this server has **no valid certificate yet** (i.e. not registered), the code does not attempt to free the port at all — it silently reassigns `RuntimeServerSettings.Current.InternalServerPort` to the next free port and returns, leaving the original blocking process running untouched. | The kill/wait logic (`KillAndWaitAsync`) exists and is used for the "stale self" case and is explicitly refused for the "registered, someone else holds the port" case (throws `StartupAbortException`) — but for the third case (unregistered + someone else holds the port) neither kill nor abort happens; the server just quietly moves to a different port without telling the operator anything else is running there. | src/NoMercy.Service/Hosting/PortManager.cs:89-109 |
| `ShutdownCoordinator.ForceShutdown()` calls `Environment.Exit(1)` directly — a hard process kill with none of the graceful `QueueRunner.StopAll()` / `httpHost.StopAsync()` sequencing that `ServerRunner` otherwise takes care to run. | A second Ctrl+C (`_shutdownAttempts >= 2`) bypasses every one of the careful shutdown-ordering comments elsewhere in this slice (e.g. the "stop queue workers before the container goes away" comment in `ServerRunner.cs`) — it's a documented escape hatch, but its abruptness is easy to miss reading only `RequestShutdown`. | src/NoMercy.Service/Hosting/ShutdownCoordinator.cs:41-45, contrast with src/NoMercy.Service/Hosting/ServerRunner.cs:201-211 |
| `WebHostFactory.Create` binds a second, undocumented-outside-comments Kestrel listener on `RuntimeServerSettings.Current.InternalServerPort + 1`, loopback-only, HTTP/1.1-only, purely for Docker's `HEALTHCHECK`. | Anyone reasoning about "the server's port" from `InternalServerPort` alone will miss that the process actually opens two TCP listeners plus a named pipe/Unix socket for IPC — four listen calls total per host build. | src/NoMercy.Service/Hosting/WebHostFactory.cs:172-212 |
| `ServerRunner.RunWithHttpsRestart`, on the "certificate now ready" path, waits a fixed `await Task.Delay(3000);` (3 seconds, no configuration point) purely so a browser can finish receiving the SSO callback response before the whole HTTP host is torn down. | A magic 3-second sleep with no named constant, buried between "certificate ready" logging and the actual host teardown — easy to trip over when reasoning about restart latency. | src/NoMercy.Service/Hosting/ServerRunner.cs:190-191 |
| `WebHostFactory` deliberately excludes `HttpProtocols.Http2` from the main listener (`Http1 | Http3` only), with a lengthy comment explaining that HTTP/2 with Extended CONNECT lets Firefox tunnel SignalR WebSockets over one shared h2 connection, poisoning the whole connection on a single stalled stream. | Turning HTTP/2 back on (an entirely reasonable-looking change to someone who doesn't read the comment) reintroduces an "endless reconnect storm" for Firefox SignalR clients that Chrome traffic would never surface in testing. | src/NoMercy.Service/Hosting/WebHostFactory.cs:151-163 |
| `DatabaseSeeder.InitSchema` calls `Migrate(context)` **and then** `EnsureDatabaseCreated(context)` (`EnsureCreatedAsync()`) for all three contexts (App, Media, Queue), every boot. | EF Core's own guidance treats `Migrate()` and `EnsureCreated()` as mutually exclusive strategies for the same context (`EnsureCreated` bypasses the migrations history entirely); this codebase runs both, unconditionally, on every context on every startup. | src/NoMercy.Service/Seeds/DatabaseSeeder.cs:44-45, 68-69, 73-74, `EnsureDatabaseCreated` at :715-722 |
| `ServerUserSyncService.SyncAsync`'s "self floor check" aborts the *entire* reconcile (no upsert, no revoke) if the upstream response — despite `with_self=true` — omits the local owner's id, but only when a local owner already exists (`localOwnerId.HasValue`). | A malformed/empty upstream payload on a server's very first sync (no local owner yet) sails straight through this guard and is treated as authoritative, while the exact same malformed payload on every later sync is caught and discarded — the safety net has a first-boot gap by design. | src/NoMercy.Service/Seeds/ServerUserSyncService.cs:118-139 |

The Comment-versus-code section is short because most doc comments in this slice describe caller contracts or ordering rationale that traced back cleanly to the single real call site (`ServerBootstrapper.RunAsync`) — each one checked against that call site, not left unverified. The two doc-vs-code entries about `LogEventLevel.Fatal` catch blocks that don't actually abort are reported both there and, more fully, under Traps, since they are less "the comment is wrong" and more "the code's own severity label doesn't mean what it implies elsewhere in the file."
