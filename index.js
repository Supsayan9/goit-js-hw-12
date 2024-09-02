import{a as m,i as g}from"./assets/vendor-BAYSJss3.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const h="https://pixabay.com/api/",b="45539852-e7385dbf9677b23660ec365b6",p=async(e,s)=>{try{const o=await m.get(h,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}});if(o.status!==200)throw new Error(`Error: ${o.status}`);return o.data}catch(o){throw g.show({message:`Error: ${o.message}`,position:"topRight",backgroundColor:"#ef4040",titleColor:"#fff",titleSize:"16px",messageColor:"#fff",messageSize:"16px",maxWidth:"385px",timeout:5e3}),o}},L=e=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-img"
          src="${e.webformatURL}"
          alt="${e.tags}"
          loading="lazy" />
      </a>
      <ul class="gallery-info">
        <li class="gallery-info-item">
          <p class="gallery-info-title">Likes</p>
          <p class="gallery-info-text">${e.likes}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Views</p>
          <p class="gallery-info-text">${e.views}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Comments</p>
          <p class="gallery-info-text">${e.comments}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Downloads</p>
          <p class="gallery-info-text">${e.downloads}</p>
        </li>
      </ul>
    </li>
  `,u=e=>{const s=document.querySelector(".gallery-list"),o=e.map(L).join("");s.insertAdjacentHTML("beforeend",o)};let l=1,y="",i=0;const x=document.querySelector(".form"),c=document.getElementById("load-more"),a=document.getElementById("end-message"),n=document.querySelector(".loader-box");x.addEventListener("submit",async e=>{e.preventDefault(),y=e.target.elements.search.value.trim(),l=1,i=0,document.querySelector(".gallery-list").innerHTML="",c.style.display="none",a.style.display="none",n.classList.add("loader-box-active");try{const s=await p(y,l);if(i=s.totalHits,s.hits.length===0){a.style.display="block",a.textContent="No images found. Please try a different search term.";return}u(s.hits),i>l*15?c.style.display="block":a.style.display="block"}catch(s){console.error(s)}finally{n.classList.remove("loader-box-active")}});c.addEventListener("click",async()=>{l++,n.classList.add("loader-box-active");try{const e=await p(y,l);u(e.hits),i<=l*15&&(c.style.display="none",a.style.display="block")}catch(e){console.error(e)}finally{n.classList.remove("loader-box-active")}});
//# sourceMappingURL=index.js.map
