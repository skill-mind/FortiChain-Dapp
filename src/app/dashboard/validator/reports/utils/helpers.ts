export function getSeverityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return "bg-red-600 text-white";
    case "High":
      return "bg-orange-500 text-white";
    case "Medium":
      return "bg-blue-600 text-white";
    case "Low":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
