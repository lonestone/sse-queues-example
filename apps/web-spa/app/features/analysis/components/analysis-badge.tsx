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
      <div className="text-sm rounded-full text-orange-800 border-orange-500 bg-orange-200 px-2 py-1">
        Processing...
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.EXTRACTION) {
    return (
      <div className="text-sm rounded-full text-orange-800 border-orange-500 bg-orange-200 px-2 py-1">
        Extraction...
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.ANALYSIS_PART_ONE) {
    return (
      <div className="text-sm rounded-full text-blue-800 border-blue-500 bg-blue-200 px-2 py-1">
        Analysis part one...
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.ANALYSIS_PART_TWO) {
    return (
      <div className="text-sm rounded-full text-purple-800 border-purple-500 bg-purple-200 px-2 py-1">
        Analysis part two...
      </div>
    )
  }
  else if (step === ANALYSIS_STEPS.COMPLETED) {
    return (
      <div className="text-sm rounded-full text-green-800 border-green-500 bg-green-200 px-2 py-1">
        Completed
      </div>
    )
  }
  else {
    return (
      <div className="text-sm rounded-full text-red-800 border-red-500 bg-red-200 px-2 py-1">
        Failed
      </div>
    )
  }
}
