export function getPoiIcon(type: string): string {
  switch (type) {
    case "trailhead":
      return "📍";
    case "exercise":
      return "💪";
    case "historical":
    case "farmhouse":
      return "🏠";
    case "well":
      return "🚰";
    case "sitting":
    case "bench":
      return "🪑";
    case "telephone":
      return "☎️";
    case "yellow-birch":
      return "🌳";
    case "labyrinth":
      return "🌀";
    default:
      return "📍";
  }
}
