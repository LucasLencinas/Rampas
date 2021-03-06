﻿var appID = '1506210606355968'; //tire asi de prueba

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
		return;
	}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.4";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
   
window.fbAsyncInit = function() {
    FB.init({
		appId      : appID,
		cookie	:true,
		xfbml      : true,
		version    : 'v2.4'
    });
};

function logoutFacebook(){	
	FB.logout(function(response) {
    });
}

function verificarEstadoFacebook(){
    FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
    });
}
function statusChangeCallback(response) {
	if (response.status === 'connected') { //Logeado en aplicacion y en Facebook.
		buscarUsuarioPorFacebook(response);
	} 
	else if (response.status === 'not_authorized') {//logged into Facebook, but not your app.
		} 
		else {// The person is not logged into Facebook, so we're not sure if
		}
}

function verificarConectadoFacebook(idFacebook){
	var r = false;
	var userIdFB = FB.getUserID();
	r = (userIdFB == idFacebook)
	return r;
}

function buscarUsuarioPorFacebook(response){
	var id = response.authResponse.userID;
	var uf={};
	if(buscarUsuarioFacebook(id)){//Esta registrado
		cerrarTodoM();
		mostrarMensajeBienvenida(unUsuario.nombre);
		guardarSesion(unUsuario);
	}
	else{//No esta registrado en la BD
		FB.api( '/me',{fields: 'first_name,last_name,email'}, function(response) {
			uf.nombre=response.first_name;	//GLOBAL
			uf.apellido=response.last_name
			uf.facebook=id;
			unUsuario=uf;
			cerrarTodoM();
			guardarSesion(unUsuario);
			nuevoUsuarioFacebook(uf);
		});
	}
}

function sincronizarDatosConFacebook(){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			var id = response.authResponse.userID;
			var uf={};
			FB.api( '/me',{fields: 'first_name,last_name,email'}, function(response) {
				uf.id=unUsuario.id;
				uf.nombre=response.first_name;	//GLOBAL
				uf.apellido=response.last_name
				uf.facebook=id;
				unUsuario=uf;
				document.getElementById("sesion").innerHTML = unUsuario.nombre;	
				modificarUsuarioFacebook(uf);
			});
		}
	});
}

function iniciarSesionFacebook(){
	FB.login(function(response) {
		console.log(response);
		verificarEstadoFacebook();
	}, {scope: 'public_profile'});
}

function compartirFacebook(){
	cerrardlgboxAlertaCompartir();
	FB.ui({
		method: 'feed',
		picture:'https://raw.githubusercontent.com/LucasLencinas/Rampas/master/rampas/src/main/webapp/imagen/logo.jpg',
		caption:'Senitag Desarrollos Informáticos.',
		description:'Una aplicación colaborativa para el uso de rampas con sillas de ruedas.',
		link:'http://masrampas.appspot.com/',
	}, function(response){});
}