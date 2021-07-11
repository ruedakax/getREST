document.querySelector('#enviar').addEventListener('click',(event)=> {
    let correo = document.querySelector('#email').value	
	let res = login(correo)			
})

async  function login(email){
	let data = `{"email":"${email}"}`
	await fetch('http://127.0.0.1:8000/api/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: data,
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response;
	}).then(function (data) {
		listado(data.token);
	}).catch(function (error) {
		console.warn(error);
	});
}

async  function listado(token){	
	await fetch('http://127.0.0.1:8000/api/listado', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token		
		},		
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response;
	}).then(function (data) {		
			mostrarListado(data);		
	}).catch(function (error) {
		alert(`El llamado presenta el siguiente estado: ${error.statusText}`)
		console.warn(error);
	});
}

function mostrarListado(listado){
	let elementos = Object.values(listado)	
	let contenedor = document.querySelector('#asignaciones')
	contenedor.innerText = ""
	elementos.forEach(element => {
		let ul = document.createElement('ul')
		let div = document.createElement('div')
		div.innerText = `El evento ${element.nombre} con un aforo de ${element.aforo} boletas, tiene la siguiente asignación:`
    	ul.setAttribute('class', 'class="list-group')
		let boletas = Object.values(element.data)
		boletas.forEach(item => {			
			let li = document.createElement('li');    
			li.innerText = `${item.comprador}, boleta: ${item.boleta}`;
			li.setAttribute('class', 'class="list-group-item');
			ul.appendChild(li);
		});		
		contenedor.appendChild(div);
    	contenedor.appendChild(ul);		
	});
}





