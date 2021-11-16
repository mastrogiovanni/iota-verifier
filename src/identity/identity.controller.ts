import { Body, Controller, Get, Post } from '@nestjs/common';
import { VerifiableCredentialDto } from './dto/verifiablecredential.dto';
import { IdentityService } from './identity.service';

@Controller('api/v1/verification')
export class IdentityController {

    public constructor(
        private identityService: IdentityService
    ) {}

    @Post("/check-credential")
    public async verify(@Body() verifiableCredential: VerifiableCredentialDto) {
        return await this.identityService.verify(verifiableCredential);
    }
    
}
