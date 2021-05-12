import React from 'https://esm.sh/react';
import { renderToString } from 'https://esm.sh/react-dom/server';

import { Index } from './pages/index.tsx';

console.log(renderToString(<Index />));
