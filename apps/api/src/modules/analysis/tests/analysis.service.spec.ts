import { getQueueToken } from '@nestjs/bullmq'
import { Test, TestingModule } from '@nestjs/testing'
import { ANALYSIS_QUEUE_NAME } from '../analysis.processor'
import { AnalysisService } from '../analysis.service'

describe('analysisService', () => {
  let service: AnalysisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalysisService,
        { provide: getQueueToken(ANALYSIS_QUEUE_NAME), useValue: { add: vi.fn() } },
      ],
    }).compile()

    service = module.get<AnalysisService>(AnalysisService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
