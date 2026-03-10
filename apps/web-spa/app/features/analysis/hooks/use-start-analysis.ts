import { analysisControllerStartAnalyze } from '@boilerstone/openapi-generator'
import { useMutation } from '@tanstack/react-query'

export function useStartAnalysis() {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await analysisControllerStartAnalyze({
        path: { id },
      })

      if (response.error) {
        throw new Error(response.error as string)
      }

      return response.data
    },
  })
}
