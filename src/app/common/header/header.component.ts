import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  contact() {
    this.router.navigate(['contact']);
  }

}
