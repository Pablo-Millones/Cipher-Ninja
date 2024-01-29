//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------- INDICE Y ARRAY ----------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

var clavesGeneradas = [];
var indiceActual = -1; 

//&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------- FUNCIONES DE ACCESIBILIDAD ------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function GenerateRandomText() {
  // Definir la longitud del texto aleatorio
  var length = 50; // Puedes ajustar la longitud según tus necesidades
  // Crear una cadena de caracteres aleatorios
  var randomText = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }
  // Colocar el texto aleatorio en el área de texto
  document.getElementById("codigoInput").value = randomText;
}

function pegarDesdePortapapeles() {
  navigator.clipboard.readText().then(function (text) {
    var codigoInput = document.getElementById("codigoInput");
    var inicio = codigoInput.selectionStart;
    var fin = codigoInput.selectionEnd;
    // Insertar el texto en la posición del cursor
    codigoInput.value = codigoInput.value.substring(0, inicio) + text + codigoInput.value.substring(fin);
    // Colocar el cursor al final del texto pegado
    codigoInput.setSelectionRange(inicio + text.length, inicio + text.length);
  }).catch(function (err) {
    console.error('Error al pegar desde el portapapeles: ', err);
  });
}

function copiarText() {
  var textarea = document.getElementById("codigoInput");
  textarea.select();
  document.execCommand('copy');
}
function copiarKey() {
  var textarea = document.getElementById("keyGenerated");
  textarea.select();
  document.execCommand('copy');
}
function copiarIV() {
  var textarea = document.getElementById("ivGenerated");
  textarea.select();
  document.execCommand('copy');
}
function limpiarTextArea() {
  // Limpiar el contenido del textarea
  document.getElementById("codigoInput").value = "";
  document.getElementById("keyGenerated").value = "";
  document.getElementById("ivGenerated").value = "";
  // Limpiar la consola
  console.clear();
  // Limpiar el array clavesGeneradas
  clavesGeneradas = [];
  // Restablecer el índice actual a 0
  indiceActual = 0;
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------HMAC_MD5---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function HMAC_MD5() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash');

  // Especificar la longitud de la clave secreta
  const length = 16;

  // Generar una clave secreta aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput.value);

  // Calcular el HMAC-MD5
  var ciphertext = CryptoJS.HmacMD5(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la clave secreta y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (HMAC_MD5):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptHMAC_MD5(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput);

  // Calcular el HMAC-MD5
  const hashToCompare = CryptoJS.HmacMD5(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------HMAC_SHA512---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function HMAC_SHA512() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash');

  // Especificar la longitud de la clave secreta
  const length = 16;

  // Generar una clave secreta aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput.value);

  // Calcular el HMAC-SHA512
  var ciphertext = CryptoJS.HmacSHA512(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la clave secreta y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (HMAC_SHA512):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptHMAC_SHA512(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput);

  // Calcular el HMAC-SHA512
  const hashToCompare = CryptoJS.HmacSHA512(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------HMAC_SHA256---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function HMAC_SHA256() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash');

  // Especificar la longitud de la clave secreta
  const length = 16;

  // Generar una clave secreta aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput.value);

  // Calcular el HMAC_SHA256
  var ciphertext = CryptoJS.HmacSHA256(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la clave secreta y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString, // Modificado para ser igual a randomKey
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (HMAC_SHA256):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptHMAC_SHA256(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput);

  // Calcular el HMAC_SHA256
  const hashToCompare = CryptoJS.HmacSHA256(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------HMAC_SHA1---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function HMAC_SHA1() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash');

  // Especificar la longitud de la clave secreta
  const length = 16;

  // Generar una clave secreta aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput.value);

  // Calcular el HMAC_SHA1
  var ciphertext = CryptoJS.HmacSHA1(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la clave secreta y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (HMAC_SHA1):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptHMAC_SHA1(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Convertir la clave y el código de entrada a objetos WordArray
  const key = CryptoJS.enc.Utf8.parse(randomString);
  const data = CryptoJS.enc.Utf8.parse(codigoInput);

  // Calcular el HMAC_SHA1
  const hashToCompare = CryptoJS.HmacSHA1(data, key).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------MD5---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

  function MD5() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash')

  // Especificar la longitud de la cadena aleatoria
  const length = 16;

  // Generar una cadena aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Concatenar randomString y codigoInput, convertir a minúsculas
  const concatenatedString = (randomString + codigoInput.value).toLowerCase();

  // Calcular el hash MD5
  var ciphertext = CryptoJS.MD5(concatenatedString).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la cadena aleatoria y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (MD5):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptMD5(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Concatenar randomString y codigoInput, convertir a minúsculas
  const concatenatedString = (randomString + codigoInput).toLowerCase();
  const hashToCompare = CryptoJS.MD5(concatenatedString).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------SHA512---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function SHA512() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash')

  // Especificar la longitud de la cadena aleatoria
  const length = 16;

  // Generar una cadena aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Concatenar randomString y codigoInput, convertir a minúsculas
  const concatenatedString = (randomString + codigoInput.value).toLowerCase();

  // Calcular el hash SHA512
  var ciphertext = CryptoJS.SHA512(concatenatedString).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la cadena aleatoria y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (SHA512):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptSHA512(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Concatenar randomString y codigoInput, convertir a minúsculas
  const concatenatedString = (randomString + codigoInput).toLowerCase();
  const hashToCompare = CryptoJS.SHA512(concatenatedString).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------SHA256---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function SHA256() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash')

  // Especificar la longitud de la cadena aleatoria
  const length = 16;

  // Generar una cadena aleatoria
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Concatenar randomString y codigoInput, convertir a minúsculas
  const concatenatedString = (randomString + codigoInput.value).toLowerCase();

  // Calcular el hash SHA256
  var ciphertext = CryptoJS.SHA256(concatenatedString).toString().toUpperCase(); // Convertir a mayúsculas

  // Almacenar la cadena aleatoria y el código de entrada en el array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Mantenerlo en mayúsculas
  });

  console.log('Ciphertext (SHA256):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas);
}


//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptSHA256(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Concatenar randomString y codigoInput, convertir a minúsculas
  const concatenatedString = (randomString + codigoInput).toLowerCase();
  const hashToCompare = CryptoJS.SHA256(concatenatedString).toString().toUpperCase(); // Convertir a mayúsculas

  // Comparar el hash almacenado con el hash calculado
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);

    // Actualizar los campos en la interfaz
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

  } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------SHA1---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
function SHA1() {
  var codigoInput = document.getElementById('codigoInput');
  var selectedHash = document.getElementById('Hash')

  // Specify the length of the random string
  const length = 16;

  // Generate a random string
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Concatenate randomString and codigoInput, convert to lowercase
  const concatenatedString = (randomString + codigoInput.value).toLowerCase();

  // Calculate the SHA1 hash
  var ciphertext = CryptoJS.SHA1(concatenatedString).toString().toUpperCase(); // Convert to uppercase

  // Store the random string and input in the array
  clavesGeneradas.push({
    selectedHash: selectedHash.value,
    randomString: randomString,
    codigoInput: codigoInput.value,
    ciphertext: ciphertext // Keep it in uppercase
  });

  console.log('Ciphertext (SHA1):', clavesGeneradas[clavesGeneradas.length - 1].ciphertext);

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].randomString;

  console.log("Índice Actual:", indiceActual);
  console.log(clavesGeneradas)
}

//////////////////////////////DECRIPT////////////////////////////////////////////

function decriptSHA1(codigoInput, ciphertext, randomString) {
  console.log('ciphertext:', ciphertext);
  console.log('codigoInput:', codigoInput);
  console.log('KEY:', randomString);

  // Concatenate randomString and codigoInput, convert to lowercase
  const concatenatedString = (randomString + codigoInput).toLowerCase();
  const hashToCompare = CryptoJS.SHA1(concatenatedString).toString().toUpperCase(); // Convert to uppercase

  // Compare the stored hash with the calculated hash
  if (hashToCompare === ciphertext) {
    console.log('Desencriptado correctamente');
    console.log('Texto original:', codigoInput);
    console.log("Índice Actual:", indiceActual);
    document.getElementById('codigoInput').value = codigoInput;
    document.getElementById('keyGenerated').value = randomString;
    document.getElementById('ivGenerated').value = '';

    } else {
    console.log('Error: La clave no coincide');
    console.log("Índice Actual:", indiceActual);
    console.log('hashToCompare:', hashToCompare);
    console.log('ciphertext:', ciphertext);
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//---------------------....................----------------TRIPLE DES---------------...............----------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%/
function TripleDES() {
  var codigoInput = document.getElementById('codigoInput');
  var Algorithm = document.getElementById('Algorithm');
  var Mode = document.getElementById('Mode');

  var selectAlgorithm = Algorithm.value;
  var selectMode = Mode.value;

  // Generar una clave y un IV aleatorios
  var key = CryptoJS.lib.WordArray.random(24); // Clave de 192 bits para TripleDES
  var iv = CryptoJS.lib.WordArray.random(8);  // IV de 64 bits para TripleDES

  let ciphertext;

  // Encriptar el código de entrada usando TripleDES según el modo
  if (selectMode === 'ECB') {
    ciphertext = CryptoJS.TripleDES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.ECB, iv: iv });
  } else if (selectMode === 'CBC') {
    ciphertext = CryptoJS.TripleDES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.CBC, iv: iv });
  } else if (selectMode === 'OFB') {
    ciphertext = CryptoJS.TripleDES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.OFB, iv: iv });
  } else if (selectMode === 'CFB') {
    ciphertext = CryptoJS.TripleDES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.CFB, iv: iv });
  } else {
    console.log("Modo no soportado");
    return;
  }

  // Almacenar la información en el array
  clavesGeneradas.push({
    selectAlgorithm: selectAlgorithm,
    key: key.toString(),
    iv: iv.toString(),
    ciphertext: ciphertext.toString(),
    selectMode: selectMode,
    codigoInput: codigoInput.value
  });

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].key;
  ivGenerated.value = clavesGeneradas[indiceActual].iv;
  console.log("Índice Actual:", indiceActual);
  console.log('clavesGeneradas:', clavesGeneradas);
}

