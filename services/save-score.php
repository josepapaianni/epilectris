<?php
$config = include('../config.php');
$mysqli = new mysqli($config["host"], $config["username"] , $config["password"], $config["dbName"]);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$nameToSave = mysqli_real_escape_string($mysqli,$_GET["name"]);
$scoreToSave = mysqli_real_escape_string($mysqli,$_GET["score"]);

debug_to_console($config["username"]);
debug_to_console($nameToSave);
debug_to_console($scoreToSave);

$sql = "INSERT INTO Players (name, score)
VALUES ('$nameToSave', '$scoreToSave')";

if ($mysqli->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}

$mysqli->close();


//helper to print console log
function debug_to_console( $data ) {

    if ( is_array( $data ) )
        $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
    else
        $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

    echo $output;
}


?>