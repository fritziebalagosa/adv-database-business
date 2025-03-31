<?php
// Database configuration
include 'database.php'; 

if (!isset($conn) || !$conn instanceof mysqli) {
    die("Database connection is not properly initialized.");
}

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            // Redirect to index.html
            header("Location: test.php");
            exit();
        } else {
            echo "<script>alert('Invalid password.');</script>";
        }
    } else {
        echo "<script>alert('No user found with that email.');</script>";
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/logIN.css">
    <title>Log In</title>
</head>
<body>
    <div class="container">
        <h2>LOG IN</h2>
        <form method="POST" action="">
            <div class="form">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
               
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="btn">Log in</button>
        </form>

        <div class="login-link">
            Don't have an account? <a href="registration.php">Sign Up here</a>
        </div>
    </div>
</body>
</html>