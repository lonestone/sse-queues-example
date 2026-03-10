export enum ANALYSIS_STEPS {
  PROCESSING = 'processing',
  EXTRACTION = 'extraction',
  ANALYSIS_PART_ONE = 'analysis-part-one',
  ANALYSIS_PART_TWO = 'analysis-part-two',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export function AnalysisBadge({ step}: { step: ANALYSIS_STEPS }) {
  if (step === ANALYSIS_STEPS.PROCESSING) {
    return (
      <div className="rounded-full text-orange-800 bg-orange-200 p-2">
        Processing
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.EXTRACTION) {
    return (
      <div className="rounded-full text-orange-800 bg-orange-200 p-2">
        Extraction
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.ANALYSIS_PART_ONE) {
    return (
      <div className="rounded-full text-blue-800 bg-blue-200 p-2">
        Analysing part one
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.ANALYSIS_PART_TWO) {
    return (
      <div className="rounded-full text-purple-800 bg-purple-200 p-2">
        Analysing part two
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.COMPLETED) {
    return (
      <div className="rounded-full text-green-800 bg-green-200 p-2">
        Completed
      </div>
    )
  }
  else {
    return (
      <div className="rounded-full text-red-800 bg-red-200 p-2">
        Failed
      </div>
    )
  }
}
