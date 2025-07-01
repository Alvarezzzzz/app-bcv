import z from "zod";

const singleDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const rangeDateRegex = /^\d{4}-\d{2}-\d{2}-to-\d{4}-\d{2}-\d{2}$/;
const dateOrRangeSchema = z
  .string()
  .refine(
    (value) => singleDateRegex.test(value) || rangeDateRegex.test(value),
    {
      message:
        "Debe ser una fecha (YYYY-MM-DD) o un rango (YYYY-MM-DD-to-YYYY-MM-DD)",
    }
  );
export const validateDateOrRange = (input) =>
  dateOrRangeSchema.safeParse(input);