function decryptTripleDES(ciphertext, key, iv, mode) {
  console.log("DecryptTripleDES");
  console.log("key:", key);
  console.log("iv:", iv);
  console.log("ciphertext:", ciphertext);
  console.log("Mode:", mode);

  let decrypted;

  // Convertir la clave y el IV a formatos específicos
  const keyHex = CryptoJS.enc.Hex.parse(key);
  const ivHex = CryptoJS.enc.Hex.parse(iv);

  // Desencriptar usando TripleDES según el modo
  if (mode === 'ECB') {
    decrypted = CryptoJS.TripleDES.decrypt(
      ciphertext,
      keyHex,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'CBC') {
    decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'OFB') {
    decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.OFB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'CFB') {
    decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else {
    console.log("Modo no soportado");
    return;
  }

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  console.log('Decrypted Text:', decryptedText);
  codigoInput.value = decryptedText;
  keyGenerated.value = clavesGeneradas[indiceActual].key;
  ivGenerated.value = clavesGeneradas[indiceActual].iv;
  return decryptedText;
}



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//................................................... DES.............................................//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function DES() {
  var codigoInput = document.getElementById('codigoInput');
  var Algorithm = document.getElementById('Algorithm');
  var Mode = document.getElementById('Mode');

  var selectAlgorithm = Algorithm.value;
  var selectMode = Mode.value;

  // Generar una clave y un IV aleatorios
  var key = CryptoJS.lib.WordArray.random(8); // Clave de 64 bits para DES
  var iv = CryptoJS.lib.WordArray.random(8);  // IV de 64 bits para DES

  let ciphertext;

  // Encriptar el código de entrada usando DES según el modo
  if (selectMode === 'ECB') {
    ciphertext = CryptoJS.DES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.ECB, iv: iv });
  } else if (selectMode === 'CBC') {
    ciphertext = CryptoJS.DES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.CBC, iv: iv });
  } else if (selectMode === 'OFB') {
    ciphertext = CryptoJS.DES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.OFB, iv: iv });
  } else if (selectMode === 'CFB') {
    ciphertext = CryptoJS.DES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.CFB, iv: iv });
  } else {
    console.log("Modo no soportado");
    return;
  }

  // Almacenar la información en el array
  clavesGeneradas.push({
    selectAlgorithm: selectAlgorithm,
    key: key.toString(),
    iv: iv.toString(),
    ciphertext: ciphertext.toString(),
    selectMode: selectMode,
    codigoInput: codigoInput.value
  });

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].key;
  ivGenerated.value = clavesGeneradas[indiceActual].iv;
  console.log("Índice Actual:", indiceActual);
  console.log('clavesGeneradas:', clavesGeneradas);
}

