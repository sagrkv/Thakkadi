import { z } from 'zod';

/** Limitation calculator URL params */
export const limitationParamsSchema = z.object({
  ct: z.enum(['civil', 'criminal', 'writ']).optional(),
  cl: z.enum([
    'civil_judge_junior',
    'civil_judge_senior',
    'district_court',
    'jmfc',
    'cjm',
    'sessions_court',
    'family_court',
    'commercial_court',
    'consumer_district',
    'consumer_state',
    'high_court',
    'supreme_court',
  ]).optional(),
  jt: z.enum(['final', 'interim']).optional(),
  jd: z.string().optional(), // judgment date ISO
  ca: z.string().optional(), // certified copy applied date
  cr: z.string().optional(), // certified copy received date
});

export type LimitationParams = z.infer<typeof limitationParamsSchema>;

/** Court fee calculator URL params */
export const courtFeeParamsSchema = z.object({
  g: z.string().optional(), // group
  s: z.string().optional(), // suit type id
  v: z.string().optional(), // JSON-encoded input values
});

export type CourtFeeParams = z.infer<typeof courtFeeParamsSchema>;

/** Stamp duty calculator URL params */
export const stampDutyParamsSchema = z.object({
  c: z.string().optional(),  // category
  i: z.string().optional(),  // instrument id
  pv: z.string().optional(), // property value
  loc: z.enum(['bbmp', 'bmrda', 'municipal', 'rural']).optional(),
  fam: z.enum(['1', '0']).optional(),  // is family
  scst: z.enum(['1', '0']).optional(), // SC/ST
  fp: z.enum(['1', '0']).optional(),   // first property
});

export type StampDutyParams = z.infer<typeof stampDutyParamsSchema>;
