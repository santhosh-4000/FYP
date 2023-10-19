CREATE DATABASE E_Prescription_WebApp;
use E_Prescription_WebApp;

CREATE TABLE Doctor_details
(
doctor_id varchar(500),
doctor_name varchar(500),
hospital_name varchar(500),
PRIMARY KEY (doctor_id)
);

CREATE TABLE Patient_details
(
patient_id varchar(500),
patient_name varchar(500),
patient_age varchar(500),
patient_addr text,
PRIMARY KEY (patient_id)
);

CREATE TABLE Prescription_header
(
patient_id varchar(500),
doctor_id varchar(500),
prescription_id varchar(500),
prescription_date date,
prescription_time time,
symptoms text,
diagnosis text,
notes text,
PRIMARY KEY (prescription_id),
FOREIGN KEY (patient_id) REFERENCES Patient_details(patient_id),
FOREIGN KEY (doctor_id) REFERENCES Doctor_details(doctor_id)
);

CREATE TABLE Prescription_medicines
(
  prescription_id varchar(500),
  medicine_name varchar(500),
  medicine_conc varchar(500),
  medicine_dosage text,
  quantity varchar(500),
  FOREIGN KEY (prescription_id) REFERENCES Prescription_header(prescription_id)
);


