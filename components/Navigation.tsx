import { RemixIcon } from './RemixIcon';

export function Navigation() {
  return (
    <nav className="page-navigation">
      <div className="external">
        <button className="icon-button" language-toggle>
          <span lang="en">ES</span>
          <span lang="es">EN</span>
        </button>

        <a lang="en" className="icon-button" href="https://amatiasq.com/cv">
          {' '}
          CV{' '}
        </a>
        <a lang="es" className="icon-button" href="https://amatiasq.com/cv-es">
          {' '}
          CV{' '}
        </a>
        <a className="icon-button" href="https://github.com/amatiasq">
          <RemixIcon name="github" title="GitHub" fill />
        </a>
        <a className="icon-button" href="https://www.linkedin.com/in/amatiasq/">
          <RemixIcon name="linkedin" title="LinkedIn" />
        </a>
        <a className="icon-button" href="https://stackoverflow.com/users/1721248/a-mat%c3%adas-quezada?tab=profile">
          <RemixIcon name="stack-overflow" title="StackOverflow" />
        </a>
      </div>

      <div className="internal">
        <a className="section" href="/blog">
          Blog
        </a>

        <a className="section" href="#professional-experience">
          <span lang="en">Experience</span>
          <span lang="es">Experience</span>
        </a>

        <a className="section" href="#projects">
          <span lang="en">Projects</span>
          <span lang="es">Proyectos</span>
        </a>

        <a className="section" href="#contact">
          <span lang="en">Contact</span>
          <span lang="es">Contacto</span>
        </a>
      </div>
    </nav>
  );
}
