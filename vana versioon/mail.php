<?php
// Proccess at only POST metheod
// name of sender
$name = strip_tags(trim($_POST["name"]));

// Email of sender
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

// Phone nr
$phone = strip_tags(trim($_POST["phone"]));

// Sender Message
$message = trim($_POST["message"]);

// Your email where this email will be sent
$your_email = "henri.parkja@gmail.com";
//Your site name for identify 
$your_site_name = "Example";

// Build email subject
$email_subject = "Sõnum Ringi Äripark kodulehelt";

// Build Email Content
$email_content = "Nimi: {$name}\n";
$email_content .= "Email: {$email}\n";
$email_content .= "Telefon: {$phone}\n";
$email_content .= "Sõnum: {$message}\n";

// Build email headers
$email_headers = "From: {$name} <{$email}>";

// Send email
$send_email = mail($your_email, $email_subject, $email_content, $email_headers);

// Check email sent or not
if($send_email){
    // Send a 200 response code.
    http_response_code(200);
    echo "Aitäh. Teie sõnum on saadetud."; 
} else {
    // Send a 500 response code.
    http_response_code(500);
    echo "Oops! we couldn't send your message. Please try again later";
}
?>