function decryptDES(ciphertext, key, iv, mode) {
  console.log("DecryptDES");
  console.log("key:", key);
  console.log("iv:", iv);
  console.log("ciphertext:", ciphertext);
  console.log("Mode:", mode);

  let decrypted;

  // Convertir la clave y el IV a formatos específicos
  const keyHex = CryptoJS.enc.Hex.parse(key);
  const ivHex = CryptoJS.enc.Hex.parse(iv);

  // Desencriptar usando DES según el modo
  if (mode === 'ECB') {
    decrypted = CryptoJS.DES.decrypt(
      ciphertext,
      keyHex,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'CBC') {
    decrypted = CryptoJS.DES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'OFB') {
    decrypted = CryptoJS.DES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.OFB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'CFB') {
    decrypted = CryptoJS.DES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else {
    console.log("Modo no soportado");
    return;
  }

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  console.log('Decrypted Text:', decryptedText);
  codigoInput.value = decryptedText;
  keyGenerated.value = clavesGeneradas[indiceActual].key;
  ivGenerated.value = clavesGeneradas[indiceActual].iv;
  return decryptedText;
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//................................................... AES.............................................//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function AES() {
  var codigoInput = document.getElementById('codigoInput');
  var Algorithm = document.getElementById('Algorithm');
  var Mode = document.getElementById('Mode');

  var selectAlgorithm = Algorithm.value;
  var selectMode = Mode.value;

  // Generar una clave y un IV aleatorios
  var key = CryptoJS.lib.WordArray.random(16);
  var iv = CryptoJS.lib.WordArray.random(16);

  let ciphertext;

  // Encriptar el código de entrada usando AES según el modo
  if (selectMode === 'ECB') {
    ciphertext = CryptoJS.AES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.ECB, iv: iv });
  } else if (selectMode === 'CBC') {
    ciphertext = CryptoJS.AES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.CBC, iv: iv });
  } else if (selectMode === 'OFB') {
    ciphertext = CryptoJS.AES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.OFB, iv: iv });
  } else if (selectMode === 'CFB') {
    ciphertext = CryptoJS.AES.encrypt(codigoInput.value, key, { mode: CryptoJS.mode.CFB, iv: iv });
  } else {
    console.log("Modo no soportado");
    return;
  }

  // Almacenar la información en el array
  clavesGeneradas.push({
    selectAlgorithm: selectAlgorithm,
    key: key.toString(),
    iv: iv.toString(),
    ciphertext: ciphertext.toString(),
    selectMode: selectMode,
    codigoInput: codigoInput.value
  });

  // Actualizar el índice después de agregar un nuevo elemento
  indiceActual = clavesGeneradas.length - 1;

  // Asignar el valor del último resultado al input
  codigoInput.value = clavesGeneradas[indiceActual].ciphertext;
  keyGenerated.value = clavesGeneradas[indiceActual].key;
  ivGenerated.value = clavesGeneradas[indiceActual].iv;
  console.log("Índice Actual:", indiceActual);key
  console.log('clavesGeneradas:', clavesGeneradas);
}

