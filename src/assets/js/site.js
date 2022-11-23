// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

    $(function () {
        var idPag = document.getElementById("typing-text")
        if (idPag) {
            var typed = new Typed(".typing-text", {
                strings: ["seu Lar.", "seus Familiares.", "seu Futuro."],
                typeSpeed: 120,
                backSpeed: 120,
                loop: true
            })
        }
    })

    $(function () {
        $("#document-user").mask("000.000.000-00")
        $("#document-user").blur(function (event) {
            if ($(this).val().length == 14) {
                $("#document-user").mask("000.000.000-00")
            } else {
                $("#document-user").mask("00.000.000/0000-00")
            }
        })
        $("#tel-user").mask("(00) 00000-0009")
        $("#tel-user").blur(function (event) {
            if ($(this).val().length == 15) {
                $("#tel-user").mask("(00) 00000-0009")
            } else {
                $("#tel-user").mask("(00) 0000-00009")
            }
        })

        $("#cep-user").mask("00000-000")
    })
$(document).ready(() => {
    var footerYear = document.getElementById("year");
    if (footerYear)
        footerYear.insertAdjacentHTML('beforeend', new Date().getFullYear());
    //$('[data-toggle="tooltip"]').tooltip()
});