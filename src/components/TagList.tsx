import { getKeyFrom, Translatable, TranslatableString } from './Translatable';

export interface TagListProps {
  tags: TranslatableString[];
}

export function TagList({ tags }: TagListProps) {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <ul className="TagList">
      {tags.map(x => (
        <Tag key={getKeyFrom(x)} className="TagList__tag" value={x} />
      ))}
    </ul>
  );
}

interface TagProps {
  className?: string;
  value: TranslatableString;
}

function Tag({ value, className = '' }: TagProps) {
  return (
    <Translatable
      value={value}
      render={x => (
        <li className={className} data-value={x}>
          {x}
        </li>
      )}
    />
  );
}
