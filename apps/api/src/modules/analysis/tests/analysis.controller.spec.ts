import { Test, TestingModule } from '@nestjs/testing'
import { AnalysisController } from '../analysis.controller'
import { AnalysisEventsService } from '../analysis-events.service'
import { AnalysisService } from '../analysis.service'

describe('analysisController', () => {
  let controller: AnalysisController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisController],
      providers: [
        { provide: AnalysisEventsService, useValue: { onUpdated: vi.fn() } },
        { provide: AnalysisService, useValue: { startAnalyze: vi.fn() } },
      ],
    }).compile()

    controller = module.get<AnalysisController>(AnalysisController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
