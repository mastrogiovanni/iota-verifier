import * as Identity from '@iota/identity-wasm/node';
import { ConfigService } from '@nestjs/config';
import { Logger, Injectable } from '@nestjs/common';

const { Document, VerifiableCredential, VerificationMethod, KeyCollection, Client } = Identity;

@Injectable()
export class SsiService {

	private readonly logger = new Logger(SsiService.name);

	constructor(
		private configService: ConfigService 
	) {}

	private getIdentityClient(usePermaNode?: boolean) {
		const cfg = Identity.Config.fromNetwork(Identity.Network.mainnet());
		if (usePermaNode) {
			cfg.setPermanode(this.configService.get<string>('IOTA_PERMA_NODE', 'https://chrysalis-chronicle.iota.org/api/mainnet/'));
		}
		cfg.setNode(this.configService.get<string>('IOTA_HORNET_NODE', 'https://chrysalis-nodes.iota.org:443'));
		return Client.fromConfig(cfg);
	}

	async getLatestIdentityJson(did: string): Promise<{ document: any; messageId: string }> {
		try {
			const client = this.getIdentityClient(true);
			return await client.resolve(did);
		} catch (error) {
			this.logger.error(`Error from identity sdk: ${error}`);
			throw new Error('could not get the latest identity');
		}
	}

	async getLatestIdentityDoc(did: string): Promise<Identity.Document> {
		try {
			const document = await this.getLatestIdentityJson(did);
			const doc = Document.fromJSON(document);
			if (!doc) {
				throw new Error('could not parse json');
			}
			return doc;
		} catch (error) {
			this.logger.error(`Error from identity sdk: ${error}`);
			throw new Error('could not get the latest identity');
		}
	}

}
