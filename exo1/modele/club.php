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

    // function d'ajout CladdClub
    function addClub($data){

        // appel de la fonction connexion
        $cnx = conn(); // ou global $conn;
        
        //requete ajout

        $sql =  "INSERT INTO club(code,nom,ville,idpays) VALUES (?,?,?,?);";
        $stmt = $cnx->prepare($sql);

        if($stmt->execute(array($data['code'],$data['nom'],$data['ville'],$data['selpays']))){
            return true;
        }else{
            return false;
        }

    }

    function getClubs(){
        // faire référence à le variable $conn de la fun conn()
        $cnx = conn();

        $req = $cnx->query("SELECT * FROM club");
        $req->execute();
        return $req;
    }

    function deleteClub($pk){
        
        $cnx = conn();

        // $req = $cnx->query("DELETE FROM CladdClub WHERE code=$pk");
        // $req->execute();

        $req = $cnx->prepare("DELETE FROM club WHERE code=?;");
        if($req->execute(array($pk))){
            return true;
        }else{
            return false;
        }

        

    }


?>