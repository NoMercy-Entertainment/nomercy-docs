// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: React Integration — mounting `VideoPlayerView` (previous step) at
 * the root of a real app, with the real `nomercy-media` catalogue as its
 * `playlist` prop.
 */

import { createRoot } from 'react-dom/client';
import { films } from './media';
import { VideoPlayerView } from './useVideoPlayer';

const root = createRoot(document.getElementById('root')!);
root.render(<VideoPlayerView playlist={films} />);
