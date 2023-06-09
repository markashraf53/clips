import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';
import { emit } from 'process';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges{
  
  @Input() activeClip: IClip | null = null
  
  showAlert= false
  alertMsg ='Applying changes to the video, Please wait.'
  alertColor = 'blue'
  inSubmission = false
  @Output() update = new EventEmitter()

  clipID = new FormControl('',{
    nonNullable: true
  })

  title = new FormControl('', {
    validators:[
    Validators.required,
    Validators.minLength(3)
  ],
  nonNullable: true
})

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })


  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ){

  }
  
  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  ngOnChanges(): void {
    if (!this.activeClip){
      return
    }
    this.inSubmission = false
    this.showAlert = false
    this.clipID.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)

  }

  async applyEdits(){
    if(!this.activeClip){
      return
    }
    
    this.showAlert = true
    this.inSubmission = true
    this.alertMsg = 'Applying changes to the video, Please wait.'
    this.alertColor = 'blue'

    //edit the video
    try{
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    }catch(e){
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong!. please try again later.'
      return
    }
    this.activeClip.title = this.title.value 
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertMsg = 'Success, changes has been applied to the video.'
    this.alertColor = 'green'
  }
}
