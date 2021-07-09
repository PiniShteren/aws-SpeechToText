const aws = require('aws-sdk');
var config = ({
	apiVersion:'2017-10-26',
       region: 'us-east-1',
      accessKeyId:'AKIA6BISRYZ5BBGTJYR6',
      secretAccessKey:'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'
    });
const transcribeservice = new aws.TranscribeService(config);
module.exports = transcribeservice;