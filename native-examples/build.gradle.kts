import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    kotlin("multiplatform") version "2.2.21"
    id("com.android.kotlin.multiplatform.library") version "9.0.1"
    id("org.jetbrains.compose") version "1.11.1"
    id("org.jetbrains.kotlin.plugin.compose") version "2.2.21"
}

repositories {
    // mavenLocal first, because before a release that is where the artifacts
    // are. After one, Central serves the same coordinates and this still works.
    mavenLocal()
    mavenCentral()
    google()
}

// The sources are the docs' own, not a copy.
//
// A second copy of a snippet is a snippet that compiles and a page that shows
// something else, which is the exact failure the whole runnable-snippet system
// exists to prevent. This points at src/examples-kmp and compiles what the
// pages render.
kotlin {
    androidLibrary {
        namespace = "tv.nomercy.docs.examples"
        compileSdk = 36
        minSdk = 29

        compilations.configureEach {
            compileTaskProvider.configure {
                compilerOptions { jvmTarget.set(JvmTarget.JVM_21) }
            }
        }
    }

    sourceSets {
        androidMain {
            kotlin.srcDir("../src/examples-kmp")
            dependencies {
                implementation("tv.nomercy:nomercy-video-player-kmp:2.0.0-rc.1")
                implementation("tv.nomercy:nomercy-video-player-compose:2.0.0-rc.1")
                implementation("tv.nomercy:nomercy-music-player-kmp:2.0.0-rc.1")
                implementation("tv.nomercy:nomercy-music-player-compose:2.0.0-rc.1")
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.ui)
            }
        }
    }
}
