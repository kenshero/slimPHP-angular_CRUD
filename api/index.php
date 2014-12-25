<?php

// Autoload
require '../vendor/autoload.php';

// Instantiate a Slim application
$app = new \Slim\Slim();

try {
   $db = getConnection();
  }catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

function getConnection() {
  $dbhost="127.0.0.1";
  $dbuser="root";
  $dbpass="1234";
  $dbname="testAPI";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}

// Define a HTTP GET route

$app->post('/add', function () use($app, $db) {


  $user = json_decode($app->request()->getBody());

  //print_r($user->params->username);

  $sql = "INSERT INTO members (userName,Phone) VALUES (:userName,:Phone)";
  try {
     $db = getConnection();
     $stmt = $db->prepare($sql);  
     $stmt->execute(array(':userName'=>$user->params->username,':Phone'=>$user->params->password));
     $db = null;
     echo json_encode($user); 
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
});



$app->post('/edit/:ID', function ($ID) use($app, $db) {

  try {
  $db = getConnection();
  $editData = json_decode($app->request()->getBody());
  $db->exec("UPDATE members SET userName='".$editData->params->userName."', Phone='".$editData->params->Phone."' 
  WHERE ID='".$editData->params->ID."' ") or die(print_r($db->errorInfo(), true));
  $db = null;
  echo json_encode($editData); 
    } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

});


$app->get('/getdata', function () {

     try {
	   $sql = "select * FROM members ";
	   $db = getConnection();
	   $stmt = $db->query($sql);  
	   $wines = $stmt->fetchAll(PDO::FETCH_OBJ);
	   $db = null;
	   echo json_encode($wines);
	  }catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	  }
	  
});

$app->get('/delete/:id', function ($id) use($app, $db) {

  $db->exec("DELETE FROM members WHERE ID = $id ")or die(print_r($db->errorInfo(), true));
  print_r($id);
    
});


// Run the Slim application
$app->run();

?>