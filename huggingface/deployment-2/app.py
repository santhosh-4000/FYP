from transformers import pipeline
import librosa
import gradio as gr

def pipeline_predict(input):
  classifier = pipeline("audio-classification", model="santhosh-4000/wav2vec2-base-finetuned-mednames")
  return classifier(input)

def gradio_predict(audio):
  audio, rate = librosa.load(audio, sr=librosa.get_samplerate(audio))
  output = pipeline_predict(audio)
  return output

iface = gr.Interface(fn=gradio_predict, inputs=gr.Audio(source='microphone', type='filepath'), outputs="text")
iface.launch(debug=True)