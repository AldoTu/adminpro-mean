import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(
    map((res: any) => {
      this.totalMedicos = res.total;
      return res.medicos;
    }));
  }

  cargarMedico(id: string){
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(
      map((res: any) => res.medico)
    );
  }

  buscarMedicos(termino: string){
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(
      map((res: any) => res.medicos)
    );
  }

  borrarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(
      map(res => {
        swal('Médico Borrado', 'Médico borrado correctament', 'success');
        return res;
      })
    );
  }

  guardarMedico(medico: Medico){
    let url = URL_SERVICIOS + '/medico';
    if (medico._id){
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico).pipe(
        map((res: any) => {
          swal('Médico actualizado', medico.nombre, 'success');
          return res.medico;
        })
      );
    }else{
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).pipe(
      map((res: any) => {
        swal('Médico creado', medico.nombre, 'success');
        return res.medico;
      })
    );
    }
  }

}
