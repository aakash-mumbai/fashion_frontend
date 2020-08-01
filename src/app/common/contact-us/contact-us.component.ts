import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.styl']
})
export class ContactUsComponent implements OnInit {
  errMsg = '';
  contactForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  saveContact(formData) {

  }

}
