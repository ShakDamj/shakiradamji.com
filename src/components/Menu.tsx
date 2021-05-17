import React, { Children, PropsWithChildren } from 'react';

export function Menu({ children }: PropsWithChildren<{}>) {
  const [first, ...rest] = Children.toArray(children);

  return (
    <div className="Menu">
      <div className="Menu__content">{rest}</div>
      <div className="Menu__header">{first}</div>
    </div>
  );
}
