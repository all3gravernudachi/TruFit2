/* ---------------- STATE ---------------- */

let state = {
  stage: "start",
  lastQuery: {},
  lastResults: [],
  refineTarget: null
};

let faves = [];

/* ---------------- DOM HELPERS ---------------- */

const chatLog = document.getElementById("chatLog");
const quickReplies = document.getElementById("quickReplies");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const favesList = document.getElementById("favesList");

function addMsg(text, sender="bot"){
  const div = document.createElement("div");
  div.className = "msg " + sender;
  div.innerHTML = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function setQuickReplies(options){
  quickReplies.innerHTML = "";
  options.forEach(opt=>{
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = opt.label;
    chip.onclick = ()=> opt.action();
    quickReplies.appendChild(chip);
  });
}

function clearQuickReplies(){
  quickReplies.innerHTML = "";
}

/* ---------------- SHOP LINKS ---------------- */

const SHOP_NAMES = {
  "adidas.com":"Adidas",
  "isabelmarant.com":"Isabel Marant",
  "dickssportinggoods.com":"Dick's Sporting Goods",
  "bohobeachhut.com":"Boho Beach Hut",
  "ohpolly.com":"Oh Polly",
  "revolve.com":"Revolve",
  "greenwichsocialclub.com":"Greenwich Social Club",
  "mauijim.com":"Maui Jim",
  "withjean.com":"With Jean",
  "thereformation.com":"Reformation",
  "kookai.us":"Kookai",
  "revicedenim.com":"Revice Denim",
  "net-a-porter.com":"Net-a-Porter",
  "urbanoutfitters.com":"Urban Outfitters",
  "newlook.com":"New Look",
  "lululemon.co.uk":"Lululemon",
  "roman.co.uk":"Roman"
};

function getShopName(url){
  try{
    const host = new URL(url).hostname.replace("www.","");
    for(const key in SHOP_NAMES){
      if(host.includes(key)) return SHOP_NAMES[key];
    }
    const parts = host.split(".");
    const name = parts.length>2 ? parts[1] : parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch(e){
    return "Shop";
  }
}

/* ---------------- PARSING ---------------- */

function parseQuery(text){
  const lower = text.toLowerCase();
  const result = { category:null, size:null, budget:null, styles:[] };

  for(const c of CATEGORIES){
    if(lower.includes(c) || (c==="shoes" && lower.includes("shoe")) || (c==="trousers" && (lower.includes("trouser")||lower.includes("pants"))) || (c==="dresses" && lower.includes("dress")) || (c==="tops" && lower.includes("top")) || (c==="shorts" && lower.includes("short")) || (c==="sunglasses" && (lower.includes("sunglasses")||lower.includes("shades")))){
      result.category = c;
      break;
    }
  }

  let sizeMatch = lower.match(/size\s*(\d{1,2})/);
  if(sizeMatch){
    result.size = parseInt(sizeMatch[1]);
  } else {
    let numMatch = lower.match(/\b(\d{1,2})\b/);
    if(numMatch && !lower.includes("£") ){
      let n = parseInt(numMatch[1]);
      if(n>=3 && n<=18) result.size = n;
    }
  }

  let budgetMatch = lower.match(/under\s*£?\s*(\d{1,4})/) || lower.match(/£\s*(\d{1,4})/) || lower.match(/budget\s*£?\s*(\d{1,4})/);
  if(budgetMatch){
    result.budget = parseInt(budgetMatch[1]);
  }

  STYLE_WORDS.forEach(w=>{
    if(lower.includes(w)) result.styles.push(w);
  });

  return result;
}

function validateQuery(q, rawText){
  if(!rawText || rawText.trim().length===0){
    return "Oops — looks like you didn't type anything. Try something like: <b>dress size 10 under £30 party</b>";
  }
  if(/^[^a-zA-Z0-9]+$/.test(rawText.trim())){
    return "That's just punctuation! Try telling me what you're after, like: <b>trainers size 6 under £25 casual</b>";
  }
  if(!q.category){
    return "I couldn't spot what you're shopping for. Pick a category: shoes, dresses, sunglasses, tops, shorts or trousers.";
  }
  if(q.size!==null && (q.size<3 || q.size>18)){
    return "That size looks a bit off — most items run from size 3 to 18 (or one size for sunglasses). Mind double-checking?";
  }
  if(q.budget!==null && q.budget<=0){
    return "Your budget needs to be more than £0! Try again with a real number, like under £25.";
  }
  return null;
}

/* ---------------- MATCHING ---------------- */

function findMatches(q){
  let pool = PRODUCTS.filter(p=>p.cat===q.category);

  if(q.size!==null){
    pool = pool.filter(p=> p.sizes.includes("one size") || p.sizes.includes(q.size));
  }
  if(q.budget!==null){
    pool = pool.filter(p=> p.price <= q.budget);
  }
  if(q.styles.length>0){
    pool = pool.filter(p=> p.style.some(s=>q.styles.includes(s)));
  }

  pool.sort((a,b)=>{
    let aScore = a.style.filter(s=>q.styles.includes(s)).length;
    let bScore = b.style.filter(s=>q.styles.includes(s)).length;
    if(bScore!==aScore) return bScore-aScore;
    return a.price-b.price;
  });

  return pool.slice(0,3);
}

/* ---------------- RENDER RESULTS ---------------- */

function renderResults(results, q){
  if(results.length===0){
    addMsg("Hmm, I couldn't find anything matching that exactly. Want to try loosening your budget or size?");
    setQuickReplies([
      {label:"Try again", action: resetToStart}
    ]);
    return;
  }

  results.forEach(p=>{
    const cardId = "card_" + Math.random().toString(36).slice(2,9);
    const cardHtml = `
      <div class="card" id="${cardId}">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-details">Size: ${Array.isArray(p.sizes)? p.sizes.join(", "): p.sizes}</div>
        <div class="card-price">£${p.price}</div>
        ${p.link ? `<a class="view-link" href="${p.link}" target="_blank" rel="noopener noreferrer">View at ${getShopName(p.link)} →</a>` : ""}
        <div class="card-actions">
          <button class="save-btn" data-name="${p.name}">🤍 Save</button>
          <button class="notquite-btn" data-name="${p.name}">Not quite right</button>
          ${p.pairsWith.length>0 ? `<button class="look-btn" data-name="${p.name}">Build the Look</button>` : ""}
        </div>
        <div class="not-quite-box" style="display:none;"></div>
        <div class="look-section" style="display:none;"></div>
      </div>`;
    const div = document.createElement("div");
    div.className = "msg bot";
    div.innerHTML = cardHtml;
    chatLog.appendChild(div);

    if(p.link){
      const cardEl = div.querySelector(".card");
      cardEl.addEventListener("click", (e)=>{
        if(e.target.closest("button") || e.target.closest("a")) return;
        window.open(p.link, "_blank", "noopener");
      });
    }
  });
  chatLog.scrollTop = chatLog.scrollHeight;

  wireCardButtons(results, q);

  setQuickReplies([
    {label:"Search again", action: resetToStart}
  ]);
}

function wireCardButtons(results, q){
  document.querySelectorAll(".save-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const name = btn.dataset.name;
      const product = PRODUCTS.find(p=>p.name===name);
      toggleFave(product, btn);
    };
  });

  document.querySelectorAll(".notquite-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const name = btn.dataset.name;
      const product = PRODUCTS.find(p=>p.name===name);
      const card = btn.closest(".card");
      const box = card.querySelector(".not-quite-box");
      box.style.display = "block";
      box.innerHTML = `
        <div>What's the issue?</div>
        <div class="quick-replies" style="margin-top:8px;">
          <div class="chip" data-issue="price">Too pricey</div>
          <div class="chip" data-issue="size">Wrong size</div>
          <div class="chip" data-issue="vibe">Wrong vibe</div>
        </div>`;
      box.querySelectorAll(".chip").forEach(chip=>{
        chip.onclick = ()=> handleNotQuiteRight(product, chip.dataset.issue, q, box);
      });
    };
  });

  document.querySelectorAll(".look-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const name = btn.dataset.name;
      const product = PRODUCTS.find(p=>p.name===name);
      const card = btn.closest(".card");
      const section = card.querySelector(".look-section");
      buildTheLook(product, section);
    };
  });
}

