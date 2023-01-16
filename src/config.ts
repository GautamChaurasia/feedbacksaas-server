//config file must be in the src dir

import { S3, Endpoint } from 'aws-sdk';

//AWS config
const config = {
  wasabiEndpointURL: 's3.ap-southeast-1.wasabisys.com',
  accessKeyId: 'EN6W5DIT555UJMHGBQ4K',
  secretAccessKey: '1p90ZQO8Ho4s6kVDtp1EknBcLf9fwsJ8VGL1rRfp',
  bucket: 'feedbacksaas',
  region: 'ap-southeast-1',
};

/*
s3 instance is initialized once and shared accross the application.
though new instances can be created from using ConfigModule, if required
*/
const s3 = new S3({
    endpoint: new Endpoint(config.wasabiEndpointURL),
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  })

config['s3'] = s3

export default () => config