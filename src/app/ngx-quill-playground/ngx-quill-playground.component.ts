import { Component } from '@angular/core';
import { ExampleOneComponent } from './example-one/example-one.component';
import { ExampleTwoComponent } from './example-two/example-two.component';

@Component({
  selector: 'app-ngx-quill-playground',
  standalone: true,
  imports: [ExampleOneComponent, ExampleTwoComponent],
  templateUrl: './ngx-quill-playground.component.html',
  styleUrl: './ngx-quill-playground.component.scss'
})
export class NgxQuillPlaygroundComponent {}
