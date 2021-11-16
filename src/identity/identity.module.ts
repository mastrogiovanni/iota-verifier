import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { ConfigModule } from '@nestjs/config';
import { SsiService } from './ssi-service';

@Module({
  controllers: [IdentityController],
  providers: [IdentityService, SsiService]
})
export class IdentityModule { }
