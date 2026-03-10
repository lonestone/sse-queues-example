import type { AnalysisEventsSchema } from '@boilerstone/openapi-generator'
import { zAnalysisEventsSchema } from '@boilerstone/openapi-generator'
import { useQuery } from '@tanstack/react-query'

export const ANALYSES_QUERY_KEY = 'analyses'

const analysesIds = [
  'analysis-1',
  'analysis-2',
  'analysis-3',
  'analysis-4',
]

export function useAnalyses() {
  const query = useQuery({
    queryKey: [ANALYSES_QUERY_KEY],
    queryFn: async () => {
      const analyses: AnalysisEventsSchema[] = analysesIds.map(id => ({
        id,
        step: zAnalysisEventsSchema.shape.step.enum.completed,
      }))

      return analyses
    },
  })

  return query
}
