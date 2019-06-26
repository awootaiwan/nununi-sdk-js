const baseUrl = `${location.protocol}//${location.host}?tags=`
$('.sure-button').on('click', function(){
    val = $(".search-input").val();
    url = `${baseUrl}${val}`
    if ( val.trim() != "" ) {
        location.href = url
    }
})

$('.search-input').on("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     $(".sure-button").click();
    }
});