import{a as S,S as q,i as c}from"./assets/vendor-BkC4bTqC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const v="55187145-d3b914f8bfc13386f944f455c",w="https://pixabay.com/api/";async function y(o,t=1){return(await S.get(w,{params:{key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}let u;function m(o){const t=document.querySelector(".gallery"),a=o.map(({webformatURL:s,largeImageURL:e,tags:r,likes:n,views:h,comments:L,downloads:b})=>`
      <li class="gallery-item">
        <a href="${e}">
          <img src="${s}" alt="${r}" />
        </a>
        <div class="info">
          <p>Likes: ${n}</p>
          <p>Views: ${h}</p>
          <p>Comments: ${L}</p>
          <p>Downloads: ${b}</p>
        </div>
      </li>
    `).join("");t.insertAdjacentHTML("beforeend",a),u?u.refresh():u=new q(".gallery a")}function E(){document.querySelector(".gallery").innerHTML=""}function p(){document.querySelector(".loader").style.display="block"}function g(){document.querySelector(".loader").style.display="none"}const $=document.querySelector(".form"),d=document.querySelector(".load-more");let l="",i=1,f=0;$.addEventListener("submit",async o=>{if(o.preventDefault(),l=o.target.elements["search-text"].value.trim(),!!l){i=1,E(),d.style.display="none",p();try{const t=await y(l,i);if(f=t.totalHits,!t.hits.length){c.info({message:"Sorry, there are no images matching your search query."});return}m(t.hits),f>15&&(d.style.display="block")}catch{c.error({message:"Error fetching images"})}finally{g()}}});d.addEventListener("click",async()=>{i+=1,p();try{const o=await y(l,i);m(o.hits),i*15>=f&&(d.style.display="none",c.info({message:"We're sorry, but you've reached the end of search results."}));const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}catch{c.error({message:"Error loading more images"})}finally{g()}});
//# sourceMappingURL=index.js.map
