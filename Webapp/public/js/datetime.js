function refreshTimeAndDate() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth()+1) + '-'+ today.getFullYear();
    document.getElementById("current_date").innerHTML = date;
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("current_time").innerHTML = time;
}

setInterval(refreshTimeAndDate, 1000);