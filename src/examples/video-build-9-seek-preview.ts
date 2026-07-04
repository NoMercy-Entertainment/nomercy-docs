// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 9 of 10: Seek Preview.
 *
 * Adds to step 7's hand-built plugin: a thumbnail tooltip above the slider
 * bar. The playlist item's `previewSpriteUrl` names a VTT manifest whose
 * cues carry `sprite.webp#xywh=x,y,w,h` regions; `this.fetch()` (the
 * plugin's auth-aware fetch) loads it, a small parser maps time to region,
 * and `mousemove` over the slider positions the tooltip.
 */

import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { formatSeconds, Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { VolumeState } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.60846 4.61586C7.1087 4.34394 6.5 4.7057 6.5 5.27466V18.727C6.5 19.2959 7.1087 19.6577 7.60846 19.3858L19.97 12.6596C20.4921 12.3755 20.4921 11.6261 19.97 11.342L7.60846 4.61586ZM5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z"/></svg>';
const PAUSE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M6.25 3C5.00736 3 4 4.00736 4 5.25V18.75C4 19.9926 5.00736 21 6.25 21H8.75C9.99264 21 11 19.9926 11 18.75V5.25C11 4.00736 9.99264 3 8.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H8.75C9.16421 4.5 9.5 4.83579 9.5 5.25V18.75C9.5 19.1642 9.16421 19.5 8.75 19.5H6.25C5.83579 19.5 5.5 19.1642 5.5 18.75V5.25ZM15.25 3C14.0074 3 13 4.00736 13 5.25V18.75C13 19.9926 14.0074 21 15.25 21H17.75C18.9926 21 20 19.9926 20 18.75V5.25C20 4.00736 18.9926 3 17.75 3H15.25ZM14.5 5.25C14.5 4.83579 14.8358 4.5 15.25 4.5H17.75C18.1642 4.5 18.5 4.83579 18.5 5.25V18.75C18.5 19.1642 18.1642 19.5 17.75 19.5H15.25C14.8358 19.5 14.5 19.1642 14.5 18.75V5.25Z"/></svg>';
const SEEK_BACK_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M2.74999 2.5C2.33578 2.5 2 2.83579 2 3.25V8.75C2 9.16421 2.33578 9.5 2.74999 9.5H8.25011C8.66432 9.5 9.00011 9.16421 9.00011 8.75C9.00011 8.33579 8.66432 8 8.25011 8H4.34273C5.40077 6.60212 6.77033 5.4648 8.47169 4.93832C10.5381 4.29885 12.7232 4.35354 14.7384 5.10317C16.7673 5.85787 18.6479 7.38847 19.5922 9.11081C19.7914 9.47401 20.2473 9.607 20.6105 9.40785C20.9736 9.20871 21.1066 8.75284 20.9075 8.38964C19.7655 6.30687 17.5773 4.55877 15.2614 3.69728C12.9318 2.83072 10.4069 2.7693 8.02826 3.50536C6.14955 4.08673 4.65345 5.26153 3.49999 6.64949V3.25C3.49999 2.83579 3.1642 2.5 2.74999 2.5ZM8.95266 11.0278C9.27643 11.1186 9.50022 11.4138 9.50022 11.75V20.25C9.50022 20.6642 9.16443 21 8.75022 21C8.33601 21 8.00023 20.6642 8.00023 20.25V13.8328C7.61793 14.202 7.16004 14.5788 6.63611 14.8931C6.28093 15.1062 5.82024 14.9911 5.60713 14.6359C5.39402 14.2807 5.5092 13.82 5.86438 13.6069C6.53976 13.2017 7.10401 12.6421 7.50653 12.1678C7.70552 11.9334 7.85963 11.7261 7.96279 11.5793C8.01427 11.5061 8.05276 11.4483 8.07751 11.4103C8.08989 11.3913 8.0988 11.3772 8.10417 11.3687L8.10951 11.3602L8.11019 11.359C8.28503 11.072 8.629 10.9371 8.95266 11.0278ZM13.1988 12.629C13.7527 11.6377 14.6822 11 16.002 11C17.3218 11 18.2513 11.6377 18.8052 12.629C19.3266 13.5624 19.502 14.7762 19.502 16C19.502 17.2238 19.3266 18.4376 18.8052 19.371C18.2513 20.3623 17.3218 21 16.002 21C14.6822 21 13.7527 20.3623 13.1988 19.371C12.6774 18.4376 12.502 17.2238 12.502 16C12.502 14.7762 12.6774 13.5624 13.1988 12.629ZM14.5083 13.3606C14.1704 13.9654 14.002 14.8766 14.002 16C14.002 17.1234 14.1704 18.0346 14.5083 18.6394C14.8139 19.1863 15.2593 19.5 16.002 19.5C16.7447 19.5 17.1901 19.1863 17.4957 18.6394C17.8336 18.0346 18.002 17.1234 18.002 16C18.002 14.8766 17.8336 13.9654 17.4957 13.3606C17.1901 12.8137 16.7447 12.5 16.002 12.5C15.2593 12.5 14.8139 12.8137 14.5083 13.3606Z"/></svg>';
const SEEK_FORWARD_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M21.25 2.5C21.6642 2.5 22 2.83579 22 3.25V8.75C22 9.16421 21.6642 9.5 21.25 9.5H15.7499C15.3357 9.5 14.9999 9.16421 14.9999 8.75C14.9999 8.33578 15.3357 8 15.7499 8H19.6573C18.5992 6.60212 17.2297 5.4648 15.5283 4.93832C13.4619 4.29885 11.2768 4.35354 9.26156 5.10317C7.23271 5.85787 5.35214 7.38846 4.40776 9.11081C4.20861 9.47401 3.75274 9.607 3.38955 9.40785C3.02635 9.2087 2.89336 8.75283 3.09251 8.38964C4.23451 6.30687 6.42268 4.55877 8.73861 3.69728C11.0682 2.83072 13.5931 2.7693 15.9717 3.50536C17.8504 4.08673 19.3465 5.26153 20.5 6.64949V3.25C20.5 2.83579 20.8358 2.5 21.25 2.5ZM16.0018 11C14.6821 11 13.7525 11.6377 13.1987 12.629C12.6772 13.5624 12.5019 14.7762 12.5019 16C12.5019 17.2238 12.6772 18.4376 13.1987 19.371C13.7525 20.3623 14.6821 21 16.0018 21C17.3216 21 18.2512 20.3623 18.805 19.371C19.3265 18.4376 19.5018 17.2238 19.5018 16C19.5018 14.7762 19.3265 13.5624 18.805 12.629C18.2512 11.6377 17.3216 11 16.0018 11ZM14.0019 16C14.0019 14.8766 14.1703 13.9654 14.5082 13.3606C14.8137 12.8137 15.2591 12.5 16.0018 12.5C16.7446 12.5 17.19 12.8137 17.4955 13.3606C17.8334 13.9654 18.0018 14.8766 18.0018 16C18.0018 17.1234 17.8334 18.0346 17.4955 18.6394C17.19 19.1863 16.7446 19.5 16.0018 19.5C15.2591 19.5 14.8137 19.1863 14.5082 18.6394C14.1703 18.0346 14.0019 17.1234 14.0019 16ZM9.50005 11.75C9.50005 11.4138 9.27626 11.1186 8.9525 11.0278C8.62884 10.9371 8.28486 11.072 8.11003 11.359L8.10935 11.3602L8.10401 11.3687C8.09864 11.3772 8.08972 11.3913 8.07735 11.4103C8.05259 11.4483 8.0141 11.5061 7.96263 11.5793C7.85946 11.7261 7.70536 11.9334 7.50637 12.1678C7.10384 12.6421 6.5396 13.2016 5.86422 13.6069C5.50903 13.82 5.39386 14.2807 5.60697 14.6359C5.82008 14.9911 6.28077 15.1062 6.63595 14.8931C7.15988 14.5788 7.61776 14.202 8.00007 13.8328V20.25C8.00007 20.6642 8.33585 21 8.75006 21C9.16427 21 9.50005 20.6642 9.50005 20.25V11.75Z"/></svg>';
const VOLUME_HIGH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M15 4.25049C15 3.17187 13.7255 2.59964 12.9195 3.31631L8.42794 7.30958C8.29065 7.43165 8.11333 7.49907 7.92961 7.49907H4.25C3.00736 7.49907 2 8.50643 2 9.74907V14.247C2 15.4896 3.00736 16.497 4.25 16.497H7.92956C8.11329 16.497 8.29063 16.5644 8.42793 16.6865L12.9194 20.6802C13.7255 21.397 15 20.8247 15 19.7461V4.25049ZM9.4246 8.43059L13.5 4.80728V19.1893L9.42465 15.5655C9.01275 15.1993 8.48074 14.997 7.92956 14.997H4.25C3.83579 14.997 3.5 14.6612 3.5 14.247V9.74907C3.5 9.33486 3.83579 8.99907 4.25 8.99907H7.92961C8.48075 8.99907 9.01272 8.79679 9.4246 8.43059ZM18.9916 5.89782C19.3244 5.65128 19.7941 5.72126 20.0407 6.05411C21.2717 7.71619 22 9.77439 22 12.0005C22 14.2266 21.2717 16.2848 20.0407 17.9469C19.7941 18.2798 19.3244 18.3497 18.9916 18.1032C18.6587 17.8567 18.5888 17.387 18.8353 17.0541C19.8815 15.6416 20.5 13.8943 20.5 12.0005C20.5 10.1067 19.8815 8.35945 18.8353 6.9469C18.5888 6.61404 18.6587 6.14435 18.9916 5.89782ZM17.143 8.36982C17.5072 8.17262 17.9624 8.30806 18.1596 8.67233C18.6958 9.66294 19 10.7973 19 12.0005C19 13.2037 18.6958 14.338 18.1596 15.3287C17.9624 15.6929 17.5072 15.8284 17.143 15.6312C16.7787 15.434 16.6432 14.9788 16.8404 14.6146C17.2609 13.8378 17.5 12.9482 17.5 12.0005C17.5 11.0528 17.2609 10.1632 16.8404 9.38642C16.6432 9.02216 16.7787 8.56701 17.143 8.36982Z"/></svg>';
const VOLUME_LOW_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M14.7041 3.44054C14.8952 3.66625 15 3.95238 15 4.24807V19.7497C15 20.4401 14.4404 20.9997 13.75 20.9997C13.4542 20.9997 13.168 20.8948 12.9423 20.7037L7.97513 16.4979H4.25C3.00736 16.4979 2 15.4905 2 14.2479V9.7479C2 8.50526 3.00736 7.4979 4.25 7.4979H7.97522L12.9425 3.29393C13.4694 2.84794 14.2582 2.91358 14.7041 3.44054ZM13.5 4.78718L8.52478 8.9979H4.25C3.83579 8.9979 3.5 9.33369 3.5 9.7479V14.2479C3.5 14.6621 3.83579 14.9979 4.25 14.9979H8.52487L13.5 19.2104V4.78718Z"/></svg>';
const VOLUME_MUTED_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12.9195 3.31631C13.7255 2.59964 15 3.17187 15 4.25049V19.7461C15 20.8247 13.7255 21.397 12.9194 20.6802L8.42793 16.6865C8.29063 16.5644 8.11329 16.497 7.92956 16.497H4.25C3.00736 16.497 2 15.4896 2 14.247V9.74907C2 8.50643 3.00736 7.49907 4.25 7.49907H7.92961C8.11333 7.49907 8.29065 7.43165 8.42794 7.30958L12.9195 3.31631ZM13.5 4.80728L9.4246 8.43059C9.01272 8.79679 8.48075 8.99907 7.92961 8.99907H4.25C3.83579 8.99907 3.5 9.33486 3.5 9.74907V14.247C3.5 14.6612 3.83579 14.997 4.25 14.997H7.92956C8.48074 14.997 9.01275 15.1993 9.42465 15.5655L13.5 19.1893V4.80728ZM16.2197 9.22017C16.5126 8.92728 16.9874 8.92728 17.2803 9.22017L19 10.9398L20.7197 9.22017C21.0126 8.92728 21.4874 8.92728 21.7803 9.22017C22.0732 9.51307 22.0732 9.98794 21.7803 10.2808L20.0607 12.0005L21.7803 13.7202C22.0732 14.0131 22.0732 14.4879 21.7803 14.7808C21.4874 15.0737 21.0126 15.0737 20.7197 14.7808L19 13.0612L17.2803 14.7808C16.9874 15.0737 16.5126 15.0737 16.2197 14.7808C15.9268 14.4879 15.9268 14.0131 16.2197 13.7202L17.9393 12.0005L16.2197 10.2808C15.9268 9.98794 15.9268 9.51307 16.2197 9.22017Z"/></svg>';
const SPEED_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.93413 16.0659C8.22703 16.3588 8.22703 16.8336 7.93413 17.1265C7.64124 17.4194 7.16637 17.4194 6.87347 17.1265C4.04217 14.2952 4.04217 9.70478 6.87347 6.87348C8.71833 5.02862 11.3099 4.38674 13.6723 4.94459C14.0755 5.03978 14.3251 5.44375 14.2299 5.84687C14.1347 6.25 13.7308 6.49963 13.3276 6.40444C11.45 5.96106 9.39622 6.47205 7.93413 7.93414C5.68862 10.1797 5.68862 13.8203 7.93413 16.0659ZM17.8879 9.1415C18.2789 9.00477 18.7067 9.21089 18.8435 9.60189C19.7333 12.1463 19.1624 15.0907 17.1265 17.1265C16.8336 17.4194 16.3588 17.4194 16.0659 17.1265C15.773 16.8336 15.773 16.3588 16.0659 16.0659C17.6791 14.4526 18.1344 12.1183 17.4276 10.097C17.2908 9.70604 17.4969 9.27824 17.8879 9.1415ZM15.8791 6.66732C16.1062 6.47297 16.439 6.46653 16.6734 6.65195C16.9078 6.83738 16.9781 7.16278 16.8412 7.42842L16.7119 7.67862C16.6295 7.83801 16.5113 8.06624 16.3681 8.34179C16.0818 8.89278 15.6954 9.63339 15.2955 10.3912C14.8959 11.1485 14.4815 11.9253 14.1395 12.5479C13.9686 12.8589 13.8142 13.1344 13.6879 13.3509C13.5703 13.5524 13.4548 13.7421 13.3688 13.8508C12.7263 14.6629 11.5471 14.8004 10.735 14.1579C9.92288 13.5154 9.78538 12.3362 10.4279 11.5241C10.5139 11.4154 10.672 11.2593 10.8409 11.0986C11.0226 10.9258 11.2552 10.7121 11.5185 10.4744C12.0457 9.9983 12.7063 9.41631 13.3514 8.85315C13.9969 8.28961 14.6288 7.74321 15.0991 7.33783C15.3343 7.1351 15.5292 6.96755 15.6654 6.85065L15.8791 6.66732ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12Z"/></svg>';
const FULLSCREEN_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12.748 3.00122L20.3018 3.00173L20.402 3.01565L20.5009 3.04325L20.562 3.06918C20.641 3.10407 20.7149 3.1546 20.7798 3.21953L20.8206 3.26357L20.8811 3.34505L20.9183 3.41008L20.957 3.50039L20.9761 3.56452L20.9897 3.62846L20.999 3.72165L20.9996 11.2551C20.9996 11.6693 20.6638 12.0051 20.2496 12.0051C19.8699 12.0051 19.5561 11.723 19.5064 11.3569L19.4996 11.2551L19.499 5.55922L5.55905 19.5042L11.2496 19.5051C11.6293 19.5051 11.9431 19.7873 11.9927 20.1533L11.9996 20.2551C11.9996 20.6348 11.7174 20.9486 11.3513 20.9983L11.2496 21.0051L3.71372 21.0043L3.68473 21.0015C3.61867 20.9969 3.55596 20.983 3.49668 20.9619L3.40655 20.923L3.38936 20.9125C3.18516 20.8021 3.03871 20.5991 3.00529 20.3597L2.99805 20.2551V12.7512C2.99805 12.337 3.33383 12.0012 3.74805 12.0012C4.12774 12.0012 4.44154 12.2834 4.4912 12.6495L4.49805 12.7512V18.4432L18.438 4.50022L12.748 4.50122C12.3684 4.50122 12.0546 4.21907 12.0049 3.85299L11.998 3.75122C11.998 3.37152 12.2802 3.05773 12.6463 3.00807L12.748 3.00122Z"/></svg>';
const EXIT_FULLSCREEN_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M21.7776 2.22205C22.0437 2.48828 22.0679 2.90495 21.8503 3.19858L21.7778 3.28271L15.555 9.50644L21.2476 9.50739C21.6273 9.50739 21.9411 9.78954 21.9908 10.1556L21.9976 10.2574C21.9976 10.6371 21.7155 10.9509 21.3494 11.0005L21.2476 11.0074L13.6973 11.005L13.6824 11.0038C13.6141 10.9986 13.5486 10.984 13.487 10.9614L13.3892 10.9159C13.1842 10.8058 13.037 10.6023 13.0034 10.3623L12.9961 10.2574V2.7535C12.9961 2.33929 13.3319 2.0035 13.7461 2.0035C14.1258 2.0035 14.4396 2.28565 14.4893 2.65173L14.4961 2.7535L14.496 8.44444L20.7178 2.22217C21.0104 1.92925 21.4849 1.92919 21.7776 2.22205ZM11.0025 13.7547V21.2586C11.0025 21.6728 10.6667 22.0086 10.2525 22.0086C9.8728 22.0086 9.55901 21.7265 9.50935 21.3604L9.5025 21.2586L9.502 15.5634L3.28039 21.7794C2.98753 22.0723 2.51266 22.0724 2.21973 21.7795C1.95343 21.5133 1.92918 21.0966 2.147 20.803L2.21961 20.7189L8.44 14.5044L2.75097 14.5047C2.37128 14.5047 2.05748 14.2226 2.00782 13.8565L2.00097 13.7547C2.00097 13.3405 2.33676 13.0047 2.75097 13.0047L10.3053 13.0066L10.3788 13.0153L10.4763 13.0387L10.5291 13.0574L10.6154 13.0982L10.7039 13.1557C10.7598 13.1979 10.8095 13.2477 10.8517 13.3035L10.9185 13.4095L10.9592 13.503L10.9806 13.5739L10.9919 13.6286L10.998 13.6864L10.9986 13.678L11.0025 13.7547Z"/></svg>';

const SPINNER_SVG = `
	<svg class="animate-spin text-white" viewBox="0 0 100 101" fill="none">
		<path d="M100 50.59C100 78.2 77.6 100.59 50 100.59S0 78.2 0 50.59 22.39.59 50 .59s50 22.39 50 50z" fill="currentColor" opacity="0.25"/>
		<path d="M93.97 39.04c2.42-.64 3.89-3.13 3.04-5.49A50 50 0 0041.73 1.28c-2.47.41-3.92 2.92-3.28 5.34.66 2.43 3.14 3.85 5.62 3.48a40 40 0 0146.62 22.32c.9 2.24 3.36 3.7 5.79 3.06z" fill="currentColor"/>
	</svg>
`;

interface PreviewCue {
	start: number;
	end: number;
	imageUrl: string;
	x: number;
	y: number;
	w: number;
	h: number;
}

/**
 * Parse a thumbnail-sprite VTT: each cue maps a time range to a
 * `sprite.webp#xywh=x,y,w,h` region. Image paths resolve relative to the
 * VTT's own folder, exactly how every player treats sprite manifests.
 */
function parsePreviewVtt(raw: string, vttUrl: string): PreviewCue[] {
	const cues: PreviewCue[] = [];
	const timestamp = /(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})/gu;
	const region = /^(?<file>[^#]+)#xywh=(?<x>\d+),(?<y>\d+),(?<w>\d+),(?<h>\d+)$/u;

	const toSeconds = (match: RegExpExecArray): number => {
		const [, hours, minutes, seconds, millis] = match;
		return Number(hours ?? 0) * 3600 + Number(minutes) * 60 + Number(seconds) + Number(millis) / 1000;
	};

	for (const block of raw.split(/\r?\n\r?\n/)) {
		const lines = block.trim().split(/\r?\n/);
		const cueLineIndex = lines.findIndex(line => line.includes('-->'));
		if (cueLineIndex === -1)
			continue;

		timestamp.lastIndex = 0;
		const startMatch = timestamp.exec(lines[cueLineIndex]);
		const endMatch = timestamp.exec(lines[cueLineIndex]);
		const regionMatch = region.exec(lines[cueLineIndex + 1] ?? '');
		if (!startMatch || !endMatch || !regionMatch?.groups)
			continue;

		cues.push({
			start: toSeconds(startMatch),
			end: toSeconds(endMatch),
			imageUrl: new URL(regionMatch.groups.file, vttUrl).toString(),
			x: Number(regionMatch.groups.x),
			y: Number(regionMatch.groups.y),
			w: Number(regionMatch.groups.w),
			h: Number(regionMatch.groups.h),
		});
	}

	return cues;
}

class StepPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'tutorial-ui';

	private overlay!: HTMLElement;
	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;
	private centerButton!: HTMLButtonElement;
	private spinner!: HTMLDivElement;
	private bottomRow!: HTMLDivElement;
	private playbackButton!: HTMLButtonElement;
	private sliderBar!: HTMLDivElement;
	private isMouseDown = false;
	private currentTimeLabel!: HTMLSpanElement;
	private durationLabel!: HTMLSpanElement;
	private volumeSlider!: HTMLDivElement;
	private titleLabel!: HTMLDivElement;
	private speedMenu: HTMLDivElement | null = null;
	private activeMenu: string | null = null;
	private previewCues: PreviewCue[] = [];
	private sliderPop!: HTMLDivElement;
	private sliderPopImage!: HTMLDivElement;
	private sliderPopText!: HTMLSpanElement;

	override use(): void {
		this.player.addClasses(this.player.container, ['group']);

		this.overlay = this.mount('overlay');
		this.player.addClasses(this.overlay, [
			'overlay',
			'absolute',
			'inset-0',
			'pointer-events-none',
		]);

		this.createTopBar();
		this.createTitle();
		this.createCenterButton();
		this.createSpinner();
		this.createBottomBar();
		this.createProgressBar();
		this.createBottomRow();
		this.createPlaybackButton();
		this.createSkipButtons();
		this.createTimeDisplay();
		this.createVolumeControl();
		this.createRightSpacer();
		this.createSpeedButton();
		this.createFullscreenButton();
		this.createSeekPreview();
	}

	private createTopBar(): void {
		this.topBar = this.player
			.createElement('div', 'top-bar')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'right-0',
				'flex',
				'items-center',
				'gap-2',
				'p-4',
				'pb-12',
				'bg-gradient-to-b',
				'from-black/80',
				'to-transparent',
				'opacity-0',
				'transition-opacity',
				'duration-300',
				'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createBottomBar(): void {
		this.bottomBar = this.player
			.createElement('div', 'bottom-bar')
			.addClasses([
				'absolute',
				'bottom-0',
				'left-0',
				'right-0',
				'flex',
				'flex-col',
				'gap-1',
				'px-4',
				'pt-12',
				'pb-2',
				'bg-gradient-to-t',
				'from-black/80',
				'to-transparent',
				'opacity-0',
				'transition-opacity',
				'duration-300',
				'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createUiButton(parent: HTMLElement, id: string, label: string): HTMLButtonElement {
		const button = this.player
			.createElement('button', id)
			.addClasses([
				'w-10',
				'h-10',
				'rounded-full',
				'flex',
				'items-center',
				'justify-center',
				'text-white',
				'hover:bg-white/20',
				'cursor-pointer',
			])
			.appendTo(parent)
			.get();
		button.ariaLabel = label;
		return button;
	}

	private createCenterButton(): void {
		this.centerButton = this.player
			.createElement('button', 'center-play')
			.addClasses([
				'absolute',
				'top-1/2',
				'left-1/2',
				'-translate-x-1/2',
				'-translate-y-1/2',
				'w-16',
				'h-16',
				'rounded-full',
				'bg-black/50',
				'text-white',
				'flex',
				'items-center',
				'justify-center',
				'transition-opacity',
				'duration-300',
				'hover:bg-black/70',
				'hover:scale-110',
				'cursor-pointer',
				'pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
		this.centerButton.ariaLabel = 'Play';
		this.centerButton.innerHTML = PLAY_ICON;

		this.listen(this.centerButton, 'click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
		});

		this.on('play', () => {
			this.centerButton.style.display = 'none';
		});
	}

	private createSpinner(): void {
		this.spinner = this.player
			.createElement('div', 'spinner')
			.addClasses([
				'absolute',
				'top-1/2',
				'left-1/2',
				'-translate-x-1/2',
				'-translate-y-1/2',
				'w-12',
				'h-12',
				'hidden',
				'group-[&.nomercyplayer.buffering]:block',
				'pointer-events-none',
			])
			.appendTo(this.overlay)
			.get();

		this.spinner.innerHTML = SPINNER_SVG;
	}

	private createBottomRow(): void {
		this.bottomRow = this.player
			.createElement('div', 'bottom-row')
			.addClasses([
				'flex',
				'items-center',
				'gap-1',
				'h-10',
			])
			.appendTo(this.bottomBar)
			.get();
	}

	private createPlaybackButton(): void {
		this.playbackButton = this.createUiButton(this.bottomRow, 'playback', 'Play');

		const playIcon = this.player
			.createElement('span', 'playback-play')
			.appendTo(this.playbackButton)
			.get();
		playIcon.innerHTML = PLAY_ICON;

		const pauseIcon = this.player
			.createElement('span', 'playback-pause')
			.appendTo(this.playbackButton)
			.get();
		pauseIcon.innerHTML = PAUSE_ICON;
		pauseIcon.style.display = 'none';

		this.listen(this.playbackButton, 'click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
		});

		this.on('pause', () => {
			pauseIcon.style.display = 'none';
			playIcon.style.display = 'flex';
		});
		this.on('play', () => {
			playIcon.style.display = 'none';
			pauseIcon.style.display = 'flex';
		});
	}

	private createProgressBar(): void {
		this.sliderBar = this.player
			.createElement('div', 'slider-bar')
			.addClasses([
				'relative',
				'w-full',
				'h-1',
				'mx-2',
				'bg-white/20',
				'rounded-full',
				'cursor-pointer',
				'group/slider',
				'hover:h-2',
				'transition-all',
				'duration-150',
			])
			.appendTo(this.bottomBar)
			.get();

		const sliderBuffer = this.player
			.createElement('div', 'slider-buffer')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'h-full',
				'bg-white/30',
				'rounded-full',
				'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderProgress = this.player
			.createElement('div', 'slider-progress')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'h-full',
				'bg-white',
				'rounded-full',
				'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderNipple = this.player
			.createElement('div', 'slider-nipple')
			.addClasses([
				'absolute',
				'top-1/2',
				'-translate-y-1/2',
				'-translate-x-1/2',
				'w-3',
				'h-3',
				'rounded-full',
				'bg-white',
				'hidden',
				'group-hover/slider:flex',
				'pointer-events-none',
				'left-0',
				'z-20',
			])
			.appendTo(this.sliderBar)
			.get();

		// Converts a mouse or touch event's X position into a 0-100 percentage
		// relative to the slider bar, clamped so dragging past the edges holds.
		const getPercentFromEvent = (event: MouseEvent | TouchEvent): number => {
			const rect = this.sliderBar.getBoundingClientRect();
			const clientX = ('clientX' in event ? event.clientX : undefined)
				?? ('touches' in event ? event.touches?.[0]?.clientX : undefined)
				?? ('changedTouches' in event ? event.changedTouches?.[0]?.clientX : undefined)
				?? 0;
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
			return (x / rect.width) * 100;
		};

		for (const eventName of ['mousedown', 'touchstart']) {
			this.listen(this.sliderBar, eventName, () => {
				this.isMouseDown = true;
			}, { passive: true });
		}

		this.listen(this.sliderBar, 'click', (event) => {
			this.isMouseDown = false;
			const percent = getPercentFromEvent(event as MouseEvent);
			this.player.seekByPercentage(percent);
			sliderNipple.style.left = `${percent}%`;
		});

		for (const eventName of ['mousemove', 'touchmove']) {
			this.listen(this.sliderBar, eventName, (event) => {
				if (!this.isMouseDown)
					return;
				const percent = getPercentFromEvent(event as MouseEvent | TouchEvent);
				sliderNipple.style.left = `${percent}%`;
				sliderProgress.style.width = `${percent}%`;
			}, { passive: true });
		}

		this.listen(this.sliderBar, 'mouseleave', () => {
			this.isMouseDown = false;
		}, { passive: true });

		this.on('time', ({ time }) => {
			if (this.isMouseDown)
				return;
			const duration = this.player.duration();
			const percentage = duration > 0 ? (time / duration) * 100 : 0;
			sliderProgress.style.width = `${percentage}%`;
			sliderNipple.style.left = `${percentage}%`;
		});

		this.on('item', () => {
			sliderBuffer.style.width = '0';
			sliderProgress.style.width = '0';
		});
	}

	private createSkipButtons(): void {
		const skipBack = this.createUiButton(this.bottomRow, 'skip-back', 'Skip back 10 seconds');
		skipBack.innerHTML = SEEK_BACK_ICON;
		this.listen(skipBack, 'click', (event) => {
			event.stopPropagation();
			void this.player.rewind(10);
		});

		const skipForward = this.createUiButton(this.bottomRow, 'skip-forward', 'Skip forward 10 seconds');
		skipForward.innerHTML = SEEK_FORWARD_ICON;
		this.listen(skipForward, 'click', (event) => {
			event.stopPropagation();
			void this.player.forward(10);
		});
	}

	private createTimeDisplay(): void {
		this.currentTimeLabel = this.player
			.createElement('span', 'current-time')
			.addClasses([
				'text-white',
				'text-xs',
				'tabular-nums',
				'ml-2',
			])
			.appendTo(this.bottomRow)
			.get();
		this.currentTimeLabel.textContent = '0:00';

		const separator = this.player
			.createElement('span', 'time-separator')
			.addClasses([
				'text-white/50',
				'text-xs',
				'mx-1',
			])
			.appendTo(this.bottomRow)
			.get();
		separator.textContent = '/';

		this.durationLabel = this.player
			.createElement('span', 'duration')
			.addClasses([
				'text-white',
				'text-xs',
				'tabular-nums',
			])
			.appendTo(this.bottomRow)
			.get();
		this.durationLabel.textContent = '0:00';

		this.on('time', ({ time }) => {
			this.currentTimeLabel.textContent = formatSeconds(time);
			this.durationLabel.textContent = formatSeconds(this.player.duration());
		});
	}

	private createVolumeControl(): void {
		const volumeContainer = this.player
			.createElement('div', 'volume-container')
			.addClasses([
				'flex',
				'items-center',
				'group/volume',
				'ml-1',
			])
			.appendTo(this.bottomRow)
			.get();

		const volumeButton = this.createUiButton(volumeContainer, 'volume', 'Mute');

		const volHigh = this.player
			.createElement('span', 'vol-high')
			.appendTo(volumeButton)
			.get();
		volHigh.innerHTML = VOLUME_HIGH_ICON;

		const volLow = this.player
			.createElement('span', 'vol-low')
			.appendTo(volumeButton)
			.get();
		volLow.innerHTML = VOLUME_LOW_ICON;
		volLow.style.display = 'none';

		const volMuted = this.player
			.createElement('span', 'vol-muted')
			.appendTo(volumeButton)
			.get();
		volMuted.innerHTML = VOLUME_MUTED_ICON;
		volMuted.style.display = 'none';

		this.listen(volumeButton, 'click', (event) => {
			event.stopPropagation();
			this.player.toggleMute();
		});

		this.volumeSlider = this.player
			.createElement('div', 'volume-slider')
			.addClasses([
				'relative',
				'h-1',
				'rounded-full',
				'bg-white/20',
				'cursor-pointer',
				'group/vol-slider',
				'w-0',
				'opacity-0',
				'group-hover/volume:w-20',
				'group-hover/volume:mx-2',
				'group-hover/volume:opacity-100',
				'group-focus-within/volume:w-20',
				'group-focus-within/volume:mx-2',
				'group-focus-within/volume:opacity-100',
				'hover:h-2',
				'transition-all',
				'duration-150',
			])
			.appendTo(volumeContainer)
			.get();

		const volumeProgress = this.player
			.createElement('div', 'volume-progress')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'h-full',
				'bg-white',
				'rounded-full',
				'pointer-events-none',
			])
			.appendTo(this.volumeSlider)
			.get();

		const volumeNipple = this.player
			.createElement('div', 'volume-nipple')
			.addClasses([
				'absolute',
				'top-1/2',
				'-translate-y-1/2',
				'-translate-x-1/2',
				'w-3',
				'h-3',
				'rounded-full',
				'bg-white',
				'hidden',
				'group-hover/vol-slider:flex',
				'pointer-events-none',
				'z-20',
			])
			.appendTo(this.volumeSlider)
			.get();

		const updateVolSliderUi = (vol: number): void => {
			const pct = Math.max(0, Math.min(vol, 100));
			volumeProgress.style.width = `${pct}%`;
			volumeNipple.style.left = `${pct}%`;
		};

		let volDragging = false;
		const getVolFromEvent = (event: MouseEvent | TouchEvent): number => {
			const rect = this.volumeSlider.getBoundingClientRect();
			const clientX = ('clientX' in event ? event.clientX : undefined)
				?? ('touches' in event ? event.touches?.[0]?.clientX : undefined)
				?? ('changedTouches' in event ? event.changedTouches?.[0]?.clientX : undefined)
				?? 0;
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
			return Math.round((x / rect.width) * 100);
		};

		for (const eventName of ['mousedown', 'touchstart']) {
			this.listen(this.volumeSlider, eventName, () => {
				volDragging = true;
			}, { passive: true });
		}
		this.listen(this.volumeSlider, 'click', (event) => {
			volDragging = false;
			const vol = getVolFromEvent(event as MouseEvent);
			this.player.volume(vol);
			updateVolSliderUi(vol);
		});
		for (const eventName of ['mousemove', 'touchmove']) {
			this.listen(this.volumeSlider, eventName, (event) => {
				if (!volDragging)
					return;
				const vol = getVolFromEvent(event as MouseEvent | TouchEvent);
				this.player.volume(vol);
				updateVolSliderUi(vol);
			}, { passive: true });
		}
		this.listen(this.volumeSlider, 'mouseleave', () => {
			volDragging = false;
		}, { passive: true });
		this.listen(document, 'mouseup', () => {
			volDragging = false;
		}, { passive: true });
		this.listen(document, 'touchend', () => {
			volDragging = false;
		}, { passive: true });

		let muted = this.player.volumeState() === VolumeState.MUTED;

		const updateVolumeIcon = (volume: number): void => {
			volHigh.style.display = 'none';
			volLow.style.display = 'none';
			volMuted.style.display = 'none';

			if (muted || volume === 0) {
				volMuted.style.display = 'flex';
			}
			else if (volume < 50) {
				volLow.style.display = 'flex';
			}
			else {
				volHigh.style.display = 'flex';
			}
		};

		this.on('volume', ({ level }) => {
			updateVolSliderUi(level);
			updateVolumeIcon(level);
		});
		this.on('mute', (payload) => {
			muted = payload.muted;
			updateVolumeIcon(this.player.volume());
		});

		const initialVol = this.player.volume();
		updateVolSliderUi(initialVol);
		updateVolumeIcon(initialVol);
	}

	private createTitle(): void {
		this.titleLabel = this.player
			.createElement('div', 'title-display')
			.addClasses([
				'text-white',
				'text-sm',
				'font-medium',
				'truncate',
			])
			.appendTo(this.topBar)
			.get();

		this.updateTitle();
		this.on('item', () => this.updateTitle());
	}

	private updateTitle(): void {
		const item = this.player.item();
		if (!item)
			return;

		let text = item.title;
		if (item.show) {
			text = item.show;
			if (item.season !== undefined && item.episode !== undefined) {
				text += ` - S${item.season}E${item.episode}: ${item.title}`;
			}
		}
		this.titleLabel.textContent = text ?? '';
	}

	private createRightSpacer(): void {
		this.player
			.createElement('div', 'spacer')
			.addClasses(['flex-1'])
			.appendTo(this.bottomRow);
	}

	private createSpeedButton(): void {
		const button = this.createUiButton(this.bottomRow, 'speed', 'Playback speed');
		button.innerHTML = SPEED_ICON;

		this.listen(button, 'click', (event) => {
			event.stopPropagation();
			this.toggleMenu('speed');
		});

		this.speedMenu = this.player
			.createElement('div', 'speed-menu')
			.addClasses([
				'absolute',
				'bottom-12',
				'right-0',
				'bg-black/90',
				'rounded-lg',
				'p-2',
				'hidden',
				'flex-col',
				'gap-1',
				'min-w-[120px]',
				'pointer-events-auto',
			])
			.appendTo(this.bottomRow)
			.get();

		const rates = this.player.playbackRates();
		for (const rate of rates) {
			const option = this.player
				.createElement('button', `speed-${rate}`)
				.addClasses([
					'text-white',
					'text-sm',
					'px-3',
					'py-1.5',
					'rounded',
					'hover:bg-white/20',
					'text-left',
					'cursor-pointer',
				])
				.appendTo(this.speedMenu!)
				.get();
			option.textContent = rate === 1 ? 'Normal' : `${rate}x`;
			this.listen(option, 'click', (event) => {
				event.stopPropagation();
				void this.player.playbackRate(rate);
				this.toggleMenu(null);
			});
		}

		this.on('playbackRate', () => this.updateSpeedMenu());
		this.updateSpeedMenu();
	}

	private updateSpeedMenu(): void {
		if (!this.speedMenu)
			return;
		const current = this.player.playbackRate();
		const buttons = this.speedMenu.querySelectorAll('button');
		const rates = this.player.playbackRates();
		buttons.forEach((button, index) => {
			button.classList.toggle('bg-white/20', rates[index] === current);
		});
	}

	private toggleMenu(name: string | null): void {
		this.speedMenu?.classList.add('hidden');
		this.speedMenu?.classList.remove('flex');

		if (name === this.activeMenu || name === null) {
			this.activeMenu = null;
			return;
		}

		this.activeMenu = name;
		if (name === 'speed' && this.speedMenu) {
			this.speedMenu.classList.remove('hidden');
			this.speedMenu.classList.add('flex');
		}
	}

	private createFullscreenButton(): void {
		const button = this.createUiButton(this.bottomRow, 'fullscreen', 'Fullscreen');

		const enterIcon = this.player
			.createElement('span', 'fs-enter')
			.appendTo(button)
			.get();
		enterIcon.innerHTML = FULLSCREEN_ICON;

		const exitIcon = this.player
			.createElement('span', 'fs-exit')
			.appendTo(button)
			.get();
		exitIcon.innerHTML = EXIT_FULLSCREEN_ICON;
		exitIcon.style.display = 'none';

		this.listen(button, 'click', (event) => {
			event.stopPropagation();
			this.player.toggleFullscreen();
		});

		this.on('fullscreen', ({ active }) => {
			enterIcon.style.display = active ? 'none' : 'flex';
			exitIcon.style.display = active ? 'flex' : 'none';
			button.ariaLabel = active ? 'Exit fullscreen' : 'Fullscreen';
		});
	}

	private createSeekPreview(): void {
		this.sliderPop = this.player
			.createElement('div', 'slider-pop')
			.addClasses([
				'absolute',
				'bottom-full',
				'mb-3',
				'flex',
				'flex-col',
				'items-center',
				'pointer-events-none',
				'z-30',
				'opacity-0',
				'transition-opacity',
				'duration-150',
			])
			.appendTo(this.sliderBar)
			.get();

		this.sliderPopImage = this.player
			.createElement('div', 'slider-pop-image')
			.addClasses([
				'rounded',
				'overflow-hidden',
				'bg-no-repeat',
				'border',
				'border-white/30',
			])
			.appendTo(this.sliderPop)
			.get();

		this.sliderPopText = this.player
			.createElement('span', 'slider-pop-text')
			.addClasses([
				'text-white',
				'text-xs',
				'mt-1',
				'tabular-nums',
				'bg-black/70',
				'px-1.5',
				'py-0.5',
				'rounded',
			])
			.appendTo(this.sliderPop)
			.get();

		this.on('ready', () => void this.fetchPreviewCues());
		this.on('item', () => {
			this.previewCues = [];
			void this.fetchPreviewCues();
		});

		this.listen(this.sliderBar, 'mousemove', (event) => {
			if (this.previewCues.length === 0)
				return;

			const rect = this.sliderBar.getBoundingClientRect();
			const x = Math.max(0, Math.min((event as MouseEvent).clientX - rect.left, rect.width));
			const percent = x / rect.width;
			const scrubTime = percent * this.player.duration();

			const preview = this.previewCues.find(
				cue => scrubTime >= cue.start && scrubTime < cue.end,
			) ?? this.previewCues.at(-1);

			if (preview) {
				this.sliderPopImage.style.backgroundImage = `url('${preview.imageUrl}')`;
				this.sliderPopImage.style.backgroundPosition = `-${preview.x}px -${preview.y}px`;
				this.sliderPopImage.style.width = `${preview.w}px`;
				this.sliderPopImage.style.height = `${preview.h}px`;

				const popWidth = preview.w;
				const minLeft = popWidth / 2;
				const maxLeft = rect.width - popWidth / 2;
				const clampedX = Math.max(minLeft, Math.min(x, maxLeft));
				this.sliderPop.style.left = `${clampedX}px`;
				this.sliderPop.style.transform = 'translateX(-50%)';

				this.sliderPopText.textContent = formatSeconds(scrubTime);
			}

			this.sliderPop.style.opacity = '1';
		}, { passive: true });

		this.listen(this.sliderBar, 'mouseleave', () => {
			this.sliderPop.style.opacity = '0';
		}, { passive: true });
	}

	private async fetchPreviewCues(): Promise<void> {
		if (this.previewCues.length > 0)
			return;

		const item = this.player.item();
		const spritePath = item?.previewSpriteUrl;
		if (!spritePath)
			return;

		const vttUrl = `${this.player.options.baseUrl ?? ''}${spritePath}`;
		try {
			const raw = await this.fetch<string>(vttUrl, { scope: 'silent' });
			this.previewCues = parsePreviewVtt(raw, vttUrl);
		}
		catch {
			this.previewCues = [];
		}
	}
}

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
	playlist: [sintel],
};

function configure(player: NMVideoPlayer): void {
	player.addPlugin(StepPlugin);
}

export default { config, configure };
