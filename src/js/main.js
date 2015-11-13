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

function showGirl(result){
    //var result = JSON.parse(result);

    var data = result ;

    var template = this.tpl.innerHTML ;
    var html = Mustache.render(template,{
        data : data 
    })
    
    document.getElementById('wrap').innerHTML = html ;
}

function init(){
    Data = [] ;
    index = 0 ;

    httpRequest('http://api.huceo.com/meinv/?key=d26f6065854d1d1c77ac84972f6f84f9&num=50&rand=2',function(e){
        var e = JSON.parse(e) ;

        for(var i=0;i<47;i++){
            Data.push(e[i]) ;
        }
        
        showGirl(Data[index++]);
        //document.gextElementById('test').innerHTML = index
    });
}

var Data = [] ,
    index = 0 ;

var oBtn = document.getElementById('next') ;

init() ;

oBtn.addEventListener('click',function(){
    if(index=>5){
        init()
    }else{
        showGirl(Data[index++])    
        document.getElementById('test').innerHTML = index
    }
},false)




