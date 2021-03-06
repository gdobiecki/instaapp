$('document').ready(function() {

    function generateUrl() {
        $.getJSON("config/data.json", function (json) {
            var clientId = json.data.clientId,
                clientSecret = json.data.clientSecret,
                websiteUrl = json.data.websiteUrl,
                redirectUrl = json.data.redirectUrl,
                url = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + redirectUrl + '&response_type=code';

            document.getElementById("authorize").setAttribute("href", url);

            var link = $("a[id='authorize']");

            link.on('click', function() {
                $.ajax({
                    method: "POST",
                    dataType: "jsonp",
                    data: {
                        client_id: clientId,
                        client_secret: clientSecret,
                        grant_type: 'authorization_code',
                        redirect_url: redirectUrl,
                        code: getCode()
                    },
                    url: "https://api.instagram.com/oauth/access_token",
                    success: function (data) {
                        console.log(data);
                    }
                })
            })
        })
    }

    function getCode() {
        var code = 'code',
            key = code.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"), // escape RegEx meta chars
            match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));

        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    generateUrl();
});