import type { AnalysisEventsSchema } from '@boilerstone/openapi-generator'
import { analysisControllerGetEvents, zAnalysisEventsSchema } from '@boilerstone/openapi-generator'
import {
  queryOptions,
  experimental_streamedQuery as streamedQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { ANALYSES_QUERY_KEY } from './use-analysis'

export const ANALYSIS_EVENTS_QUERY_KEY = ['analysis'] as const

export function useAnalysisEvents() {
  const queryClient = useQueryClient()
  const lastProcessedLengthRef = useRef(0)

  const query = queryOptions({
    queryKey: ANALYSIS_EVENTS_QUERY_KEY,
    queryFn: streamedQuery({
      streamFn: async () => {
        const { stream } = await analysisControllerGetEvents()
        return stream
      },
    }),
  })

  const { data: streamedData } = useQuery(query)

  useEffect(() => {
    const events = Array.isArray(streamedData) ? streamedData : []
    const from = lastProcessedLengthRef.current
    if (from >= events.length) {
      return
    }

    const toProcess = events.slice(from)

    for (const raw of toProcess) {
      try {
        const eventData = zAnalysisEventsSchema.parse(raw)

        queryClient.setQueryData([ANALYSES_QUERY_KEY], (previousAnalyses: AnalysisEventsSchema[]) => {
          return previousAnalyses.map((analyse) => {
            if (analyse.id === eventData.id) {
              return {
                ...analyse,
                ...eventData,
              }
            }
            else {
              return {
                ...analyse,
              }
            }
          })
        })
      }
      catch (error) {
        console.error('Error handling events:', error)
      }
    }
  }, [streamedData, queryClient])

  return { streamedData }
}
