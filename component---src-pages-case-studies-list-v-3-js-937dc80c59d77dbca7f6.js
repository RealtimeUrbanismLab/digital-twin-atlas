"use strict";(self.webpackChunkdigital_twin_atlas=self.webpackChunkdigital_twin_atlas||[]).push([[971],{7986:function(e,t,a){a.r(t);var l=a(5785),r=a(7294),n=(a(1883),a(3574)),s=a(7048),c=a.n(s),o=a(6158),m=a.n(o),i=a(3148),u=a(6495),d=a(7061);i.kL.register(i.uw,i.f$,i.ZL,i.qi,i.Dx,i.u,i.De);m().accessToken="pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6cWUyYmNkMGNyNzJxcTg5ZHB3cmM3aCJ9.GxeOk3BD74C7ElBQZZCguw";t.default=()=>{const{0:e,1:t}=(0,r.useState)("alphabetical"),{0:a,1:s}=(0,r.useState)("asc"),{0:o,1:i}=(0,r.useState)(!1),{0:g,1:E}=(0,r.useState)(""),{0:p,1:y}=(0,r.useState)(12),{0:h,1:N}=(0,r.useState)({country:"",status:"",startYear:"",endYear:""}),{0:C,1:b}=(0,r.useState)(null),S=(0,r.useRef)(),f=(0,r.useRef)(null),v=(0,r.useRef)(null),k=(0,r.useRef)([]),A=e=>{const{name:t,value:a}=e.target;N({...h,[t]:a})};(0,r.useEffect)((()=>{f.current&&!v.current&&(v.current=new(m().Map)({container:f.current,style:"mapbox://styles/mapbox/streets-v11",center:[0,0],zoom:2}))}),[]);const P=(0,l.Z)(c()).filter((e=>(!o||"Yes"===e.shortList)&&(""===g||e.name.toLowerCase().includes(g.toLowerCase()))&&(""===h.country||e.country===h.country)&&(""===h.status||e.FinalStatus===h.status)&&(""===h.startYear||e["Start Year"]>=h.startYear)&&(""===h.endYear||e["End Year"]<=h.endYear||"N/A"===e["End Year"]))).sort(((t,l)=>{const r="asc"===a?1:-1;switch(e){case"alphabetical":return r*t.name.localeCompare(l.name);case"city":return r*t.location.localeCompare(l.location);case"country":return r*t.country.localeCompare(l.country);case"area":return r*(parseFloat(l["Total Area (km2)"])-parseFloat(t["Total Area (km2)"]));case"startYear":return r*(t["Start Year"]-l["Start Year"]);case"status":return r*t.FinalStatus.localeCompare(l.FinalStatus);default:return 0}})),w=P.slice(0,p);let F,Y,x,D,T;(0,r.useEffect)((()=>{(e=>{if(v.current){k.current.forEach((e=>e.remove())),k.current=[];const t=new(m().LngLatBounds);e.forEach((e=>{if(e.lat&&e.lng){const a=(new(m().Marker)).setLngLat([e.lng,e.lat]).setPopup(new(m().Popup)({offset:25}).setText(e.name)).addTo(v.current);a.getElement().addEventListener("click",(()=>{b(e.id)})),k.current.push(a),t.extend([e.lng,e.lat])}})),e.length>0&&!t.isEmpty()?v.current.fitBounds(t,{padding:50}):(v.current.setCenter([0,0]),v.current.setZoom(2))}})(P.slice(0,p))}),[h,g,o,a,e,p]),(0,r.useEffect)((()=>{const e=new IntersectionObserver((e=>{e[0].isIntersecting&&y((e=>Math.min(e+12,P.length)))}));return S.current&&e.observe(S.current),()=>{S.current&&e.unobserve(S.current)}}),[P]),"undefined"!=typeof window&&(F=getComputedStyle(document.documentElement).getPropertyValue("--primary-color").trim(),Y=getComputedStyle(document.documentElement).getPropertyValue("--secondary-color").trim(),x=getComputedStyle(document.documentElement).getPropertyValue("--accent-color-1").trim(),D=getComputedStyle(document.documentElement).getPropertyValue("--accent-color-2").trim(),T=getComputedStyle(document.documentElement).getPropertyValue("--accent-color-3").trim());const L={labels:(0,l.Z)(new Set(c().map((e=>e.country)))),datasets:[{label:"Number of Projects by Country",data:(0,l.Z)(new Set(c().map((e=>e.country)))).map((e=>c().filter((t=>t.country===e)).length)),backgroundColor:Y?Y+"B3":"rgba(52, 152, 219, 0.7)",borderColor:Y||"rgba(52, 152, 219, 1)",borderWidth:1}]},Z={labels:["Completed","In Progress","Failed","Did Not Start"],datasets:[{label:"Project Status Distribution",data:[c().filter((e=>"Completed"===e.FinalStatus)).length,c().filter((e=>"In Progress"===e.FinalStatus)).length,c().filter((e=>"Failed"===e.FinalStatus)).length,c().filter((e=>"Did Not Start"===e.FinalStatus)).length],backgroundColor:[x?x+"B3":"rgba(46, 204, 113, 0.7)",F?F+"B3":"rgba(52, 152, 219, 0.7)",T?T+"B3":"rgba(231, 76, 60, 0.7)",D?D+"B3":"rgba(155, 89, 182, 0.7)"],borderColor:[x||"rgba(46, 204, 113, 1)",F||"rgba(52, 152, 219, 1)",T||"rgba(231, 76, 60, 1)",D||"rgba(155, 89, 182, 1)"],borderWidth:1}]},I=e=>{let{study:t,onClose:a}=e;return r.createElement("div",{className:"overlay"},r.createElement("div",{className:"overlay-content"},r.createElement("button",{className:"close-button",onClick:a},"Close"),r.createElement("h3",null,t.name),r.createElement("img",{src:t.imagePath||d.Z,alt:t.name,className:"duotone img"}),r.createElement("ul",{className:"details-list"},r.createElement("li",null,r.createElement("strong",null,"Country:")," ",t.country||"N/A"),r.createElement("li",null,r.createElement("strong",null,"City:")," ",t.location||"N/A"),r.createElement("li",null,r.createElement("strong",null,"Creators:")," ",t.Creators||"N/A"),r.createElement("li",null,r.createElement("strong",null,"Total Area:")," ",t["Total Area (km2)"]||"N/A"," km²"),r.createElement("li",null,r.createElement("strong",null,"Platform/Organization:")," ",t["Platform/Organization"]||"N/A"),r.createElement("li",null,r.createElement("strong",null,"System Digital Twinned:")," ",t["System Digital Twinned"]||"N/A"),r.createElement("li",null,r.createElement("strong",null,"3D Platform Features:")," ",t["3D Platform Features"]||"N/A"),r.createElement("li",null,r.createElement("span",{style:{color:"Completed"===t.FinalStatus?"green":"In Progress"===t.FinalStatus?"orange":"red"}},r.createElement("strong",null,"Status: "),t.FinalStatus||"N/A")))))};return r.createElement("div",{style:{padding:"20px",maxWidth:"1200px",margin:"0 auto"}},r.createElement(n.Z,null),r.createElement("h1",null,"Case Studies"),r.createElement("div",{className:"controls sticky-filters"},r.createElement("div",{className:"filters-group"},r.createElement("div",{className:"filter-controls"},r.createElement("label",null,"Filters:"),r.createElement("select",{name:"country",value:h.country,onChange:A},r.createElement("option",{value:""},"Country: All"),(0,l.Z)(new Set(c().map((e=>e.country)))).map((e=>r.createElement("option",{key:e,value:e},e)))),r.createElement("select",{name:"status",value:h.status,onChange:A},r.createElement("option",{value:""},"Status: All"),r.createElement("option",{value:"Completed"},"Completed"),r.createElement("option",{value:"In Progress"},"In Progress"),r.createElement("option",{value:"Failed"},"Failed"),r.createElement("option",{value:"Did Not Start"},"Did Not Start")),r.createElement("input",{type:"number",name:"startYear",className:"search-bar",placeholder:"Start Year",value:h.startYear,onChange:e=>A(e),min:"1900",max:"2100"}),r.createElement("input",{type:"number",name:"endYear",className:"search-bar",placeholder:"End Year",value:h.endYear,onChange:e=>A(e),min:"1900",max:"2100"})),r.createElement("input",{type:"text",className:"search-bar",placeholder:"Search case studies...",value:g,onChange:e=>E(e.target.value)}),r.createElement("button",{onClick:()=>{N({country:"",status:"",startYear:"",endYear:""}),E(""),i(!1)},className:"clear-filters-button"},"Clear Filters")),r.createElement("div",{className:"sort-toggle-group"},r.createElement("div",{className:"toggle-switch"},r.createElement("label",{className:"toggle-label"},r.createElement("input",{type:"checkbox",checked:o,onChange:e=>i(e.target.checked)}),r.createElement("span",{className:"slider"}),r.createElement("span",{className:"toggle-text"},"Short List Only"))),r.createElement("div",{className:"toggle-button"},r.createElement("button",{onClick:()=>s("asc"===a?"desc":"asc")},"asc"===a?"Ascending":"Descending")))),r.createElement("div",{className:"charts"},r.createElement("div",{className:"chart-wrapper"},r.createElement("h3",{className:"chart-title"},"Project Status Distribution"),r.createElement("div",{className:"chart-container"},r.createElement(u.by,{data:Z,options:{maintainAspectRatio:!1}}))),r.createElement("div",{className:"chart-wrapper"},r.createElement("h3",{className:"chart-title"},"Projects by Country"),r.createElement("div",{className:"chart-container"},r.createElement(u.$Q,{data:L,options:{maintainAspectRatio:!1}})))),r.createElement("div",{className:"map-container1"},r.createElement("div",{id:"map",ref:f})),r.createElement("div",{className:"case-studies-grid"},w.map((e=>r.createElement("div",{className:"card case-study-card "+(e.id===C?"selected":""),key:e.id,onClick:()=>b(e.id)},r.createElement("h3",{className:"card-title"},e.name),r.createElement("div",{className:"image-container"},r.createElement("img",{src:e.imagePath||d.Z,alt:e.name,className:"duotone img"}),"Yes"===e.shortList&&r.createElement("span",{className:"shortlist-tag"},"Short Listed")),r.createElement("div",{className:"card-body"},r.createElement("ul",{className:"details-list"},r.createElement("li",null,r.createElement("strong",null,"Country:")," ",e.country||"N/A"),r.createElement("li",null,r.createElement("strong",null,"City:")," ",e.location||"N/A"),r.createElement("li",null,r.createElement("strong",null,"Creators:")," ",e.Creators||"N/A"),r.createElement("li",null,r.createElement("strong",null,"Total Area:")," ",e["Total Area (km2)"]||"N/A"," km²"),r.createElement("li",null,r.createElement("strong",null,"Platform/Organization:")," ",e["Platform/Organization"]||"N/A"),r.createElement("li",null,r.createElement("strong",null,"System Digital Twinned:")," ",e["System Digital Twinned"]||"N/A"),r.createElement("li",null,r.createElement("strong",null,"3D Platform Features:")," ",e["3D Platform Features"]||"N/A"),r.createElement("li",null,r.createElement("span",{style:{color:"Completed"===e.FinalStatus?"green":"In Progress"===e.FinalStatus?"orange":"red"}},r.createElement("strong",null,"Status: "),e.FinalStatus||"N/A")))))))),r.createElement("div",{ref:S,style:{height:"50px",marginTop:"20px"}}),C&&r.createElement(I,{study:c().find((e=>e.id===C)),onClose:()=>b(null)}))}}}]);
//# sourceMappingURL=component---src-pages-case-studies-list-v-3-js-937dc80c59d77dbca7f6.js.map