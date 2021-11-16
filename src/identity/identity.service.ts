import { VerifiableCredentialDto } from './dto/verifiablecredential.dto';
import { SsiService } from './ssi-service';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {

    private readonly logger = new Logger(IdentityService.name);

    constructor(
        private readonly ssiService: SsiService
    ) { }

    private error(issuer: string, error: string) {
        return { 
            issuer, 
            isVerified: false, 
            error
        };
    }

    private valid(issuer: string) {
        return {
            issuer,
            isValid: true
        }
    }

    async verify(verifiableCredential: VerifiableCredentialDto) {
        try {
            const issuerDoc = await this.ssiService.getLatestIdentityDoc(verifiableCredential.issuer);
            if (!issuerDoc) {
                return this.error(verifiableCredential.issuer, "Issuer is not on the tangle")
            }

            const isIssuerVerified = issuerDoc.verify();
            if (!isIssuerVerified) {
                return this.error(verifiableCredential.issuer, "Issuer is not verified")
            }

            const subjectDoc = await this.ssiService.getLatestIdentityDoc(verifiableCredential.id);
            if (!subjectDoc) {
                return this.error(verifiableCredential.issuer, "Subject is not on the tangle")
            }

            const isSubjectVerified = subjectDoc.verify();
            if (!isSubjectVerified) {
                return this.error(verifiableCredential.issuer, "Subject is not verified")
            }

            const credentialVerified = issuerDoc.verifyData(verifiableCredential);
            if (!credentialVerified) {
                return this.error(verifiableCredential.issuer, "VerifiableCredential is not verifiable by issuer")
            }

            return this.valid(verifiableCredential.issuer);
        }
        catch (e) {
            this.logger.error("Error verifying credential: " + e.message);
            return { issuer: verifiableCredential.issuer, verified: false, error: e.message };
        }

    }

}
