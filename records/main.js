var http_request = new XMLHttpRequest(),
    url = "http://fenw.etsisi.upm.es:10000/records";
http_request.open("GET", url, true); 
http_request.responseType = 'json'; 
http_request.onload = TrataRespuesta; 
http_request.send();

function TrataRespuesta() {
    if (http_request.status == 200) {
        let respuesta = http_request.response;
        for(i=0;i<respuesta.length;i++){
            let fecha,fechaRecord,fechaReal;
            fecha = new Date();
            fechaRecord = respuesta[i].recordDate;
            fecha.setTime(fechaRecord);
            fechaReal = fecha.getDate()+'/'+ (fecha.getMonth() + 1) +'/'+fecha.getFullYear();
            $('tbody').append("<tr><th scope=\"row\">"+(i+1)+".</th><td>"+respuesta[i].username+"</td><td>"+respuesta[i].punctuation+"</td><td>"+respuesta[i].cards+"</td><td>"+respuesta[i].disposedTime+"</td><td>"+fechaReal+"</td></tr>");
        }
    }else{
        alert("Ocurrio un problema con la URL.");
    }
        
}