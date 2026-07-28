// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

package docs.examples

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import tv.nomercy.player.core.media.PlaylistItem
import tv.nomercy.player.core.ports.ExoPlayerVideoBackend
import tv.nomercy.player.video.NMVideoPlayer
import tv.nomercy.player.video.ui.NMVideoPlayerView
import tv.nomercy.player.video.ui.VideoSurface

// Sixty seconds: one engine, one player, one view.
//
// NMVideoPlayerView reads the device it is on and mounts the touch chrome or
// the focus chrome accordingly, so the same call is a phone player and a
// television player with different hands on it.
@Composable
fun QuickstartPlayer() {
    val context = LocalContext.current
    val backend: ExoPlayerVideoBackend = remember { ExoPlayerVideoBackend(context) }
    val player: NMVideoPlayer = remember { NMVideoPlayer(backend) }

    LaunchedEffect(player) {
        player.setup()
        player.queue(catalogue)
    }

    NMVideoPlayerView(
        player = player,
        modifier = Modifier.fillMaxSize(),
        surface = VideoSurface(backend),
    )
}

// Item paths stay relative and baseUrl carries the environment, exactly as the
// media server sends them. One config value moves the whole catalogue between a
// laptop, a LAN box and a hosted server.
private data class Episode(
    override val id: String,
    override val url: String,
    override val title: String?,
) : PlaylistItem

private val catalogue: List<Episode> = listOf(
    Episode(
        id = "big-buck-bunny",
        url = "/videos/big-buck-bunny/master.m3u8",
        title = "Big Buck Bunny",
    ),
)
