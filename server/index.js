const { json } = require("express");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const { addFileToS3 } = require("./add");
const { addJob } = require("./transcribe-create-job");
const { getJob } = require("./getJob");
const { deleteObject } = require("./delete-object");
const { deleteJob } = require("./deleteJob");
app.use(json({limit:10000000}));
app.use(cors());
app.post("/trans", (req, res) => {
	const { audio } = req.body;
     scpeechToText(audio, (r) => {
            res.send(r.data ? r.data.results.transcripts[0].transcript : 'err')
     })
});

const scpeechToText = (audio, callBack) => {
      
      const addFileToBucket = (audio) => {
            addFileToS3(audio, (cb) => {
                 if (cb) {
                  console.log('2. file added ti s3');
                  createJob();
            } else {
                  console.log(cb);
            }
            });
      };
      
      const createJob = () => {
            count = 0;
            //3. create job in transcribe aws
            addJob((cb, message) =>{
                        if (cb) {
                        console.log('3. create job');
                        getJobFunc();
                  } else {
                        console.log(message);
                        // deleteEvents();
                  }
            }
            );
      };
      
      const getJobFunc = () => {
            //4. get transcription
            getJob((res) => {
                  if (res !== false) {
                        console.log('4. get job');
                        checkJobResult(res);
                  } else {
                        getJobFuncAgain();
                  }
            });
      };

      const getJobFuncAgain = () => {
            setTimeout(()=>{
                  console.log('4. get job again');
                  getJobFunc();
            },1000)
      }
      
      const checkJobResult = (result ) => {
            if (result.TranscriptionJob.TranscriptionJobStatus === "COMPLETED") {
                  axios.get(result.TranscriptionJob.Transcript. TranscriptFileUri).then((re) => {
                        console.log('5. result sended');
                       callBack(re)
                  })
                  deleteEvents();
            } else if(result.TranscriptionJob.TranscriptionJobStatus === "FAILED"){
                  callBack('transition failed!');
                  // deleteEvents();
            }
             else {
                  setTimeout(() => {
                        getJobFunc();
                  }, 1000);
            }
      };
      
      const deleteEvents = () => {
            setTimeout(() => {
                  deleteJob((r) => {
                  if (r) {
                        console.log('delete job');
                  }else{
                        console.log(err);
                  }
            });
            deleteObject((r) => {
                   if(r) console.log("delete object");
            });},2000)
      };
      addFileToBucket(audio)
}


app.listen(process.env.PORT || 3003);
