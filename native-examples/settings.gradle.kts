// The docs' Kotlin snippets, compiled.
//
// A separate build rather than a module of anything: it resolves the published
// coordinates the way a reader does, so a snippet that only compiles against a
// source checkout fails here rather than in somebody's editor.
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}

rootProject.name = "docs-examples-kmp"
