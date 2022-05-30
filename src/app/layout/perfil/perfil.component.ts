import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../shared/services/data.service';
// import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    // private dataService: DataService
  ) { }

  user = {nombre: '', apellido: '', email: ''};

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user.nombre = sessionStorage.getItem('nombre');
    this.user.apellido = sessionStorage.getItem('apellido');
    this.user.email = sessionStorage.getItem('email');

    // console.log( sessionStorage.getItem('nombre'));
}

}
