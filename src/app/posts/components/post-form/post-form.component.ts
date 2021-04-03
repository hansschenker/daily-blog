import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../../post';

@Component({
  selector: 'app-post-form',
  template: `
<form [formGroup]="postForm" (ngSubmit)="onSubmit()">

<div>
  <label>Title</label>
  <input type="text" formControlName="title" />
</div>

<div>
  <label>Author</label>
  <input type="text" formControlName="author" />
</div>

<div>
  <label>Date</label>
  <input type="date" formControlName="datetime" />
</div>

<div>
  <label>Text</label>
  <textarea rows="10"  formControlName="text"></textarea>
</div>

<div formArrayName="links">

<!-- <div *ngFor="let link of links().controls; let i=index">
  <div [formGroupName]="i">
    {{i}}
    Link :
    <input type="text" formControlName="title">
    Url:
    <input type="text" formControlName="url">

    <button (click)="removeLink(i)">Remove</button>

  </div>

</div> -->
<button type="button" (click)="addLink()">Add Link</button>
</div>

<div formArrayName="links">

  <div *ngFor="let link of links().controls; let empIndex=index">

    <div [formGroupName]="empIndex" style="border: 1px solid blue; padding: 10px; width: 600px; margin: 5px;">
      {{empIndex}}
      Link title :
      <input type="text" formControlName="title">
      Link author:
      <input type="text" formControlName="url">

      <button (click)="removeLink(empIndex)">Remove Link</button>

    </div>

  </div>
</div>

<p>
  <button type="submit">Submit Post</button>
</p>

</form>


<p>
<!-- <button type="button" (click)="addPost()">Add Post/button> -->
</p>

{{this.postForm.value | json}}
  `,
  styles: [
    `
    form {
      width: 450px;
      border: 1px solid black;
    }
    div {
      display: flex;
      flex-direction: column;
      padding-left: 35px;
      margin-bottom: 10px;
    }
    input {

      left: 50px;
    }
    textarea {
      width: 400px;
    }
    `
  ]
})
export class PostFormComponent {


  postForm:FormGroup;


  constructor(private fb:FormBuilder, private firestore: AngularFirestore) {

    this.postForm=this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      datetime: ['', Validators.required],
      text: ['', Validators.required],
      links: this.fb.array([]) ,
    })
  }


  links(): FormArray {
    return this.postForm.get("links") as FormArray
  }


  newLink(): FormGroup {
    return this.fb.group({
      title: '',
      url: '',
      //links:this.fb.array([])
    })
  }


  // addLink() {
  //   console.log("Adding a Link");
  //   this.links().push(this.newLink());
  // }


  removeLink(index:number) {
    this.links().removeAt(index);
  }


  // links(index:number) : FormArray {
  //   return this.links().at(index).get("links") as FormArray
  // }

  // newPost(): FormGroup {
  //   return this.fb.group({
  //     title: '',
  //     url: '',
  //     links: this.fb.array([])
  //   })
  // }

  addLink() {
    this.links().push(this.newLink());
  }

  // removeLink(linkIndex:number) {
  //   this.links().removeAt(linkIndex);
  // }

  onSubmit(){
    
    
    let newPost = this.postForm.value as Post;
    console.log("newPost:", newPost);
    const date  = (this.postForm.controls['datetime'].value as string).split('-');
    // year
    const year = parseInt(date[0]);
    newPost.year = year;
    // month
    const month = parseInt(date[1]);
    newPost.month = month;
    // day
    const day = parseInt(date[2]);
    newPost.day = day;
    // add post
    this.firestore.collection('posts').add(newPost);
  } // onSubmit
} // class
