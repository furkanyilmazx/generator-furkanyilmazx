export function paginationConverter({ page=0, pageSize=10 }) {
  let offset = page * pageSize;
  return { offset, limit: pageSize, page, pageSize };
}
