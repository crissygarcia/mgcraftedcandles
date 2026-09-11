const WHATSAPP_NUMBER="971527760547"; // MG Crafted Candles WhatsApp Business number.

const products=[
{id:1,name:"Warm Vanilla",desc:"Vanilla • amber • cozy woods",price:65,tag:"BESTSELLER",cats:["best","gift","cozy"],details:"A soft, comforting scent designed for cozy evenings and easy gifting."},
{id:2,name:"Mocha Latte",desc:"Coffee • cream • warm sweetness",price:70,tag:"NEW",cats:["best","cozy"],details:"A warm coffee-inspired candle with creamy sweetness."},
{id:3,name:"Rose Petals",desc:"Rose • musk • clean florals",price:68,tag:"FAVORITE",cats:["best","gift","floral"],details:"A soft floral profile with a clean, elegant finish."},
{id:4,name:"Desert Bloom",desc:"Botanical florals • green notes",price:72,tag:"LIMITED",cats:["gift","floral"],details:"A fresh botanical scent inspired by desert flowers."},
{id:5,name:"Strawberry Cream",desc:"Strawberry • vanilla • sugar",price:68,tag:"SWEET",cats:["gift"],details:"Playful, sweet and perfect for birthdays and cheerful gifting."},
{id:6,name:"Soft Linen",desc:"Clean linen • airy musk",price:65,tag:"FRESH",cats:["best","gift"],details:"A clean, airy fragrance for a calm everyday atmosphere."},
{id:7,name:"Sandalwood",desc:"Sandalwood • cedar • warm woods",price:75,tag:"SIGNATURE",cats:["cozy"],details:"Warm woods with a calm, sophisticated character."},
{id:8,name:"Peony Blush",desc:"Peony • rose • soft musk",price:70,tag:"FLORAL",cats:["floral","gift"],details:"A soft floral candle suited to elegant gifting and events."}
];
let cart=[];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

function renderProducts(list=products){
 const productGrid=$("#products");
 if(!productGrid)return;
 productGrid.innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}">
 <div class="product-photo"><span class="tag">${p.tag}</span><div class="jar">${p.name.split(" ")[0]}</div></div>
 <div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">AED ${p.price}</span><div class="product-buttons"><button class="mini-btn" data-view="${p.id}">Details</button><button class="mini-btn dark" data-add="${p.id}">Add</button></div></div></div></article>`).join("");
 $$("[data-add]").forEach(b=>b.onclick=()=>add(Number(b.dataset.add)));
 $$("[data-view]").forEach(b=>b.onclick=()=>showProduct(Number(b.dataset.view)));
}
renderProducts();

function add(id){
 const p=products.find(x=>x.id===id), item=cart.find(x=>x.id===id);
 if(item)item.qty++;else cart.push({...p,qty:1});
 renderBag();openBag();
}
function renderBag(){
 $("#bagCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 $("#bagItems").innerHTML=cart.length?cart.map(x=>`<div class="bag-item"><div><strong>${x.name}</strong><br><small>AED ${x.price} × ${x.qty}</small></div><button class="remove" data-remove="${x.id}">Remove</button></div>`).join(""):'<p class="muted">Your bag is empty.</p>';
 $$("[data-remove]").forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==Number(b.dataset.remove));renderBag()});
 updateTotals();
}
function updateTotals(){
 const sub=cart.reduce((s,x)=>s+x.price*x.qty,0), d=Number($("#delivery").value);
 $("#subtotal").textContent=`AED ${sub}`;$("#total").textContent=`AED ${sub+d}`;
}
function openBag(){$("#bag").classList.add("open");$("#shade").classList.add("show")}
function closeBag(){$("#bag").classList.remove("open");$("#shade").classList.remove("show")}
$("#bagBtn").onclick=openBag;$("#closeBag").onclick=closeBag;$("#shade").onclick=closeBag;$("#delivery").onchange=updateTotals;

function wa(text){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,"_blank")}
$("#whatsappCheckout").onclick=()=>{
 if(!cart.length){alert("Your bag is empty.");return}
 const d=Number($("#delivery").value), sub=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const lines=cart.map(x=>`${x.name} x${x.qty} — AED ${x.price*x.qty}`).join("%0A");
 wa(`Hello MG Crafted Candles!%0A%0AI'd like to order:%0A${lines}%0A%0ASubtotal: AED ${sub}%0ADelivery: AED ${d}%0ATotal: AED ${sub+d}%0A%0APlease confirm availability and delivery details.`);
};

