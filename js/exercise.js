$(document).ready(function () {

    $(".exercise-card").on("click", function () {

        const data = {
            id: $(this).data("id"),
            name: $(this).data("name"),
            sets: $(this).data("sets"),
            reps: $(this).data("reps")
        ,
            video: $(this).data("video") || ""};

        sessionStorage.setItem("selectedExercise", JSON.stringify(data));
        window.location.href = "report-form.html";
    });

    $("#menuToggle").on("click", function () {
        $("#sideNav").toggleClass("open");
        $("#menuOverlay").prop("hidden", false);
    });

    $("#menuOverlay").on("click", function () {
        $("#sideNav").removeClass("open");
        $(this).prop("hidden", true);
    });

});
