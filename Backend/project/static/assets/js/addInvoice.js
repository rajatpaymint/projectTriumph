$(document).ready(function() {
    var $paymateMargin = $('#paymateMargin')
    var $paymateMarginMessage = $('#paymateMarginMessage')
    var $paymateMinInt = $('#paymateMinInt')
    var $paymateMinIntMessage = $('#paymateMinIntMessage')

    
    $paymateMargin.on('input', function(e) {
        var paymateNet = Math.round($paymateMargin.val()*0.3*0.82*100)/100
        $paymateMarginMessage.html("PayMate's Net Margin: " + paymateNet + "%")
    })

    $paymateMinInt.on('input', function(e) {
        var paymateMin = Math.round($paymateMinInt.val()*0.82*100)/100
        $paymateMinIntMessage.html("Net Min Interest: " + paymateMin + "%")
    }) 
        

    
})