import{a as h,i as b,S as w}from"./assets/vendor-77136e93.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function m(t,r,s){const e=`https://pixabay.com/api/?key=42394158-5c4cd21eee44163ae27aefe31&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`;try{return(await h.get(e)).data}catch(o){throw new Error(o.response.data.message||"An error occurred.")}}function g(t){const r=document.createElement("span");r.classList.add("loader"),t.append(r)}function y(t){t&&t.remove()}function f(t,r){if(t.hits.length===0)b.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{const s=t.hits.map(e=>`<li class="gallery-item"><a href="${e.largeImageURL}">
          <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"></a>
          <p><b>Likes: </b>${e.likes}</p>
          <p><b>Views: </b>${e.views}</p>
          <p><b>Comments: </b>${e.comments}</p>
          <p><b>Downloads: </b>${e.downloads}</p>
        </li>`).join("");r.insertAdjacentHTML("afterbegin",s),new w(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animation:250}).refresh()}}const L=document.querySelector(".form"),n=document.querySelector(".gallery"),a=document.querySelector(".load-more"),P=document.querySelector("input"),l=document.querySelector(".loader");let i=1,d="";const p=15;a.style.display="none";L.addEventListener("submit",async t=>{if(t.preventDefault(),d=P.value.trim(),i=1,!d){iziToast.error({message:"Please enter a valid search query.",position:"topRight"}),a.style.display="none",n.innerHTML="";return}y(l),g(l),n.innerHTML="";try{const r=await m(d,i,p),s=window.scrollY;f(r,n),r.totalHits>i*p?a.style.display="block":a.style.display="none",window.scrollTo({top:s+n.lastElementChild.clientHeight,behavior:"smooth"})}catch{iziToast.error({message:"An error occurred. Please try again later.",position:"topRight"})}finally{y(l)}});a.addEventListener("click",async()=>{i++;try{g(l);const t=await m(d,i,p),r=window.scrollY;f(t,n),t.totalHits>i*p?a.style.display="block":a.style.display="none",window.scrollTo({top:r+n.lastElementChild.clientHeight,behavior:"smooth"})}catch{iziToast.error({message:"An error occurred while loading more images. Please try again later.",position:"topRight"})}finally{y(l)}});
//# sourceMappingURL=commonHelpers.js.map
