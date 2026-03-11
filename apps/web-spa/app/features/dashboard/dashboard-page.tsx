import { Button } from '@boilerstone/ui/components/primitives/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@boilerstone/ui/components/primitives/card'
import { ANALYSIS_STEPS, AnalysisBadge } from '../analysis/components/analysis-badge'
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
    <main className="container mx-auto py-8 px-4 space-y-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Super projet : SSE + queues</h1>
      {
        analyses?.map(analysis => (
          <Card key={analysis.id} className="w-80 min-h-50 justify-between">
            <CardHeader className="flex flex-row gap-2 items-center justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle>Analysis</CardTitle>
                <CardDescription><pre className="text-xs">{analysis.id}</pre></CardDescription>
              </div>
              <AnalysisBadge step={analysis.step as ANALYSIS_STEPS} />
            </CardHeader>
            <CardFooter className="flex justify-center items-center">
              <Button onClick={() => mutate({ id: analysis.id })} disabled={!(analysis.step === ANALYSIS_STEPS.FAILED || analysis.step === ANALYSIS_STEPS.COMPLETED)}>
                Start analysis
              </Button>
            </CardFooter>
          </Card>
        ))
      }
    </main>
  )
}
