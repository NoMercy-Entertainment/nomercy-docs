// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import AVFoundation
import SwiftUI
import NoMercyPlayer

// Sixty seconds: an engine, the facade, the view.
//
// NMVideoChromeView draws the controls. EngineVideoPlayer is the projection it
// observes, and it forwards everything to whatever conforms to VideoEngine.
// That last protocol is seven members, which is the whole surface a player has
// to answer for a full chrome to work over it.
struct QuickstartScreen: View {

    @StateObject private var player = EngineVideoPlayer(engine: AVFoundationEngine())

    var body: some View {
        NMVideoChromeView(
            player: player,
            title: "Big Buck Bunny",
            subtitle: "Peach Open Movie Project"
        )
        .ignoresSafeArea()
    }
}

// The half you write, over AVFoundation.
//
// Nothing here decides what plays. It reports what AVPlayer is doing and passes
// on what the viewer pressed, which is the whole contract: the moment a
// playback rule lives here it is a rule the Compose chrome does not have, and
// the two clients start disagreeing.
@MainActor
final class AVFoundationEngine: VideoEngine {

    let avPlayer: AVPlayer

    private var onState: ((VideoEngineState) -> Void)?
    private var ticker: Any?

    init() {
        // Paths stay relative to a base you configure, exactly as the media
        // server sends them. One value moves the whole catalogue between a
        // laptop, a LAN box and a hosted server.
        let url = URL(string: "https://demo.nomercy.tv/videos/big-buck-bunny/master.m3u8")!
        avPlayer = AVPlayer(url: url)
    }

    // Called with the current state first, not only with changes. A chrome that
    // saw only changes would draw an empty player until something moved.
    func observe(_ onState: @escaping (VideoEngineState) -> Void) {
        self.onState = onState
        publish()

        ticker = avPlayer.addPeriodicTimeObserver(
            forInterval: CMTime(seconds: 0.25, preferredTimescale: 600),
            queue: .main
        ) { [weak self] _ in
            self?.publish()
        }
    }

    func play() {
        avPlayer.play()
        publish()
    }

    func pause() {
        avPlayer.pause()
        publish()
    }

    func seek(to seconds: Double) {
        avPlayer.seek(to: CMTime(seconds: seconds, preferredTimescale: 600))
    }

    // A player with no ladder and no sidecar tracks answers these by doing
    // nothing, and the menus it has nothing to offer for are simply empty.
    func selectQuality(_ option: QualityOption?) {}
    func selectAudio(_ option: TrackOption) {}
    func selectSubtitle(_ option: TrackOption?) {}

    private func publish() {
        var state = VideoEngineState()
        state.playing = avPlayer.timeControlStatus == .playing
        state.currentTime = avPlayer.currentTime().seconds
        state.duration = avPlayer.currentItem?.duration.seconds ?? 0
        onState?(state)
    }
}
