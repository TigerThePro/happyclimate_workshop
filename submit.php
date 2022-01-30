<?php 

  if (isset($_POST["submit"])) {
    // link to post on how to handle multiple input at the same time
    // https://stackoverflow.com/questions/46016784/multiple-users-write-to-the-same-file-at-the-same-time-using-php#
      $filename="log.csv";

      $ip = $_SERVER["REMOTE_ADDR"];

      $myfile=fopen($filename, "a");
      // fwrite($myfile, $inputs); 
      foreach ($_POST as $key => $value) {
        fwrite($myfile, $value);
        fwrite($myfile, ",");
      }
      fwrite($myfile, $ip);
      fwrite($myfile, "\n");
      
      fclose($myfile);
      
      header("Location: report.html");
    exit();
  }
?>