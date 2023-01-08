import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor() {
    //Make the button with id "estadisticas" takes you to the page "estadisticas"
    const estadisticas = document.getElementById("estadisticas");


  }
}
