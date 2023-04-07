import { Departamentos } from "../app/bd/departamentos.js";
import { Departamento } from "../app/Departamento.js";
import { CuerpoTecnico } from "../app/CuerpoTecnico.js";

let deps = [];
let tecnicos = [];

class FrmCuerpoTecnico extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.abministrarDep();
        this.EventoDeClick();
        this.guardarDatos();
        //this.verEquipoEventClick();
        this.viewTec();
        this.registroTec();
        //localStorage.removeItem("equipos");
        if (localStorage.getItem("tecnicos") != undefined){
            tecnicos =JSON.parse(localStorage.getItem("tecnicos"));
            this.cargarEquipos();
        }
    }
    render(){
        this.innerHTML = /* html */ `
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" data-verocultar='["#tecnicos",["#lsTecnico"]]' href="#" id="regTecnicos">Registro de Cuerpo tecnico</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-verocultar='["#lsTecnico",["#tecnicos"]]' id="verTecnicos">Listado de Tecnicos</a>
            </li>
        </ul>
        <div class="container mt-2" id="tecnicos" style="display: none;">
            <div class="card">
            <div class="card-header">
                Registro de tecnicos del equipo
            </div>
            <div class="card-body">
                <form id="frmTecnicos">
                    <div class="row g-3">
                        <div class="col-4">
                            <label for="nombre" class="form-label lst">Nombre del Tecnico</label>
                            <input type = "text" class ="form-control" id="nombre" required>
                        </div>
                        <div class="col-4">
                            <label for="fecha" class="form-label lst">Fecha de nacimiento</label>
                            <input type = "date" class ="form-control" id="fecha">
                        <div class="col-4">
                            <label for="ID" class="form-label lst">ID del equipo</label>
                            <input type = "text" class ="form-control" id="ID" required>
                        </div>
                    </div>
             </div>
                    </div>
                    <div class="row g-3">
                     <div class="col-4">
                            <label for="cargo" class="form-label lst"> cargo en el equipo</label>
                            <input type = "text" class ="form-control" id="cargo" required>
                        </div>
                        <div class="col-4">
                        <label for="presidente" class="form-label lst">Departamento</label>
                        <select class="form-select" id="dep">
                            <option selected>Seleccione un departamento</option>
                        </select>
                        </div>
                        <div class="col-4">
                        <label for="presidente" class="form-label">Ciudades</label>
                        <select class="form-select lst" id="ciudad" >
                        </select>
                        </div>
                    </div>
                <div class ="row g-3">
                    <div class="col-3">
                        <label for="xp" class="form-label lst">años de experiencia</label>
                        <input type = "number" class ="form-control" id="xp" required>
                    </div>
                    <div class="col-3">
                        <label for="correo" class="form-label lst">email</label>
                        <input type = "email" class ="form-control" id="correo" required>
                    </div>
                    <div class="col-3">
                        <label for="telefono" class="form-label lst">numero de telefono</label>
                        <input type = "number" class ="form-control" id="telefono" required>
                    </div>
                    <div class="col-3">
                        <label for="profesion" class="form-label lst">cual es su profesion</label>
                        <input type = "text" class ="form-control" id="profesion" required>
                    </div>
                    <div class="form-floating  col-2">
                       <select class="form-select" id="floatingSelect2" aria-label="Floating label select example">
                       <option selected>seleccione su estado civil</option>
                       <option value="1">soltero</option>
                       <option value="2">casado</option>
                       <option value="3">comprometido</option>
                       <option value="4">divorciado</option>
                       </select>
                       <label for="floatingSelect">estado civil</label>
                       </div>
                </div>
                    <div class="row g-3">
                        <label for="descripcion" class="form-label">Descripcion del tecnico</label>
                        <textarea class="form-control" id="descripcion" rows="3"></textarea>
                    </div>
                </form>              
                    <a href="#" class="btn btn-primary mt-3" id="guardarTec">Guardar</a>
                    <div class="alert alert-success mt-2" style="display:none;" role="alert">
                        Datos guardados correctamente
                    </div>
                    <div class="alert alert-danger mt-2" style="display:none;" role="alert">
                        Error al momento de guardar los datos
                    </div>
                </div>
            </div>

        </div>
        <div class="container text-center" id="lsTecnico" style="display:none">
            <h1>Listado de Tecnicos inscritos en la liga</h1>
            <div class="container text-center">
                <div class="row" id="listaTecnicos">
                
                </div>
            </div>
        </div>   `
    }
    viewTec = () => {
        document.querySelector('#verTecnicos').addEventListener('click',(e) => {
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = "block";
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = "none";
            });
            e.stopImmediatePropagation();
            e.preventDefault();
            this.cargarTecnicos();
        })    
    }
    registroTec = () => {
        document.querySelector('#regTecnicos').addEventListener('click',(e) => {
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })    
    }
    abministrarDep(){
        Departamentos.forEach(dep =>{
            deps.push(new Departamento(dep.id,dep.departamento));
        })
        this.fillConferenceSelect('#dep',deps);
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
    EventoDeClick = () =>{
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
    guardarDatos(){
        document.querySelector('#guardarTec').addEventListener('click',(e) => {
            const formData = document.forms['frmTecnicos'];
            const dataOk = document.querySelector('.alert-success');
            const dataError = document.querySelector('.alert-danger');
            const ID = formData['ID'];
            const cargo = formData['cargo'];    
            const correo = formData['correo']; 
            const telefono = formData['telefono'];    
            const xp = formData['xp'];    
            const profesion = formData['profesion'];    
            const estadoCivil = formData['floatingSelect2'];    
            const dep = formData['dep'];    
            const ciudad = formData['ciudad'];    
            const descripcion = formData['descripcion']; 
            const nombre = formData['nombre']; 
            const fecha = formData['fecha'];
            if (nombre.value != ''){
                tecnicos.push(new Equipo(ID.value,cargo.value,correo.value,telefono.value,xp.value,profesion.value,estadoCivil.value,nombre.value,fecha.value,ciudad.value,descripcion.value));
                localStorage.setItem("tecnicos",JSON.stringify(tecnicos));
                //this.cargarTecnicos();

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
    cargarTecnicos = ()=>{
        let tecnicoHTML = '';
        for(let tecnico of tecnicos){
            tecnicoHTML += this.crearTecnicoHTML(tecnico);
        }
        document.getElementById('listaTecnicos').innerHTML = tecnicoHTML;
    }
     crearTecnicoHTML = ()=>{
                let tecHTML =/*html*/ `
        <div class="col-3">
            <div class="card" style="width: 18rem;">
                <img src="/images/equipos/${tecnico._logo}" style="width:40vh;" class="card-img-top" alt="...">
                <div class="card-body">
                        <p class="card-text">${tecnico._nombre}</p>
                </div>
            </div>
        </div>
        `;
        return tecHTML;
    }
}

customElements.define('frm-cuerpo-tecnico',FrmCuerpoTecnico);