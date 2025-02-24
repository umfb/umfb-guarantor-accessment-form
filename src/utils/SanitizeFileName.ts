export function Sanitizer(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_.-]/g, "");
}
