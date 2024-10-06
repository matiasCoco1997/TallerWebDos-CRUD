import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  private sneakerId: number | null = null;

  public sneakerSeleccionado: Producto | undefined;

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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Agarro el 'id' de la URL
    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {
        this.sneakerId = +id;  // Convierte el id a número

        if (this.buscarSneakerPorId(this.sneakerId)) {
          this.sneakerSeleccionado = this.buscarSneakerPorId(this.sneakerId);
        }
        else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  private buscarSneakerPorId(id: number): Producto | undefined {
    return this.sneakers.find(sneaker => sneaker.id === id);
  }

}
