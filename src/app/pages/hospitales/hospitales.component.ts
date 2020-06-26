import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;

  constructor(
    // tslint:disable-next-line: variable-name
    public _hospitalService: HospitalService,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
    .subscribe(hospitales => this.hospitales = hospitales);
  }

  buscarHospital(termino: string){
    if (termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(termino)
    .subscribe(hospitales => this.hospitales = hospitales);
  }

  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital)
    .subscribe(() => this.cargarHospitales());
  }

  borrarHospital(hospital: Hospital){
    this._hospitalService.borrarHospital(hospital._id)
    .subscribe();
  }

  crearHospital(){
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0){
        return;
      }
      this._hospitalService.crearHospital(valor)
      .subscribe(() => this.cargarHospitales());
    });
  }

}
