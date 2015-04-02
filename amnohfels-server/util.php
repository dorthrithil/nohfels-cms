<?php
function tinyIntToBoolean($int){
    if($int == 1) return true;
    if($int == 0) return false;
    throw new Exception('Invalid Argument: "'.$int.'" is not in tinyint format. (util.php / tinyIntToBoolean())');
}