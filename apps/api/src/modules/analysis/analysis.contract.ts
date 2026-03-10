import { registerSchema } from '@lonestone/nzoth/server'
import z from 'zod'

export const ANALYSIS_STEPS = {
  PROCESSING: 'processing',
  EXTRACTION: 'extraction',
  ANALYSIS_PART_ONE: 'analysis-part-one',
  ANALYSIS_PART_TWO: 'analysis-part-two',
  COMPLETED: 'completed',
  FAILED: 'failed',
}

export const analysisJobDataSchema = z.object({
  analysisId: z.string(),
  step: z.enum([
    ANALYSIS_STEPS.EXTRACTION,
    ANALYSIS_STEPS.ANALYSIS_PART_ONE,
    ANALYSIS_STEPS.ANALYSIS_PART_TWO,
    ANALYSIS_STEPS.FAILED,
    ANALYSIS_STEPS.COMPLETED,
  ]),
})

export type AnalysisJobData = z.infer<typeof analysisJobDataSchema>

// Events
export const analysisEventsSchema = z.object({
  id: z.uuid(),
  step: z.enum([
    ANALYSIS_STEPS.EXTRACTION,
    ANALYSIS_STEPS.ANALYSIS_PART_ONE,
    ANALYSIS_STEPS.ANALYSIS_PART_TWO,
    ANALYSIS_STEPS.FAILED,
    ANALYSIS_STEPS.COMPLETED,
  ]),
}).meta({
  title: 'Analysis events schema ',
  description: 'Analysis events schema',
})

export type AnalysisEvent = z.infer<typeof analysisEventsSchema>

registerSchema(analysisEventsSchema)
