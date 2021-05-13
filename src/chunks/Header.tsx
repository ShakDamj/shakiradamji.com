import css from './Header.module.css';

export function Header() {
  return (
    <header>
      <div className="author-info">
        <h1 className={css.name}>
          <span className={css.abbreviated}>Adrián</span> Matías Quezada
        </h1>

        <h3 className="subtitle">Senior Software Engineer</h3>
      </div>
    </header>
  );
}
