<?php 

  if (isset($_POST["submit"])) {
    // link to post on how to handle multiple input at the same time
    // https://stackoverflow.com/questions/46016784/multiple-users-write-to-the-same-file-at-the-same-time-using-php#
      $filename="log.csv";

      $ip = $_SERVER["REMOTE_ADDR"];
      $date = date("d/m/y");

      $myfile=fopen($filename, "a");

      $not_written = true;

      while($not_written) {
        if (flock($myfile, LOCK_EX)) {
          foreach ($_POST as $key => $value) {
            if ($key == "other") continue;
            fwrite($myfile, $value);
            fwrite($myfile, ",");
          }
          fwrite($myfile, $ip);
          fwrite($myfile, ",");
          fwrite($myfile, $date);
          fwrite($myfile, "\n");
          $not_written = false;
          flock($myfile, LOCK_UN);
        }
      }
      
      fclose($myfile);
      
      header("Location: report.html");
    exit();
  }
?>