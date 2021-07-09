const aws = require('aws-sdk');
var config = ({
	apiVersion:'2017-10-26',
       region: 'us-east-1',
      accessKeyId:'AKIA6BISRYZ5BBGTJYR6',
      secretAccessKey:'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'
    });
const transcribeservice = new aws.TranscribeService(config);
module.exports = {
	addJob: (callback) => {
		const params = {
			Media: {
				MediaFileUri: "https://ps-first-bucket.s3.amazonaws.com/audio.webm",
			},
			TranscriptionJobName: "transs",
			IdentifyLanguage: true,
			LanguageOptions:["he-IL", "en-US"],
			MediaFormat: "webm",
			
		};
		transcribeservice.startTranscriptionJob(params, (err, data) => {
			if(err) {
				callback(false,err);
				
			}
			else{
				callback(true);
			}
		});
	},
};
