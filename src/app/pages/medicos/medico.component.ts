import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    // tslint:disable-next-line: variable-name
    public _medicoService: MedicoService,
    // tslint:disable-next-line: variable-name
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id !== 'nuevo'){
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
    .subscribe(hospitales => this.hospitales = hospitales);
    this._modalUploadService.notificacion
    .subscribe(res => {
      this.medico.img = res.medico.img;
    });
  }

  cargarMedico(id: string){
    this._medicoService.cargarMedico(id)
    .subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm){
    if (f.invalid){
      return;
    }
    this._medicoService.guardarMedico(this.medico)
    .subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id)
    .subscribe(hospital => this.hospital = hospital);
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
