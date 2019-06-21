const baseUrl = `${location.protocol}//${location.host}?menu=`
$('.sure-botton').on('click', function(){
    val = $(".search-input").val();
    url = `${baseUrl}${val}`
    if(!val == "" || val == NULL) {
        location.href = url
    }
})