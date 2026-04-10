import { OpenTelemetryModule } from '@amplication/opentelemetry-nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { config } from './config/env.config'
import { AnalysisModule } from './modules/analysis/analysis.module'

@Module({
  imports: [
    OpenTelemetryModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: config.redis.host,
        port: config.redis.port,
      },
    }),
    NestConfigModule,
    AnalysisModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
