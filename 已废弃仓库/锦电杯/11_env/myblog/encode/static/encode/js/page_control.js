
function clearDefault(id) {
    //console.log(id);
    document.getElementById(id).value = "";
}
//实现 降噪系数，salt系数，调整系数的默认值设定和focus事件删除默认值
(function () {
    window.onload = console.log("javaScript load well");
    var noise = document.getElementById("noise");
    var salt_noise = document.getElementById("salt_noise");
    var change_factor = document.getElementById("change_factor");
    //利用bind函数来实现事件绑定
    noise.addEventListener("focus", clearDefault.bind(this, "noise"), false);
    salt_noise.addEventListener("focus", clearDefault.bind(this, "salt_noise"), false);
    change_factor.addEventListener("focus", clearDefault.bind(this, "change_factor"), false);
    noise.value = 0.0;
    salt_noise.value = 0.05;
    change_factor.value = 0.90;
})();

//该闭包实现选中图片预览的功能
(function () {
    var preview = document.getElementById("preview");

    var input = document.getElementById("pictureFile");
    input.addEventListener("change", function () {
        console.log("input change");
        var imgFile = input.files[0];
        //console.log(document.querySelector(".mask").value)
        var pictureName = imgFile.name;
        pictureName = pictureName.substring(0, 20);
        document.querySelector(".maskText").innerHTML = "选择的图片是" + pictureName;
        var fr = new FileReader();

        fr.onload = function () {
            preview.src = fr.result;
           
           // document.getElementById("preview_id").style.backgroundImage = ' url(' + fr.result + ')';
            //document.getElementById("preview_id").style.backgroundRepeat = 'no-repeat';
        };
        fr.readAsDataURL(imgFile);
        preview.style.display = "block";
       
    });

})();

window.onload = function () {
    var e = document.getElementById("refreshed");
    console.log("load success")
    if (e.value == "no") e.value = "yes";
    else {
    e.value = "no"; location.reload();

    }
}
