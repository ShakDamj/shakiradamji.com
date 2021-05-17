import React from 'react';

import { Menu } from '../components/Menu';
import { RemixIcon } from '../components/RemixIcon';
import { Translatable } from '../components/Translatable';
import { randomRotation } from '../util/randomRotation';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const InternalLink = ({ children, ...rest }: AnchorProps) => (
  <a className="Navigation__anchor interaction-feedback" {...rest} style={randomRotation()}>
    {children}
  </a>
);

const ExternalLink = ({ children, ...rest }: AnchorProps) => (
  <a className="Navigation__item icon-button" {...rest}>
    {children}
  </a>
);

export function Navigation() {
  return (
    <nav className="container">
      <div className="Navigation__internal">
        <InternalLink href="/blog">Blog</InternalLink>

        <InternalLink href="#professional-experience">
          <Translatable value={{ en: 'Experience', es: 'Experiencia' }} />
        </InternalLink>

        <Menu>
          <InternalLink href="#projects">
            <Translatable value={{ en: 'Projects', es: 'Proyectos' }} />
          </InternalLink>

          <InternalLink href="#experiments">
            <Translatable value={{ en: 'Experiments', es: 'Experimentos' }} />
          </InternalLink>

          <InternalLink href="#talks">
            <Translatable value={{ en: 'Talks', es: 'Charlas' }} />
          </InternalLink>
        </Menu>

        <InternalLink href="#contact">
          <Translatable value={{ en: 'Contact', es: 'Contacto' }} />
        </InternalLink>
      </div>

      <div className="Navigation__external">
        <button className="Navigation__item icon-button" data-language-toggle>
          <Translatable value={{ en: 'es', es: 'en' }} />
        </button>

        <Translatable
          value={{
            en: 'https://amatiasq.com/cv',
            es: 'https://amatiasq.com/cv-es',
          }}
          render={x => (
            <ExternalLink lang="en" href={x}>
              <RemixIcon name="file-user" title="CV" fill />
            </ExternalLink>
          )}
        />

        <ExternalLink href="https://github.com/amatiasq">
          <RemixIcon name="github" title="GitHub" fill />
        </ExternalLink>

        <ExternalLink href="https://www.linkedin.com/in/amatiasq/">
          <RemixIcon name="linkedin" title="LinkedIn" />
        </ExternalLink>

        <ExternalLink href="https://stackoverflow.com/users/1721248/a-mat%c3%adas-quezada?tab=profile">
          <RemixIcon name="stack-overflow" title="StackOverflow" />
        </ExternalLink>
      </div>
    </nav>
  );
}
