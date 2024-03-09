"use strict";(self.webpackChunkcoreui_free_angular_admin_template=self.webpackChunkcoreui_free_angular_admin_template||[]).push([[539],{2539:(P,v,l)=>{l.r(v),l.d(v,{WhatsappCmsModule:()=>V});var u=l(6814),p=l(2098),y=l(3519),Z=l.n(y),T=l(5619),b=l(4664),e=l(5678),h=l(9862),w=l(5592),x=l(9947),A=l(5887);let g=(()=>{class i{constructor(t){this.http=t,this.apiUrl=x.N.apiUrl,this.socket=(0,A.io)("http://localhost:3000")}getHeaders(){const t=localStorage.getItem("authToken");return new h.WM({"Content-Type":"application/json",Authorization:`${t}`})}addSet(t){return this.http.post(`${this.apiUrl}/sets`,t,{headers:this.getHeaders()})}updateSet(t,o){return this.http.put(`${this.apiUrl}/sets/${t}`,o,{headers:this.getHeaders()})}getSetById(t){return this.http.get(`${this.apiUrl}/sets/${t}`,{headers:this.getHeaders()})}deleteSet(t){return this.http.delete(`${this.apiUrl}/sets/${t}`,{headers:this.getHeaders()})}updateSetStatus(t){return this.http.patch(`${this.apiUrl}/sets/${t}/update-status`,{},{headers:this.getHeaders()})}getSetsList(t){return this.http.get(`${this.apiUrl}/sets`,{headers:this.getHeaders(),params:t})}getQrInstance(){return this.http.get(`${this.apiUrl}/instance`,{headers:this.getHeaders()}).subscribe(),new w.y(s=>(this.socket.on("qr",a=>{s.next(a)}),()=>{this.socket.disconnect()}))}checkKeyword(t){return this.http.post(`${this.apiUrl}/sets/validatekeywords`,t,{headers:this.getHeaders()})}static#e=this.\u0275fac=function(o){return new(o||i)(e.LFG(h.eN))};static#t=this.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var n=l(1806),f=l(1272),_=l(6472);function U(i,c){if(1&i){const t=e.EpF();e.TgZ(0,"tr")(1,"th",12),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td",13),e._uU(6),e.ALo(7,"date"),e.qZA(),e.TgZ(8,"td",13),e._uU(9),e.ALo(10,"date"),e.qZA(),e.TgZ(11,"td",14)(12,"c-badge",15),e._uU(13),e.qZA()(),e.TgZ(14,"td",14)(15,"button",16),e.O4$(),e._UZ(16,"svg",17),e.qZA(),e.kcU(),e.TgZ(17,"button",18),e.O4$(),e._UZ(18,"svg",19),e.qZA(),e.kcU(),e.TgZ(19,"button",20),e.NdJ("click",function(){const a=e.CHM(t).$implicit,d=e.oxw();return e.KtG(d.deleteItem(a))}),e.O4$(),e._UZ(20,"svg",21),e.qZA()()()}if(2&i){const t=c.$implicit,o=c.index,s=e.oxw();e.xp6(2),e.Oqu(s.itemSize*(s.pageParams.page-1)+o+1),e.xp6(2),e.Oqu(t.setName),e.xp6(2),e.Oqu(e.xi3(7,8,t.createdAt,"medium")),e.xp6(3),e.Oqu(e.xi3(10,11,t.updatedAt,"medium")),e.xp6(3),e.Q6J("color",s.getBadgeColor(t.status)),e.xp6(1),e.Oqu(t.status),e.xp6(2),e.MGl("routerLink","view/",null==t?null:t._id,""),e.xp6(2),e.MGl("routerLink","edit/",null==t?null:t._id,"")}}const q=(i,c)=>({itemsPerPage:i,currentPage:c});let k=(()=>{class i{constructor(t){this.setService=t,this.title="Whatsapp Configuration",this.itemSize=10,this.tableData=[],this.refreshData$=new T.X(null),this.pageParams={page:1,limit:10}}ngOnInit(){this.getData()}viewItem(t){console.log("View item:",t)}getData(){this.refreshData$.pipe((0,b.w)(()=>this.setService.getSetsList(this.pageParams))).subscribe(t=>{console.log(t),this.tableData=t.data})}editItem(t){console.log("Edit item:",t)}deleteItem(t){Z().fire({title:"Are you sure to delete this ?",icon:"question",showCancelButton:!0,confirmButtonText:"Confirm",cancelButtonText:"Cancel"}).then(o=>{o.isConfirmed&&this.setService.deleteSet(t?._id).subscribe(s=>{Z().fire({title:"Deleted!",text:"Your Set has been deleted.",icon:"success",timer:1500}),this.refreshData$.next(null)})})}getBadgeColor(t){let o="success";return"pending"===t&&(o="warning"),"draft"===t&&(o="info"),"rejected"===t&&(o="danger"),o}pageChange(t){this.pageParams.page=t,this.getData()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(g))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-cms-home"]],decls:28,vars:8,consts:[[1,"fade-in"],[1,"container","mt-2"],[1,"d-flex","justify-content-between"],["cButton","","color","primary","variant","outline","routerLink","create"],[1,"divider","my-2"],["cTable","","hover",""],["scope","col"],["scope","col",2,"width","40%"],["scope","col",2,"width","10%"],["scope","col",2,"text-align","center"],[4,"ngFor","ngForOf"],[3,"pageChange"],["scope","row"],[2,"font-size","12px"],[1,"text-center"],[3,"color"],["cTooltip","View","cButton","","size","sm","variant","ghost","color","secondary",1,"me-1",3,"routerLink"],["cIcon","","name","cil-notes"],["cTooltip","Edit","cButton","","size","sm","variant","ghost","color","secondary",1,"me-1",3,"routerLink"],["cIcon","","name","cil-pen"],["cTooltip","delete","cButton","","size","sm","variant","ghost","color","danger",1,"me-1",3,"click"],["cIcon","","name","cil-trash"]],template:function(o,s){1&o&&(e.TgZ(0,"div",0)(1,"c-card")(2,"c-card-body")(3,"div",1)(4,"div",2)(5,"h4"),e._uU(6),e.qZA(),e.TgZ(7,"button",3),e._uU(8,"Create New"),e.qZA()()(),e._UZ(9,"div",4),e.TgZ(10,"table",5)(11,"thead")(12,"tr")(13,"th",6),e._uU(14,"#"),e.qZA(),e.TgZ(15,"th",7),e._uU(16,"Campaign Name"),e.qZA(),e.TgZ(17,"th",8),e._uU(18,"Created At"),e.qZA(),e.TgZ(19,"th",8),e._uU(20,"Updated At"),e.qZA(),e.TgZ(21,"th",9),e._uU(22,"Status"),e.qZA(),e._UZ(23,"th",6),e.qZA()(),e.TgZ(24,"tbody"),e.YNc(25,U,21,14,"tr",10),e.ALo(26,"paginate"),e.qZA()(),e.TgZ(27,"pagination-controls",11),e.NdJ("pageChange",function(d){return s.pageChange(d)}),e.qZA()()()()),2&o&&(e.xp6(6),e.Oqu(s.title),e.xp6(19),e.Q6J("ngForOf",e.xi3(26,2,s.tableData,e.WLB(5,q,s.itemSize,s.pageParams.page))))},dependencies:[u.sg,p.rH,n.AkF,n.yue,n.FN3,n.auY,f.ar,n.Hq3,n.i9q,_.LS,u.uU,_._s],styles:[".text-center[_ngcontent-%COMP%]{text-align:center}"]})}return i})();var r=l(95),C=l(5722);const D=()=>({title:"Confirm ?",showCancelButton:!0,confirmButtonColor:"#d33",confirmButtonText:"Delete",cancelButtonColor:"#3085d6"});function S(i,c){if(1&i){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td")(4,"h6"),e._uU(5),e.qZA()(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td")(9,"button",47),e.NdJ("click",function(){const s=e.CHM(t),a=s.$implicit,d=s.index,m=e.oxw(2);return e.KtG(m.UpdateSetData(a,d))}),e.O4$(),e._UZ(10,"svg",48),e.qZA(),e.kcU(),e.TgZ(11,"button",49),e.NdJ("confirm",function(){const a=e.CHM(t).index,d=e.oxw(2);return e.KtG(d.deleteSetData(a))}),e.O4$(),e._UZ(12,"svg",50),e.qZA()()()}if(2&i){const t=c.$implicit,o=c.index;e.xp6(2),e.Oqu(o+1),e.xp6(3),e.Oqu(null==t?null:t.keywords),e.xp6(2),e.Oqu(null==t||null==t.answer?null:t.answer.message),e.xp6(4),e.Q6J("swal",e.DdM(4,D))}}function I(i,c){if(1&i&&(e.TgZ(0,"table",22)(1,"thead")(2,"tr")(3,"th",42),e._uU(4,"#"),e.qZA(),e.TgZ(5,"th",43),e._uU(6,"Keywords"),e.qZA(),e.TgZ(7,"th",44),e._uU(8,"Answer"),e.qZA(),e.TgZ(9,"th",45),e._uU(10,"Actions"),e.qZA()()(),e.TgZ(11,"tbody"),e.YNc(12,S,13,5,"tr",46),e.qZA()()),2&i){const t=e.oxw();let o;e.xp6(12),e.Q6J("ngForOf",null==(o=t.setForm.get("setData"))?null:o.value)}}function M(i,c){1&i&&(e.TgZ(0,"h5"),e._uU(1,"No Data Yet !"),e.qZA())}function N(i,c){if(1&i&&(e.TgZ(0,"span",51),e._uU(1),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Oqu(t.keywordValidMessage)}}function O(i,c){if(1&i){const t=e.EpF();e.TgZ(0,"div",52),e._uU(1),e.TgZ(2,"span",53),e.NdJ("click",function(){const a=e.CHM(t).index,d=e.oxw();return e.KtG(d.removeKeyword(a))}),e._uU(3,"\xd7"),e.qZA()()}if(2&i){const t=c.$implicit;e.xp6(1),e.hij(" ",t," ")}}function B(i,c){if(1&i&&(e.TgZ(0,"option",54),e._uU(1),e.qZA()),2&i){const t=c.$implicit;e.Q6J("value",t.id),e.xp6(1),e.hij(" ",t.type," ")}}function J(i,c){1&i&&(e.TgZ(0,"div")(1,"div",19)(2,"label",55),e._uU(3,"Media File:"),e.qZA(),e._UZ(4,"input",56),e.qZA()())}let F=(()=>{class i{constructor(t,o,s,a){this.formBuilder=t,this.setService=o,this.router=s,this.route=a,this.instancesList=[{_id:"1",isdCode:"91",number:"8058909535",updatedAt:new Date,status:"active",registeredSets:3},{_id:"2",isdCode:"91",number:"7878888875",updatedAt:new Date,status:"active",registeredSets:5},{_id:"3",isdCode:"965",number:"45887886",updatedAt:new Date,status:"pending",registeredSets:0},{_id:"4",isdCode:"92",number:"8858446589",updatedAt:new Date,status:"active",registeredSets:1}],this.messageTypesList=[{id:1,type:"Text"},{id:2,type:"Text with Media"}],this.title="Auto Reply Configuration",this.showMediaFields=!1,this.visible=!1,this.isKeywordValid=!0,this.setId="",this.setDataFormSubmitted=!1,this.updateIndex=null,this.keywordValidMessage=""}ngOnInit(){this.initializeForm(),this.createDataSetFormGroup(),this.setId=this.route.snapshot.params.id,this.setId&&this.setService.getSetById(this.setId).subscribe(t=>{this.fillForm(t),console.log(t)})}initializeForm(){this.setForm=this.formBuilder.group({setName:["",r.kI.required],status:["",r.kI.required],ITSverificationMessage:["",r.kI.required],ITSverificationFailed:["",r.kI.required],NumberVerifiedMessage:["",r.kI.required],AcceptanceMessage:["",r.kI.required],RejectionMessage:["",r.kI.required],setData:[[],r.kI.minLength(1)]})}createDataSetFormGroup(){this.setDataForm=this.formBuilder.group({keywords:[[],r.kI.required],keywordTyped:[""],answer:this.formBuilder.group({message:["",r.kI.required],messageType:["1",r.kI.required],timeStamp:[""],mediaFile:[""]})}),this.setDataForm.get("answer.messageType")?.valueChanges.subscribe(t=>{this.showMediaFields=[2,4,6,8].includes(+t),console.log(this.showMediaFields,t);const o=this.setDataForm.get("answer.mediaFile");this.showMediaFields?o?.setValidators([r.kI.required]):o?.clearValidators(),o?.updateValueAndValidity()}),this.setDataForm.get("keywordTyped")?.valueChanges.subscribe(t=>{console.log("sssssssssssss",this.setForm.get("setData")?.value?.length),t&&this.setForm.get("setData")?.value?.length<1&&this.checkKeyword()})}fillForm(t){this.setForm.patchValue(t)}addKeyword(){if(!this.isKeywordValid)return;const t=this.setDataForm.get("keywordTyped")?.value,o=this.setDataForm.get("keywords")?.value||[];t&&!o?.includes(t)&&(o.push(t),this.setDataForm.patchValue({keywords:o}),this.setDataForm.get("keywordTyped")?.setValue(""))}removeKeyword(t){const o=this.setDataForm.get("keywords")?.value;o.splice(t,1),this.setDataForm.patchValue({keywords:o})}finalSubmit(t="active"){let o;console.log("setForm",this.setForm),this.setForm.patchValue({status:t}),o=this.setId?this.setService.updateSet(this.setId,this.setForm.value):this.setService.addSet(this.setForm.value),o.subscribe(s=>{this.setForm.reset(),this.setDataForm.reset(),this.router.navigate(["./whatsapp-config"])},s=>{console.log(s)})}addData(){if(this.setDataFormSubmitted=!0,this.setDataForm.invalid)return;const t=this.setForm.get("setData")?.value;console.log("updateIndex",this.updateIndex),"number"==typeof this.updateIndex?t[this.updateIndex]=this.setDataForm.value:t.push(this.setDataForm.value),console.log(t),this.setForm.patchValue({setData:t}),console.log(this.setForm.value),this.updateIndex=null,this.handleLiveDemoChange(!1)}deleteSetData(t){const o=this.setForm.get("setData")?.value;o.splice(t,1),this.setForm.patchValue({setData:o})}toggleLiveDemo(){this.setDataForm.reset(),this.visible=!this.visible}handleLiveDemoChange(t){this.visible=t}checkKeyword(){const t=this.setDataForm.get("keywordTyped")?.value;this.setService.checkKeyword({keyword:t}).subscribe(o=>{o.status?this.isKeywordValid=!0:(console.log("hhhh"),this.isKeywordValid=!1),this.keywordValidMessage=o.message})}UpdateSetData(t,o){this.updateIndex=o,this.setDataForm.patchValue({keywords:t.keywords,answer:t.answer}),console.log("data",t),this.visible=!this.visible}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(r.qu),e.Y36(g),e.Y36(p.F0),e.Y36(p.gz))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-form"]],decls:74,vars:14,consts:[[1,"fade-in"],[1,"container","mt-2"],[1,"d-flex","justify-content-between"],[1,"divider","my-2"],["cForm","",3,"formGroup"],[1,"flex-column"],["sm","12","md","6",1,"mb-3"],["cLabel","","for","input1"],["cFormControl","","type","text","id","input1","formControlName","setName"],["cLabel","","for","input4"],["cFormControl","","type","text","id","input4","formControlName","NumberVerifiedMessage"],["cLabel","","for","input2"],["cFormControl","","type","text","id","input2","formControlName","ITSverificationMessage"],["cLabel","","for","input3"],["cFormControl","","type","text","id","input3","formControlName","ITSverificationFailed"],["cLabel","","for","input5"],["cFormControl","","type","text","id","input5","formControlName","AcceptanceMessage"],["cLabel","","for","input6"],["cFormControl","","type","text","id","input6","formControlName","RejectionMessage"],[1,"mb-3"],["cLabel",""],["cButton","","color","primary","variant","outline","cButton","",1,"float-end",3,"click"],["cTable","","hover",""],["cButton","","color","success","variant","outline","type","submit",3,"click"],["alignment","center","id","verticallyCenteredModal",3,"visible","visibleChange"],["verticallyCenteredModal",""],["cButtonClose","",3,"cModalToggle"],["cLabel","","for","setName"],[2,"display","flex"],["cFormControl","","type","text","id","setName","formControlName","keywordTyped",2,"margin-right","8px",3,"keyup.enter"],["type","button","cButton","",3,"click"],["class","hint"],["class","chip",4,"ngFor","ngForOf"],["formGroupName","answer"],["cLabel","","for","messageType"],["cSelect","","id","messageType","formControlName","messageType"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["for","message"],["cFormControl","","id","message","formControlName","message"],["cButton","","color","secondary",3,"cModalToggle"],["cButton","","color","primary",3,"click"],["scope","col"],["scope","col",2,"width","50%"],["scope","col",2,"width","30%"],["scope","col",2,"width","10%"],[4,"ngFor","ngForOf"],["cButton","","color","secondary","variant","ghost",3,"click"],["cIcon","","name","cil-pen"],["cButton","","color","danger","variant","ghost",3,"swal","confirm"],["cIcon","","name","cil-trash"],[1,"hint"],[1,"chip"],[1,"close",3,"click"],[3,"value"],["clabel","","cButton","","for","mediaFile"],["type","file","id","mediaFile","formControlName","mediaFile",1,"d-none"]],template:function(o,s){if(1&o&&(e.TgZ(0,"div",0)(1,"c-card")(2,"c-card-body")(3,"div",1)(4,"div",2)(5,"h4"),e._uU(6),e.qZA()()(),e._UZ(7,"div",3),e.TgZ(8,"form",4)(9,"c-row",5)(10,"c-col",6)(11,"label",7),e._uU(12,"Campaign Name:"),e.qZA(),e._UZ(13,"input",8),e.qZA(),e.TgZ(14,"c-col",6)(15,"label",9),e._uU(16,"Number Verification:"),e.qZA(),e._UZ(17,"input",10),e.qZA(),e.TgZ(18,"c-col",6)(19,"label",11),e._uU(20,"ITS verification Passed:"),e.qZA(),e._UZ(21,"input",12),e.qZA(),e.TgZ(22,"c-col",6)(23,"label",13),e._uU(24,"ITS verification Failed:"),e.qZA(),e._UZ(25,"input",14),e.qZA(),e.TgZ(26,"c-col",6)(27,"label",15),e._uU(28,"Acceptance Response:"),e.qZA(),e._UZ(29,"input",16),e.qZA(),e.TgZ(30,"c-col",6)(31,"label",17),e._uU(32,"Rejection Response:"),e.qZA(),e._UZ(33,"input",18),e.qZA()(),e.TgZ(34,"div",19)(35,"label",20),e._uU(36,"Set Data"),e.qZA(),e.TgZ(37,"button",21),e.NdJ("click",function(){return s.toggleLiveDemo()}),e._uU(38,"Add"),e.qZA(),e.YNc(39,I,13,1,"table",22)(40,M,2,0),e.qZA(),e.TgZ(41,"button",23),e.NdJ("click",function(){return s.finalSubmit()}),e._uU(42,"Save and Update"),e.qZA()()()()(),e.TgZ(43,"c-modal",24,25),e.NdJ("visibleChange",function(d){return s.handleLiveDemoChange(d)}),e.TgZ(45,"c-modal-header"),e._UZ(46,"button",26),e.qZA(),e.TgZ(47,"c-modal-body")(48,"form",4)(49,"div",19)(50,"label",27),e._uU(51,"Keywords:"),e.qZA(),e.TgZ(52,"div",28)(53,"input",29),e.NdJ("keyup.enter",function(){return s.addKeyword()}),e.qZA(),e.TgZ(54,"button",30),e.NdJ("click",function(){return s.addKeyword()}),e._uU(55,"Add"),e.qZA()(),e.YNc(56,N,2,1,"span",31),e.qZA(),e.YNc(57,O,4,1,"div",32),e.TgZ(58,"div",33)(59,"div",19)(60,"label",34),e._uU(61,"Message Type"),e.qZA(),e.TgZ(62,"select",35),e.YNc(63,B,2,2,"option",36),e.qZA()(),e.YNc(64,J,5,0,"div",37),e.TgZ(65,"div",19)(66,"label",38),e._uU(67,"Message"),e.qZA(),e._UZ(68,"textarea",39),e.qZA()()()(),e.TgZ(69,"c-modal-footer")(70,"button",40),e._uU(71," Close "),e.qZA(),e.TgZ(72,"button",41),e.NdJ("click",function(){return s.addData()}),e._uU(73,"Save"),e.qZA()()()),2&o){const a=e.MAs(44);let d,m;e.xp6(6),e.Oqu(s.title),e.xp6(2),e.Q6J("formGroup",s.setForm),e.xp6(31),e.um2(39,null!=(d=s.setForm.get("setData"))&&null!=d.value&&d.value.length?39:40),e.xp6(4),e.Q6J("visible",s.visible),e.xp6(3),e.Q6J("cModalToggle",a.id),e.xp6(2),e.Q6J("formGroup",s.setDataForm),e.xp6(5),e.Tol(s.isKeywordValid?"":"error"),e.xp6(3),e.um2(56,s.isKeywordValid?-1:56),e.xp6(1),e.Q6J("ngForOf",null==(m=s.setDataForm.get("keywords"))?null:m.value),e.xp6(6),e.Q6J("ngForOf",s.messageTypesList),e.xp6(1),e.Q6J("ngIf",s.showMediaFields),e.xp6(6),e.Q6J("cModalToggle",a.id)}},dependencies:[u.sg,u.O5,n.AkF,n.yue,n.Yp0,n.iok,n.auY,f.ar,n.Hq3,n.PFQ,n.$_X,n.oHf,n.eFW,n.nqR,r._Y,r.YN,r.Kr,r.Fj,r.EJ,r.JJ,r.JL,r.sg,r.u,r.x0,n.KF4,n.zS7,n.YI7,n.Rbl,n.Ntb,C.iL],styles:[".chip[_ngcontent-%COMP%]{display:inline-block;background-color:#5141e0;color:#f0f8ff;padding:5px 20px;margin:5px;border-radius:10px;font-size:14px;position:relative}.close[_ngcontent-%COMP%]{cursor:pointer;color:#f0f8ff;font-weight:700;font-size:16px;position:absolute;right:5px;top:50%;transform:translateY(-50%)}.close[_ngcontent-%COMP%]:hover{color:#9a9a9a}.set-info[_ngcontent-%COMP%]{color:#373737}.description[_ngcontent-%COMP%]{color:#222}@media (max-width: 767px){.description[_ngcontent-%COMP%]{display:none}}.delete-button[_ngcontent-%COMP%]{background-color:#dc3545;color:#fff;padding:8px 12px;border:none;border-radius:4px;cursor:pointer;font-weight:700}.delete-button[_ngcontent-%COMP%]:hover{background-color:#bd2130}.error[_ngcontent-%COMP%]{border:1px solid red}.hint[_ngcontent-%COMP%]{color:red;font-weight:600;font-size:12px}"]})}return i})();const L=[{path:"",component:k},{path:"edit/:id",component:F},{path:"create",component:F},{path:"view/:id",component:(()=>{class i{constructor(t){this.setService=t,this.title="Auto Reply Configuration"}ngOnInit(){console.log("hit")}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(g))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-preview"]],decls:5,vars:1,consts:[[1,"fade-in"]],template:function(o,s){1&o&&(e.TgZ(0,"div",0)(1,"c-card")(2,"c-card-header"),e._uU(3),e.qZA(),e._UZ(4,"c-card-body"),e.qZA()()),2&o&&(e.xp6(3),e.hij(" ",s.title,""))},dependencies:[n.AkF,n.yue,n.nkx]})}return i})()}];let $=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#o=this.\u0275inj=e.cJS({imports:[p.Bz.forChild(L),p.Bz]})}return i})(),V=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#o=this.\u0275inj=e.cJS({imports:[u.ez,$,n.dTQ,n.zE6,n.TXv,n.U$I,f.QX,n.hJ1,n.gzQ,n.z8t,_.JX,n.ejP,h.JF,r.UX,n.zkK,C.ii.forRoot()]})}return i})()}}]);