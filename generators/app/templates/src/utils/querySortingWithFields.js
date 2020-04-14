import ValidationError from '@<%= appNameUpperCamelCase %>/error/ValidationError';

export function parseQuerySortFields(query, fields) {
  const { sort } = query;

  if (!sort) return;
  let sortAbleFileds = sort.split(',');

  if (sortAbleFileds.length <= 1)
    throw new ValidationError('errors.general');

  sortAbleFileds = sortAbleFileds
    .map(sortAbleFiled => {
      if (sortAbleFiled[0] === '-' || sortAbleFiled[0] === '+') {
        const sortAbleFieldName = sortAbleFiled.substring(
          1,
          sortAbleFiled.length
        );
        const orderBy = sortAbleFiled[0] === '+' ? 'DESC' : 'ASC';

        if (fields.some(field => field === sortAbleFieldName)) {
          return [sortAbleFieldName, orderBy];
        }
      }
    })
    .find(item => !!item);

  return sortAbleFileds;
}