function showProduct(id){
 const p=products.find(x=>x.id===id);
 $("#productDetail").innerHTML=`<div class="detail-grid"><div class="detail-image"><div class="jar">${p.name.split(" ")[0]}</div></div><div class="detail-copy"><span class="eyebrow">${p.tag}</span><h2>${p.name}</h2><p class="detail-price">AED ${p.price}</p><p>${p.details}</p><ul><li>Handcrafted in small batches</li><li>Gift-ready packaging available</li><li>UAE delivery options</li></ul><button class="btn dark" data-modal-add="${p.id}">Add to bag</button></div></div>`;
 $("#productModal").classList.add("show");
 $("[data-modal-add]").onclick=()=>{add(id);$("#productModal").classList.remove("show")};
}
$$("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal").classList.remove("show"));
$$(".modal").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove("show")});

$$(".filter").forEach(b=>b.onclick=()=>{
 $$(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 const f=b.dataset.filter;renderProducts(f==="all"?products:products.filter(p=>p.cats.includes(f)));
});
$("#searchBtn").onclick=()=>{$("#searchPanel").classList.toggle("show");$("#searchInput").focus()};
$("#searchInput").oninput=e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>(p.name+" "+p.desc+" "+p.details).toLowerCase().includes(q)))};
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$$("#nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));

const collectionInfo={
 ready:{eyebrow:"READY-MADE CANDLES",title:"Quiet rituals for every day.",intro:"Our ready-made lineup is being revised — updated photos and pieces are on the way.",cover:"assets/ready-made/cover.jpg"},
 personalized:{eyebrow:"PERSONALIZED GIFTS",title:"Details made just for them.",intro:"Custom label, scent and message options will be added here. Photos coming soon."},
 celebration:{eyebrow:"CELEBRATION FAVORS",title:"For weddings, birthdays, baby showers and more.",intro:"Event favor bundles and packaging options will be added here. Photos coming soon."}
};
function openCollection(key){
 const info=collectionInfo[key];if(!info)return;
 $("#collectionModalEyebrow").textContent=info.eyebrow;
 $("#collectionModalTitle").textContent=info.title;
 $("#collectionModalIntro").textContent=info.intro;
 const cover=$("#collectionModalCover");
 if(info.cover){cover.src=info.cover;cover.alt=info.title;cover.style.display="block";}else{cover.style.display="none";cover.removeAttribute("src");}
 const box=$("#collectionModal .modal-box");
 if(info.photos){
  box.classList.add("wide");
  $("#collectionModalOptions").className="collection-photo-grid";
  $("#collectionModalOptions").innerHTML=info.photos.map(name=>`<a href="assets/ready-made/${name}.jpg" target="_blank"><img src="assets/ready-made/${name}.jpg" alt="${info.title}" loading="lazy"></a>`).join("");
 } else {
  box.classList.remove("wide");
  $("#collectionModalOptions").className="collection-options";
  $("#collectionModalOptions").innerHTML=Array.from({length:3}).map((_,i)=>`<div class="collection-option-slot"><span class="plus">+</span><span>Option ${i+1}<br>photo &amp; details coming soon</span></div>`).join("");
 }
 $("#collectionModal").classList.add("show");
}
$$("[data-collection]").forEach(card=>{
 card.onclick=()=>openCollection(card.dataset.collection);
 card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCollection(card.dataset.collection);}};
});
function openCustom(occasion=""){ $("#customModal").classList.add("show");if(occasion)$("#customOccasion").value=occasion; }
$("#customBtn").onclick=()=>openCustom();
$$("[data-occasion]").forEach(b=>b.onclick=()=>openCustom(b.dataset.occasion));

$("#customForm").onsubmit=e=>{
 e.preventDefault();const d=new FormData(e.target);
 wa(`Hello MG Crafted Candles!%0A%0ACUSTOM ORDER REQUEST%0AName: ${d.get("name")}%0AWhatsApp: ${d.get("phone")}%0AOccasion: ${d.get("occasion")}%0AQuantity: ${d.get("quantity")}%0AFragrance: ${d.get("fragrance")||"No preference"}%0APersonalization: ${d.get("personalization")}%0ADetails: ${d.get("details")}`);
};
$("#contactForm").onsubmit=e=>{
 e.preventDefault();const d=new FormData(e.target);
 wa(`Hello MG Crafted Candles!%0A%0AINQUIRY%0AName: ${d.get("name")}%0AWhatsApp: ${d.get("phone")}%0AEmail: ${d.get("email")}%0AOccasion: ${d.get("occasion")}%0AMessage: ${d.get("message")}`);
};
$("#year").textContent=new Date().getFullYear();
renderBag();
