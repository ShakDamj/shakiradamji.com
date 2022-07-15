export function removeDate(value: string) {
  return value.replace(/\/\d{4}-(\d{2}-)?(\d{2}-)?/, '/');
}
