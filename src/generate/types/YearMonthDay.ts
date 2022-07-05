type FourDigits = `${number}${number}${number}${number}`;
type TwoDigits = `${number}${number}`;

export type YearMonthDay =
  | `${FourDigits}`
  | `${FourDigits}-${TwoDigits}`
  | `${FourDigits}-${TwoDigits}-${TwoDigits}`;
