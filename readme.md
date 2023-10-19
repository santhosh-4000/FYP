 ## Models training and comparision
 Notebooks folder contains jupyter notebooks used to fine-tune Wav2Vec2-base and notebooks used to get predictions on wav2vec2 without fine-tuning, google speech api, and whisper models to do comparision. We have following notebooks within this folder:
 * medicine_audio_classification (1).ipnyb contains code for fine-tuning Wav2Vec2-base model.
 * wav2vec2_direct.ipnyb contains code for evaluating Wav2Vec2-base model without fine-tuning on validation dataset
 * google_api_evaluate.ipnyb contains code for evaluating google speech API on validation dataset.
 * Whisper_direct.ipnyb contains code for evaluating whisper model on validation dataset.
 
 Dataset folder contains the folder containing final dataset with 900 datapoints and a metadata file to tell the huggingface datasets library what label is for each audio file present in the dataset.
> To run the jupyter notebooks, install packages mentioned in requirements.txt in the folder and change the dataset location in the jupyter nodebooks to the actual dataset location. Then, open the notebooks in any jupyter notebook environments and perform run all.


## Model deployment
Huggingface folder contains scripts that can be uploaded to huggingface spaces to use deployed model as a REST API. Deployment-1 folder contains initial model hosted [here](https://huggingface.co/spaces/santhosh-4000/medicine-name-ASR-prototype). Deployment-2 folder contains final model hosted [here](https://huggingface.co/spaces/santhosh-4000/medicine_ASR_Prototype).


## Web application
Webapp folder contains code related to web application. To run web application, install MongoDB and NodeJS into the system. Then, open terminal, navigate to the Webapp folder and run below commands.
> npm install
node app.js

Within Webapp folder, we have the following:
* views folder contains ejs templates for specifying views of pages. 
* routes folder contains index.js which is used to handle all requests to the backend server.
* public folder contains css and front-end javascript.
* app.js imports and instantiates back-end JavaScript packages , includes index.js and defines port to listen to on running.
