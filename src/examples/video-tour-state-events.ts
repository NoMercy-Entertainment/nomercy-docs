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
 * State readout for the Playback State & Events tour page. `playState()` and
 * `time()` are read on the events that change them, with no poll: play,
 * pause and seek in the native bar and watch the line follow.
 */
class StateReadoutPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'nm-tour-state-events';
	static override readonly description = 'Event-driven state readout for the Playback State & Events tour page.';

	private readout!: HTMLDivElement;
	private last = '';

	override use(): void {
		this.readout = this.createElement('div', 'nm-tour-state-events')
			.addClasses(['absolute', 'inset-x-0', 'top-0', 'p-2', 'bg-gradient-to-b', 'from-black/80', 'to-transparent', 'font-mono', 'whitespace-nowrap', 'overflow-x-auto', '[scrollbar-width:none]', 'text-xs', 'sm:text-sm', 'text-white'])
			.appendTo(this.mount('overlay'))
			.get();
		this.readout.setAttribute('aria-live', 'polite');

		for (const event of ['play', 'pause', 'playing', 'waiting', 'ended'] as const) {
			this.on(event, () => {
				this.last = event;
				this.render();
			});
		}
		this.on('time', () => this.render());
		this.render();
	}

	private render(): void {
		const event = this.last ? ` · last event: ${this.last}` : '';
		this.readout.textContent = `playState(): ${this.player.playState()} · time(): ${this.player.time().toFixed(1)} s${event}`;
	}
}

function configure(player: NMVideoPlayer): void {
	player.addPlugin(StateReadoutPlugin);
}

export default { config, configure };
