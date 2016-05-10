<?php

$sEmailBodyPath = "http://localhost/binarywealthmanagement.com/contact/email.php";

require_once  '../vendor/swiftmailer/swiftmailer/lib/swift_required.php';

session_start();


if($_POST){
    $aCustomer = $_POST;
    $_SESSION['aCustomer'] = $aCustomer;
}


$url = $sEmailBodyPath;
$data = $aCustomer;

// use key 'http' even if you send the request to https://...
$options = array('http' => array(
    'method'  => 'POST',
    'content' => http_build_query($data)
));

$context  = stream_context_create($options);
$sBody = @file_get_contents($url, false, $context);



//$sBody = file_get_contents('./email.php');

$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
    ->setUsername('captainbuggythefifth@gmail.com')
    ->setPassword('Kunsulidad');

$mailer = Swift_Mailer::newInstance($transport);

$message = Swift_Message::newInstance('Test Subject')
    ->setFrom(array('no-reply@binarywealthmanagement.com' => 'Customer Contact'))
    ->setTo(array('captainbuggythefifth@gmail.com'))
    ->setBody($sBody);

$result = $mailer->send($message);
$bResult = $result ? true : false;
$sMessage = ($result ? "Your inquiry was sent successfully. We will get back to you as soon as possible" : "Something went wrong. Please try again.");
$aResult = array(
    'bResult' => $bResult,
    'sMessage' => $sMessage
);

unset($_SESSION['aCustomer']);

echo json_encode($aResult);

?>