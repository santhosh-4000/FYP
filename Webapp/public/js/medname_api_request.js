async function getMedName(audio_base64) {
	const response = await fetch("https://santhosh-4000-medicine-asr-prototype.hf.space/run/predict", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			data: [
				{"name":"audio.wav","data": audio_base64},
			]
		})
	});

	const res = await response.json();

	const medname = JSON.parse(res.data[0].replaceAll(`'`, `"`))[0]["label"];
	document.querySelector("#medicine_name").value = medname;
}

if (navigator.mediaDevices) {
	console.log("getUserMedia supported.");
    
	const mic = document.querySelector("#mic_medicine_name");
	let audio_base64;
	let recognizing = false;
	const reader = new FileReader();
  
	const constraints = { audio: true };
	let chunks = [];
  
	navigator.mediaDevices
	  .getUserMedia(constraints)
	  .then((stream) => {
		const mediaRecorder = new MediaRecorder(stream);
  
		mic.onclick = () => {
		  if(recognizing) {
				mediaRecorder.stop();
				return;
		   }
		  mediaRecorder.start();
		  recognizing = true;
		};
  
		mediaRecorder.onstop = (e) => {
		  console.log("data available after MediaRecorder.stop() called.");

		  const blob = new Blob(chunks, { type: "audio/wav" });
		  const reader = new FileReader();
		  reader.readAsDataURL(blob);
		  reader.onload =  function () {
		    audio_base64 = reader.result
			getMedName(audio_base64);
		  };

          
		  reader.onerror = function (error) {
		    console.log('Error: base64 audio conversion error', error);
		  };
		  chunks = [];
		  console.log("recorder stopped");
		  recognizing = false;
		};
  
		mediaRecorder.ondataavailable = (e) => {
		  chunks.push(e.data);
		};

	  })
	  .catch((err) => {
		console.error(`The following error occurred: ${err}`);
	  });
  }
  