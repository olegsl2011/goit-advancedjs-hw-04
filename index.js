import{a as h,S as L,i as p}from"./assets/vendor-DtKhzRW5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const b=h.create({baseURL:"https://pixabay.com/api"}),y=15,M=async({query:o,page:r=1})=>{try{const s=await b.get("/",{params:{key:"18172942-eab38dca32c93699ea5d62826",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y,page:r}}),{hits:n,totalHits:e}=s.data;return{images:n.map(({comments:t,downloads:i,likes:l,views:u,largeImageURL:d,webformatURL:m,tags:a})=>({comments:t,downloads:i,likes:l,views:u,largeImageURL:d,webformatURL:m,tags:a})),pages:Math.round(e/y)}}catch(s){console.log(s)}},g=(o,r)=>`
        <li class="image-statistics-list-item">
            <h3>${o}</h3>
            <p>${r}</p>
          </li>
        `,w=o=>o.map(({comments:r,downloads:s,likes:n,views:e,largeImageURL:t,webformatURL:i,tags:l})=>`
     <li class="gallery-item">
        <a class="gallery-link" href="${t}">
          <img class="gallery-image" src="${i}" alt="${l}" />
        </a>
        <ul class="image-statistics-list">
            ${g("Likes",n)}
            ${g("Views",e)}
            ${g("Comments",r)}
            ${g("Downloads",s)}
        </ul>
      </li>
    `).join(""),q=({ref:o,position:r="beforeEnd",markup:s})=>{o.insertAdjacentHTML(r,s)};document.addEventListener("DOMContentLoaded",()=>{const o={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),spinner:document.querySelector(".spinner"),loadMore:document.querySelector(".load-more-button")};let r=1,s="";const n=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),e=a=>{o.spinner.classList.toggle("loading",a)},t=a=>{o.loadMore.classList.toggle("active",a)},i=(a="Sorry, there are no images matching your search query. Please try again!")=>{p.error({message:a,position:"topRight"})},l=a=>{q({ref:o.gallery,markup:w(a)}),n.refresh()},u=async(a=!1)=>{try{const{images:c,pages:f}=await M({query:s,page:r});c.length?(l(c),t(f>r),a&&f<=r&&p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):i()}catch{i("An error occurred while fetching the images. Please try again later.")}finally{e(!1)}},d=async a=>{if(a.preventDefault(),s=o.form.query.value.trim(),!s){i("Please enter a valid search query.");return}o.gallery.innerHTML="",r=1,e(!0),t(!1),await u()},m=async()=>{r++,e(!0),t(!1),await u(!0);const a=document.querySelector(".gallery li");if(a){const c=a.getBoundingClientRect().height*2;window.scrollBy(0,c)}};o.form.addEventListener("submit",d),o.loadMore.addEventListener("click",m)});
//# sourceMappingURL=index.js.map
