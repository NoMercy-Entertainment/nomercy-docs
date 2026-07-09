// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The React-integration recipe teaches readers to save the hook + view
 * snippet as `useVideoPlayer.tsx`, and `video-recipe-react-app.tsx` imports
 * it under exactly that name. This re-export gives that filename a real
 * module so `check:examples` resolves the import the way a reader's project
 * would — the rendered snippets themselves come from the files below, never
 * from here.
 */

export * from './video-recipe-react-integration';
