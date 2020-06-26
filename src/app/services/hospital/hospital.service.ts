import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(){
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(
      map((res: any) => {
        this.totalHospitales = res.total;
        return res.hospitales;
      })
    );
  }

  obtenerHospital(id: string){
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(
      map((res: any) => res.hospital)
    );
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(
      map(res => swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success'))
    );
  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre}).pipe(
      map((res: any) => res.hospital)
    );
  }

  buscarHospital(termino: string){
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map((res: any) => res.hospitales)
    );
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((res: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return res.hospital;
      })
    );
  }

}
