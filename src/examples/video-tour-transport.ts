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
 * Transport counters for the Transport tour page. The native bar drives the
 * element, so its play button raises `play` but never `beforePlay`. The
 * "play()" button here goes through the player and raises both. Click each
 * and compare the two counters.
 */
class TransportCountersPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'nm-tour-transport';
	static override readonly description = 'beforePlay and play counters for the Transport tour page.';

	private readout!: HTMLSpanElement;
	private beforePlays = 0;
	private plays = 0;

	override use(): void {
		const strip = this.createElement('div', 'nm-tour-transport')
			.addClasses(['absolute', 'inset-x-0', 'top-0', 'flex', 'items-center', 'gap-2', 'p-2', 'bg-gradient-to-b', 'from-black/80', 'to-transparent', 'overflow-x-auto', '[scrollbar-width:none]', 'text-xs', 'sm:text-sm', 'text-white'])
			.appendTo(this.mount('overlay'))
			.get();

		const play = this.createButton('nm-tour-transport-play', 'Play through the player', () => void this.player.play());
		play.textContent = 'play()';
		this.addClasses(play, ['shrink-0', 'rounded-full', 'bg-white', 'px-2.5', 'py-0.5', 'font-mono', 'text-black']);

		this.readout = this.createElement('span', 'nm-tour-transport-readout')
			.addClasses(['font-mono'])
			.get();
		this.readout.setAttribute('aria-live', 'polite');
		strip.append(play, this.readout);

		this.on('beforePlay', () => {
			this.beforePlays += 1;
			this.render();
		});
		this.on('play', () => {
			this.plays += 1;
			this.render();
		});
		this.render();
	}

	private render(): void {
		this.readout.textContent = `beforePlay: ${this.beforePlays} · play: ${this.plays}`;
	}
}

function configure(player: NMVideoPlayer): void {
	player.addPlugin(TransportCountersPlugin);
}

export default { config, configure };
