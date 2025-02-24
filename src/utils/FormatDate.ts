import { format } from "date-fns";

export function FormatDate(date: string): string {
  return format(new Date(date), "dd/MM/yyyy");
}
