import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navabr.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { platform } from 'os';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
private readonly pLATFORM_ID=inject(PLATFORM_ID);
  ngOnInit(): void {

  }
}
