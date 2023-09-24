<?php
    //liaison du fichier avec le modele
    require_once("../modele/pays.php");

    //appele a la fonction getpays() 
    $res = getPays();

    //encodage au format json
    echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));
?>