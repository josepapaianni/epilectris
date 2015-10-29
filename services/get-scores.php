<?php
$config = include('../config.php');
$mysqli = new mysqli($config["host"], $config["username"] , $config["password"], $config["dbName"]);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$queryHighScores = "SELECT * FROM Players ORDER BY score DESC LIMIT 10";

$result = $mysqli->query($queryHighScores);
//$row = mysqli_fetch_assoc($result);
//$row = mysql_fetch_array($result);
$index = 0;
while($row =  mysqli_fetch_assoc($result)) {
    $resultsArray[$index] = $row;
    $index++;

}

echo json_encode($resultsArray);

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