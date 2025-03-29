<?php
// Database configuration
$db_host = "localhost";
$db_user = "root";
$db_pass = ""; // Update this to match your MySQL root password
$db_name = "mooncakes_db";

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password for security

    // Insert user into the database
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        // Redirect to login page after successful registration
        header("Location: login.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/registration.css">
    <title>Registration</title>
</head>
<body>
    <div class="container">
        <h2>Customer Registration</h2>
        <form method="POST" action="">
            <div class="form">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>
               
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
               
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="btn">Sign Up</button>
        </form>
    </div>

    <div class="login-link">
            Already have an account? <a href="logIN.php">Login here</a>
        </div>
</body>
</html>