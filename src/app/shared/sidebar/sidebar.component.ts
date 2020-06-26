import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  // tslint:disable-next-line: variable-name
  constructor(
    // tslint:disable-next-line: variable-name
    public _sidebar: SidebarService,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
