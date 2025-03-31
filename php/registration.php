<?php
// Database configuration
include 'database.php'; 

// Ensure $conn is a valid mysqli object
if (!isset($conn) || !$conn instanceof mysqli) {
    die("Database connection not properly initialized.");
}

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $contact_num = $conn->real_escape_string($_POST['contact_num']); 
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password for security

    // Insert user into the database 
    $sql = "INSERT INTO users (username, email, contact_num, password) 
            VALUES ('$username', '$email', '$contact_num', '$password')";

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

                <label for="phone">Contact Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your contact number" pattern="[0-9]{10,11}" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="btn">Sign Up</button>
        </form>

        <div>
    <p class="login-text">Already have an account? <a href="http://localhost:3000/php/logIN.php">Login here</a></p>
</div>
    </div>

</body>
</html>