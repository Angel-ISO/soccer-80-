export class Plantel{
    constructor(nombre,fecha,ubicacion){
        this._nombre = nombre;
        this._fecha = fecha;
        this._ubicacion = ubicacion;
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(v_nombre){
        this._nombre = v_nombre;
    }
    get fecha(){
        return this._fecha;
    }
    set fecha(v_fecha){
        this._fecha = v_fecha;
    }
    get ubicacion(){
        return this._ubicacion;
    }
    set ubicacion(v_ubicacion){
        this._ubicacion = v_ubicacion;
    }
}