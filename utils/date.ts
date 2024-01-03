export default function sqlDate(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}
