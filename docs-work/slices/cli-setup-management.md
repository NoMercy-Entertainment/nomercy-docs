# Slice: cli-setup-management
Files given: 29
Files opened: 29

## Files opened
- src/NoMercy.Cli/Commands/ApiRoutes.cs
- src/NoMercy.Cli/Commands/AutoStartCommand.cs
- src/NoMercy.Cli/Commands/ConfigCommand.cs
- src/NoMercy.Cli/Commands/ExitCode.cs
- src/NoMercy.Cli/Commands/LogsCommand.cs
- src/NoMercy.Cli/Commands/PluginCommand.cs
- src/NoMercy.Cli/Commands/QueueCommand.cs
- src/NoMercy.Cli/Commands/ResourcesCommand.cs
- src/NoMercy.Cli/Commands/RestartCommand.cs
- src/NoMercy.Cli/Commands/StartCommand.cs
- src/NoMercy.Cli/Commands/StatusCommand.cs
- src/NoMercy.Cli/Commands/StopCommand.cs
- src/NoMercy.Cli/Commands/UpdateCommand.cs
- src/NoMercy.Setup/Server/ApiKeyLoader.cs
- src/NoMercy.Setup/Server/ApiKeyStore.cs
- src/NoMercy.Setup/Server/Binaries.cs
- src/NoMercy.Setup/Server/BinaryVerification.cs
- src/NoMercy.Setup/Server/ExecutableArchitecture.cs
- src/NoMercy.Setup/Server/IApiKeyLoader.cs
- src/NoMercy.Setup/Server/IApiKeyStore.cs
- src/NoMercy.Setup/Server/ServerUpdateStaging.cs
- src/NoMercy.Setup/Server/SetupEndpoints.cs
- src/NoMercy.Setup/Server/SetupState.cs
- src/NoMercy.Setup/Server/TesseractModelDownloader.cs
- src/NoMercy.Api/Controllers/ManagementController.cs
- docker-compose.yml
- docker-compose.amd.yml
- docker-compose.intel.yml
- docker-compose.nvidia.yml

## Public surface

| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| ApiRoutes.Update | `internal const string Update = ManageBase + "/update";` | src/NoMercy.Cli/Commands/ApiRoutes.cs:22 |
| ApiRoutes.Stop | `internal const string Stop = ManageBase + "/stop";` | src/NoMercy.Cli/Commands/ApiRoutes.cs:23 |
| ApiRoutes.Restart | `internal const string Restart = ManageBase + "/restart";` | src/NoMercy.Cli/Commands/ApiRoutes.cs:24 |
| ApiRoutes.Config | `internal const string Config = ManageBase + "/config";` | src/NoMercy.Cli/Commands/ApiRoutes.cs:25 |
| ApiRoutes.LogsStream | `internal const string LogsStream = ManageBase + "/logs/stream";` | src/NoMercy.Cli/Commands/ApiRoutes.cs:32 |
| ExitCode | `internal enum ExitCode { Success = 0, ConfigurationError = 1, ConnectionError = 2, ServerError = 3, Timeout = 4, }` | src/NoMercy.Cli/Commands/ExitCode.cs:19-26 |
| AutoStartCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/AutoStartCommand.cs:20 |
| ConfigCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/ConfigCommand.cs:21 |
| ConfigCommand.ToSnakeCase | `internal static string ToSnakeCase(string input)` | src/NoMercy.Cli/Commands/ConfigCommand.cs:98 |
| LogsCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/LogsCommand.cs:30 |
| LogsCommand.BuildQuery | `internal static string BuildQuery(int tail, string? level, string? type)` | src/NoMercy.Cli/Commands/LogsCommand.cs:221 |
| PluginCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/PluginCommand.cs:19 |
| QueueCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/QueueCommand.cs:19 |
| ResourcesCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/ResourcesCommand.cs:20 |
| RestartCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/RestartCommand.cs:18 |
| StartCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/StartCommand.cs:22 |
| StatusCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/StatusCommand.cs:19 |
| StatusCommand.DescribeState | `internal static string DescribeState(ConnectivityResponse connectivity)` | src/NoMercy.Cli/Commands/StatusCommand.cs:97 |
| StatusCommand.FormatUptime | `internal static string FormatUptime(TimeSpan uptime)` | src/NoMercy.Cli/Commands/StatusCommand.cs:113 |
| StopCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory)` | src/NoMercy.Cli/Commands/StopCommand.cs:18 |
| UpdateCommand.Create | `public static Command Create(Option<string?> pipeOption, ICliClientFactory clientFactory, Func<string, bool>? startServer = null, Func<ICliClient, CancellationToken, Task<string?>>? awaitVersion = null, Func<ICliClient, CancellationToken, Task<bool>>? awaitExit = null)` | src/NoMercy.Cli/Commands/UpdateCommand.cs:29-35 |
| ApiKeyLoader (public ctor) | `public ApiKeyLoader(IAuthTokenStore authTokenStore, ILogger<ApiKeyLoader> logger, IApiKeyStore apiKeyStore, IStorageDriver storageDriver)` | src/NoMercy.Setup/Server/ApiKeyLoader.cs:35-41 |
| ApiKeyLoader (internal test ctor) | `internal ApiKeyLoader(IAuthTokenStore authTokenStore, ILogger<ApiKeyLoader> logger, IApiKeyStore apiKeyStore, IStorageDriver storageDriver, Func<TimeSpan, CancellationToken, Task>? delay)` | src/NoMercy.Setup/Server/ApiKeyLoader.cs:50-56 |
| ApiKeyLoader.LoadKeys | `public async Task LoadKeys(CancellationToken ct = default)` | src/NoMercy.Setup/Server/ApiKeyLoader.cs:65 |
| IApiKeyLoader.LoadKeys | `Task LoadKeys(CancellationToken ct = default);` | src/NoMercy.Setup/Server/IApiKeyLoader.cs:16 |
| ApiKeyStore.Current | `public static IApiKeyStore Current => _instance ??= new ApiKeyStore();` | src/NoMercy.Setup/Server/ApiKeyStore.cs:21 |
| IApiKeyStore | `public interface IApiKeyStore { string AcousticIdKey { get; } string FanArtApiKey { get; } string FanArtClientKey { get; } string MakeMkvKey { get; } string MusixmatchKey { get; } string OmdbKey { get; } string RottenTomatoes { get; } string TadbKey { get; } string TmdbKey { get; } string TmdbToken { get; } string TvdbKey { get; } bool KeysLoaded { get; } string[] Colors { get; } string Quote { get; } }` | src/NoMercy.Setup/Server/IApiKeyStore.cs:14-30 |
| ServerUpdateStaging.Check | `public static StagingCheck Check(IStorageDriver storageDriver, bool isContainer, string runningVersion, string stagedPath, string serverPath, Func<string, string?> fileVersion)` | src/NoMercy.Setup/Server/ServerUpdateStaging.cs:44-51 |
| ServerUpdateStaging.IsNewer | `public static bool IsNewer(string? candidate, string runningVersion) => candidate is not null && System.Version.TryParse(candidate, out Version? candidateVersion) && System.Version.TryParse(runningVersion, out Version? running) && candidateVersion > running;` | src/NoMercy.Setup/Server/ServerUpdateStaging.cs:85-89 |
| StagingState | `public enum StagingState { ContainerImage, AlreadyStaged, BinaryOnDiskIsNewer, NeedsDownload, }` | src/NoMercy.Setup/Server/ServerUpdateStaging.cs:16-28 |
| StagingCheck | `public sealed record StagingCheck(StagingState State, string? Version = null, string? DiscardedStaleVersion = null);` | src/NoMercy.Setup/Server/ServerUpdateStaging.cs:32-36 |
| ServerUpdateResult | `public enum ServerUpdateResult { Downloaded, AlreadyUpToDate, UseInstaller, UseContainerImage, RestartNeeded, NoAssetFound, }` | src/NoMercy.Setup/Server/Binaries.cs:34-49 |
| Binaries (public ctor) | `public Binaries(IStorageDriver driver, IStorage storage)` | src/NoMercy.Setup/Server/Binaries.cs:81 |
| Binaries (internal test ctor) | `internal Binaries(IStorageDriver driver, IStorage storage, HttpClient httpClient)` | src/NoMercy.Setup/Server/Binaries.cs:103 |
| Binaries.GetOrFetchManifestAsync | `internal async Task<(ReleaseManifest? Manifest, bool SignatureVerified, bool SignaturePresent)> GetOrFetchManifestAsync(string apiUrl, GithubReleaseResponse releaseInfo)` | src/NoMercy.Setup/Server/Binaries.cs:137-141 |
| Binaries.DownloadWithVerificationAsync | `internal async Task<string> DownloadWithVerificationAsync(string apiUrl, string label, Uri downloadUrl, string destPath, GithubReleaseResponse releaseInfo, string assetName, bool enforceSignedManifest, string? expectedSha256Override = null)` | src/NoMercy.Setup/Server/Binaries.cs:232-241 |
| Binaries.ExistsInInstalledDirectory | `internal bool ExistsInInstalledDirectory(string executableName)` | src/NoMercy.Setup/Server/Binaries.cs:459 |
| Binaries.DownloadAll | `public Task DownloadAll()` | src/NoMercy.Setup/Server/Binaries.cs:491 |
| Binaries.CheckLocalVersion | `internal bool CheckLocalVersion(GithubReleaseResponse releaseInfo, string destination, out string version)` | src/NoMercy.Setup/Server/Binaries.cs:574-578 |
| Binaries.GetLatestReleaseInfo | `internal async Task<GithubReleaseResponse> GetLatestReleaseInfo(string apiUrl)` | src/NoMercy.Setup/Server/Binaries.cs:639 |
| Binaries.GetLatestReleaseInfoOlderThan | `internal async Task<GithubReleaseResponse> GetLatestReleaseInfoOlderThan(string latestApiUrl, TimeSpan minAge)` | src/NoMercy.Setup/Server/Binaries.cs:849-852 |
| Binaries.SelectNewestPublishedBefore | `internal static GithubReleaseResponse? SelectNewestPublishedBefore(IEnumerable<GithubReleaseResponse> releases, DateTimeOffset cutoff)` | src/NoMercy.Setup/Server/Binaries.cs:901-904 |
| Binaries.VerifyAssetDigestOrThrow | `internal async Task VerifyAssetDigestOrThrow(string path, Asset? asset, string label)` | src/NoMercy.Setup/Server/Binaries.cs:918 |
| Binaries.DownloadApp | `internal async Task DownloadApp()` | src/NoMercy.Setup/Server/Binaries.cs:941 |
| Binaries.DownloadLauncher | `internal async Task DownloadLauncher()` | src/NoMercy.Setup/Server/Binaries.cs:1037 |
| Binaries.DownloadCli | `internal async Task DownloadCli()` | src/NoMercy.Setup/Server/Binaries.cs:1133 |
| Binaries.DownloadServerUpdate | `public async Task<ServerUpdateResult> DownloadServerUpdate()` | src/NoMercy.Setup/Server/Binaries.cs:1229 |
| Binaries.DownloadFfmpeg | `internal async Task DownloadFfmpeg()` | src/NoMercy.Setup/Server/Binaries.cs:1404 |
| Binaries.ResolveUpstreamSha256Async | `internal async Task<string?> ResolveUpstreamSha256Async(GithubReleaseResponse releaseInfo, string sumsAssetName, string targetAssetName)` | src/NoMercy.Setup/Server/Binaries.cs:1577-1581 |
| Binaries.DownloadYtdlp | `internal async Task DownloadYtdlp()` | src/NoMercy.Setup/Server/Binaries.cs:1608 |
| Binaries.DownloadShakaPackager | `internal async Task DownloadShakaPackager()` | src/NoMercy.Setup/Server/Binaries.cs:1689 |
| Binaries.DownloadCloudflared | `internal async Task DownloadCloudflared()` | src/NoMercy.Setup/Server/Binaries.cs:1757 |
| Binaries.DownloadWhisperModels | `internal async Task DownloadWhisperModels(string modelName = "ggml-large-v3")` | src/NoMercy.Setup/Server/Binaries.cs:1877 |
| Binaries.DownloadStemsplitModel | `internal async Task DownloadStemsplitModel(string modelName = "spleeter-2stems-f16")` | src/NoMercy.Setup/Server/Binaries.cs:1998 |
| Binaries.ConcatenateModelParts | `internal async Task<string> ConcatenateModelParts(string modelName, IEnumerable<string> partPaths)` | src/NoMercy.Setup/Server/Binaries.cs:2053-2056 |
| Binaries.DownloadTesseractData | `internal async Task DownloadTesseractData(IEnumerable<string> languages)` | src/NoMercy.Setup/Server/Binaries.cs:2082 |
| ManifestAsset | `public sealed class ManifestAsset { [JsonProperty("name")] public string Name { get; set; } = string.Empty; [JsonProperty("sha256")] public string Sha256 { get; set; } = string.Empty; [JsonProperty("size")] public long Size { get; set; } }` | src/NoMercy.Setup/Server/BinaryVerification.cs:24-34 |
| ReleaseManifest | `public sealed class ReleaseManifest { [JsonProperty("version")] public string Version { get; set; } = string.Empty; [JsonProperty("commit_sha")] public string CommitSha { get; set; } = string.Empty; [JsonProperty("build_timestamp")] public string BuildTimestamp { get; set; } = string.Empty; [JsonProperty("assets")] public ManifestAsset[] Assets { get; set; } = []; }` | src/NoMercy.Setup/Server/BinaryVerification.cs:39-52 |
| BinaryVerification.VerifyFileSha256Async | `public static async Task<bool> VerifyFileSha256Async(string filePath, string expectedHex, CancellationToken ct = default)` | src/NoMercy.Setup/Server/BinaryVerification.cs:72-76 |
| BinaryVerification.VerifyStreamSha256Async | `public static async Task<bool> VerifyStreamSha256Async(Stream stream, string expectedHex, CancellationToken ct = default)` | src/NoMercy.Setup/Server/BinaryVerification.cs:99-103 |
| BinaryVerification.ExtractSha256FromDigest | `public static string? ExtractSha256FromDigest(string? digest)` | src/NoMercy.Setup/Server/BinaryVerification.cs:120 |
| BinaryVerification.ParseSha256Sums | `public static string? ParseSha256Sums(string sumsContent, string targetFileName)` | src/NoMercy.Setup/Server/BinaryVerification.cs:138 |
| BinaryVerification.VerifyManifestSignature (public) | `public static bool VerifyManifestSignature(string manifestJson, string armoredSignature)` | src/NoMercy.Setup/Server/BinaryVerification.cs:168 |
| BinaryVerification.VerifyManifestSignature (internal, keyed) | `internal static bool VerifyManifestSignature(string manifestJson, string armoredSignature, string armoredPublicKey)` | src/NoMercy.Setup/Server/BinaryVerification.cs:189-193 |
| ExecutableArchitecture.Read | `public static Architecture? Read(Stream stream)` | src/NoMercy.Setup/Server/ExecutableArchitecture.cs:37 |
| ExecutableArchitecture.MatchesProcess | `public static bool MatchesProcess(Stream stream)` | src/NoMercy.Setup/Server/ExecutableArchitecture.cs:61 |
| SetupPhase | `public enum SetupPhase { Unauthenticated, Authenticating, Authenticated, Registering, Registered, CertificateAcquired, Failed, Complete, }` | src/NoMercy.Setup/Server/SetupState.cs:17-34 |
| SetupState.IsSetupRequired | `public bool IsSetupRequired => CurrentPhase < SetupPhase.Complete;` | src/NoMercy.Setup/Server/SetupState.cs:87 |
| SetupState.IsAuthenticated | `public bool IsAuthenticated => CurrentPhase >= SetupPhase.Authenticated;` | src/NoMercy.Setup/Server/SetupState.cs:89 |
| SetupState.WaitForChangeAsync | `public Task WaitForChangeAsync(CancellationToken cancellationToken = default)` | src/NoMercy.Setup/Server/SetupState.cs:91 |
| SetupState.WaitForSetupCompleteAsync | `public Task WaitForSetupCompleteAsync(CancellationToken cancellationToken = default)` | src/NoMercy.Setup/Server/SetupState.cs:102 |
| SetupState.WaitForPhaseAsync | `public async Task WaitForPhaseAsync(SetupPhase targetPhase, CancellationToken cancellationToken = default)` | src/NoMercy.Setup/Server/SetupState.cs:115-118 |
| SetupState.WaitForTerminalPhaseAsync | `public async Task WaitForTerminalPhaseAsync(CancellationToken cancellationToken = default)` | src/NoMercy.Setup/Server/SetupState.cs:140 |
| SetupState.TransitionTo | `public bool TransitionTo(SetupPhase targetPhase)` | src/NoMercy.Setup/Server/SetupState.cs:154 |
| SetupState.DetermineInitialPhase | `public SetupPhase DetermineInitialPhase(bool hasValidToken, bool isRegistered = true)` | src/NoMercy.Setup/Server/SetupState.cs:289 |
| SetupState.IsValidTransition | `internal static bool IsValidTransition(SetupPhase from, SetupPhase to)` | src/NoMercy.Setup/Server/SetupState.cs:247 |
| TesseractModelDownloader (ctor) | `public class TesseractModelDownloader(IStorageDriver driver, IStorage storage, HttpClient httpClient) : ITesseractModelDownloader` | src/NoMercy.Setup/Server/TesseractModelDownloader.cs:33-37 |
| TesseractModelDownloader.DownloadVerifiedAsync | `public async Task<Stream> DownloadVerifiedAsync(string language, CancellationToken ct)` | src/NoMercy.Setup/Server/TesseractModelDownloader.cs:92 |
| SetupEndpoints (ctor) | `public SetupEndpoints(SetupState state, AuthManager authManager, IServerRegistrationService serverRegistrationService, IHttpClientFactory httpClientFactory, IHostApplicationLifetime appLifetime)` | src/NoMercy.Setup/Server/SetupEndpoints.cs:56-62 |
| SetupEndpoints.HandleRequestAsync | `public async Task HandleRequestAsync(HttpContext context)` | src/NoMercy.Setup/Server/SetupEndpoints.cs:80 |
| SetupEndpoints.BuildCallbackHtml | `internal static string BuildCallbackHtml(string title, string message, bool isError = false)` | src/NoMercy.Setup/Server/SetupEndpoints.cs:1101 |
| SetupEndpoints.BuildRedirectUri | `internal static string BuildRedirectUri(HttpRequest request)` | src/NoMercy.Setup/Server/SetupEndpoints.cs:1152 |
| ManagementController (route) | `[Route("manage")] [AllowAnonymous] [LocalhostOnly] public class ManagementController(ILogger<ManagementController> logger, ResourceMonitor resourceMonitor, IHostApplicationLifetime appLifetime, IServerConfigurationRepository serverConfiguration, QueueRunner queueRunner, IPluginManager pluginManager, AppProcessManager appProcessManager, SetupState setupState, INetworkDiscovery networkDiscovery, ISessionManager sessionManager, IStorageDriver storageDriver, IStorage storage, IQueueTaskRepository queueTaskRepository, IBootStatus bootStatus, IUpdateStatus updateStatus, IConnectivityManager connectivityManager, IConnectivityStatus connectivityStatus, RuntimeServerSettings runtimeSettings) : BaseController` | src/NoMercy.Api/Controllers/ManagementController.cs:40-64 |
| ManagementController.GetStatus | `[HttpGet("status")] public async Task<IActionResult> GetStatus()` | src/NoMercy.Api/Controllers/ManagementController.cs:66-68 |
| ManagementController.GetLogs | `[HttpGet("logs")] public async Task<IActionResult> GetLogs([FromQuery] int tail = 100, [FromQuery] string? types = null, [FromQuery] string? levels = null)` | src/NoMercy.Api/Controllers/ManagementController.cs:113-119 |
| ManagementController.StreamLogs | `[HttpGet("logs/stream")] public async Task StreamLogs([FromQuery] int backfill = 50, CancellationToken cancellationToken = default)` | src/NoMercy.Api/Controllers/ManagementController.cs:155-159 |
| ManagementController.GetActivity | `[HttpGet("activity")] public IActionResult GetActivity()` | src/NoMercy.Api/Controllers/ManagementController.cs:211-213 |
| ManagementController.Stop | `[HttpPost("stop")] public IActionResult Stop()` | src/NoMercy.Api/Controllers/ManagementController.cs:236-237 |
| ManagementController.Restart | `[HttpPost("restart")] public IActionResult Restart()` | src/NoMercy.Api/Controllers/ManagementController.cs:243-244 |
| ManagementController.DownloadUpdate | `[HttpPost("update")] public async Task<IActionResult> DownloadUpdate()` | src/NoMercy.Api/Controllers/ManagementController.cs:250-253 |
| ManagementController.StagedResponse | `private IActionResult? StagedResponse(StagingCheck check, string tempPath)` | src/NoMercy.Api/Controllers/ManagementController.cs:294 |
| ManagementController.DownloadedResponse | `private IActionResult DownloadedResponse(ServerUpdateResult result, string tempPath)` | src/NoMercy.Api/Controllers/ManagementController.cs:329 |
| ManagementController.GetAutoStart | `[HttpGet("autostart")] public IActionResult GetAutoStart()` | src/NoMercy.Api/Controllers/ManagementController.cs:406-408 |
| ManagementController.SetAutoStart | `[HttpPost("autostart")] public IActionResult SetAutoStart([FromBody] AutoStartDto request)` | src/NoMercy.Api/Controllers/ManagementController.cs:413-415 |
| ManagementController.GetConfig | `[HttpGet("config")] public async Task<IActionResult> GetConfig()` | src/NoMercy.Api/Controllers/ManagementController.cs:425-427 |
| ManagementController.UpdateConfig | `[HttpPut("config")] public async Task<IActionResult> UpdateConfig([FromBody] ManagementConfigUpdateDto request)` | src/NoMercy.Api/Controllers/ManagementController.cs:476-478 |
| ManagementController.GetPlugins | `[HttpGet("plugins")] public IActionResult GetPlugins()` | src/NoMercy.Api/Controllers/ManagementController.cs:525-527 |
| ManagementController.GetQueueStatus | `[HttpGet("queue")] public async Task<IActionResult> GetQueueStatus()` | src/NoMercy.Api/Controllers/ManagementController.cs:545-547 |
| ManagementController.GetResources | `[HttpGet("resources")] public IActionResult GetResources()` | src/NoMercy.Api/Controllers/ManagementController.cs:574-576 |
| ManagementController.GetAppStatus | `[HttpGet("app/status")] public IActionResult GetAppStatus()` | src/NoMercy.Api/Controllers/ManagementController.cs:599-601 |
| ManagementController.StartApp | `[HttpPost("app/start")] public IActionResult StartApp()` | src/NoMercy.Api/Controllers/ManagementController.cs:612-616 |
| ManagementController.StopApp | `[HttpPost("app/stop")] public IActionResult StopApp()` | src/NoMercy.Api/Controllers/ManagementController.cs:629-631 |
| docker-compose.yml service | `image: ghcr.io/nomercy-entertainment/nomercymediaserver:latest` | docker-compose.yml:19 |
| docker-compose.amd.yml service | `image: ghcr.io/nomercy-entertainment/nomercymediaserver:amd` | docker-compose.amd.yml:22 |
| docker-compose.intel.yml service | `image: ghcr.io/nomercy-entertainment/nomercymediaserver:intel` | docker-compose.intel.yml:22 |
| docker-compose.nvidia.yml service | `image: ghcr.io/nomercy-entertainment/nomercymediaserver:nvidia` | docker-compose.nvidia.yml:21 |

## Literal defaults

| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| HTTP client timeout for binary downloads | `Timeout = TimeSpan.FromMinutes(10)` | `Binaries` ctor, used by every `Download*` call | src/NoMercy.Setup/Server/Binaries.cs:91 |
| Third-party release age gate | `private static readonly TimeSpan ThirdPartyMinReleaseAge = TimeSpan.FromDays(14);` | `DownloadYtdlp`, `DownloadShakaPackager`, `DownloadCloudflared` | src/NoMercy.Setup/Server/Binaries.cs:79 |
| GitHub rate-limit retry cap | `private const int MaxRateLimitedAttempts = 3;` | `FetchLatestReleaseInfoUncachedAsync` via `ExceedsRateLimitBudget` | src/NoMercy.Setup/Server/Binaries.cs:622 |
| GitHub rate-limit max wait | `private static readonly TimeSpan MaxRateLimitWait = TimeSpan.FromMinutes(2);` | `ExceedsRateLimitBudget` | src/NoMercy.Setup/Server/Binaries.cs:623 |
| Rate-limit backoff start | `TimeSpan backoff = TimeSpan.FromSeconds(30);` (doubles, capped at 600s) | `FetchLatestReleaseInfoUncachedAsync` | src/NoMercy.Setup/Server/Binaries.cs:657, 684 |
| Staged-file readiness retry | `for (int attempt = 0; attempt < 5; attempt++)` with `await Task.Delay(1000)` | `DownloadServerUpdate` | src/NoMercy.Setup/Server/Binaries.cs:1364-1376 |
| Whisper model default name | `internal async Task DownloadWhisperModels(string modelName = "ggml-large-v3")` | `DownloadAll` (via `AppFiles.WhisperModel`, not opened) | src/NoMercy.Setup/Server/Binaries.cs:1877 |
| Stemsplit model default name | `internal async Task DownloadStemsplitModel(string modelName = "spleeter-2stems-f16")` | `DownloadAll` (via `AppFiles.StemsplitModel`, not opened) | src/NoMercy.Setup/Server/Binaries.cs:1998 |
| Tesseract languages always fetched | `List<string> tesseractLanguages = ["eng", "jpn"];` | `DownloadAll` | src/NoMercy.Setup/Server/Binaries.cs:519 |
| API-key background refresh backoff ladder | `private static readonly int[] BackoffSeconds = [30, 60, 300, 900, 1800];` | `StartBackgroundRefresh` | src/NoMercy.Setup/Server/ApiKeyLoader.cs:30 |
| Stale API-key-cache warning threshold | `(DateTime.UtcNow - cachedAtDate.Value).TotalDays > 30` | `LoadKeys` | src/NoMercy.Setup/Server/ApiKeyLoader.cs:103 |
| CLI update: version-poll timeout | `WaitForServerVersionAsync(client, TimeSpan.FromMinutes(2), ct)` | `UpdateCommand.Create` default `awaitVersion` | src/NoMercy.Cli/Commands/UpdateCommand.cs:38-39 |
| CLI update: exit-poll timeout | `WaitForServerExitAsync(client, TimeSpan.FromSeconds(60), ct)` | `UpdateCommand.Create` default `awaitExit` | src/NoMercy.Cli/Commands/UpdateCommand.cs:44 |
| CLI update: exit-poll interval | `await Task.Delay(500, cts.Token);` | `WaitForServerExitAsync` | src/NoMercy.Cli/Commands/UpdateCommand.cs:203 |
| CLI update: version-poll interval | `await Task.Delay(2000, cts.Token);` | `WaitForServerVersionAsync` | src/NoMercy.Cli/Commands/UpdateCommand.cs:321 |
| CLI logs: tail count | `DefaultValueFactory = _ => 100,` | `LogsCommand.Create` (`--tail`/`-n`) | src/NoMercy.Cli/Commands/LogsCommand.cs:32-36 |
| CLI logs: follow flag | `DefaultValueFactory = _ => false,` | `LogsCommand.Create` (`--follow`/`-f`) | src/NoMercy.Cli/Commands/LogsCommand.cs:38-42 |
| Management API: log backfill count | `[FromQuery] int backfill = 50` | `ManagementController.StreamLogs` | src/NoMercy.Api/Controllers/ManagementController.cs:157 |
| Management API: log tail count | `[FromQuery] int tail = 100` | `ManagementController.GetLogs` | src/NoMercy.Api/Controllers/ManagementController.cs:116 |
| Management API: SSE log channel capacity | `Channel.CreateBounded<LogEntry>(new BoundedChannelOptions(500) { FullMode = BoundedChannelFullMode.DropOldest, ... })` | `ManagementController.StreamLogs` | src/NoMercy.Api/Controllers/ManagementController.cs:168-175 |
| Post-auth registration overall timeout | `using CancellationTokenSource registrationTimeoutCts = new(TimeSpan.FromMinutes(10));` | `SetupEndpoints.RunPostAuthRegistration` | src/NoMercy.Setup/Server/SetupEndpoints.cs:869 |
| Database-ready wait timeout | `using CancellationTokenSource dbTimeoutCts = new(TimeSpan.FromSeconds(30));` | `SetupEndpoints.RunPostAuthRegistration` | src/NoMercy.Setup/Server/SetupEndpoints.cs:844 |
| Device-code poll interval clamp | `int intervalSec = Math.Clamp(deviceData.Interval, 1, 30);` | `SetupEndpoints.PollDeviceGrant` | src/NoMercy.Setup/Server/SetupEndpoints.cs:956 |
| Device-code poll: max consecutive transient failures | `const int maxConsecutiveTransientFailures = 5;` | `SetupEndpoints.PollDeviceGrant` | src/NoMercy.Setup/Server/SetupEndpoints.cs:964 |
| QR code error-correction level | `generator.CreateQrCode(url, QRCodeGenerator.ECCLevel.L)` | `SetupEndpoints.GenerateQrPng` | src/NoMercy.Setup/Server/SetupEndpoints.cs:1181 |
| Docker: exposed/internal port | `ports: - "7626:7626"` | all 4 compose files | docker-compose.yml:26; docker-compose.amd.yml:29; docker-compose.intel.yml:29; docker-compose.nvidia.yml:28 |
| Docker: healthcheck target port | `test: ["CMD", "curl", "-f", "http://127.0.0.1:7627/health"]` | all 4 compose files | docker-compose.yml:52; docker-compose.amd.yml:72; docker-compose.intel.yml:69; docker-compose.nvidia.yml:67 |
| Docker: healthcheck cadence | `interval: 30s / timeout: 10s / retries: 3 / start_period: 60s` | all 4 compose files | docker-compose.yml:53-56 (and equivalents) |
| Docker: default PUID/PGID | `PUID=1000` / `PGID=1000` | all 4 compose files | docker-compose.yml:42-43 (and equivalents) |
| Docker: TZ | `TZ=UTC` | all 4 compose files | docker-compose.yml:41 (and equivalents) |
| Docker CPU-only: memory limits | `limits: memory: 4G` / `reservations: memory: 512M` | docker-compose.yml | docker-compose.yml:59-63 |
| Docker AMD: memory limits | `limits: memory: 4G` / `reservations: memory: 512M` | docker-compose.amd.yml | docker-compose.amd.yml:65-70 |
| Docker Intel: memory limits | `limits: memory: 4G` / `reservations: memory: 512M` | docker-compose.intel.yml | docker-compose.intel.yml:62-67 |
| Docker NVIDIA: memory limits | `limits: memory: 8G` / `reservations: memory: 1G` | docker-compose.nvidia.yml | docker-compose.nvidia.yml:56-65 |

## Comment versus code

| Claim in the comment | What the code does | File:line |
|---|---|---|
| `UpdateCommand`'s own `Command` description says `"Download and stage a server update"` | The same command also stops the running server, swaps the binary (keeping a `.previous` backup), starts the new one, waits up to 2 minutes for it to report its version, and rolls back automatically on any failure — not just download-and-stage. This is the same drift `docs-work/toolchain.md` already flagged against `nomercy-media-server/en/cli/update.mdx` ("update only downloads and stages, restart applies it") — confirmed here directly against the CLI's own description string, not just the doc page. | src/NoMercy.Cli/Commands/UpdateCommand.cs:46 vs :102-178 |
| `ServerUpdateStaging`'s class doc says it "Decides what an on-demand server update has to do **before anything is downloaded**." | That is true only for the `ManagementController.DownloadUpdate` HTTP path, which calls `ServerUpdateStaging.Check` first. `Binaries.DownloadServerUpdate` — the method the check is supposed to gate — never calls `ServerUpdateStaging.Check` itself; it re-implements its own, separate "already up to date" / "restart needed" / "use installer" / "use container image" decision inline (version-string compare, `Screen.IsDocker`, `NOMERCY_INSTALL_DIR`, on-disk version). The two decision paths are independent and can disagree if their inputs ever drift apart. | src/NoMercy.Setup/Server/ServerUpdateStaging.cs:38-40 vs src/NoMercy.Setup/Server/Binaries.cs:1229-1291 vs src/NoMercy.Api/Controllers/ManagementController.cs:259-283 |
| `ManagementController.Restart()`'s route/name implies the server is restarted | The method body is identical to `Stop()`: it only calls `appLifetime.StopApplication()`. Nothing in this controller relaunches the process — an actual restart depends entirely on an external supervisor (systemd/launchd/Windows service restart policy, or Docker's `restart: unless-stopped`) bringing the process back up. | src/NoMercy.Api/Controllers/ManagementController.cs:243-248 |
| Docker compose comment: "The app stores all data under `$HOME/.local/share/NoMercy/`" | The volume mount target is `/data/.local/share/NoMercy` (container path), not `$HOME/.local/share/NoMercy` — the comment describes the host-side convention, not the literal mount path shown two lines below it; a reader could paste the comment's path and mount the wrong location. | docker-compose.yml:29-30 (and equivalents in amd/intel/nvidia) |

## Traps

| Behavior | Why it surprises | File:line |
|---|---|---|
| Two independent "is an update needed" implementations | `ManagementController.DownloadUpdate` runs `ServerUpdateStaging.Check` first (container/staged/on-disk-newer/needs-download), then unconditionally calls `Binaries.DownloadServerUpdate()`, which re-derives the same kind of decision from scratch (its own version-string compare, its own `Screen.IsDocker` and `NOMERCY_INSTALL_DIR` checks) using `GetLatestReleaseInfo` again. Neither shares state with the other's `StagingCheck`. A future change to one without the other silently reintroduces the exact bug `ServerUpdateStaging`'s own comment warns about (a stale staged file "answering ok forever"). | src/NoMercy.Api/Controllers/ManagementController.cs:259-283; src/NoMercy.Setup/Server/Binaries.cs:1229-1291; src/NoMercy.Setup/Server/ServerUpdateStaging.cs:53-83 |
| Docker healthcheck probes a port nothing in the C# source binds | All four compose files curl `http://127.0.0.1:7627/health` while the exposed/configured server port is `7626` everywhere else in the same files (and in every `NOMERCY_INTERNAL_PORT`/`NOMERCY_EXTERNAL_PORT` comment). A repo-wide search of `src/` for `7627` finds nothing — no controller, middleware, or config binds that port. As written, the healthcheck can never succeed against this port unless something outside this slice listens on 7627. | docker-compose.yml:52; docker-compose.amd.yml:72; docker-compose.intel.yml:69; docker-compose.nvidia.yml:67 |
| CLI's `config get` prints fields the Management API doesn't return under those names | `ConfigCommand`'s `get` subcommand prints `Queue Workers`, `Data Workers`, and `Request Workers` from its `ConfigResponse` model (not in this slice). `ManagementController.GetConfig`/`ManagementConfigDto` (the actual server-side source for that data) only exposes `LibraryWorkers`, `ImportWorkers`, `ExtrasWorkers`, `EncoderWorkers`, `CronWorkers`, `ImageWorkers`, `FileWorkers`, `MusicWorkers` — there is no `QueueWorkers`/`DataWorkers`/`RequestWorkers` property anywhere in this controller. Those three CLI output lines cannot be populated by this endpoint. | src/NoMercy.Cli/Commands/ConfigCommand.cs:41-51 vs src/NoMercy.Api/Controllers/ManagementController.cs:425-448 |
| Duplicate dictionary keys in `AlternateLanguageCodes` | `["dut"] = "nld"` is set twice (once directly, once via `["nld"] = "dut"`'s pair) and `["ger"] = "deu"` is set twice, at lines 71/77 and 75/79 respectively. C#'s indexer-initializer syntax (`[key] = value`) compiles to a plain indexer assignment, not `Dictionary.Add`, so duplicate keys silently overwrite instead of throwing at startup — the redundancy compiles clean and only differing values would have surfaced as a bug, so this is a live landmine for the next edit to this table. | src/NoMercy.Setup/Server/TesseractModelDownloader.cs:61-90 (specifically 71 & 77, 74-75 & 79) |
| `StartCommand`'s dev-binary search can silently miss the built server | `CreateDevBinaryStartInfo` builds the TFM folder name from the **CLI's own** `Environment.Version.Major/Minor` (e.g. the `nomercy` CLI's runtime version), not the server project's actual target framework. If the CLI and `NoMercy.Service` ever target different TFMs, this path never matches and `nomercy start` silently falls through to `dotnet run --project ...` instead of launching the already-built binary. | src/NoMercy.Cli/Commands/StartCommand.cs:148-181 |
| `Binaries.DownloadServerUpdate` bypasses `ServerUpdateStaging`'s own stale-file cleanup | `ServerUpdateStaging.Check` deletes a stale staged file it finds not-newer-than-running before returning `NeedsDownload` (line 74). `DownloadServerUpdate`'s own separate check never does this cleanup — it only calls `Downloader.DeleteSourceDownload(_storage, AppFiles.ServerTempExePath)` unconditionally right before downloading (line 1295), so the two code paths reach a similar end state through entirely different logic, and a caller invoking `Binaries.DownloadServerUpdate()` directly (skipping `ManagementController`) never benefits from `ServerUpdateStaging`'s discard-and-log behavior at all. | src/NoMercy.Setup/Server/ServerUpdateStaging.cs:64-76 vs src/NoMercy.Setup/Server/Binaries.cs:1295 |
| `SetError` inside `SetPhase`-adjacent flows can be immediately erased | `TransitionTo` unconditionally clears `_errorMessage` (`_errorMessage = null;`) on every call, including "no-op" self-transitions like `(Authenticated, Authenticated)`. Any caller that calls `SetError` and then, even indirectly, calls `TransitionTo` again with the same phase will silently wipe the message it just set — callers throughout `SetupEndpoints` work around this by carefully ordering `TransitionTo` before `SetError`, but nothing enforces that ordering, and it is not documented on `TransitionTo` itself. | src/NoMercy.Setup/Server/SetupState.cs:154-191 (clear at 169) |
| Only `expired_token` and `authorization_pending` are treated as "not fatal" in device-code polling | Any other Keycloak `error` value (line 1039) — not just genuine hard failures — immediately transitions setup to `Unauthenticated` and surfaces a raw `error_description` from Keycloak to the end user, e.g. a future new RFC 8628 error code Keycloak adds would be treated as fatal even if it is meant to be retried, since only `slow_down`, `expired_token`, and `authorization_pending` are special-cased. | src/NoMercy.Setup/Server/SetupEndpoints.cs:1025-1045 |

Empty-section note: none of the four tables above came back empty, so no "checked and found nothing" note is needed for this slice.
