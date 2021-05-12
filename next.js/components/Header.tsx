import React from 'https://esm.sh/react';

export function Header() {
  return (
    <header>
      <div className="author-info">
        <h1 className="full-name">
          <span className="name-part abbreviated">Adrián</span>
          <span className="name-part">Mat&iacute;as</span>
          <span className="name-part">Quezada</span>
        </h1>

        <h3 className="subtitle">
          <span lang="en">Senior Software Engineer</span>
          <span lang="es">Senior Software Engineer</span>
        </h3>
      </div>

      <div className="controls"></div>
    </header>
  );
}
