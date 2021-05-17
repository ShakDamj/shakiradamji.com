export interface MomentProps {
  value: string;
}

export function Moment({ value }: MomentProps) {
  const date = value === 'current' ? getToday() : value;
  return <time dateTime={date}>{value}</time>;
}

function getToday() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
