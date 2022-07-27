import React from 'react';
import { css } from '../../deps/emotion.ts';
import { Script, usePageUtils } from '../../generate/mod.ts';

export function AmqComments() {
  const { path } = usePageUtils();

  const styles = css`
    margin-top: 10rem;
    overflow: hidden;

    #disqus_thread {
      margin-top: -50px;
      margin-bottom: -36px;
    }
  `;

  return (
    <section className={styles}>
      <div id="disqus_thread"></div>
      <Script>
        {`
          var disqus_config=function(){
            this.page.url = \`\${location.origin}\${location.pathname}\`;
            this.page.identifier = '${path}';
          };
          (function(){
            var d=document,s=d.createElement('script');
            s.src='https://amatiasq.disqus.com/embed.js';
            s.setAttribute('data-timestamp',+new Date());
            (d.head || d.body).appendChild(s);
          })();
        `}
      </Script>
      <noscript>
        Comments can't be shown with Javascript disabled. Use a browser with
        Javascript to see them.
      </noscript>
    </section>
  );
}
