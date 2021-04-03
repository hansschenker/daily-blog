import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// angular firestore

// post feature
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostListComponent,
    PostFormComponent,
    PostDetailsComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ],
  exports: [
    PostListComponent,
    PostFormComponent,
    PostDetailsComponent,
    PostListItemComponent
  ]
})
export class PostsModule { 

}
