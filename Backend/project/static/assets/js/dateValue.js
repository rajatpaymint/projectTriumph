$(document).ready(function (){
    var $datevalue1 = $('date1')
    var $datevalue2 = $('date2')
    $datevalue1.on('load', function(e) {
         $datevalue1.addvalue("2021-11-02")
    })
})