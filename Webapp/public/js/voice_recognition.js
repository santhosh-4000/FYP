    var dict = {
      mic_medicine_name: "medicine_name",
      mic_medicine_conc: "medicine_conc",
      mic_medicine_dosg: "medicine_dosg",
      mic_medicine_quantity: "medicine_quantity",
      mic_prescription_notes: "prescription_notes",
      mic_patient_symptoms: "patient_symptoms",
      mic_patient_diagnosis: "patient_diagnosis"
    }
    
if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
  
    var input_id = "";
    let final_transcript = "";
    let recognizing = false
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en_IN";
  
    speechRecognition.onstart = (event) => {
      recognizing = true
    };
    speechRecognition.onerror = () => {
      speechRecognition.stop();
      recognizing=false;
    };
    speechRecognition.onend = () => {
      speechRecognition.stop();
      recognizing = false;
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      console.log(final_transcript);
      console.log(input_id);
      document.querySelector(input_id).value = final_transcript + interim_transcript;
    };

    function startButton(event) {
      input_id = "#" + dict[event.target.id];

      if (recognizing) {
        speechRecognition.stop();
        recognizing = false
        document.querySelector(input_id).value = final_transcript;
        return;
      }
      final_transcript = '';
      speechRecognition.start();
    }
} else {
    console.log("Speech Recognition Not Available");
  }