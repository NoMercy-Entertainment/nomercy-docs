import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	playlist: [sintel],
};

/**
 * Audio track picker for the Audio Tracks tour page: one button per entry in
 * `audioTracks()`, the one `audioTrack()` reports marked, a click switching
 * with `audioTrack(index)`. Rebuilt on `audioTracks` (the manifest parsed)
 * and on `audioTrack` (the selection changed).
 */
class AudioTrackPickerPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'nm-tour-audio-tracks';
	static override readonly description = 'Audio track picker for the Audio Tracks tour page.';

	private row!: HTMLDivElement;

	override use(): void {
		this.row = this.createElement('div', 'nm-tour-audio-tracks')
			.addClasses(['absolute', 'inset-x-0', 'top-0', 'flex', 'items-center', 'gap-1.5', 'p-2', 'bg-gradient-to-b', 'from-black/80', 'to-transparent', 'overflow-x-auto', '[scrollbar-width:none]', 'text-xs', 'sm:text-sm', 'text-white'])
			.appendTo(this.mount('overlay'))
			.get();

		this.on('audioTracks', () => this.render());
		this.on('audioTrack', () => this.render());
		this.render();
	}

	private render(): void {
		const tracks = this.player.audioTracks();
		const current = this.player.audioTrack();
		if (!tracks.length) {
			this.row.textContent = 'Waiting for the manifest…';
			return;
		}
		this.row.replaceChildren(...tracks.map((track, index) => {
			const button = this.createButton(`nm-tour-audio-${index}`, track.label, () => void this.player.audioTrack(index));
			const active = current?.index === index;
			button.textContent = track.language ? `${track.label} (${track.language})` : track.label;
			button.setAttribute('aria-pressed', String(active));
			this.addClasses(button, ['shrink-0', 'rounded-full', 'px-2.5', 'py-0.5', active ? 'bg-white' : 'bg-white/15', active ? 'text-black' : 'text-white']);
			return button;
		}));
	}
}

function configure(player: NMVideoPlayer): void {
	player.addPlugin(AudioTrackPickerPlugin);
}

export default { config, configure };
