<?php 
  require('pdfphp/fpdf.php');
  // include ('submit.js');

  if (isset($_POST["submit"])) {

    // link to post on how to handle multiple input at the same time
    // https://stackoverflow.com/questions/46016784/multiple-users-write-to-the-same-file-at-the-same-time-using-php#
      $filename="log.csv";

      $ip = $_SERVER["REMOTE_ADDR"];
      $beef = $_POST["beef"];
      $chicken = $_POST["chicken"];
      $milk = $_POST["milk"];
      $egg = $_POST["egg"];

      $myfile=fopen($filename, "a");
      fwrite($myfile, $ip);
      fwrite($myfile, ",");
      fwrite($myfile, $beef);
      fwrite($myfile, ",");
      fwrite($myfile, $chicken);
      fwrite($myfile, ",");
      fwrite($myfile, $milk);
      fwrite($myfile, ",");
      fwrite($myfile, $egg);
      fwrite($myfile, "\n");
      fclose($myfile);
    

    $pdf=new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(40,10,'Hello World!');
    $pdf->Output();

    echo '<script type="text/javascript" src="submit.js"> make_pdf() </script>';

    exit();
  }
?>