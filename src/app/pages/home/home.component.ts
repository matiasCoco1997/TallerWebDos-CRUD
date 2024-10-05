import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public sneakers: Producto[] = [
    {
      id:1,
      descripcion:'Adidas Superstar',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:2,
      descripcion:'Nike Air Force 1',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:3,
      descripcion:'Puma RS-X',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:4,
      descripcion:'New Balance 550',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:5,
      descripcion:'Reebok Classic',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:6,
      descripcion:'Converse Chuck Taylor',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:7,
      descripcion:'Vans Old Skool',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:8,
      descripcion:'Air Jordan 1',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
    {
      id:9,
      descripcion:'Asics Gel-Lyte III',
      clasificacion:'Adidas',
      precio:10000,
      img:'assets/productos/adidas.jpeg'
    },
  ];

}
