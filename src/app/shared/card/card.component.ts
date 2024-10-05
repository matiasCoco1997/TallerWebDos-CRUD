import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() public sneaker!:Producto;

}
