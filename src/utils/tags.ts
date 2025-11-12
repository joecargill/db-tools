export function flattenTags(tags) {
  return [
    ...(tags && tags.type ? tags.type : []),
    ...(tags && tags.environment ? tags.environment : []),
    ...(tags && tags.trait ? tags.trait : []),
  ].filter(Boolean);
}