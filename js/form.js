$(document).ready(function () {

    try {
        const raw = sessionStorage.getItem("selectedExercise");
        if (raw) {
            const ex = JSON.parse(raw);

            if ($("#exerciseTitle").length) $("#exerciseTitle").text(ex.name || "Exercise");
            if ($("#exerciseDetails").length) {
                const details = `${ex.sets || ""} sets × ${ex.reps || ""}`;
                $("#exerciseDetails").text(details.trim());
            }

            if ($("#exerciseId").length) $("#exerciseId").val(ex.id || "");

            if (ex.video) {
                const watchUrl = (ex.video || "").toString().trim();

                let videoId = "";
                const vParam = watchUrl.match(/[?&]v=([^&]+)/);
                const shortLink = watchUrl.match(/youtu\.be\/([^?&/]+)/);
                const embedLink = watchUrl.match(/youtube\.com\/embed\/([^?&/]+)/);

                if (vParam && vParam[1]) videoId = vParam[1];
                else if (shortLink && shortLink[1]) videoId = shortLink[1];
                else if (embedLink && embedLink[1]) videoId = embedLink[1];

                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : watchUrl;

                $("#exerciseVideoSection").prop("hidden", false);
                $("#exerciseVideo").attr("src", embedUrl);            } else {
                $("#exerciseVideoSection").prop("hidden", true);
                $("#exerciseVideo").attr("src", "");
            }
        }
    } catch (err) {
    }

    if ($("#exerciseId").length && !$("#exerciseId").val()) {
        $("#exerciseId").val("1");
    }



    $("input[name='completed']").on("change", function () {

        const value = $("input[name='completed']:checked").val();

        if (value === "1") {
            $("#completedFields").show();
            $("#notCompletedFields").hide();
        } else {
            $("#completedFields").hide();
            $("#notCompletedFields").show();
        }

    });

    $("input[name='completed']:checked").trigger("change");


    function toggleOtherReason() {
        const reason = $("#reasonSelect").val();
        if (reason === "other") {
            $("#otherReasonGroup").show();
        } else {
            $("#otherReasonGroup").hide();
            $("#reasonText").val("");
        }
    }

    $("#reasonSelect").on("change", toggleOtherReason);
    toggleOtherReason();



    $("#exerciseReportForm").on("submit", function (e) {

        let valid = true;

        $(".error-text").remove();
        $("input, select, textarea").removeClass("field-error");

        const completed = $("input[name='completed']:checked").val();

        if (completed === "1") {

            const pain = $("#pain").val();
            const effort = $("#effort").val();

            if (pain === "" || pain < 0 || pain > 10) {
                $("#pain")
                    .addClass("field-error")
                    .after("<span class='error-text'>Pain must be 0-10</span>");
                valid = false;
            }

            if (effort === "" || effort < 1 || effort > 10) {
                $("#effort")
                    .addClass("field-error")
                    .after("<span class='error-text'>Effort must be 1-10</span>");
                valid = false;
            }

            const notes = ($("#notes").val() || "").trim();
            if (notes && notes.length < 5) {
                $("#notes")
                    .addClass("field-error")
                    .after("<span class='error-text'>Minimum 5 characters</span>");
                valid = false;
            }

        }
        else {

            const reason = $("#reasonSelect").val();

            if (reason === "") {
                $("#reasonSelect")
                    .addClass("field-error")
                    .after("<span class='error-text'>Please select a reason</span>");
                valid = false;
            }

            if (reason === "other") {
                const txt = ($("#reasonText").val() || "").trim();
                if (!txt) {
                    $("#reasonText")
                        .addClass("field-error")
                        .after("<span class='error-text'>Please explain</span>");
                    valid = false;
                } else if (txt.length < 5) {
                    $("#reasonText")
                        .addClass("field-error")
                        .after("<span class='error-text'>Minimum 5 characters</span>");
                    valid = false;
                }
            }
        }

        e.preventDefault();

        if (!valid) return;

        const $form = $(this);
        const $msg = $("#formMessage");
        const $btn = $form.find("button[type='submit']");

        if ($msg.data("hideTimer")) {
            clearTimeout($msg.data("hideTimer"));
            $msg.removeData("hideTimer");
        }
        $msg.stop(true, true).show();

        $msg.removeClass("success error").text("");
        $btn.prop("disabled", true);

        $.ajax({
            url: $form.attr("action"),
            type: "POST",
            data: $form.serialize(),
            success: function (res) {
                const text = (res || "").toString().trim();

                if (text.toLowerCase().includes("success")) {
                    $msg.addClass("success").text("Report saved successfully");

                    const t = setTimeout(function () {
                        $msg.fadeOut(200, function () {
                            $msg.removeClass("success").text("").show();
                        });
                    }, 3500);
                    $msg.data("hideTimer", t);
                } else {
                    $msg.addClass("error").text(text || "Something went wrong. Please try again.");
                }
            },
            error: function () {
                $msg.addClass("error").text("Server error. Please try again.");
            },
            complete: function () {
                $btn.prop("disabled", false);
            }
        });

    });

});
