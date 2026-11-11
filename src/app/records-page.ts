import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Entry, Kind, RecordsService } from './records.service';
type Field={key:string; label:string; required?:boolean; options?:string[]; multiline?:boolean; type?:string};
const configurations:Record<Kind,{title:string; intro:string; fields:Field[]}>= {
 topics:{title:'Study Topics',intro:'Organize the cybersecurity concepts you are learning.',fields:[
 {key:'topicName',label:'Topic name',required:true},{key:'category',label:'Category',required:true},
 {key:'description',label:'Description',multiline:true},{key:'difficulty',label:'Difficulty',required:true,options:['Beginner','Intermediate','Advanced']},
 {key:'status',label:'Status',required:true,options:['Not Started','In Progress','Completed']},{key:'notes',label:'Notes',multiline:true}]},
 labs:{title:'Lab Tracker',intro:'Record your hands-on labs and technical progress.',fields:[
 {key:'title',label:'Lab name',required:true},{key:'relatedTopic',label:'Related topic'},{key:'description',label:'Description',multiline:true},
 {key:'tools',label:'Tools used'},{key:'labDate',label:'Lab date',type:'date'},
 {key:'status',label:'Completion status',required:true,options:['Not Started','In Progress','Completed']},{key:'notes',label:'Notes',multiline:true}]},
 resources:{title:'Learning Resources',intro:'Save useful documentation, courses, tutorials, and videos.',fields:[
 {key:'title',label:'Resource title',required:true},{key:'type',label:'Resource type',required:true,options:['Article','Video','Documentation','Tutorial','Course','Website']},
 {key:'relatedTopic',label:'Related topic'},{key:'description',label:'Description',multiline:true},{key:'link',label:'URL',type:'url'},{key:'notes',label:'Notes',multiline:true}]}
};
@Component({selector:'app-records-page',standalone:true,imports:[CommonModule,ReactiveFormsModule],templateUrl:'./records-page.html'})
export class RecordsPage implements OnInit {
 kind:Kind='topics'; config=configurations.topics; entries:Entry[]=[];
 form=new FormGroup<Record<string,FormControl<string>>>({});
 editingId:string|null=null; pendingDeleteId:string|null=null; busy=false; notice=''; error='';
 constructor(
  private route: ActivatedRoute,
  private api: RecordsService,
  private cdr: ChangeDetectorRef
){}
 ngOnInit():void {this.route.data.subscribe(data=>{
  this.kind=(data['kind'] as Kind)||'topics';this.config=configurations[this.kind];
  const controls:Record<string,FormControl<string>>={};
  for(const field of this.config.fields) controls[field.key]=new FormControl('',{nonNullable:true,validators:field.required?[Validators.required]:[]});
  this.form=new FormGroup(controls);this.cancel();this.load();
 });}
 load(): void {
  this.error = '';
  this.api.all(this.kind).subscribe({
    next: entries => {
      this.entries = entries;
      this.cdr.detectChanges();
    },
    error: () => {
      this.error = 'Unable to load records. Check your API and MongoDB connection.';
      this.cdr.detectChanges();
    }
  });
}
 save():void {if(this.form.invalid){this.form.markAllAsTouched();this.notice='Complete all required fields.';return;}
 if(this.busy)return;const data=this.form.getRawValue();this.busy=true;this.error='';
 const request=this.editingId?this.api.update(this.kind,this.editingId,data):this.api.create(this.kind,data);
 request.subscribe({next:()=>{this.notice=this.editingId?'Updated in MongoDB.':'Saved in MongoDB.';this.cancel();this.load();this.busy=false;},error:()=>{this.error='Save failed; verify your inputs and connection.';this.busy=false;}});
 }
 edit(entry:Entry):void {this.editingId=entry._id;this.pendingDeleteId=null;const values:Record<string,string>={};
 for(const f of this.config.fields)values[f.key]=entry[f.key]||'';this.form.patchValue(values);window.scrollTo({top:0,behavior:'smooth'});}
 askDelete(id:string):void{this.pendingDeleteId=id;}
 confirmDelete():void {if(!this.pendingDeleteId||this.busy)return;const id=this.pendingDeleteId;this.busy=true;
 this.api.delete(this.kind,id).subscribe({next:()=>{if(this.editingId===id)this.cancel();this.pendingDeleteId=null;this.notice='Deleted from MongoDB.';this.load();this.busy=false;},error:()=>{this.error='Delete failed.';this.busy=false;}});}
 cancel():void{this.editingId=null;this.pendingDeleteId=null;this.form.reset();}
 title(entry:Entry):string{return entry['topicName']||entry['title']||'Untitled';}
}
