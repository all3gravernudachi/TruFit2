/* ---------------- DATA ---------------- */

const CATEGORIES = ["shoes","dresses","sunglasses","tops","shorts","trousers"];

const STYLE_WORDS = ["trendy","casual","party","sporty","smart","cute","comfy","edgy","classic","summer","school","festival"];

const PRODUCTS = [
  // SHOES
  {cat:"shoes", name:"Cloud Runner Trainers", sizes:[4,5,6,7,8], price:24, style:["sporty","casual","comfy"], pairsWith:["tops","shorts"]},
  {cat:"shoes", name:"Strappy Block Heels", sizes:[3,4,5,6,7], price:28, style:["party","trendy"], pairsWith:["dresses"]},
  {cat:"shoes", name:"Classic White Sneakers", sizes:[3,4,5,6,7,8], price:19, style:["casual","classic","school"], pairsWith:["tops","trousers"]},
  {cat:"shoes", name:"Chunky Platform Boots", sizes:[4,5,6,7], price:35, style:["edgy","trendy"], pairsWith:["dresses","trousers"]},
  {cat:"shoes", name:"Ballet Flats", sizes:[3,4,5,6,7,8], price:16, style:["cute","smart","school"], pairsWith:["dresses","trousers"]},

  // DRESSES
  {cat:"dresses", name:"Floral Wrap Dress", sizes:[6,8,10,12,14], price:22, style:["cute","summer","party"], pairsWith:["shoes"]},
  {cat:"dresses", name:"Slip Satin Dress", sizes:[6,8,10,12], price:29, style:["party","trendy"], pairsWith:["shoes"]},
  {cat:"dresses", name:"Denim Shirt Dress", sizes:[8,10,12,14,16], price:18, style:["casual","school"], pairsWith:["shoes"]},
  {cat:"dresses", name:"Bodycon Midi Dress", sizes:[6,8,10,12], price:25, style:["party","edgy","trendy"], pairsWith:["shoes"]},
  {cat:"dresses", name:"Puff Sleeve Sundress", sizes:[8,10,12,14], price:20, style:["cute","summer","casual"], pairsWith:["shoes"]},

  // SUNGLASSES
  {cat:"sunglasses", name:"Retro Round Frames", sizes:["one size"], price:9, style:["trendy","edgy","festival"], pairsWith:[]},
  {cat:"sunglasses", name:"Classic Cat-Eye", sizes:["one size"], price:12, style:["classic","smart"], pairsWith:[]},
  {cat:"sunglasses", name:"Oversized Square", sizes:["one size"], price:14, style:["trendy","summer"], pairsWith:[]},
  {cat:"sunglasses", name:"Sport Wraparounds", sizes:["one size"], price:11, style:["sporty","casual"], pairsWith:[]},

  // TOPS
  {cat:"tops", name:"Ribbed Crop Top", sizes:[6,8,10,12,14], price:8, style:["trendy","party","casual"], pairsWith:["shorts","trousers"]},
  {cat:"tops", name:"Oversized Graphic Tee", sizes:[8,10,12,14,16], price:10, style:["casual","comfy","school"], pairsWith:["shorts","trousers"]},
  {cat:"tops", name:"Fitted Polo", sizes:[8,10,12,14], price:12, style:["smart","classic","school"], pairsWith:["trousers","shorts"]},
  {cat:"tops", name:"Satin Cami", sizes:[6,8,10,12], price:11, style:["party","trendy"], pairsWith:["trousers"]},
  {cat:"tops", name:"Cosy Knit Jumper", sizes:[8,10,12,14,16], price:16, style:["comfy","casual","classic"], pairsWith:["trousers"]},

  // SHORTS
  {cat:"shorts", name:"Denim Mom Shorts", sizes:[6,8,10,12,14], price:14, style:["casual","trendy","summer"], pairsWith:["tops"]},
  {cat:"shorts", name:"Bike Shorts", sizes:[6,8,10,12], price:9, style:["sporty","comfy","casual"], pairsWith:["tops"]},
  {cat:"shorts", name:"Tailored Smart Shorts", sizes:[8,10,12,14], price:17, style:["smart","classic"], pairsWith:["tops"]},
  {cat:"shorts", name:"Cargo Shorts", sizes:[8,10,12,14,16], price:15, style:["casual","edgy"], pairsWith:["tops"]},

  // TROUSERS
  {cat:"trousers", name:"Wide Leg Jeans", sizes:[6,8,10,12,14,16], price:26, style:["trendy","casual"], pairsWith:["tops"]},
  {cat:"trousers", name:"Tailored Trousers", sizes:[8,10,12,14], price:24, style:["smart","classic","school"], pairsWith:["tops"]},
  {cat:"trousers", name:"Joggers", sizes:[6,8,10,12,14,16], price:15, style:["sporty","comfy","casual"], pairsWith:["tops"]},
  {cat:"trousers", name:"Faux Leather Leggings", sizes:[6,8,10,12], price:19, style:["edgy","party","trendy"], pairsWith:["tops"]}
];
