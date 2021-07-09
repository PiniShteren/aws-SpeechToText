const AWS = require("aws-sdk");
var config = ({
            apiVersion:'2017-10-26',
             region: 'us-east-1',
            accessKeyId:'AKIA6BISRYZ5BBGTJYR6',
            secretAccessKey:'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'
});
const S3 = new AWS.S3(config);
module.exports = {
	deleteObject: (callback) => {
		var params = {
			Bucket: "ps-first-bucket",
			Key: "audio.webm",
		};
		S3.deleteObject(params, (err, data) => {
			if (err) callback(false);
			else callback(true);
			// an error occurred
			// else console.log(data); // successful response
		});
	},
};
