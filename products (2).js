/* ---------------- DATA ---------------- */

const CATEGORIES = ["shoes","dresses","sunglasses","tops","shorts","trousers"];

const STYLE_WORDS = ["trendy","casual","party","sporty","smart","cute","comfy","edgy","classic","summer","school","festival"];

const PRODUCTS = [
  // SHOES
  {cat:"shoes", name:"Adidas Superstar", sizes:[6], price:100, style:["trendy","casual"], pairsWith:["tops","shorts"], link:"https://www.adidas.com/us/superstar-ii-shoes/JH7033.html"},
  {cat:"shoes", name:"Isabel Marant Bekett Sneakers - Ecru", sizes:[6], price:850, style:["trendy","edgy"], pairsWith:["tops","shorts"], link:"https://us.isabelmarant.com/products/bk0010faa1e19s23ec-bekett-sneakers-ecru"},
  {cat:"shoes", name:"Hoka Clifton 10 Running Shoes", sizes:[8], price:155, style:["sporty","comfy"], pairsWith:["tops","shorts"], link:"https://www.dickssportinggoods.com/p/hoka-womens-clifton-10-running-shoes-25fhqwclftn10blckftw/25fhqwclftn10blckftw"},

  // DRESSES
  {cat:"dresses", name:"Boho Halter V-Neck Open Back Maxi Dress", sizes:["M"], price:79.95, style:["summer","cute","festival"], pairsWith:["shoes"], link:"https://bohobeachhut.com/products/boho-halter-v-neck-open-back-maxi-dress"},
  {cat:"dresses", name:"Oh Polly Leya A-Line Mini Dress - Black", sizes:["S"], price:62, style:["party","trendy"], pairsWith:["shoes"], link:"https://us.ohpolly.com/products/leya-a-line-mini-dress-black"},
  {cat:"dresses", name:"Eterne Long Sleeve Crewneck Maxi Dress - Black", sizes:["M"], price:265, style:["classic","smart"], pairsWith:["shoes"], link:"https://www.revolve.com/eterne-long-sleeve-crewneck-maxi-dress-in-black/dp/ERNE-WD2/"},

  // SUNGLASSES
  {cat:"sunglasses", name:"Greenwich Social Club Canouan - Black", sizes:["one size"], price:165, style:["trendy","edgy"], pairsWith:[], link:"https://greenwichsocialclub.com/products/canouan-black"},
  {cat:"sunglasses", name:"Maui Jim Hau'oli XS Aviator", sizes:["one size"], price:229, style:["classic","smart"], pairsWith:[], link:"https://www.mauijim.com/US/en_US/shop/sunglasses/aviators/hauoli-xs"},
  {cat:"sunglasses", name:"Maui Jim Hiluhilu", sizes:["one size"], price:309, style:["trendy","festival"], pairsWith:[], link:"https://www.mauijim.com/US/en_US/shop/sunglasses/fashion/hiluhilu"},

  // TOPS
  {cat:"tops", name:"With Jean Lana Top - Stone", sizes:["XXS"], price:148, style:["casual","cute"], pairsWith:["shorts","trousers"], link:"https://withjean.com/products/lana-top-stone"},
  {cat:"tops", name:"Reformation Lois Knit Top", sizes:["XS"], price:88, style:["party","trendy"], pairsWith:["trousers"], link:"https://www.thereformation.com/products/lois-knit-top/1319850PRI.html"},
  {cat:"tops", name:"Kookai Ariel Lace Top - Black", sizes:[4], price:120, style:["party","edgy"], pairsWith:["trousers","shorts"], link:"https://www.kookai.us/products/ariel-lace-top-black"},

  // SHORTS
  {cat:"shorts", name:"Revice Denim Low Rider - South Beach", sizes:["S (25/26)"], price:78, style:["trendy","summer"], pairsWith:["tops"], link:"https://www.revicedenim.com/products/low-rider-south-beach"},
  {cat:"shorts", name:"Isabel Marant Eneidao Fringed Denim Shorts", sizes:[36], price:310, style:["trendy","edgy"], pairsWith:["tops"], link:"https://www.net-a-porter.com/en-us/shop/product/isabel-marant/clothing/short-and-mini/eneidao-fringed-denim-shorts/1647597325950548"},
  {cat:"shorts", name:"Out From Under Free Kick Mesh Micro Shorts", sizes:["XL"], price:19, style:["casual","summer"], pairsWith:["tops"], link:"https://www.urbanoutfitters.com/shop/out-from-under-free-kick-mesh-micro-shorts"},

  // TROUSERS
  {cat:"trousers", name:"New Look Petite Black Tailored Pull-On Trousers", sizes:["UK 8"], price:32, style:["smart","classic","school"], pairsWith:["tops"], link:"https://www.newlook.com/uk/womens/clothing/trousers/petite-black-tailored-pull-on-trousers/p/932715001"},
  {cat:"trousers", name:"Lululemon Daydrift High-Rise Straight-Leg Trouser", sizes:[6], price:148, style:["smart","comfy"], pairsWith:["tops"], link:"https://www.lululemon.co.uk/en-gb/p/daydrift-high-rise-straight-leg-trouser-regular/157686489.html"},
  {cat:"trousers", name:"Roman Wide Leg Stretch Trousers - Khaki", sizes:[12], price:33, style:["casual","classic"], pairsWith:["tops"], link:"https://www.roman.co.uk/wide-leg-stretch-trousers-18000740"}
];
