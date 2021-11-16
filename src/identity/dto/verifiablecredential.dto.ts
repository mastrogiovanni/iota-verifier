import { Type } from "class-transformer";
import { ArrayMinSize, IsDate, IsNotEmpty, IsNotEmptyObject, Length } from "class-validator";

export class VerifiableCredentialSubjectDto {

    @Length(50, 53)
    @IsNotEmpty()
    id: string;

    @Length(1)
    @IsNotEmpty()
	type: string;
    
    @Length(50, 53)
    initiatorId: string;

}

export class Proof {

    @IsNotEmpty()
    @Length(1)
    type: string;
    
    @IsNotEmpty()
    @Length(1)
    verificationMethod: string;

    @IsNotEmpty()
    @Length(1)
    signatureValue: string;

}

export class VerifiableCredentialDto {

    @IsNotEmpty()
    @Length(50, 53)
    id: string;
    
    @IsNotEmpty()
    @ArrayMinSize(1)
    type: string[];

    @IsNotEmptyObject()
    credentialSubject: VerifiableCredentialSubjectDto;

    @IsNotEmpty()
    @Length(50, 53)
    issuer: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    issuanceDate: Date;

    @IsNotEmptyObject()
    proof: Proof;

}