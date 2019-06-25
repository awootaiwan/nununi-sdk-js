const baseUrl = `${location.protocol}//${location.host}?menu=`
$('.sure-button').on('click', function(){
    val = $(".search-input").val();
    url = `${baseUrl}${val}`
    if ( val.trim() != "" ) {
        location.href = url
    }
})