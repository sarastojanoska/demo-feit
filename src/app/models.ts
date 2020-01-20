class Post {
    id:number;
    photoUrl:string;
    likes: number;
    isLiked: boolean;
    button:string;
    savebutton:string;
    isSaved:boolean;
    name: string;
    location: string;
    headerUrl: string;
}

class PostComment {
    id: number;
    fullName: string;
    accountName: string;
    photoUrl: string;
    comment: string;
}