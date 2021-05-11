export interface RemixIconProps {
  name: string;
  title: string;
  fill?: boolean;
}

export function RemixIcon({ name, title, fill }: RemixIconProps) {
  const paintMode = fill ? 'fill' : 'line';
  return <i className={`ri-${name}-${paintMode}`}></i>;
}
