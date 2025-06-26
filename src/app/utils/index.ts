import moment from "moment";
import i18n from "../locales/i18n";

export const formatDateTime = (dateString: string) => {
  if (!dateString) return "";
  const lang = i18n.language;
  const date = moment(dateString);
  if (lang === "ar") {
    date.locale("ar");
    return date.format("YYYY/MM/DD HH:mm");
  } else {
    date.locale("en");
    return date.format("YYYY/MM/DD HH:mm");
  }
};

export function formatDurationDescriptive(
  seconds: number,
  t: (key: string, options?: any) => string
): string {
  const duration = moment.duration(seconds, "seconds");
  const parts = [];
  const h = duration.hours();
  const m = duration.minutes();
  const s = duration.seconds();

  if (h) parts.push(`${h} ${t("duration.hour", { count: h })}`);
  if (m) parts.push(`${m} ${t("duration.minute", { count: m })}`);
  if (s || parts.length === 0)
    parts.push(`${s} ${t("duration.second", { count: s })}`);

  return parts.join(" ");
}
