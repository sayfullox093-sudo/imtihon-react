const userName = document.getElementById('userName')
const fullName = document.getElementById('fullName')
const Comment = document.getElementById('Comment')
const PostID = document.getElementById('PostID')
const parentusers = document.getElementById('parentusers')
const addBtn = document.getElementById('addBtn')
const input = document.getElementById('input')

let comments = []

async function GetComments(params) {
    const response = await fetch("http://localhost:5000/comments")
    const request = await response.json()
    RenderComments(request)
}

function RenderComments(comment){
  comment.map(odam => {
    const div = document.createElement('div')
  div.innerHTML = `
  
<div class="card w-96 bg-base-100 card-sm shadow-sm">
  <div class="card-body">
    <h2 class="card-title">${odam.user.username}</h2>
        <h2 class="card-title">${odam.user.fullName}</h2>
    <p class = "text-[19px]">${odam.body}</p>
    <div class="justify-end card-actions">
      <button class="btn btn-primary">Buy Now</button>
      <button id="btnDel" class="btn btn-error">Delete</button>

    </div>
  </div>
</div>

  `

  const btnDel = div.querySelector("#btnDel")

btnDel.addEventListener("click" , ()=> {
  DeleteComments(odam.id)
})

parentusers.append(div)
  })

}

GetComments()

async function SearchComments() {
    const response = await fetch("http://localhost:5000/comments")
    comments = await response.json()
}
SearchComments()

const PostComment = async () => {
const response = await fetch ("http://localhost:5000/comments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    body:Comment.value,
    postId:Number(PostID.value),
    likes: 0,
    user: {
                  id: 105,
        username:userName.value,
    fullName: fullName.value,

    }
  
  })
})
const result = await response.json()
console.log(result);

await GetComments();

}

addBtn.addEventListener('click', () => {
  PostComment()
})

input.addEventListener("input", () => {
    const filteruser = comments.filter(item =>
        item.body.toLowerCase().includes(input.value) ||
        item.user.fullName.toLowerCase().includes(input.value)
    )

    parentusers.innerHTML = ''
    RenderComments(filteruser)
})

async function DeleteComments(id) {
  const res = await fetch(`http://localhost:5000/comments/${id}`, {
    method:"DELETE",
    headers: {
      "Content-Type":"application/json",
    }
  })
  const req = await res.json()

  console.log(req);
  
}





     localStorage.setItem('comments', JSON.stringify(comments));
