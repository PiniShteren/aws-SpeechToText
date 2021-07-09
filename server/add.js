const AWS = require("aws-sdk");
var config = ({
            apiVersion:'2017-10-26',
             region: 'us-east-1',
            accessKeyId:'AKIA6BISRYZ5BBGTJYR6',
            secretAccessKey:'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'
});
const S3 = new AWS.S3(config);

module.exports = {
	addFileToS3:(audio, callback) => {
		const file =  Buffer.from(
			                  audio.replace("data:audio/webm;codecs=opus;base64,", ""),
			                  "base64"
			            );
		const uploadParams = {
			Bucket: "ps-first-bucket",
			Key: "audio.webm",
			Body: file,
			ContentEncoding: "base64",
			ContentType: "audio/webm",
			ACL: "public-read-write",
		};
		S3.putObject(uploadParams, (err, data) => {
			if(err) callback(err);
			else callback(true)
		})
	},
};
