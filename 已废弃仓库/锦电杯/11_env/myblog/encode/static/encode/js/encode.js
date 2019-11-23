//test the javascript is available

rootDecode = "";
rootEncode = "";
timeRun = Date.parse(new Date());
timeOver = Date.parse(new Date());

//该闭包实现上传到服务器表单
(function () {

    var btn = document.getElementById("firstForm");
    var encode_request = new XMLHttpRequest();

    btn.addEventListener("submit", function (event) {
        console.log("trigger submit event");
        //prevent default form submit event
        event.preventDefault();
        //formData formatting
        var formData = new FormData();
        var file = document.getElementById("pictureFile").files[0];
        formData.append("img", file)
        //上传参数
        var noise = document.getElementById("noise").value;
        var salt_noise = document.getElementById("salt_noise").value;
        var change_factor = document.getElementById("change_factor").value;

        formData.append("noise", noise);
        formData.append("salt_noise", salt_noise);
        formData.append("change_factor", change_factor);

        //send ajax request to django
        encode_request.open("POST", "http://localhost:8000/encode/encode_picture", true);
        encode_request.timeout = 50000;
        encode_request.send(formData);
        timeRun = Date.parse(new Date());
        timeRun = new Date().getTime();
        //tiem set
        console.log(timeRun);
    });

    //bond ajax response event
    encode_request.onreadystatechange = function () {
        if (encode_request.readyState == 4) {
            try {
                if ((encode_request.status >= 200 && encode_request.status < 300) || encode_request.status == 304) {
                    console.log(encode_request.responseText);
                    var info = JSON.parse(encode_request.responseText)
                    console.log("info " + info.url_picture.decode);
                    //encode_url & decode_url of picture
                    var decode_url = info.url_picture.decode;
                    var encode_url = info.url_picture.encode;
                    var psnr = info.url_picture.psnr
                    //保存到全局变量中
                    rootDecode = decode_url;
                    rootEncode = encode_url;
                    console.log("解密图片: " + decode_url);
                    console.log("加密图片: " + encode_url);
                    //encode img in placeholder_encode
                    var placeholder_encode = document.getElementById("encode_after");
                    placeholder_encode.src = encode_url;
                    placeholder_encode.style.display = 'inline';
                    var placeholder_decode = document.getElementById("decode_after");
                    placeholder_decode.src = decode_url;
                    placeholder_decode.style.display = 'inline';
                    var big_Pic = document.querySelector(".bigPicture").style.display = "inline";
                    var big_Pic1= document.querySelector(".bigPicture1").style.display = "inline";
                    psnr_info = "psnr: " + psnr.toString();
                    console.log(psnr_info);
                    document.querySelector("#psnr").style.display = "inline";
                    document.getElementById("psnr").innerHTML = psnr_info;
                    //time set
                    timeOver = new Date().getTime();
                    console.log(timeOver);
                    console.log("diff: ")
                    if (timeOver - timeRun < 2000)
                        alert(timeOver - timeRun)
                    
                } else {
                    console.log("request was unsuccessful " + encode_request.status);
                }
            } catch (ex) {
                //progress by ontimeout event function
            }
        }
    }

    encode_request.ontimeout = function () {
        console.log("request did not return in a second");
    };
})();
document.getElementById("encode_after").addEventListener("click", function (e) {
    var newwin = window.open();
    newwin.document.write("Encode Picture Detail");
    console.log(rootEncode);
    var img = newwin.document.createElement("img")
    img.src = rootEncode
    newwin.document.body.appendChild(img)
})
document.getElementById("decode_after").addEventListener("click", function (e) {
    var newwin = window.open();
    newwin.document.write("Decode Picture detail<br/>");
    var img1 = newwin.document.createElement("img")
    img1.src = rootDecode
    newwin.document.body.appendChild(img1)
})