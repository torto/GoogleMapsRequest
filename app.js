var init = (function() {

  //GERE UMA NOVA KEY NA API DO GOOGLE
  //CASO NÃO GERE VAI DAR O LIMITE DA MINHA CONTA E VÃO ME COBRAR!
  var key = 'AIzaSyCHSUW-YgEo23UkGtAyLaU6yuFo37B-21s';
  var startUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

  function getJsonCresol(callback) {
    var json = /*INSIRA AQUI O JSON*/ '';
    callback(json);
  }

  var values = {
    url: '',
    async: false,
    rest: 'GET'
  };

  var cresol = {};

  getJsonCresol(function(value) {
    cresol = JSON.parse(value);
    console.log(cresol);
    for (var i = 0; i < cresol.length; i++) {

      requestLatitudeAndLogintude(cresol[i], i, function(retorno, ii) {
        cresol[ii] = retorno;
      });
    }

    //JSON COM RESULTADOS CORRETOS
    console.log(cresol);
  });

  function requestLatitudeAndLogintude(value, i, callback) {
    values.url = createAddressString(value);
    ajax(values, function(request) {
      var retorno = JSON.parse(request);
      if (retorno.results) {
        value.latitude = retorno.results[0].geometry.location.lat;
        value.longitude = retorno.results[0].geometry.location.lng;
        callback(value, i);
      }
    });

  }

  function createAddressString(value) {
    return startUrl + createKey() + createAddress(value) + createComponent(value);
  }

  //METODOS PARA MONTAR A URL DE CONSUMO
  //DA LATITUDE E LONGITUDE
  function unionURL(address) {
    return startUrl + createKey + createAddress(address);
  }

  function createComponent(value) {
    return '&components=country:Brazil|administrative_area:' + value.estado + '|postal_code:' + value.cep;
  }

  function createAddress(value) {
    return '&address=' + (value.numero ? value.numero : '') + ' ' + (values.logradouro ? values.logradouro : '') + ' ' + value.bairro + ', ' + value.cidade;
  }

  function createKey() {
    return 'key=' + key;
  }

  function ajax(values, callback) {
      var oReq = new XMLHttpRequest({
        mozSystem: true
      });
      // oReq.withCredentials = true;
      oReq.onreadystatechange = function() {
        if (oReq.readyState == 4 && oReq.status == 200) {
          callback(oReq.responseText);
        }
      };
      oReq.open(values.rest, values.url, values.async);
      oReq.send(null);
  }
})();
