export function slugFromId(id: string) {
  return id.replace(/\.json$/, "");
}
