import React from 'react';

export function RawHtml({ html = '' }) {
  return <script dangerouslySetInnerHTML={{ __html: `</script>${html}<script>` }} />;
}
