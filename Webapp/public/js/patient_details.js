$(document).ready(() => {

    $("#get_patient").click((event) => {
        event.preventDefault();
        const queryData =  {
            'patient_phone': $('#patient_phone').val()
        };
        document.getElementById("check").innerText = "";

        $.ajax({
            type: 'POST',
            url: '/getpatient',
            data: queryData,
            dataType: "json",
            success: (res) => {
                console.log(res);
                const res_data = res.Success;
                if (res_data == "no patient found for given number!") {
                    document.getElementById("check").innerText = res_data;
                } else {
                    document.getElementById("patient_name").value = res_data.patient_name;
                    document.getElementById("patient_dob").value = res_data.dateofbirth.split("T")[0];
                    document.getElementById("health_issue").value = res_data.healthissue;
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    $("#get_patient_history").click((event) => {
        event.preventDefault();
        document.getElementById("check").innerText = "";
        window.open("/getpatienthistory?patient_phone=" + $('#patient_phone').val());
    });

});