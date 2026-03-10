import type { ANALYSIS_STEPS } from '../analysis/components/analysis-badge'
import { AnalysisBadge } from '../analysis/components/analysis-badge'
import { useAnalyses } from '../analysis/hooks/use-analysis'
import { useAnalysisEvents } from '../analysis/hooks/use-analysis-events'
import { useStartAnalysis } from '../analysis/hooks/use-start-analysis'

export default function DashboardPage() {
  useAnalysisEvents()
  const {
    data: analyses,
  } = useAnalyses()

  const { mutate } = useStartAnalysis()

  return (
    <main className="container mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold">Test SSE + queues</h1>
      {
        analyses?.map(analysis => (
          <div key={analysis.id} className="flex flex-col rounded border-1 items-center w-80 rounded-lg gap-4 p-4">
            <div className="flex gap-2 items-baseline">
              <h2 className="text-3xl font-bold">
                {
                  analysis.id
                }
              </h2>
              <AnalysisBadge step={analysis.step as ANALYSIS_STEPS} />
            </div>
            <button onClick={() => mutate({ id: analysis.id })} className="bg-primary text-black rounded-md p-2">
              Start analysis
            </button>
          </div>
        ))
      }
    </main>
  )
}
