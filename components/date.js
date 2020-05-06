import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time datestring={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
