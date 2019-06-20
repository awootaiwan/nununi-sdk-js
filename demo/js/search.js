const baseUrl = `${location.protocol}//${location.host}?tag=`
$('.sure-bottom').on('click', function(){
    val = $(".search-input").val();
    url = `${baseUrl}${val}`
    location.href = url
})