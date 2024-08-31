import{S as y,i as h}from"./assets/vendor-B07T6_gy.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function l(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=l(t);fetch(t.href,o)}})();const L="https://pixabay.com/api/?",u=(e,s)=>{const l=new URLSearchParams({key:"45539852-e7385dbf9677b23660ec365b6",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15});return fetch(`${L}${l}`).then(i=>{if(!i.ok)throw new Error(i.status);return i.json()})},b=e=>`
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
    `,v="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%3e%3cpath%20fill='%23FAFAFB'%20d='M6.81.219A.75.75%200%200%201%207.34%200h9.32a.75.75%200%200%201%20.53.219l6.591%206.591a.75.75%200%200%201%20.219.53v9.32a.75.75%200%200%201-.219.53l-6.591%206.591a.75.75%200%200%201-.53.219H7.34a.75.75%200%200%201-.53-.219L.219%2017.19A.75.75%200%200%201%200%2016.66V7.34a.75.75%200%200%201%20.219-.53L6.81.219ZM7.65%201.5%201.5%207.65v8.7l6.15%206.15h8.7l6.15-6.15v-8.7L16.35%201.5h-8.7Z'/%3e%3cpath%20fill='%23FAFAFB'%20d='M6.969%206.97a.75.75%200%200%201%201.062%200L12%2010.94l3.969-3.97a.75.75%200%201%201%201.062%201.061l-3.97%203.97%203.97%203.968a.753.753%200%200%201%200%201.062.749.749%200%200%201-1.062%200L12%2013.061l-3.969%203.97a.75.75%200%200%201-1.225-.243.751.751%200%200%201%20.163-.819L10.939%2012%206.97%208.031a.75.75%200%200%201%200-1.062Z'/%3e%3c/svg%3e",a=document.querySelector(".form"),p=document.querySelector(".gallery-list"),n=document.querySelector(".loader-box"),c=document.getElementById("load-more"),m=document.getElementById("end-message");let r=1,f=1;const x=new y(".gallery-list a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});a.addEventListener("submit",w);c.addEventListener("click",S);function w(e){e.preventDefault();const s=a.elements.search.value.trim();s!==""&&(r=1,p.innerHTML="",n.classList.add("loader-box-active"),c.style.display="none",m.style.display="none",u(s,r).then(l=>{if(l.hits.length===0){h.show({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",backgroundColor:"#ef4040",titleColor:"#fff",titleSize:"16px",messageColor:"#fff",messageSize:"16px",iconUrl:v,maxWidth:"385px",timeout:5e3}),a.reset(),a.elements.search.focus();return}f=Math.ceil(l.totalHits/15),g(l),a.reset(),a.elements.search.focus()}).catch(l=>{console.log(l)}).finally(()=>{n.classList.remove("loader-box-active")}))}function S(){if(r>=f)return;r++;const e=a.elements.search.value.trim();n.classList.add("loader-box-active"),u(e,r).then(s=>{g(s)}).catch(s=>{console.log(s)}).finally(()=>{n.classList.remove("loader-box-active")})}function g(e){if(e.hits.length===0||r>=f){c.style.display="none",m.style.display="block";return}const s=e.hits.map(l=>b(l)).join("");p.insertAdjacentHTML("beforeend",s),x.refresh(),r<f&&(c.style.display="block")}
//# sourceMappingURL=index.js.map
