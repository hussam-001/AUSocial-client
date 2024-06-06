const sanitizePrice = (value: any) => {
  if (!value) return null;

  const sanitizedValue = value.toString().replace(/[^\d.]/g, "");
  const [integerPart, fractionalPart] = sanitizedValue.split(".");

  const truncatedFractionalPart = fractionalPart?.slice(0, 2) || "";
  const sanitizedPrice =
    integerPart +
    (truncatedFractionalPart ? "." + truncatedFractionalPart : "");

  return sanitizedPrice || null;
};

const validateValue = (value: any) => {
  if (value !== 0 && !value) return null;
  const parsedValue = Number(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

const BASE_FACTOR = 100;

export const convertPriceToBaseUnit = (
  value: any,
  factor: number = BASE_FACTOR
) => {
  const parsedValue = validateValue(sanitizePrice(value));
  return parsedValue !== null ? parsedValue * factor : null;
};

export const convertToTargetUnit = (
  value: any,
  factor: number = BASE_FACTOR
) => {
  const parsedValue = validateValue(value);
  return parsedValue !== null ? parsedValue / factor : null;
};
