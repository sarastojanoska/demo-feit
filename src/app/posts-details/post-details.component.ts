import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstagramApiService } from '../instagram-api.service';

export interface DialogData {
  clickedPost: Post;
}

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailComponent implements OnInit {
  postComments: PostComment[] = [];
  newComment: PostComment;
  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<PostDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: InstagramApiService) {

      this.newComment= { id: this.data.clickedPost.id, 
                      accountName: '@WONDERWOMAN', 
                      comment: 'Sakam kola ubava nekjam staro fico',
                      photoUrl: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
                      fullName: 'Sara11'};

      this.apiService.getPostComments(this.data.clickedPost.id)
       .subscribe((comments)=>{
         this.postComments = comments;
       });
    }

    onComment(){
      this.apiService.postComment(this.data.clickedPost.id,this.newComment)
      .subscribe(()=>{
        console.log("Posted new comment");
      });
      this.newComment.comment='';
    }
}