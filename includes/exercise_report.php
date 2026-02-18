<?php

$server_name = "127.0.0.1";
$user_name = "shanimi2_u1";
$password = "shanimichaeli123";
$database_name = "shanimi2_exercise_report";

$conn = new mysqli($server_name, $user_name, $password, $database_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_id      = $_POST['user_id'];
$exercise_id  = $_POST['exercise_id'];
$completed    = $_POST['completed'];

$pain_level   = isset($_POST['pain']) ? $_POST['pain'] : null;
$effort_level = isset($_POST['effort']) ? $_POST['effort'] : null;
$notes        = isset($_POST['notes']) ? $_POST['notes'] : null;

$reason       = isset($_POST['reason']) ? $_POST['reason'] : null;
$reason_text  = isset($_POST['reasonText']) ? $_POST['reasonText'] : null;

$sql = "INSERT INTO exercise_report
(user_id, exercise_id, completed, pain_level, effort_level, notes, reason, reason_text)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "iiiiisss",
    $user_id,
    $exercise_id,
    $completed,
    $pain_level,
    $effort_level,
    $notes,
    $reason,
    $reason_text
);

if ($stmt->execute()) {
    echo "Report saved successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>
