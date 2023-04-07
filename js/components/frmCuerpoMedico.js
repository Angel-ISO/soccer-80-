class FrmCuerpoMedico extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html */ `
        <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" aria-current="page" data-verocultar='["#medico",["#lstMedicos,"]]' href="#" id="regMedico"> registro medico</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-verocultar='["#lstMedicos",["#medico"]]' id="verMedico">Listado del cuerpo medico</a>
        </li>
    </ul>
        `
    }
}

customElements.define('frm-cuerpo-medico', FrmCuerpoMedico);