<?php
    //liaison du fichier avec le modele
    require_once("../modele/club.php");

    //appele a la fonction getpays() 
    $res = getClubs();

    //encodage au format json
    echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));