function handleNotQuiteRight(product, issue, q, box){
  let newQuery = Object.assign({}, q);
  let msg = "";

  if(issue==="price"){
    newQuery.budget = Math.max(5, Math.floor(product.price * 0.7));
    msg = `Got it — looking for something cheaper than £${newQuery.budget}...`;
  } else if(issue==="size"){
    box.innerHTML = `<div>No worries — what size do you need?</div>`;
    const sizeInput = document.createElement("input");
    sizeInput.type = "text";
    sizeInput.placeholder = "e.g. 8";
    sizeInput.style = "margin-top:8px;padding:8px;border-radius:10px;border:1px solid #ddd;width:100%;";
    box.appendChild(sizeInput);
    const goBtn = document.createElement("button");
    goBtn.textContent = "Update";
    goBtn.style = "margin-top:8px;background:var(--main);color:white;border:none;border-radius:12px;padding:6px 14px;";
    goBtn.onclick = ()=>{
      const val = parseInt(sizeInput.value);
      if(isNaN(val)){
        addMsg("That doesn't look like a size — try a number like 8 or 10.", "error");
        return;
      }
      newQuery.size = val;
      addMsg(`Looking for size ${val} instead...`);
      const results = findMatches(newQuery);
      renderResults(results, newQuery);
    };
    box.appendChild(goBtn);
    return;
  } else if(issue==="vibe"){
    box.innerHTML = `<div>What vibe are you after instead?</div>
      <div class="quick-replies" style="margin-top:8px;">
        ${STYLE_WORDS.map(w=>`<div class="chip" data-style="${w}">${w}</div>`).join("")}
      </div>`;
    box.querySelectorAll(".chip").forEach(chip=>{
      chip.onclick = ()=>{
        newQuery.styles = [chip.dataset.style];
        addMsg(`Looking for something more ${chip.dataset.style}...`);
        const results = findMatches(newQuery);
        renderResults(results, newQuery);
      };
    });
    return;
  }

  addMsg(msg);
  const results = findMatches(newQuery);
  renderResults(results, newQuery);
}

