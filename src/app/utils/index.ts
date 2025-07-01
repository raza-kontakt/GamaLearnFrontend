import moment from "moment";
import "moment-duration-format";

export * from "./status";
export * from "./query";

export const formatDateTime = (dateString: string): string => {
  if (!dateString) return "";

  try {
    return moment(dateString).format("DD/MM/YYYY HH:mm");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatDurationDescriptive = (
  durationInMinutes: number,
  t: (key: string, defaultValue?: string) => string
): string => {
  if (!durationInMinutes || durationInMinutes <= 0) {
    return t("duration.notStarted", "Not started");
  }

  try {
    const duration = moment.duration(durationInMinutes, "minutes");

    if (duration.asHours() >= 1) {
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      if (minutes === 0) {
        return `${hours}h`;
      }
      return `${hours}h ${minutes}m`;
    }

    return `${Math.floor(duration.asMinutes())}m`;
  } catch (error) {
    console.error("Error formatting duration:", error);
    return `${durationInMinutes}m`;
  }
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  try {
    return moment(dateString).format("DD/MM/YYYY");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatTime = (dateString: string): string => {
  if (!dateString) return "";

  try {
    return moment(dateString).format("HH:mm");
  } catch (error) {
    console.error("Error formatting time:", error);
    return dateString;
  }
};

export const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return "";

  try {
    return moment(dateString).fromNow();
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return dateString;
  }
};
