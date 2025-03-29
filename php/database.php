<?php

// Database configuration
$db_host = "localhost";     // Database host (usually localhost)
$db_user = "root";          // Database username
$db_pass = "";              // Database password (empty string if no password)
$db_name = "mooncakes_db";  // Database name

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: set character set
if (!$conn->set_charset("utf8mb4")) {
    die("Error loading character set utf8mb4: " . $conn->error);
}

// Example usage:
function executeQuery($sql) {
    global $conn;
    $result = $conn->query($sql);
    
    if ($result === false) {
        echo "Error executing query: " . $conn->error;
        return false;
    }
    
    return $result;
}

// Uncomment the following line to close the connection when done
// $conn->close();
?>