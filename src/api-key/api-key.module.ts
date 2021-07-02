import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApiKeyService } from './services';
import { ApiKeyController } from './controllers';
import { ApiKeyRepository } from './repositories';
import { ApiKey, apiKeySchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: apiKeySchema }]),
  ],
  providers: [ApiKeyService, ApiKeyRepository],
  controllers: [ApiKeyController],
  exports: [ApiKeyRepository],
})
export class ApiKeyModule {}
