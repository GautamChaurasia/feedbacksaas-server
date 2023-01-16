"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const config = {
    wasabiEndpointURL: 's3.ap-southeast-1.wasabisys.com',
    accessKeyId: 'EN6W5DIT555UJMHGBQ4K',
    secretAccessKey: '1p90ZQO8Ho4s6kVDtp1EknBcLf9fwsJ8VGL1rRfp',
    bucket: 'feedbacksaas',
    region: 'ap-southeast-1',
};
const s3 = new aws_sdk_1.S3({
    endpoint: new aws_sdk_1.Endpoint(config.wasabiEndpointURL),
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
});
config['s3'] = s3;
exports.default = () => config;
//# sourceMappingURL=config.js.map