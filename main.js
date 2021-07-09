// const axios = require('./axios');
const record = document.getElementById("record");
const stop = document.getElementById("stop");
let blob;
const divTrans = document.getElementById("div-trans");

stop.disable = true;

if (navigator.mediaDevices.getUserMedia) {
	const constraints = { audio: true };
	let chunks = [];
	let onSuccess = (stream) => {
		var mediaRecorder = new MediaRecorder(stream);

		// visualize(stream);

		record.onclick = () => {
			mediaRecorder.start();
			record.classList.add("recording");
			stop.disabled = false;
			record.disabled = true;
		};

		stop.onclick = () => {
			setTimeout(() => {
				mediaRecorder.stop();
				record.classList.remove("recording");
				stop.disabled = true;
				record.disabled = false;
			},2000);
		};

		mediaRecorder.onstop = () => {
			blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
			chunks = [];
			ShowTrans();
		};
		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data);
		};
	};

	let onError = (err) => {
		console.log(err);
	};

	navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
} else {
	alert("getUserMedia not supported on your browser!");
}

const ShowTrans = (lang) => {
	var reader = new FileReader();
	reader.onload = (e) => {
		sendToServer(e.target.result, lang);
	};
	reader.readAsDataURL(blob);
};

const sendToServer = (file, lang) => {
	var resB = document.getElementById("result");
	resB.innerHTML = "loading...";
	resB.classList.add("load");
	axios({
		method: "post",
		url: "http://localhost:3003/trans",
		data: {
			audio: file,
			lang: lang,
		},
	})
		.then((res) => {
			printResult(res, resB);
		})
		.catch((err) => {
			console.log(err);
		});
};
const printResult = (data, resB) => {
	resB.classList.remove("load");
	if (data.data === "err") {
		resB.innerHTML = "error";
	} else if (data.data) {
		resB.innerHTML = data.data;
	} else {
		resB.innerHTML = "No Results";
	}
};
