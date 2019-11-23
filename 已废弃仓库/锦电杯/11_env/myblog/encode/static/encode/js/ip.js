

var ip_request = new XMLHttpRequest();
ip_request.onreadystatechange = function () {
    if (ip_request.readyState == 4) {
        try {
            if ((ip_request.status >= 200 && ip_request.status < 300) || ip_request.status == 304) {
                console.log(ip_request.responseText);
                var info = JSON.parse(ip_request.responseText)
                console.log("v4地址:" + info.v4_address);
                console.log("计算机名: " + info.computer_name);
            } else {
                console.log("request was unsuccessful " + ip_request.status);
            }
        } catch (ex) {
            //假设由ontimeout事件处理程序
        }
    }
}

ip_request.ontimeout = function () {
    console.log("request did not return in a second");
};
document.getElementById("get_ip").addEventListener("click", function () {
    //执行请求时，先打开，后执行
    ip_request.open("get", "http://localhost:8000/encode", true);
    ip_request.timeout = 10000;
    ip_request.send(null);
})