function buildTheLook(product, section){
  if(product.pairsWith.length===0){
    section.style.display = "block";
    section.innerHTML = "<h4>No pairing suggestions for this item.</h4>";
    return;
  }
  const pairCat = product.pairsWith[Math.floor(Math.random()*product.pairsWith.length)];
  let candidates = PRODUCTS.filter(p=>p.cat===pairCat && p.style.some(s=>product.style.includes(s)));
  if(candidates.length===0){
    candidates = PRODUCTS.filter(p=>p.cat===pairCat);
  }
  const pick = candidates[Math.floor(Math.random()*candidates.length)];

  section.style.display = "block";
  section.innerHTML = `
    <h4>Complete the look with:</h4>
    <div class="card-name">${pick.name}</div>
    <div class="card-details">${pick.cat} · Size: ${Array.isArray(pick.sizes)? pick.sizes.join(", "): pick.sizes}</div>
    <div class="card-price">£${pick.price}</div>
  `;
}

/* ---------------- FAVES ---------------- */

function toggleFave(product, btn){
  const idx = faves.findIndex(f=>f.name===product.name);
  if(idx>=0){
    faves.splice(idx,1);
    btn.textContent = "🤍 Save";
    btn.classList.remove("saved");
  } else {
    faves.push(product);
    btn.textContent = "❤️ Saved";
    btn.classList.add("saved");
  }
  renderFaves();
}

function renderFaves(){
  favesList.innerHTML = "";
  if(faves.length===0){
    favesList.innerHTML = `<div class="empty-msg">No faves yet — heart something in chat to save it here!</div>`;
    return;
  }
  faves.forEach(p=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="card-cat">${p.cat}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-details">Size: ${Array.isArray(p.sizes)? p.sizes.join(", "): p.sizes}</div>
      <div class="card-price">£${p.price}</div>
      <div class="card-actions">
        <button class="remove-fave-btn">Remove</button>
      </div>
    `;
    div.querySelector(".remove-fave-btn").onclick = ()=>{
      faves = faves.filter(f=>f.name!==p.name);
      renderFaves();
      document.querySelectorAll(`.save-btn[data-name="${p.name}"]`).forEach(b=>{
        b.textContent = "🤍 Save";
        b.classList.remove("saved");
      });
    };
    favesList.appendChild(div);
  });
}

/* ---------------- CHAT FLOW ---------------- */

function resetToStart(){
  clearQuickReplies();
  addMsg("What are you looking for? Try: shoes, dresses, sunglasses, tops, shorts or trousers — with your size, budget and style if you've got them!");
}

function handleUserText(text){
  addMsg(text, "user");
  userInput.value = "";

  const q = parseQuery(text);
  const errorMsg = validateQuery(q, text);

  if(errorMsg){
    addMsg(errorMsg, "error");
    return;
  }

  state.lastQuery = q;
  let confirmBits = [q.category];
  if(q.size!==null) confirmBits.push("size " + q.size);
  if(q.budget!==null) confirmBits.push("under £" + q.budget);
  if(q.styles.length>0) confirmBits.push(q.styles.join("/") + " style");

  addMsg("Searching for " + confirmBits.join(", ") + " — here's what I found:");
  const results = findMatches(q);
  state.lastResults = results;
  renderResults(results, q);
}

sendBtn.onclick = ()=>{
  const text = userInput.value;
  handleUserText(text);
};

userInput.addEventListener("keydown", e=>{
  if(e.key==="Enter") handleUserText(userInput.value);
});

/* ---------------- TABS ---------------- */

document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.screen).classList.add("active");
  };
});

/* ---------------- INIT ---------------- */

addMsg("Hey! I'm TruFit 👋 Tell me what you're shopping for — category, size, budget and style all in one go if you like. E.g. <i>dress size 10 under £30 party trendy</i>");
renderFaves();
