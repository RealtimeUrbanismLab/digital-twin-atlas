"use strict";(self.webpackChunkdigital_twin_atlas=self.webpackChunkdigital_twin_atlas||[]).push([[11],{9597:function(e,t,n){n.r(t);var a=n(5785),l=n(7294),r=n(6158),s=n.n(r),o=n(3574),c=n(7048),m=n.n(c),u=n(7061);s().accessToken="pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6cWUyYmNkMGNyNzJxcTg5ZHB3cmM3aCJ9.GxeOk3BD74C7ElBQZZCguw";t.default=()=>{const{0:e,1:t}=(0,l.useState)({country:"",status:"",startYear:"",endYear:""}),{0:n,1:r}=(0,l.useState)(""),{0:c,1:i}=(0,l.useState)(!1),{0:E,1:d}=(0,l.useState)(null),p=(0,l.useRef)(null),g=(0,l.useRef)(null),h=(0,l.useRef)([]),y=n=>{const{name:a,value:l}=n.target;t({...e,[a]:l})};(0,l.useEffect)((()=>{p.current&&!g.current&&(g.current=new(s().Map)({container:p.current,style:"mapbox://styles/mapbox/streets-v11",center:[0,0],zoom:2}))}),[]);const C=m().filter((t=>(!c||"Yes"===t.shortList)&&(""===n||t.name.toLowerCase().includes(n.toLowerCase()))&&(""===e.country||t.country===e.country)&&(""===e.status||t.FinalStatus===e.status)&&(""===e.startYear||t["Start Year"]>=e.startYear)&&(""===e.endYear||t["End Year"]<=e.endYear||"N/A"===t["End Year"])));(0,l.useEffect)((()=>{(e=>{if(g.current){h.current.forEach((e=>e.remove())),h.current=[];const t=new(s().LngLatBounds);e.forEach((e=>{if(e.lat&&e.lng){const n=(new(s().Marker)).setLngLat([e.lng,e.lat]).setPopup(new(s().Popup)({offset:25}).setHTML("\n                <h3>"+e.name+"</h3>\n                <p><strong>Location:</strong> "+e.location+", "+e.country+"</p>\n                <p><strong>Status:</strong> "+e.FinalStatus+'</p>\n                <button id="learn-more-'+e.id+'" class="learn-more-button">Learn More</button>\n              ')).addTo(g.current);n.getElement().addEventListener("click",(()=>{d(e.id)})),h.current.push(n),t.extend([e.lng,e.lat]),g.current.on("render",(()=>{const t=document.getElementById("learn-more-"+e.id);t&&t.addEventListener("click",(t=>{t.stopPropagation(),d(e.id)}))}))}})),e.length>0&&!t.isEmpty()?g.current.fitBounds(t,{padding:50}):(g.current.setCenter([0,0]),g.current.setZoom(2))}})(C)}),[e,n,c]);const v=e=>{let{study:t,onClose:n}=e;return l.createElement("div",{className:"overlay"},l.createElement("div",{className:"overlay-content"},l.createElement("button",{className:"close-button",onClick:n},"Close"),l.createElement("h1",null,t.name),l.createElement("img",{src:t.imagePath||u.Z,alt:t.name,style:{maxWidth:"100%",borderRadius:"0px",marginTop:"20px"},className:"duotone img"}),l.createElement("div",{className:"overlay-details"},l.createElement("p",null,l.createElement("strong",null,"Location:")," ",t.location,", ",t.country),l.createElement("p",null,l.createElement("strong",null,"Coordinates:")," ",t.lat,", ",t.lng),l.createElement("p",null,l.createElement("strong",null,"Description:")," ",t.Description),l.createElement("p",null,l.createElement("strong",null,"Total Area:")," ",t["Total Area (km2)"]," km²"),l.createElement("p",null,l.createElement("strong",null,"System Digital Twinned:")," ",t["System Digital Twinned"]),l.createElement("p",null,l.createElement("strong",null,"Start Year:")," ",t["Start Year"]),l.createElement("p",null,l.createElement("strong",null,"End Year:")," ",t["End Year"]),l.createElement("p",null,l.createElement("strong",null,"Creators:")," ",t.Creators),l.createElement("p",null,l.createElement("strong",null,"Clients/Sponsors:")," ",t["Clients/Sponsors"]),l.createElement("p",null,l.createElement("strong",null,"Users:")," ",t.Users),l.createElement("p",null,l.createElement("strong",null,"Status:")," ",t.Status),l.createElement("p",null,l.createElement("strong",null,"Project State:")," ",t["Project State"]),l.createElement("p",null,l.createElement("strong",null,"Platform/Organization:")," ",t["Platform/Organization"]),l.createElement("p",null,l.createElement("strong",null,"Shortlisted:")," ",t.shortList),l.createElement("p",null,l.createElement("strong",null,"3D Platform:")," ",t["3D Platform"]),l.createElement("p",null,l.createElement("strong",null,"3D Platform Features:")," ",t["3D Platform Features"]),l.createElement("p",null,l.createElement("strong",null,"3D Platform to Physical City Control:")," ",t["3D Platform to Physical City Control"]),l.createElement("p",null,l.createElement("strong",null,"Decision Making:")," ",t["Decision Making"]),l.createElement("p",null,l.createElement("strong",null,"Contested Claims/Challenges:")," ",t["Contested Claims/Challenges"]))))};return l.createElement("div",{style:{position:"relative",height:"100vh",width:"100vw"}},l.createElement("div",{className:"hamburger-overlay"},l.createElement(o.Z,null)),l.createElement("div",{className:"controls-overlay"},l.createElement("div",{className:"filters-group"},l.createElement("div",{className:"filter-controls"},l.createElement("select",{name:"country",value:e.country,onChange:y},l.createElement("option",{value:""},"Country: All"),(0,a.Z)(new Set(m().map((e=>e.country)))).map((e=>l.createElement("option",{key:e,value:e},e)))),l.createElement("select",{name:"status",value:e.status,onChange:y},l.createElement("option",{value:""},"Status: All"),l.createElement("option",{value:"Completed"},"Completed"),l.createElement("option",{value:"In Progress"},"In Progress"),l.createElement("option",{value:"Failed"},"Failed"),l.createElement("option",{value:"Did Not Start"},"Did Not Start")),l.createElement("input",{type:"number",name:"startYear",className:"search-bar",placeholder:"Start Year",value:e.startYear,onChange:e=>y(e),min:"1900",max:"2100"}),l.createElement("input",{type:"number",name:"endYear",className:"search-bar",placeholder:"End Year",value:e.endYear,onChange:e=>y(e),min:"1900",max:"2100"}),l.createElement("input",{type:"text",className:"search-bar",placeholder:"Search case studies...",value:n,onChange:e=>r(e.target.value)}))),l.createElement("div",{className:"toggle-switch"},l.createElement("button",{onClick:()=>{t({country:"",status:"",startYear:"",endYear:""}),r(""),i(!1)},className:"clear-filters-button"},"Clear Filters"),l.createElement("label",{className:"toggle-label"},l.createElement("input",{type:"checkbox",checked:c,onChange:e=>i(e.target.checked)}),l.createElement("span",{className:"slider"}),l.createElement("span",{className:"toggle-text"},"Short List Only")))),l.createElement("div",{className:"map-container"},l.createElement("div",{id:"map",ref:p})),E&&l.createElement(v,{study:m().find((e=>e.id===E)),onClose:()=>d(null)}))}},7061:function(e,t,n){t.Z=n.p+"static/case-study-549211e00c5534194427f6508fde92ed.jpg"}}]);
//# sourceMappingURL=component---src-pages-case-studies-list-v-4-js-a8f0048a3b5c2bb7e810.js.map