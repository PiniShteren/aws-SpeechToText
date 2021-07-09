const AWS  = require('aws-sdk');
var transcribeservice = new AWS.TranscribeService({
      apiVersion:'2017-10-26',
       region: 'us-east-1',
      accessKeyId:'AKIA6BISRYZ5BBGTJYR6',
      secretAccessKey:'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'
});
module.exports = {
      getJob: (callback) => {
            transcribeservice.getTranscriptionJob({TranscriptionJobName:'transs'}, (err, data) => {
                  if(err) {
                        callback(false);
                  }
                  else {
                        callback(data);
                  }
            })
      }
}