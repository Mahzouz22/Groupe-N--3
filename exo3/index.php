<?php
if (isset($_POST['calcul'])) {

    $nbr1 = $_POST['val1'];
    $nbr2 = $_POST['val2'];


    function getpgcd($nbr1, $nbr2) {
        if (!$nbr2) {
          return $nbr1;
        }
        return getpgcd($nbr2, $nbr1 % $nbr2);
        
       }
} 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PGCD</title>
</head>
<body>
<style>
    h1{
        text-align: center;
    }
    label{
      margin-left: 20%; 
    }
    button{
        margin-left: 48%;
    }
    .result{
        margin-left: 32%;
    }
    form{
        margin: auto;
        height: 250px;
        width: 65%;
        border: 1px groove black;
        border-radius: 15px;
        padding: 5% 5%;
    }

</style>
    <h1>PGCD(A,B)</h1>
        <form action="index.php" method="post">
              <label for="val1">A:
              <input type="number" id="val1" name="val1"  value='<?php if (isset($_POST['calcul'])) {echo $nbr1;}?>'>
              </label>
              <label class="cote" for="val2">B:
              <input type="number" id="val2" name="val2"  value='<?php if (isset($_POST['calcul'])) {echo $nbr2;}?>'>
              </label><br><br>
              <button type="submit" name="calcul">Donner</button><br><br><br>

              <label class="result" for="result">Résultat:
                <input id="result" type="text" disabled="disabled" value='<?php if (isset($_POST['calcul'])) {echo getpgcd($nbr1, $nbr2);}?>'>
              </label>
        </form>
   
</body>
</html>