import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = '#ff0000';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ){
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ){
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('Constructor')
    console.log(el);
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = 'Hola Mundo'
  }

  ngOnInit(): void {
    console.log('Directiva - NgOnInit')
  }

  setStyle(): void{
    if( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void{
    if( !this.htmlElement ) return;
    if( !this._errors ) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores';
      return;
    }
    const errors = Object.keys(this._errors);

    if( errors.includes('required') ){
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      return;
    }

    if( errors.includes('minlength') ){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength']
      this.htmlElement.nativeElement.innerHTML = `Este campo no tiene la longitud requerida, Minimo ${current}/${min} caracteres`;
      return;
    }

    if( errors.includes('email') ){
      this.htmlElement.nativeElement.innerHTML = 'Este campo no tiene el formato requerido para un correo electronico';
      return;
    }
  }
}
