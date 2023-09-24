<?php

    // fonction de connexion a la base de donnees
    function conn(){
        try {
            $conn = new PDO("mysql:host=localhost;dbname=bdclubfoot", "root", "");
            return $conn;
        } catch (PDOException $e) {
            die("<b>Erreur: </b>".$e->getMessage());
        }
    }

    // function d'ajout pays
    function addPays($data){

        // appel de la fonction connexion
        $cnx = conn(); // ou global $conn;
        
        //requete ajout

        $sql =  "INSERT INTO pays(indicatif,nom) VALUES (?,?);";
        $stmt = $cnx->prepare($sql);

        if($stmt->execute(array($data['ind'],$data['nom']))){
            return true;
        }else{
            return false;
        }

    }

    function getpays(){
        // faire référence à le variable $conn de la fun conn()
        $cnx = conn();

        $req = $cnx->query("SELECT * FROM pays");
        $req->execute();
        return $req;
    }

    function deletePays($pk){
        
        $cnx = conn();

        // $req = $cnx->query("DELETE FROM pays WHERE code=$pk");
        // $req->execute();

        $req = $cnx->prepare("DELETE FROM pays WHERE indicatif=?;");
        if($req->execute(array($pk))){
            return true;
        }else{
            return false;
        }

        

    }


?>