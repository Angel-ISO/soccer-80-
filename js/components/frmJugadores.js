import { Departamentos } from "../app/bd/departamentos.js";
import { Departamento } from "../app/Departamento.js";
import { Jugador } from "../app/Jugador.js";


let deps =[];
let jugadores=[];


class FrmJugadores extends HTMLElement{
   constructor(){
       super();
       this.render();
       this.procesarDep();
       this.agregarEventoClick();
       this.saveData();
       this.viewPlayers();
       this.registroPlayers();


       if (localStorage.getItem("jugadores") != undefined){
           equipos =JSON.parse(localStorage.getItem("jugadores"));
           this.cargarJugadores();
       }
   }
   render(){
       this.innerHTML = /* html */ `   
           <ul class="nav nav-tabs">
               <li class="nav-item">
                   <a class="nav-link" aria-current="page" data-mostrar='["#jugadores",["#lstJugadores"]]' href="#" id="verJugador">Registro de jugadores</a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" href="#" data-mostrar='["#lstJugadores",["#jugadores"]]' id="regJugador">Listado de jugadores</a>
               </li>
            </ul>
       </div>
       <div class="container mt-2" id="jugadores" style="display: none;">
           <div class="card">
           <div class="card-header">
               Registro de jugadores de futbol
           </div>
           <div class="card-body">
               <form id="frmJugadores">
                   <div class="row g-3">
                       <div class="col-6">
                           <label for="nombre" class="form-label lst">Nombre del jugador</label>
                           <input type = "text" class ="form-control" id="nombre" required>
                       </div>
                       <div class="col-6">
                           <label for="ID" class="form-label lst">ID equipo</label>
                           <input type = "number" class ="form-control" id="ID">
                       </div>
                   </div>
                   <div class="row g-3">
                       <div class="col-4">
                           <label for="logo" class="form-label lst">foto</label>
                           <input type = "file" class ="form-control" id="logo">
                       </div>
                   </div>
                   <div class="form-floating">
                       <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                       <option selected>seleccione posicion de juego</option>
                       <option value="1">DFC</option>
                       <option value="2">LD</option>
                       <option value="3">LI</option>
                       <option value="4">MC</option>
                       <option value="5">MDC</option>
                       <option value="6">ED</option>
                       <option value="7">DEL</option>
                       <option value="8">EI</option>
                       </select>
                       <label for="floatingSelect">posicion</label>
                       </div>
                       <div class="col-6">
                           <label for="fecha" class="form-label lst">Años de Experiencia</label>
                           <input type = "number" class ="form-control" id="experiencia">
                       </div>
                       <div class="form-floating">
                       <select class="form-select" id="floatingSelect2" aria-label="Floating label select example">
                       <option selected>seleccione pierna dominante</option>
                       <option value="1">IZQUIERDA</option>
                       <option value="2">DERECHA</option>
                       </select>
                       <label for="floatingSelect">pierna buena</label>
                       </div>
                       <div class="form-floating">
                       <select class="form-select" id="floatingSelect3" aria-label="Floating label select example">
                       <option selected>seleccione tipo de sangre</option>
                       <option value="1">A</option>
                       <option value="2">B</option>
                       <option value="2">AB</option>
                       <option value="2">O</option>
                       </select>
                       <label for="floatingSelect">tipo RH</label>
                       </div>
                       <div class="col-6">
                           <label for="fecha" class="form-label lst">edad</label>
                           <input type = "number" class ="form-control" id="edad">
                       </div>
                       <div class="col-6">
                           <label for="fecha" class="form-label lst">estatura en MTS</label>
                           <input type = "number" class ="form-control" id="estatura">
                       </div>
                       <div class="col-6">
                           <label for="fecha" class="form-label lst">peso en kg</label>
                           <input type = "number" class ="form-control" id="peso">
                       </div>
                   <div class="row g-3">
                       <div class="col-6">
                       <label for="dep" class="form-label lst">Departamento</label>
                       <select class="form-select" id="dep">
                           <option selected>Seleccione un departamento</option>
                       </select>
                       </div>
                       <div class="col-6">
                       <label for="ciudad" class="form-label">Ciudades</label>
                       <select class="form-select lst" id="ciudad" >
                       </select>
                       </div>
                   </div>
                   <div class="row g-3">
                       <label for="descripcion" class="form-label">Descripcion del jugador</label>
                       <textarea class="form-control" id="descripcion" rows="3"></textarea>
                   </div>
               </form>             
                   <a href="#" class="btn btn-primary mt-3" id="guardarJugador">Guardar</a>
                   <div class="alert alert-success mt-2" style="display:none;" role="alert">
                       Datos guardados correctamente
                   </div>
                   <div class="alert alert-danger mt-2" style="display:none;" role="alert">
                       Error al momento de guardar los datos
                   </div>
               </div>
           </div>
       </div>
       <div class="container text-center" id="lstJugadores" style="display:none">
           <h1>Listado de jugadores inscritos en la liga</h1>
           <div class="container text-center">
               <div class="row" id="listaJugadores">
               </div>
           </div>
       </div>
       `
   }
   viewPlayers = () => {
    document.querySelector('#verJugador').addEventListener('click',(e) => {
        let data = JSON.parse(e.target.dataset.mostrar);
        let cardVer = document.querySelector(data[0]);
        //cardVer.setAttribute("style", "display:block;");
        cardVer.style.display = "block";
        data[1].forEach(card => {
            let cardActual = document.querySelector(card);
            //cardActual.setAttribute("style", "display:none;");
            cardActual.style.display = "none";
            //console.log(cardActual);
        });
        e.stopImmediatePropagation();
        e.preventDefault();
        this.cargarJugadores();
    })    
}
   registroPlayers = () => {
    document.querySelector('#regJugador').addEventListener('click',(e) => {
        let data = JSON.parse(e.target.dataset.mostrar);
        let cardVer = document.querySelector(data[0]);
        cardVer.style.display = 'block';
        data[1].forEach(card => {
            let cardActual = document.querySelector(card);
            cardActual.style.display = 'none';
        });
        e.stopImmediatePropagation();
        e.preventDefault();
        this.registroPlayers();
    })    
}
   procesarDep(){
       Departamentos.forEach(dep =>{
           deps.push(new Departamento(dep.id,dep.departamento));
       })
       this.fillConferenceSelect('#dep',deps);
       //console.log(deps);
   }
   fillConferenceSelect(v_selectId,data){
       this.clearSelect(v_selectId);
       const selectData = document.querySelector(v_selectId) ;
       const itemStart = document.createElement('option');
       itemStart.innerHTML = 'Seleccione un item';
       itemStart.selected;
       selectData.appendChild(itemStart);
      
       data.forEach(itemDep =>{
           const item = document.createElement('option');
           item.value = itemDep.id;
           item.innerHTML = itemDep.departamento;
           selectData.appendChild(item);
       })
   }
   clearSelect(v_element){
       const selectData = document.querySelector(v_element) ;
       const options = selectData.querySelectorAll('option');
       options.forEach(element =>{
           selectData.removeChild(element);
       })
   }
       agregarEventoClick = () =>{
       document.querySelector('#dep').addEventListener('change',(e) => {
           this.clearSelect('#ciudad');
           const selectChild = document.querySelector('#ciudad');
           let departamento = Departamentos.filter(Dep => Dep.id == e.target.value );
           departamento[0].ciudades.forEach(element =>{
               const itemCiudad = document.createElement('option');
               itemCiudad.value = element;
               itemCiudad.innerHTML = element;
               selectChild.appendChild(itemCiudad);
           })
           e.stopImmediatePropagation();
           e.preventDefault();
       })
   }
   saveData(){
       document.querySelector('#guardarJugador').addEventListener('click',(e) => {
           const formData = document.forms['frmJugadores'];
           const dataOk = document.querySelector('.alert-success');
           const dataError = document.querySelector('.alert-danger');
           const logo = formData['logo'];
           const experiencia = formData['experiencia'];   
           const posicion = formData['floatingSelect'];
           const piernaDominio = formData['floatingSelect2'];   
           const rh = formData['floatingSelect3'];    
           const dep = formData['dep']; 
           const peso = formData['peso'];   
           const estatura = formData['estatura'];   
           const edad = formData['edad'];     
           const ciudad = formData['ciudad'];   
           const descripcion = formData['descripcion'];
           const nombre = formData['nombre'];
           const id = formData['ID'];
           
           if (nombre.value != ''){
               jugadores.push(new Equipo(peso.value,estatura.value,edad.value,nombre.value,id.value,ciudad.value,logo.files[0].name,experiencia.value,posicion.value,piernaDominio.value,rh.value,descripcion.value));
               localStorage.setItem("jugadores",JSON.stringify(jugadores));
               //this.cargarJugadores();


               dataOk.style.display = 'block';
               setTimeout(function () {
                   dataOk.style.display = 'none';
               }, 2000);
           }else{
               dataError.style.display = 'block';
               setTimeout(function () {
                   dataError.style.display = 'none';
               }, 2000);      
           }
           e.stopImmediatePropagation();
           e.preventDefault();
       })
   }
   cargarJugadores = ()=>{
       let jugadoresHTML = '';
       for(let jugador of jugadores){
           jugadoresHTML += this.crearJugadorHTML(jugador);
       }
       document.querySelector('#listaJugadores').innerHTML = jugadoresHTML;
   }
    crearJugadorHTML = (jugador)=>{
               let jugadorHTML =/*html*/ `
       <div class="col-3">
           <div class="card" style="width: 18rem;">
               <img src="/images/equipos/${jugador._logo}" style="width:40vh;" class="card-img-top" alt="...">
               <div class="card-body">
                       <p class="card-text">${jugador._nombre}</p>
               </div>
           </div>
       </div>
       `;
       return jugadorHTML;
   }


}
customElements.define("frm-jugador",FrmJugadores);
