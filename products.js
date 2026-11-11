const productName = document.getElementById('productName')
const productDesc = document.getElementById('productDesc')
const productPrice = document.getElementById('productPrice')
const productCategory = document.getElementById('productCategory')
const productRating = document.getElementById('productRating')
const productStock = document.getElementById('productStock')
const productDiscount = document.getElementById('productDiscount')
const productimg = document.getElementById('productimg')
const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn')
const parent = document.getElementById('parent')

let products = []
async function Getproducts(params) {

    const response = await fetch("http://localhost:5000/products")
    const request = await response.json()
    products = request;
        localStorage.setItem('products', JSON.stringify(products))
    RenderList(products)
}

function RenderList(prod) {
    prod.map(item => {
        const div = document.createElement('div')

        div.innerHTML =`
         <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${item.thumbnail}"
      alt="rasm qoyilmagan" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${item.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy now</button>
      <button id='btnDel' class="btn btn-error">Delete</button>

    </div>
  </div>
</div>
        `
        const btnDel = div.querySelector("#btnDel")

btnDel.addEventListener("click" , ()=> {
  DeleteProducts(item.id)
})
        parent.append(div)
    })
}

Getproducts()

async function SearchProducts() {
    const response = await fetch("http://localhost:5000/products")
    products = await response.json()

}

const PostProduct = async () => {
const response = await fetch ("http://localhost:5000/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title:productName.value,
    description: productDesc.value,
    category: productCategory.value,
    price:productPrice.value,
    discountPercentage: productDiscount.value,
    rating:productRating.value,
    stock:productStock.value,
    thumbnail: productimg.value
  })
})
const result = await response.json()
console.log(result);

}
Getproducts()

input.addEventListener("input", () => {
    const filteruser = products.filter(item =>
        item.title.toLowerCase().includes(input.value.toLowerCase())
    )
    parent.innerHTML = ''
    RenderList(filteruser)
})
    

addBtn.addEventListener('click', () => {
  PostProduct()
})


async function DeleteProducts(id) {
  const res = await fetch(`http://localhost:5000/products/${id}`, {
    method:"DELETE",
    headers: {
      "Content-Type":"application/json",
    }
  })
  const req = await res.json()

  console.log(req);
  
}