function decryptAES(ciphertext, key, iv, mode) {
  console.log("DecryptAES");
  console.log("key:", key);
  console.log("iv:", iv);
  console.log("ciphertext:", ciphertext);
  console.log("Mode:", mode);

  let decrypted;

  // Convertir la clave y el IV a formatos específicos
  const keyHex = CryptoJS.enc.Hex.parse(key);
  const ivHex = CryptoJS.enc.Hex.parse(iv);

  // Desencriptar usando AES según el modo
  if (mode === 'ECB') {
    decrypted = CryptoJS.AES.decrypt(
      ciphertext,
      keyHex,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'CBC') {
    decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'OFB') {
    decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.OFB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else if (mode === 'CFB') {
    decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      keyHex,
      { iv: ivHex, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.Pkcs7 }
    );
  } else {
    console.log("Modo no soportado");
    return;
  }

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  console.log('Decrypted Text:', decryptedText);
  codigoInput.value = decryptedText;
  keyGenerated.value = clavesGeneradas[indiceActual].key;
  ivGenerated.value = clavesGeneradas[indiceActual].iv;
  return decryptedText;
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------CALL-------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function CALL() {
  var algorithmSelect = document.getElementById('Algorithm');
  var hashSelect = document.getElementById('Hash');
  var modeSelect = document.getElementById('Mode');
  var selectedAlgorithm = algorithmSelect.value;
  var selectedHash = hashSelect.value;
  var selectedMode = modeSelect.value;

  switch (selectedAlgorithm) {
    case 'Aes':
      AES();
      break;
    case 'Des':
      DES();
      break;
    case 'TripleDes':
      TripleDES();
      break;
  }
  
  switch (selectedHash) {
    case 'Sha1':
      SHA1();
      break;
    case 'Sha256':
      SHA256();
      break;
    case 'Sha512':
      SHA512();
      break;
    case 'Md5':
      MD5();
      break;
    case 'HmacSha1':
      HMAC_SHA1();
      break;
    case 'HmacSha256':
      HMAC_SHA256();
      break;
    case 'HmacSha512':
      HMAC_SHA512();
      break;
    case 'HmacMd5':
      HMAC_MD5();
      break;
  }
}  

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
///////////////////////////////////////////DECRIPT CALL///////////////////////////////////////
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

function decrypt() {
  if (!clavesGeneradas || clavesGeneradas.length === 0) {
    console.error('El clavesGeneradas no está definido o está vacío.');
    console.log('clavesGeneradas:', clavesGeneradas);
    console.log('indice actual:', indiceActual);
    return;
  }

  if (indiceActual < 0 || indiceActual >= clavesGeneradas.length) {
    console.error('Índice actual fuera de rango.');
    document.getElementById("codigoInput").value = "";
    document.getElementById("keyGenerated").value = "";
    document.getElementById("ivGenerated").value = "";
    // Limpiar la consola
    console.clear();
    // Limpiar el array clavesGeneradas
    clavesGeneradas = [];
    // Restablecer el índice actual a 0
    return;
  }

  const indiceActualElemento = clavesGeneradas[indiceActual];

  if (!indiceActualElemento) {
    console.error('Elemento no encontrado en el índice actual.');
    return;
  }

  const selectedAlgorithm = indiceActualElemento.selectAlgorithm;
  const selectedHash = indiceActualElemento.selectedHash;
  const selectMode = indiceActualElemento.selectMode;
  const ciphertext = indiceActualElemento.ciphertext;
  const key = indiceActualElemento.key;
  const iv = indiceActualElemento.iv;
  const randomString = indiceActualElemento.randomString;
  const codigoInput = indiceActualElemento.codigoInput;


  switch (selectedAlgorithm) {
    case 'Aes':
      if (selectedHash === undefined) {
        decryptAES(indiceActualElemento.ciphertext, indiceActualElemento.key, indiceActualElemento.iv, indiceActualElemento.selectMode);
      } else {
        console.error('Algoritmo no reconocido:', selectedHash);
      }
      break;

    case 'Des':
      if (selectedHash === undefined) {
        decryptDES(indiceActualElemento.ciphertext, indiceActualElemento.key, indiceActualElemento.iv, indiceActualElemento.selectMode);
      } else {
        console.error('Algoritmo no reconocido:', selectedHash);
      }      
      break;

    case 'TripleDes':
      if (selectedHash === undefined) {
        decryptTripleDES(indiceActualElemento.ciphertext, indiceActualElemento.key, indiceActualElemento.iv, indiceActualElemento.selectMode);
      } else {
        console.error('Algoritmo no reconocido:', selectedHash);
      }       
      break;

    default:
      console.log('Algoritmo de cifrado no reconocido:', selectedAlgorithm);

      switch (selectedHash) {
        case 'Sha1':
          if (selectedAlgorithm === undefined ) {
            decriptSHA1(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }
          break;

        case 'Sha256':
          if (selectedAlgorithm === undefined ) {
            decriptSHA256(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }          
          break;

        case 'Sha512':
          if (selectedAlgorithm === undefined ) {
            decriptSHA512(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }
          break;

        case 'Md5':
          if (selectedAlgorithm === undefined ) {
            decriptMD5(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }
          break;

        case 'HmacSha1':
          if (selectedAlgorithm === undefined ) {
            decriptHMAC_SHA1(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }          
          break;
          
        case 'HmacSha256':
          if (selectedAlgorithm === undefined ) {
            decriptHMAC_SHA256(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }           
          break;

        case 'HmacSha512':
          if (selectedAlgorithm === undefined ) {
            decriptHMAC_SHA512(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }             
          break;

        case 'HmacMd5':
          if (selectedAlgorithm === undefined ) {
            decriptHMAC_MD5(indiceActualElemento.codigoInput, indiceActualElemento.ciphertext, indiceActualElemento.randomString);
          } else {
            console.error('Algoritmo de hash no reconocido:', selectedHash);
          }            
          break;

        case undefined:
          // Lógica para el caso de hash no definido
          console.error('Algoritmo de hash no definido.');
          break;

        default:
          console.error('Algoritmo de hash no reconocido:', selectedHash);
          break;
      }
      break;
  }
  indiceActual--;
}
