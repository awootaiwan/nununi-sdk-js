const baseUrl = `${location.protocol}//${location.host}?menu=`
$('.sure-bottom').on('click', function(){
    val = $(".search-input").val();
    url = `${baseUrl}${val}`
    location.href = url
})