import { z } from "zod";

export const geocodeSchema = z.array(
  z.object({
    name: z.string(),
    local_names: z.record(z.string(), z.string()),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string().optional(),
  }),
);

export type CityResponse = z.infer<typeof geocodeSchema>;
