import{a as u,i as h,S as b}from"./assets/vendor-DzhXonRW.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))p(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const y of r.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&p(y)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const x="https://pixabay.com/api/",L="45539852-e7385dbf9677b23660ec365b6",g=async(e,t)=>{try{const o=await u.get(x,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}});if(o.status!==200)throw new Error(`Error: ${o.status}`);return o.data}catch(o){throw h.show({message:`Error: ${o.message}`,position:"topRight",backgroundColor:"#ef4040",titleColor:"#fff",titleSize:"16px",messageColor:"#fff",messageSize:"16px",maxWidth:"385px",timeout:5e3}),o}},w=e=>`
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
  `,m=e=>{const t=document.querySelector(".gallery-list"),o=e.map(w).join("");t.insertAdjacentHTML("beforeend",o)};let l=1,f="",c=0,i;const v=document.querySelector(".form"),n=document.getElementById("load-more"),a=document.getElementById("end-message"),d=document.querySelector(".loader-box");v.addEventListener("submit",async e=>{e.preventDefault(),f=e.target.elements.search.value.trim(),l=1,c=0,document.querySelector(".gallery-list").innerHTML="",n.style.display="none",a.style.display="none",d.classList.add("loader-box-active");try{const t=await g(f,l);if(c=t.totalHits,t.hits.length===0){a.style.display="block",a.textContent="No images found. Please try a different search term.";return}m(t.hits),i?i.refresh():i=new b(".gallery-list a",{captionsData:"alt",captionDelay:250});const o=document.querySelector(".gallery-item").getBoundingClientRect().height;c>l*15?n.style.display="block":a.style.display="block",window.scrollBy({top:o*2,behavior:"smooth"})}catch(t){console.error(t)}finally{d.classList.remove("loader-box-active")}});n.addEventListener("click",async()=>{l++,d.classList.add("loader-box-active");try{const e=await g(f,l);m(e.hits),i&&i.refresh();const t=document.querySelector(".gallery-item").getBoundingClientRect().height;c<=l*15&&(n.style.display="none",a.style.display="block"),window.scrollBy({top:t*2,behavior:"smooth"})}catch(e){console.error(e)}finally{d.classList.remove("loader-box-active")}});
//# sourceMappingURL=index.js.map
