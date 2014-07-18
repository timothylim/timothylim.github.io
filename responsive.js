$(function () {

    $('#pixels').text("pixel resolution: " + window.screen.availHeight + "x" + window.screen.availWidth);

    $('#ratio').text("pixel ratio: " + window.devicePixelRatio);

    $('#orientation').text("orientation: " + window.screen.orientation + "");


    var devicePixelRatio = window.devicePixelRatio || 1;
    dpi_x = document.getElementById('testdiv').offsetWidth * devicePixelRatio;
    dpi_y = document.getElementById('testdiv').offsetHeight * devicePixelRatio;

    $('#dpi').text("dpi: " + dpi_x + "x" +dpi_y);


})

