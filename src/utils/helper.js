export const formatTimestampToDate = (timestamp) => {
  return new Date(timestamp).toISOString().split("T")[0];
};

export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Format: YYYY-MM-DD HH:mm:ss
}

export function formatSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  // Format with leading zeros if necessary
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = hours > 0 ? `${hours} giờ` : "";
  const formattedMinutes = minutes > 0 ? `${minutes} phút` : "";
  const formattedSeconds = secs > 0 ? `${secs} giây` : "";

  return [formattedHours, formattedMinutes, formattedSeconds]
    .filter((part) => part) // Remove empty parts
    .join(", ");
}
