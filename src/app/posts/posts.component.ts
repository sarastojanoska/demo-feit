import { Component,OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PostDetailComponent} from '../posts-details/post-details.component';
import { InstagramApiService } from '../instagram-api.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
     pictureUrl: string;
    constructor(public dialog: MatDialog, private apiService: InstagramApiService) { }

    ngOnInit() {
        
    }
    @Input()
    posts: Post;
    onclick(posts: Post){
        const dialogRef = this.dialog.open(PostDetailComponent, {
            width: '750px',
            height: '500px',
            data: {clickedpost : posts}
        });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }
  onLike() {
      if(this.posts.isLiked == false) {
          this.posts.likes++;
          this.posts.isLiked=true;
          this.posts.button='';
      }
      else {
          this.posts.likes--;
          this.posts.isLiked=false;
          this.posts.button='';
      }
      this.updatepost();
  }

  onSave() {
      if (this.posts.isSaved ==false) {
          this.posts.isSaved=true;
          this.posts.savebutton='';
      }
      else {
          this.posts.isSaved=false;
          this.posts.savebutton='';
      }
      this.updatepost();
  }
  updatepost(){
      var post={
          "id": this.posts.id,
          "headerUrl": this.posts.headerUrl,
          "name": this.posts.name,
          "location": this.posts.location,
          "likes": this.posts.likes,
          "isLiked": this.posts.isLiked,
          "button": this.posts.button,
          "isSaved": this.posts.isSaved,
          "savebutton": this.posts.savebutton,
      }
      this.apiService.updatepost(this.posts, this.posts.id).subscribe((res)=>{
          console.log("Updated post");
      });
  }
}