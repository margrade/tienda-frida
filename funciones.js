//carrusel

const carousel = document.querySelector('.carousel');
const prevButton = carousel.querySelector('.prev-button');
const nextButton = carousel.querySelector('.next-button');
const slidesContainer = carousel.querySelector('.slides-container');
const slides = slidesContainer.querySelectorAll('.slide');
const slideWidth = slides[0].clientWidth;
let currentIndex = 0;

nextButton.addEventListener('click', () => {
  if (currentIndex === slides.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});

prevButton.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex--;
  }
  slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});

//FORmularios

document.addEventListener('DOMContentLoaded', function() {
  // Configurar reglas de validación y mensajes de error usando jQuery validation
  $('#formularioProceso').validate({
      rules: {
          nombreProceso: 'required',
          art: 'required',
          reclamo: 'required'
      },
      messages: {
          nombreProceso: 'Por favor ingrese su nombre',
          art:'Por favor ingrese el precio',
          reclamo: 'Por favor ingrese la cantidad'
      },
      submitHandler: function(form) {
          // Obtener los valores de los campos del formulario
          var nombre = document.getElementById('nombreProceso').value;
          var art = document.getElementById('art').value;
          var reclamo = document.getElementById('reclamo').value;

          // Generar el resumen del reclamo
          var reclamo = 'Reclamo:\n\n' +
              'Nombre: ' + nombre + '\n' +
              'Art de reclamo: ' + art + '\n' +
              'Detalle del reclamo: ' + reclamo+ '\n' ;

          // Mostrar el resumen 
          alert(reclamo);

          // Crear un nuevo objeto jsPDF
          var pdf = new jsPDF();

          // Agregar el resumen al documento PDF
          pdf.text(reclamo, 10, 10);

          // Generar el archivo PDF como Blob
          var pdfBlob = pdf.output('blob');

          // Crear un enlace de descarga
          var downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(pdfBlob);
          downloadLink.download = 'resumen_reclamo.pdf';
          downloadLink.click();

          // Liberar el objeto Blob
          URL.revokeObjectURL(pdfBlob);
      
      }
  });

  // Configurar reglas de validación y mensajes de error usando jQuery validation para el formulario de contacto
  $('#formularioContacto').validate({
      rules: {
          nombre: 'required',
          email: {
              required: true,
              email: true
          },
          mensaje: 'required'
      },
      messages: {
          nombre: 'Por favor ingrese su nombre',
          email: {
              required: 'Por favor ingrese su dirección de correo electrónico',
              email: 'Por favor ingrese una dirección de correo electrónico válida'
          },
          mensaje: 'Por favor ingrese un mensaje'
      },
      submitHandler: function(form) {
          // Obtener los valores de los campos del formulario
          var nombre = $('#nombre').val();
          var email = $('#email').val();
          var mensaje = $('#mensaje').val();

          // Hacer la petición AJAX para enviar los datos al servidor
          $.ajax({
              url: 'https://reqres.in/api/users?page=2',
              method: 'POST', 
              data: {
                  nombre: nombre,
                  email: email,
                  mensaje: mensaje
              },
              success: function(response) {
                  console.log('Éxito:', response);
                  alert('¡Mensaje enviado con éxito!');
              },
              error: function(xhr, status, error) {
                  console.error('Error:', error);
                  alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
              }
          });
      }
  });
});