<?php
 
    $url = 'https://jsonplaceholder.typicode.com/posts'; 
    $json = file_get_contents($url); 
    $array = json_encode($json);

    echo $array;
?>
