// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

package docs.examples

import tv.nomercy.player.core.events.CoreEvents
import tv.nomercy.player.core.events.EventKey
import tv.nomercy.player.core.plugin.Plugin
import tv.nomercy.player.core.plugin.PluginManifest

// A plugin, whole.
//
// Four things separate one from a listener: the manifest the registry validates
// before your code runs, an event registry of your own so consumers subscribe
// to a key rather than a string, this.on and this.emit so the listener is
// removed with the plugin and the event lands under your namespace, and t() so
// what a person reads is in their language.
class WatchCountPlugin : Plugin<WatchCountOptions>() {

    companion object Manifest : PluginManifest {
        override val id: String = "watch-count"
        override val version: String = "1.0.0"
    }

    override val manifest: PluginManifest get() = Manifest

    override val options: WatchCountOptions get() = WatchCountOptions()

    var tally: Int = 0
        private set

    override fun use() {
        // this.on, not player.on. This listener is removed when the plugin goes
        // away, and it stops firing while the plugin is disabled without being
        // unregistered.
        on(CoreEvents.Play) {
            tally += 1
            if (tally % (resolvedOptions?.announceEvery ?: 1) == 0) {
                // this.emit sends under plugin:watch-count:, where a plugin
                // listening for your event will find it.
                emit(WatchCountEvents.Changed, WatchCount(tally))
            }
        }
    }
}

object WatchCountEvents {
    val Changed: EventKey<WatchCount> = EventKey("plugin:watch-count:changed")
}

data class WatchCount(val plays: Int)

data class WatchCountOptions(val announceEvery: Int = 1)
