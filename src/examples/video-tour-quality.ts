import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	defaultQuality: 'auto',
	playlist: [sintel],
};

/**
 * Quality picker for the Quality tour page: "Auto" plus one button per entry
 * in `qualityLevels()`. A click calls `quality('auto')` or `quality(index)`.
 * The marked button follows `quality()`; under Auto the label also names the
 * level ABR is on, from the `level-switched` event.
 */
class QualityPickerPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'nm-tour-quality';
	static override readonly description = 'Quality picker for the Quality tour page.';

	private row!: HTMLDivElement;
	private playing = '';

	override use(): void {
		this.row = this.createElement('div', 'nm-tour-quality')
			.addClasses(['absolute', 'inset-x-0', 'top-0', 'flex', 'items-center', 'gap-1.5', 'p-2', 'bg-gradient-to-b', 'from-black/80', 'to-transparent', 'overflow-x-auto', '[scrollbar-width:none]', 'text-xs', 'sm:text-sm', 'text-white'])
			.appendTo(this.mount('overlay'))
			.get();

		this.on('levels', () => this.render());
		this.on('quality:requested', () => this.render());
		this.on('level-switched', ({ level }) => {
			this.playing = this.player.qualityLevels().find(l => l.index === level)?.label ?? '';
			this.render();
		});
		this.render();
	}

	private render(): void {
		const levels = this.player.qualityLevels();
		const current = this.player.quality();
		if (!levels.length) {
			this.row.textContent = 'Waiting for the manifest…';
			return;
		}
		const auto = this.button('auto', this.playing ? `Auto (${this.playing})` : 'Auto', current === 'auto', () => this.player.quality('auto'));
		this.row.replaceChildren(auto, ...levels.map(level =>
			this.button(String(level.index), level.label, current !== 'auto' && current.index === level.index, () => this.player.quality(level.index))));
	}

	private button(key: string, label: string, active: boolean, onClick: () => void): HTMLButtonElement {
		const button = this.createButton(`nm-tour-quality-${key}`, label, onClick);
		button.textContent = label;
		button.setAttribute('aria-pressed', String(active));
		this.addClasses(button, ['shrink-0', 'rounded-full', 'px-2.5', 'py-0.5', active ? 'bg-white' : 'bg-white/15', active ? 'text-black' : 'text-white']);
		return button;
	}
}

function configure(player: NMVideoPlayer): void {
	player.addPlugin(QualityPickerPlugin);
}

export default { config, configure };
