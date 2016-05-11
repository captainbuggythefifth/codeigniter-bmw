<?php
    if(isset($_SESSION['aCustomer'])){
        $aCustomer = $_SESSION['aCustomer'];
    }elseif(isset($_POST)){
        $aCustomer = $_POST;
    }

?>
Hi Customer Service,

Please take note of the query of the customer below:

Name: <?php echo $aCustomer['name']?>

Email: <?php echo $aCustomer['email']?>

Message: <?php echo $aCustomer['message']?>
