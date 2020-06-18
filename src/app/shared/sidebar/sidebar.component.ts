import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

}
