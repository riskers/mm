function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

function showImg(result){
    var result = JSON.parse(result) ;
    var data = result['0'] ;
    
    var template = this.tpl.innerHTML ;
    var html = Mustache.render(template,{
    	data : data 
    })
	document.getElementById('wrap').innerHTML = html ;
}

var url = 'http://meimeigirl.sinaapp.com/?num=1';
httpRequest(url, showImg);

var oBtn = document.getElementById('next') ,
	This = this 
oBtn.addEventListener('click',function(){
	httpRequest(url, showImg);
},false)

