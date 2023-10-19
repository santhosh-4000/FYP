window.jsPDF = window.jspdf.jsPDF

function toggleSubmitPopup() {
    $("#confirm_prescription").toggle();
}

$(document).ready(() => {

    $("#form").submit((event) => {
        event.preventDefault();

        const prescribeData = {
            'doctor_email': $("#doctor_email").text(),
            'patient_phone': $("#patient_phone").val(),
            'patient_symptoms': $("#patient_symptoms").val(),
            'patient_diagnosis': $("#patient_diagnosis").val(),
            'medicine_list': prescriptionItems,
            'notes': $("#prescription_notes").val(),
        }

        $.ajax({
            type: 'POST',
            url: '/submitprescribe',
            data: prescribeData,
            dataType: "json",
            success: (res) => {
                toggleSubmitPopup();
                $(window).scrollTop(0);
                console.log(res.Success);
            },
            error: (err) => {
                console.log(err);
            }
        })
    });

    $("#topdf_btn").click((event) => {
        event.preventDefault();
        let doc = new jsPDF('p', 'mm', 'a4');
        doc.setFontSize(9);

        doc.text(20, 20, 'Date: '+ $("#current_date").text());
        doc.text(20, 30, 'Time: '+ $("#current_time").text());
        doc.text(20, 40, 'Doctor email: '+ $("#doctor_email").text());
        doc.text(20, 50, 'Doctor name: '+ $("#doctor_name").text());
        doc.text(20, 60, 'Patient phone: '+ $("#patient_phone").val());
        doc.text(20, 70, 'Patient name: '+ $("#patient_name").val());
        doc.text(20, 80, 'Patient DOB: '+ $("#patient_dob").val());
        doc.text(20, 90, 'Patient health issue: '+ $("#health_issue").val());
        doc.text(20, 100, 'Patient symptoms: '+ $("#patient_symptoms").val());
        doc.text(20, 110, 'Patient diagnosis: '+ $("#patient_diagnosis").val());

        doc.autoTable({html: '#table', startY: 120});
        let finalY = doc.lastAutoTable.finalY;
        doc.text(20, finalY+20, 'Prescription notes: '+ $("#prescription_notes").val())

        doc.save('Test.pdf')
    })

});