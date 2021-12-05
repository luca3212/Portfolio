
//menu mobile
const btonMenu = document.getElementById('btonburger');
const menuMostrar = document.getElementById('menuLista');
const iconoMenu = document.getElementById('iconoMenu');

btonMenu.addEventListener('click', ()=>{
  controlMenu();
});

function controlMenu(){
  menuMostrar.classList.toggle('menuMostrar');
  iconoMenu.classList.toggle('mdi-menu');
  iconoMenu.classList.toggle('mdi-close');
}

$('ul.tabs li a').click(function(){
  var ancho =$(window).width();
  if (ancho <= 760) {
    controlMenu();
  }
});

//boton up
const btonSubir = document.getElementById("icoUp");

btonSubir.addEventListener('click', ()=>{
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

function scrollUp(){
    if(this.scrollY >= 560){
      btonSubir.classList.add('show-scroll');
    } else{
      btonSubir.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);

//contacto- mensaje
const nombreContacto  = document.getElementById("name");
const emailContacto   = document.getElementById("mail");
const mensajeContacto = document.getElementById("mensaje");
const formContact = document.querySelector('#formId');

const modal = document.getElementById('modal');
const spinner = document.getElementById('spinnerCarga');
const alerta = document.getElementById('alertEstado');
const textAlerta = document.getElementById('alertMensaje');

formContact.addEventListener('submit', (e)=>{
  
  e.preventDefault();
  if(validarForm()){
    modal.style.display = 'block';
    spinner.style.display = 'block';

    datosJSON={
      "Nombre": nombreContacto.value,
      "Email": emailContacto.value,
      "Mensaje": mensajeContacto.value
    };
    
    fetch("https://api-conect.herokuapp.com/api/email/contacto", {
      method: "POST",
      //body: new FormData(e.target),
      body:  JSON.stringify(datosJSON),
      headers: {'Content-Type': 'application/json'}
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(json => {
        spinner.style.display = 'none';

        alerta.style.display = 'block';
        textAlerta.innerText = 'El Mensaje fue enviado con éxito!';

        setTimeout(() => {
          alerta.style.display = 'none';
          modal.style.display = 'none';
        }, 2500);
       
      })
      .catch(err => {
        spinner.style.display = 'none';

        alerta.style.display = 'block';
        textAlerta.innerText = 'Hubo un error, intente nuevamente..';

        setTimeout(() => {
          alerta.style.display = 'none';
          modal.style.display = 'none';
        }, 3000);
      })
      .finally(() => {
        formContact.reset();
      })
  }

});

function validarForm(){
  const validador = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let controlMail = validador.test(emailContacto.value);

  if(nombreContacto.value.trim() === ''){ 
    alert("El Nombre ingresado es invalido..");
    nombreContacto.focus();
    return false;
  }else{
    if(!controlMail){
      alert("El Email ingresado es invalido..");
      emailContacto.focus();
      return false;
    }else{
      if(mensajeContacto.value.trim() === ''){
        alert("Escriba el mensaje a enviar..");
        mensajeContacto.focus();
        return false;
      }else{
        return true;
      }
    }
  }
}



