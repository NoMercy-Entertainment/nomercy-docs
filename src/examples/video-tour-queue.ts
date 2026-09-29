import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	playlist: films,
};

/**
 * Queue strip for the Queue tour page: every item in `queue()` as a button,
 * the one at `index()` marked, a click moving the cursor with `item(index)`,
 * and previous/next buttons for `previous()` and `next()`. The marked item
 * follows the `item` event, which also fires when the queue advances itself.
 */
class QueueStripPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'nm-tour-queue';
	static override readonly description = 'Queue list and navigation for the Queue tour page.';

	private list!: HTMLDivElement;

	override use(): void {
		const strip = this.createElement('div', 'nm-tour-queue')
			.addClasses(['absolute', 'inset-x-0', 'top-0', 'flex', 'items-center', 'gap-1.5', 'p-2', 'bg-gradient-to-b', 'from-black/80', 'to-transparent', 'overflow-x-auto', '[scrollbar-width:none]', 'text-xs', 'sm:text-sm', 'text-white'])
			.appendTo(this.mount('overlay'))
			.get();

		const previous = this.createButton('nm-tour-queue-previous', 'Previous item', () => void this.player.previous());
		const next = this.createButton('nm-tour-queue-next', 'Next item', () => void this.player.next());
		for (const [button, glyph] of [[previous, '‹'], [next, '›']] as const) {
			button.textContent = glyph;
			this.addClasses(button, ['size-7', 'shrink-0', 'rounded-full', 'bg-white/15', 'text-lg', 'leading-none', 'hover:bg-white/30']);
		}

		this.list = this.createElement('div', 'nm-tour-queue-list')
			.addClasses(['flex', 'min-w-0', 'flex-1', 'gap-2', 'overflow-x-auto', '[scrollbar-width:none]'])
			.get();
		strip.append(previous, this.list, next);

		this.on('queue', () => this.render());
		this.on('item', () => this.render());
		this.render();
	}

	private render(): void {
		const current = this.player.index();
		this.list.replaceChildren(...this.player.queue().map((item, index) => {
			const title = item.title ?? `Item ${index + 1}`;
			const button = this.createButton(`nm-tour-queue-${index}`, title, () => this.player.item(index));
			const active = index === current;
			button.textContent = title;
			button.setAttribute('aria-current', String(active));
			this.addClasses(button, ['shrink-0', 'rounded-full', 'px-2.5', 'py-0.5', active ? 'bg-white' : 'bg-white/15', active ? 'text-black' : 'text-white']);
			return button;
		}));
	}
}

function configure(player: NMVideoPlayer): void {
	player.addPlugin(QueueStripPlugin);
}

export default { config, configure };
