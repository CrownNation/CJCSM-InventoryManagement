import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pipe-transfer',
  templateUrl: './pipe-transfer.component.html',
  styleUrls: ['./pipe-transfer.component.scss']
})
export class PipeTransferComponent implements OnInit{

  transferPipeForm!: FormGroup;

  transferMode: boolean = false;

  constructor(
    private store: Store<AppState>)  {
  }

  ngOnInit(): void {    
    this.buildForm();
  }

  buildForm() {
    this.transferPipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      shop: new FormControl('', [Validators.required])
    });
  }

  transferPipe() {
    console.log('transfer pipe');
  }

  toggleMode() {
    this.transferMode = !this.transferMode;
  }


}
