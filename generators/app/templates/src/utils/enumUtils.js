export function checkIfInEnum(enumObj, value) {
  return Object.values(enumObj).some((enumValue) => enumValue === value);
}
