// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: React Integration — mounting `MusicPlayerView` (previous step) at
 * the root of a real app, with the real `nomercy-media` catalogue as its
 * `playlist` prop.
 */

import { createRoot } from 'react-dom/client';
import { songs } from './media';
import { MusicPlayerView } from './useMusicPlayer';

const root = createRoot(document.getElementById('root')!);
root.render(<MusicPlayerView playlist={songs} />);
