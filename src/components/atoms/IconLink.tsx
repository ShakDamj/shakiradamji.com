import React from 'react';

export interface IconLinkProps {
  href: string | null | undefined;
  icon: JSX.Element;
}

export function IconLink({ href, icon }: IconLinkProps) {
  if (!href) {
    return null;
  }

  return (
    <a href={href} className="no-external">
      {icon}
    </a>
  );
}
