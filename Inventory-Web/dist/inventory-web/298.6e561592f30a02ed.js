"use strict";(self.webpackChunkInventory_Web=self.webpackChunkInventory_Web||[]).push([[298],{7298:(gt,N,i)=>{i.r(N),i.d(N,{DashboardModule:()=>dt});var C=i(6814),v=i(1303),k=i(2096),x=i(5877),A=i(4221);const w=(0,A.ZF)("notification"),p=(0,A.P1)(w,a=>a.notifications);var P=i(2181),R=i(5176),S=i(2036),e=i(5879),M=i(617),t=i(4104),Z=i(6825),h=i(5195);function Y(a,f){if(1&a&&(e.TgZ(0,"div",4),e._uU(1),e.qZA()),2&a){const r=f.$implicit;e.Q6J("ngClass",r.type),e.xp6(1),e.hij(" ",r.message," ")}}function U(a,f){if(1&a&&(e.TgZ(0,"mat-card",2)(1,"mat-card-header")(2,"mat-card-title"),e._uU(3,"Notifications"),e.qZA()(),e.TgZ(4,"mat-card-content"),e.YNc(5,Y,2,2,"div",3),e.qZA()()),2&a){const r=e.oxw().ngIf;e.Q6J("@fadeSlideIn",void 0),e.xp6(5),e.Q6J("ngForOf",r)}}function J(a,f){if(1&a&&(e.ynx(0),e.YNc(1,U,6,2,"mat-card",1),e.BQk()),2&a){const r=f.ngIf;e.xp6(1),e.Q6J("ngIf",r.length>0)}}let I=(()=>{class a{constructor(r){this.store=r,this.notifications$=this.store.select(p)}static#t=this.\u0275fac=function(c){return new(c||a)(e.Y36(A.yh))};static#e=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-notification-hub"]],decls:2,vars:3,consts:[[4,"ngIf"],["class","notification-container",4,"ngIf"],[1,"notification-container"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"]],template:function(c,m){1&c&&(e.YNc(0,J,2,1,"ng-container",0),e.ALo(1,"async")),2&c&&e.Q6J("ngIf",e.lcZ(1,1,m.notifications$))},dependencies:[C.mk,C.sg,C.O5,h.a8,h.dn,h.dk,h.n5,C.Ov],styles:[".notification-container[_ngcontent-%COMP%]{margin:1rem;border:1px solid #333333;background-color:#ddd;font-family:Tahoma,sans-serif}.notification-container[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:.8rem;font-weight:700}.notification-container[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%]{color:green}.notification-container[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{color:red}.notification-container[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{color:#000}"],data:{animation:[(0,Z.X$)("fadeSlideIn",[(0,Z.eR)(":enter",[(0,Z.oB)({opacity:0,transform:"translateY(-20px)"}),(0,Z.jt)("300ms ease-out",(0,Z.oB)({opacity:1,transform:"translateY(0)"}))]),(0,Z.eR)(":leave",[(0,Z.jt)("300ms ease-in",(0,Z.oB)({opacity:0,transform:"translateY(-20px)"}))])])]}})}return a})();var l=i(6223),O=i(8645),T=i(4031),D=i(7700),$=i(5124),Q=i(5940),b=i(5683),q=i(2296),j=i(2032);function B(a,f){1&a&&(e.TgZ(0,"div",14),e._UZ(1,"mat-spinner",15),e.qZA()),2&a&&(e.xp6(1),e.Q6J("diameter",30))}let z=(()=>{class a{constructor(r,c,m){this.store=r,this.dialogRef=c,this.notificationService=m,this.isInit=!0,this.loading=!0,this.error=null,this.destroy$=new O.x,this.creatingCustomer$=this.store.select(T.W8),this.createdCustomer$=this.store.select(T.Y),this.error$=this.store.select(T.oY)}ngOnInit(){this.buildForm(),this.error$.subscribe(r=>{r&&(console.error(r),this.error=r,this.notificationService.success("There was a problem creating the customer. "))}),this.createdCustomer$.subscribe(r=>{console.log("customer: ",r),r&&!this.isInit&&(this.notificationService.success("Customer Created Successfully"),this.notificationService.error("THIS IS AN ERROR"),this.dialogRef.close())}),this.creatingCustomer$.subscribe(r=>{this.loading=r})}buildForm(){this.customerAddForm=new l.cw({name:new l.NI(null,[l.kI.required]),address1:new l.NI(null),address2:new l.NI(null),city:new l.NI(null),provinceState:new l.NI(null),postalCode:new l.NI(null),email:new l.NI(null,[l.kI.email])})}addCustomer(){if(this.customerAddForm.valid){const r={name:this.customerAddForm.value.name,address1:this.customerAddForm.value.address1,address2:this.customerAddForm.value.address2,city:this.customerAddForm.value.city,provinceState:this.customerAddForm.value.provinceState,postalCode:this.customerAddForm.value.postalCode,email:this.customerAddForm.value.email};this.isInit=!1,this.store.dispatch((0,x.Wb)({customerCreate:r}))}else this.customerAddForm.markAllAsTouched()}closeDialog(){this.dialogRef.close()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(c){return new(c||a)(e.Y36(A.yh),e.Y36(D.so),e.Y36($.g))};static#e=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-customer-add"]],decls:54,vars:2,consts:[[1,"tally-card"],[1,"close-icon",3,"click"],[3,"formGroup"],["appearance","outline","color","accent"],["matInput","","placeholder","Customer name","formControlName","name","required",""],["matInput","","placeholder","Address line 1","formControlName","address1"],["matInput","","placeholder","Address line 2","formControlName","address2"],["matInput","","placeholder","City","formControlName","city"],["matInput","","placeholder","Province/State","formControlName","provinceState","maxlength","2"],["matInput","","placeholder","Postal Code/Zip","formControlName","postalCode"],["matInput","","placeholder","Email","formControlName","email"],["class","spinner-container",4,"ngIf"],["mat-raised-button","","color","primary",1,"item",3,"click"],["mat-raised-button","",1,"item",3,"click"],[1,"spinner-container"],[3,"diameter"]],template:function(c,m){1&c&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),e._uU(3,"Add Customer"),e.qZA(),e.TgZ(4,"mat-icon",1),e.NdJ("click",function(){return m.closeDialog()}),e._uU(5,"close"),e.qZA()(),e.TgZ(6,"mat-card-content")(7,"div")(8,"form",2)(9,"mat-form-field",3)(10,"mat-label"),e._uU(11,"Customer Name"),e.qZA(),e._UZ(12,"input",4),e.TgZ(13,"mat-error"),e._uU(14," Please provide a customer name "),e.qZA()(),e.TgZ(15,"mat-form-field",3)(16,"mat-label"),e._uU(17,"Address Line 1"),e.qZA(),e._UZ(18,"input",5),e.TgZ(19,"mat-error"),e._uU(20," Please provide an address "),e.qZA()(),e.TgZ(21,"mat-form-field",3)(22,"mat-label"),e._uU(23,"Address Line 2"),e.qZA(),e._UZ(24,"input",6),e.qZA(),e.TgZ(25,"mat-form-field",3)(26,"mat-label"),e._uU(27,"City"),e.qZA(),e._UZ(28,"input",7),e.TgZ(29,"mat-error"),e._uU(30," Please provide a city "),e.qZA()(),e.TgZ(31,"mat-form-field",3)(32,"mat-label"),e._uU(33,"Province/State"),e.qZA(),e._UZ(34,"input",8),e.TgZ(35,"mat-error"),e._uU(36," Please provide a province/state "),e.qZA()(),e.TgZ(37,"mat-form-field",3)(38,"mat-label"),e._uU(39,"Postal Code/Zip"),e.qZA(),e._UZ(40,"input",9),e.TgZ(41,"mat-error"),e._uU(42," Please provide a postal code/zip "),e.qZA()(),e.TgZ(43,"mat-form-field",3)(44,"mat-label"),e._uU(45,"Email"),e.qZA(),e._UZ(46,"input",10),e.TgZ(47,"mat-error"),e._uU(48," Please provide a valid email "),e.qZA()(),e.YNc(49,B,2,1,"div",11),e.TgZ(50,"button",12),e.NdJ("click",function(){return m.addCustomer()}),e._uU(51,"Add Customer"),e.qZA(),e.TgZ(52,"button",13),e.NdJ("click",function(){return m.closeDialog()}),e._uU(53,"Cancel"),e.qZA()()()()()),2&c&&(e.xp6(8),e.Q6J("formGroup",m.customerAddForm),e.xp6(41),e.Q6J("ngIf",m.loading))},dependencies:[C.O5,Q.Ou,b.KE,b.hX,b.TO,h.a8,h.dn,h.dk,h.n5,M.Hw,q.lW,j.Nt,l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.nD,l.sg,l.u],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}mat-card[_ngcontent-%COMP%]{width:500px;margin:auto}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:1rem}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}h1[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}.close-icon[_ngcontent-%COMP%]{margin-left:auto;cursor:pointer}button[_ngcontent-%COMP%]{margin-right:1rem}"]})}return a})();var E=i(3739),V=i(9773),F=i(8577),H=i(4124),L=i(8525),W=i(3680);function X(a,f){if(1&a&&(e.TgZ(0,"mat-option",13),e._uU(1),e.qZA()),2&a){const r=f.$implicit;e.Q6J("value",r.shopLocationId),e.xp6(1),e.hij(" ",r.name," ")}}function G(a,f){1&a&&(e.TgZ(0,"div",14),e._UZ(1,"mat-spinner",15),e.qZA()),2&a&&(e.xp6(1),e.Q6J("diameter",30))}let K=(()=>{class a{constructor(r,c,m){this.store=r,this.dialogRef=c,this.notificationService=m,this.isInit=!0,this.loading=!0,this.error=null,this.destroy$=new O.x,this.shops=[],this.shopsFullList$=this.store.select(H.ST),this.creatingRack$=this.store.select(F.SQ),this.createdRack$=this.store.select(F.dv),this.error$=this.store.select(F.RL)}ngOnInit(){this.buildForm(),this.shopsFullList$.pipe((0,V.R)(this.destroy$)).subscribe(r=>{r&&(this.shops=r)}),this.error$.subscribe(r=>{r&&(console.error(r),this.error=r,this.notificationService.success("There was a problem creating the customer. "))}),this.createdRack$.subscribe(r=>{r&&!this.isInit&&(this.notificationService.success("Rack Created Successfully"),this.dialogRef.close())}),this.creatingRack$.subscribe(r=>{this.loading=r})}buildForm(){this.rackAddForm=new l.cw({name:new l.NI(null,[l.kI.required]),shopLocation:new l.NI(null,[l.kI.required]),jointsPerTier:new l.NI(null,[l.kI.required]),description:new l.NI(null)})}addRack(){if(this.rackAddForm.valid){const r={name:this.rackAddForm.value.name,shopLocationId:"A671AF6A-8AA7-4D49-B08B-88003ADCA01C",isActive:!0,description:this.rackAddForm.value.description,jointsPerTier:this.rackAddForm.value.jointsPerTier,rackType:this.rackAddForm.value.rackType};this.isInit=!1,this.store.dispatch((0,E.q4)({rackCreate:r}))}else this.rackAddForm.markAllAsTouched()}closeDialog(){this.dialogRef.close()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(c){return new(c||a)(e.Y36(A.yh),e.Y36(D.so),e.Y36($.g))};static#e=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-rack-add"]],decls:39,vars:3,consts:[[1,"tally-card"],[1,"close-icon",3,"click"],[3,"formGroup"],["appearance","outline","color","accent"],["matInput","","placeholder","Rack name","formControlName","name","required",""],["formControlName","shopLocation"],[3,"value",4,"ngFor","ngForOf"],["matInput","","placeholder","Joints per tier","formControlName","jointsPerTier","rqeuired",""],["matInput","","placeholder","Rack Type","formControlName","rackType"],["matInput","","placeholder","Description","formControlName","description"],["class","spinner-container",4,"ngIf"],["mat-raised-button","","color","primary",1,"item",3,"click"],["mat-raised-button","",1,"item",3,"click"],[3,"value"],[1,"spinner-container"],[3,"diameter"]],template:function(c,m){1&c&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),e._uU(3,"Add Rack"),e.qZA(),e.TgZ(4,"mat-icon",1),e.NdJ("click",function(){return m.closeDialog()}),e._uU(5,"close"),e.qZA()(),e.TgZ(6,"mat-card-content")(7,"div")(8,"form",2)(9,"mat-form-field",3)(10,"mat-label"),e._uU(11,"Rack Name"),e.qZA(),e._UZ(12,"input",4),e.TgZ(13,"mat-error"),e._uU(14," Please provide a rack name "),e.qZA()(),e.TgZ(15,"mat-form-field",3)(16,"mat-label"),e._uU(17,"Shop"),e.qZA(),e.TgZ(18,"mat-select",5),e.YNc(19,X,2,2,"mat-option",6),e.qZA()(),e.TgZ(20,"mat-form-field",3)(21,"mat-label"),e._uU(22,"Joints per tier"),e.qZA(),e._UZ(23,"input",7),e.TgZ(24,"mat-error"),e._uU(25," Please provide a city "),e.qZA()(),e.TgZ(26,"mat-form-field",3)(27,"mat-label"),e._uU(28,"Rack Type"),e.qZA(),e._UZ(29,"input",8),e.qZA(),e.TgZ(30,"mat-form-field",3)(31,"mat-label"),e._uU(32,"Description"),e.qZA(),e._UZ(33,"input",9),e.qZA(),e.YNc(34,G,2,1,"div",10),e.TgZ(35,"button",11),e.NdJ("click",function(){return m.addRack()}),e._uU(36,"Add Rack"),e.qZA(),e.TgZ(37,"button",12),e.NdJ("click",function(){return m.closeDialog()}),e._uU(38,"Cancel"),e.qZA()()()()()),2&c&&(e.xp6(8),e.Q6J("formGroup",m.rackAddForm),e.xp6(11),e.Q6J("ngForOf",m.shops),e.xp6(15),e.Q6J("ngIf",m.loading))},dependencies:[C.sg,C.O5,Q.Ou,b.KE,b.hX,b.TO,h.a8,h.dn,h.dk,h.n5,M.Hw,q.lW,j.Nt,L.gD,W.ey,l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.sg,l.u],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}mat-card[_ngcontent-%COMP%]{width:500px;margin:auto}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:1rem}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}h1[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}.close-icon[_ngcontent-%COMP%]{margin-left:auto;cursor:pointer}button[_ngcontent-%COMP%]{margin-right:1rem}"]})}return a})(),tt=(()=>{class a{constructor(r,c){this.dialog=r,this.router=c}openAddTallyDialog(){this.router.navigate(["/tally/add"])}openAddCustomerDialog(){this.dialog.open(z).afterClosed().subscribe(c=>{console.log("The dialog was closed")})}openAddRackDialog(){this.dialog.open(K).afterClosed().subscribe(c=>{console.log("The dialog was closed")})}static#t=this.\u0275fac=function(c){return new(c||a)(e.Y36(D.uw),e.Y36(v.F0))};static#e=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-actions-bar"]],decls:13,vars:0,consts:[[1,"container"],["mat-raised-button","","color","primary",3,"click"]],template:function(c,m){1&c&&(e.TgZ(0,"mat-card",0)(1,"button",1),e.NdJ("click",function(){return m.openAddTallyDialog()}),e.TgZ(2,"mat-icon"),e._uU(3,"assignment_add"),e.qZA(),e._uU(4," Add Tally "),e.qZA(),e.TgZ(5,"button",1),e.NdJ("click",function(){return m.openAddRackDialog()}),e.TgZ(6,"mat-icon"),e._uU(7,"add"),e.qZA(),e._uU(8," Add Rack "),e.qZA(),e.TgZ(9,"button",1),e.NdJ("click",function(){return m.openAddCustomerDialog()}),e.TgZ(10,"mat-icon"),e._uU(11,"person_add"),e.qZA(),e._uU(12," Add Customer "),e.qZA()())},dependencies:[h.a8,M.Hw,q.lW],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;margin:1rem;padding:1rem;border:1px solid green}button[_ngcontent-%COMP%]{margin-right:1rem}"]})}return a})();function et(a,f){1&a&&(e.TgZ(0,"mat-icon"),e._uU(1,"assignment"),e.qZA(),e._uU(2," Search by Tally "))}function nt(a,f){1&a&&(e.TgZ(0,"mat-icon"),e._uU(1,"plumbing"),e.qZA(),e._uU(2," Search by Pipe "))}function ot(a,f){1&a&&(e.TgZ(0,"mat-icon"),e._uU(1,"view_list"),e.qZA(),e._uU(2," Search by Rack "))}function it(a,f){1&a&&(e.TgZ(0,"mat-icon"),e._uU(1,"group"),e.qZA(),e._uU(2," Search by Customer "))}const at=[{path:"",component:(()=>{class a{constructor(r,c,m){this.store=r,this.router=c,this.activatedRoute=m,this.selectedTabIndex=0,this.notifications$=(0,k.of)([]),this.notifications$=this.store.select(p),this.router.events.pipe((0,P.h)(g=>g instanceof v.m2)).subscribe(()=>{this.updateSelectedTabIndex()})}ngOnInit(){this.store.dispatch((0,x.cR)({searchParams:null})),this.store.dispatch((0,R.Nh)()),this.pipePropertiesSubscription=this.store.select(S.b3).subscribe(r=>{console.log("Pipe properties loaded:",r?r.categories:"No categories found")})}updateSelectedTabIndex(){let r=this.activatedRoute,c="";for(;r.firstChild;){r=r.firstChild;const m=r.snapshot.url.map(g=>g.path).join("/");m&&(c=m)}this.selectedTabIndex=this.getPathIndex(c),console.log("Final route segment:",c),console.log("Updated tab index to:",this.selectedTabIndex)}getPathIndex(r){switch(r){case"tally":default:return 0;case"pipe":return 1;case"rack":return 2;case"customer":return 3}}onTabChange(r){this.router.navigate(["/dashboard/"+["tally","pipe","rack","customer"][+r.index]])}static#t=this.\u0275fac=function(c){return new(c||a)(e.Y36(A.yh),e.Y36(v.F0),e.Y36(v.gz))};static#e=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-dashboard"]],decls:13,vars:1,consts:[[1,"container"],["mat-stretch-tabs","false","mat-align-tabs","start",1,"section",3,"selectedIndex","selectedTabChange"],["mat-tab-label",""]],template:function(c,m){1&c&&(e._UZ(0,"app-notification-hub")(1,"app-actions-bar"),e.TgZ(2,"div",0)(3,"mat-tab-group",1),e.NdJ("selectedTabChange",function(pt){return m.onTabChange(pt)}),e.TgZ(4,"mat-tab"),e.YNc(5,et,3,0,"ng-template",2),e.qZA(),e.TgZ(6,"mat-tab"),e.YNc(7,nt,3,0,"ng-template",2),e.qZA(),e.TgZ(8,"mat-tab"),e.YNc(9,ot,3,0,"ng-template",2),e.qZA(),e.TgZ(10,"mat-tab"),e.YNc(11,it,3,0,"ng-template",2),e.qZA()(),e._UZ(12,"router-outlet"),e.qZA()),2&c&&(e.xp6(3),e.Q6J("selectedIndex",m.selectedTabIndex))},dependencies:[v.lC,M.Hw,t.uD,t.uX,t.SP,I,tt],styles:["mat-card[_ngcontent-%COMP%]{min-width:500px;width:100%;overflow-x:auto}h4[_ngcontent-%COMP%]{margin-top:20;margin-bottom:.4rem}.title-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:700;font-size:1.5rem}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:1rem;border:solid pink 3px}.container-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:100%}.data-column-left[_ngcontent-%COMP%], .data-column-right[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1}.data-column-right[_ngcontent-%COMP%]{padding:1px;margin:0;align-items:flex-end}tr.detail-row[_ngcontent-%COMP%]{height:0}tr.element-row[_ngcontent-%COMP%]:not(.expanded-row):hover{background-color:#f5f5f5}tr.element-row[_ngcontent-%COMP%]:not(.expanded-row):active{background-color:#ddd}.element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom-width:0}mat-expansion-panel[_ngcontent-%COMP%]   .container-filter[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;gap:1rem;justify-content:flex-start;align-items:center}mat-expansion-panel[_ngcontent-%COMP%]   .item-buttons[_ngcontent-%COMP%]{display:flex;justify-content:flex-start}mat-expansion-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 0 25%;max-width:275px;min-width:150px}mat-expansion-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}.actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-top:.5rem}.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-grow:1;margin:.1rem}.successLabel[_ngcontent-%COMP%]{color:green}.errorLabel[_ngcontent-%COMP%]{color:red}.infoLabel[_ngcontent-%COMP%]{color:#000}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white}.mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%]{height:3rem}.selected[_ngcontent-%COMP%]{background-color:#0000000a}"]})}return a})(),children:[{path:"",redirectTo:"tally",pathMatch:"full"},{path:"tally",loadChildren:()=>Promise.all([i.e(471),i.e(177)]).then(i.bind(i,9177)).then(a=>a.SearchTallyModule)},{path:"pipe",loadChildren:()=>i.e(236).then(i.bind(i,7236)).then(a=>a.SearchPipeModule)},{path:"rack",loadChildren:()=>i.e(169).then(i.bind(i,6169)).then(a=>a.SearchRackModule)},{path:"customer",loadChildren:()=>Promise.resolve().then(i.bind(i,3689)).then(a=>a.SearchCustomerModule)}]}];let rt=(()=>{class a{static#t=this.\u0275fac=function(c){return new(c||a)};static#e=this.\u0275mod=e.oAB({type:a});static#n=this.\u0275inj=e.cJS({imports:[v.Bz.forChild(at),v.Bz]})}return a})();var st=i(5789),ct=i(6208),lt=i(3566),mt=i(3689);let dt=(()=>{class a{static#t=this.\u0275fac=function(c){return new(c||a)};static#e=this.\u0275mod=e.oAB({type:a});static#n=this.\u0275inj=e.cJS({imports:[C.ez,rt,st.q,ct.m,lt.JX,mt.SearchCustomerModule]})}return a})()},3689:(gt,N,i)=>{i.r(N),i.d(N,{SearchCustomerModule:()=>xt});var C=i(6814),v=i(5789),k=i(1303),x=i(6223),A=i(1476),w=i(3566),p=i(5313),P=i(5877),R=i(8645),S=i(9773),e=i(4031),M=i(5878),t=i(5879),Z=i(4221),h=i(5940),Y=i(5683),U=i(5195),J=i(617),I=i(2296),l=i(2032),O=i(3305),T=i(6825);function D(n,s){1&n&&(t.TgZ(0,"div",3),t._uU(1," Customer Information "),t.qZA())}function $(n,s){if(1&n&&(t.TgZ(0,"div",3)(1,"span"),t._uU(2),t.qZA()()),2&n){const o=t.oxw();t.xp6(2),t.Oqu(o.customer.name)}}function Q(n,s){1&n&&(t.TgZ(0,"th",22),t._uU(1,"Quantity"),t.qZA())}function b(n,s){if(1&n&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.quantity," ")}}function q(n,s){1&n&&(t.TgZ(0,"th",22),t._uU(1,"Meters"),t.qZA())}function j(n,s){if(1&n&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.lengthInMeters," ")}}function B(n,s){1&n&&(t.TgZ(0,"th",22),t._uU(1,"Rack"),t.qZA())}function z(n,s){if(1&n&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.rackName," ")}}function E(n,s){1&n&&(t.TgZ(0,"th",22),t._uU(1,"Tier"),t.qZA())}function V(n,s){if(1&n&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.tierNumber," ")}}function F(n,s){1&n&&(t.TgZ(0,"th",24),t._uU(1,"\xa0"),t.qZA())}function H(n,s){1&n&&(t.TgZ(0,"mat-icon"),t._uU(1,"keyboard_arrow_down"),t.qZA())}function L(n,s){1&n&&(t.TgZ(0,"mat-icon"),t._uU(1,"keyboard_arrow_up"),t.qZA())}function W(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"td",25)(1,"button",26),t.NdJ("click",function(u){const y=t.CHM(o).$implicit,ht=t.oxw(2);return ht.expandedElement=ht.expandedElement===y?null:y,t.KtG(u.stopPropagation())}),t.YNc(2,H,2,0,"mat-icon",27),t.YNc(3,L,2,0,"mat-icon",27),t.qZA()()}if(2&n){const o=s.$implicit,d=t.oxw(2);t.xp6(2),t.Q6J("ngIf",d.expandedElement!==o),t.xp6(1),t.Q6J("ngIf",d.expandedElement===o)}}function X(n,s){if(1&n&&(t.TgZ(0,"td",23)(1,"div",28)(2,"div",29)(3,"div")(4,"div",30)(5,"b"),t._uU(6,"Category: "),t.qZA(),t.TgZ(7,"span"),t._uU(8),t.qZA()(),t.TgZ(9,"div",30)(10,"b"),t._uU(11,"Condition: "),t.qZA(),t.TgZ(12,"span"),t._uU(13),t.qZA()(),t.TgZ(14,"div",30)(15,"b"),t._uU(16,"Grade: "),t.qZA(),t.TgZ(17,"span"),t._uU(18),t.qZA()(),t.TgZ(19,"div",30)(20,"b"),t._uU(21,"Range: "),t.qZA(),t.TgZ(22,"span"),t._uU(23),t.qZA()(),t.TgZ(24,"div",30)(25,"b"),t._uU(26,"Thread: "),t.qZA(),t.TgZ(27,"span"),t._uU(28),t.qZA()(),t.TgZ(29,"div",30)(30,"b"),t._uU(31,"Weight (kg/m): "),t.qZA(),t.TgZ(32,"span"),t._uU(33),t.qZA()(),t.TgZ(34,"div",30)(35,"b"),t._uU(36,"Weight (lbs/ft): "),t.qZA(),t.TgZ(37,"span"),t._uU(38),t.qZA()()(),t.TgZ(39,"div")(40,"div",30)(41,"b"),t._uU(42,"Length (ft): "),t.qZA(),t.TgZ(43,"span"),t._uU(44),t.qZA()(),t.TgZ(45,"div",30)(46,"b"),t._uU(47,"Size (m): "),t.qZA(),t.TgZ(48,"span"),t._uU(49),t.qZA()(),t.TgZ(50,"div",30)(51,"b"),t._uU(52,"Size (ft): "),t.qZA(),t.TgZ(53,"span"),t._uU(54),t.qZA()(),t.TgZ(55,"div",30)(56,"b"),t._uU(57,"Wall (m): "),t.qZA(),t.TgZ(58,"span"),t._uU(59),t.qZA()(),t.TgZ(60,"div",30)(61,"b"),t._uU(62,"Wall (ft): "),t.qZA(),t.TgZ(63,"span"),t._uU(64),t.qZA()()()()()()),2&n){const o=s.$implicit,d=t.oxw(2);t.uIk("colspan",d.columnsToDisplayWithExpand.length),t.xp6(1),t.Q6J("@detailExpand",o==d.expandedElement?"expanded":"collapsed"),t.xp6(7),t.Oqu(o.pipeDefinition.category.name),t.xp6(5),t.Oqu(o.pipeDefinition.condition.name),t.xp6(5),t.Oqu(o.pipeDefinition.grade.name),t.xp6(5),t.Oqu(o.pipeDefinition.range.name),t.xp6(5),t.Oqu(o.pipeDefinition.thread.name),t.xp6(5),t.Oqu(o.pipeDefinition.weight.weightInKgPerMeter),t.xp6(5),t.Oqu(o.pipeDefinition.weight.weightInLbsPerFoot),t.xp6(6),t.Oqu(o.lengthInFeet),t.xp6(5),t.Oqu(o.pipeDefinition.size.sizeMetric),t.xp6(5),t.Oqu(o.pipeDefinition.size.sizeMetric),t.xp6(5),t.Oqu(o.pipeDefinition.wall.wallMetric),t.xp6(5),t.Oqu(o.pipeDefinition.wall.wallMetric)}}function G(n,s){1&n&&t._UZ(0,"tr",31)}function K(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"tr",32),t.NdJ("click",function(){const _=t.CHM(o).$implicit,y=t.oxw(2);return t.KtG(y.expandedElement=y.expandedElement===_?null:_)}),t.qZA()}if(2&n){const o=s.$implicit,d=t.oxw(2);t.ekj("example-expanded-row",d.expandedElement===o)}}function tt(n,s){1&n&&t._UZ(0,"tr",33)}const et=function(){return["expandedDetail"]};function nt(n,s){if(1&n&&(t.TgZ(0,"div",4)(1,"div",5)(2,"div",6)(3,"span"),t._uU(4),t.qZA(),t.TgZ(5,"span"),t._uU(6),t.qZA(),t.TgZ(7,"span"),t._uU(8),t.qZA(),t.TgZ(9,"span"),t._uU(10),t.qZA()(),t.TgZ(11,"div",7)(12,"span"),t._uU(13),t.qZA()()(),t.TgZ(14,"h4"),t._uU(15,"Pipe"),t.qZA(),t.TgZ(16,"table",8),t.ynx(17,9),t.YNc(18,Q,2,0,"th",10),t.YNc(19,b,2,1,"td",11),t.BQk(),t.ynx(20,12),t.YNc(21,q,2,0,"th",10),t.YNc(22,j,2,1,"td",11),t.BQk(),t.ynx(23,13),t.YNc(24,B,2,0,"th",10),t.YNc(25,z,2,1,"td",11),t.BQk(),t.ynx(26,14),t.YNc(27,E,2,0,"th",10),t.YNc(28,V,2,1,"td",11),t.BQk(),t.ynx(29,15),t.YNc(30,F,2,0,"th",16),t.YNc(31,W,4,2,"td",17),t.BQk(),t.ynx(32,18),t.YNc(33,X,65,14,"td",11),t.BQk(),t.YNc(34,G,1,0,"tr",19),t.YNc(35,K,1,2,"tr",20),t.YNc(36,tt,1,0,"tr",21),t.qZA()()),2&n){const o=t.oxw();t.xp6(4),t.hij("",o.customer.address1," "),t.xp6(2),t.Oqu(o.customer.city),t.xp6(2),t.Oqu(o.customer.country),t.xp6(2),t.Oqu(o.customer.postalCode),t.xp6(3),t.hij("",o.customer.email," "),t.xp6(3),t.Q6J("dataSource",o.dataSource),t.xp6(18),t.Q6J("matHeaderRowDef",o.columnsToDisplayWithExpand),t.xp6(1),t.Q6J("matRowDefColumns",o.columnsToDisplayWithExpand),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(9,et))}}function ot(n,s){1&n&&(t.TgZ(0,"div",34),t._UZ(1,"mat-progress-spinner",35),t.qZA())}let it=(()=>{class n{constructor(o){this.store=o,this.customer=null,this.columnsToDisplay=["quantity","lengthMeters","rack","tier"],this.columnsToDisplayWithExpand=[...this.columnsToDisplay,"expand"],this.dataSource=new p.by,this.customer$=this.store.select(e.HY),this.loading=!1,this.destroy$=new R.x}ngOnInit(){this.customer$.pipe((0,S.R)(this.destroy$)).subscribe(o=>{o&&(this.loading=!1,this.customer=o.customer,this.dataSource=new p.by(o.pipeList))})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(d){return new(d||n)(t.Y36(Z.yh))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-customer-view"]],decls:7,vars:4,consts:[["class","title-container",4,"ngIf"],["class","container",4,"ngIf"],["class","spinner",4,"ngIf"],[1,"title-container"],[1,"container"],[1,"container-row"],[1,"data-column-left"],[1,"data-column-right"],["mat-table","","multiTemplateDataRows","","matSort","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","quantity"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","lengthMeters"],["matColumnDef","rack"],["matColumnDef","tier"],["matColumnDef","expand"],["mat-header-cell","","aria-label","row actions",4,"matHeaderCellDef"],["mat-cell","","class","column-actions",4,"matCellDef"],["matColumnDef","expandedDetail"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","example-element-row",3,"example-expanded-row","click",4,"matRowDef","matRowDefColumns"],["mat-row","","class","example-detail-row",4,"matRowDef","matRowDefColumns"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell","","aria-label","row actions"],["mat-cell","",1,"column-actions"],["mat-icon-button","","aria-label","expand row",3,"click"],[4,"ngIf"],[1,"example-element-detail"],[1,"container-description"],[1,"element-description"],["mat-header-row",""],["mat-row","",1,"example-element-row",3,"click"],["mat-row","",1,"example-detail-row"],[1,"spinner"],["color","primary","mode","indeterminate"]],template:function(d,u){1&d&&(t.TgZ(0,"mat-card")(1,"mat-card-header"),t.YNc(2,D,2,0,"div",0),t.YNc(3,$,3,1,"div",0),t.qZA(),t.TgZ(4,"mat-card-content"),t.YNc(5,nt,37,10,"div",1),t.qZA(),t.YNc(6,ot,2,0,"div",2),t.qZA()),2&d&&(t.xp6(2),t.Q6J("ngIf",!u.customer),t.xp6(1),t.Q6J("ngIf",u.customer),t.xp6(2),t.Q6J("ngIf",u.customer),t.xp6(1),t.Q6J("ngIf",u.loading))},dependencies:[C.O5,h.Ou,p.BZ,p.fO,p.as,p.w1,p.Dz,p.nj,p.ge,p.ev,p.XQ,p.Gk,U.a8,U.dn,U.dk,J.Hw,I.RK,w.YE,w.nU],styles:["mat-card[_ngcontent-%COMP%]{min-width:500px;padding:1rem;width:100%}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem;width:100%}span[_ngcontent-%COMP%]{padding-bottom:5px}.title-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;width:100%}.container-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:100%;padding-top:20px}.container-row[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:first-child{padding-right:20px}.container-row[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-right:0}.data-column-left[_ngcontent-%COMP%], .data-column-right[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1}.data-column-right[_ngcontent-%COMP%]{text-align:right}h4[_ngcontent-%COMP%]{margin:.5rem 1rem .5rem 0}.column-actions[_ngcontent-%COMP%]{width:0}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white;padding:1rem}mat-expansion-panel[_ngcontent-%COMP%]{margin:1rem 0}mat-expansion-panel[_ngcontent-%COMP%]   .container-filter[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}mat-expansion-panel[_ngcontent-%COMP%]   .item-buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}mat-expansion-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-right:1rem;width:12rem}mat-expansion-panel[_ngcontent-%COMP%]   .date-field[_ngcontent-%COMP%]{width:auto}mat-expansion-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:1.5rem}table[_ngcontent-%COMP%]{margin-top:1rem}tr.example-detail-row[_ngcontent-%COMP%]{height:0}tr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):hover{background:whitesmoke}tr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):active{background:#efefef}.example-element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom-width:0}.example-element-detail[_ngcontent-%COMP%]{overflow:hidden;display:flex}.example-element-diagram[_ngcontent-%COMP%]{min-width:80px;border:2px solid black;padding:8px;font-weight:lighter;margin:8px 0;height:104px}.example-element-symbol[_ngcontent-%COMP%]{font-weight:700;font-size:40px;line-height:normal}.example-element-description[_ngcontent-%COMP%]{padding:16px}.example-element-description[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:10px}.example-element-description-attribution[_ngcontent-%COMP%]{opacity:.5}"],data:{animation:[(0,T.X$)("detailExpand",[(0,T.SB)("collapsed",(0,T.oB)({height:"0px",minHeight:"0"})),(0,T.SB)("expanded",(0,T.oB)({height:"*"})),(0,T.eR)("expanded <=> collapsed",(0,T.jt)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]}})}return n})();function ut(n,s){1&n&&(t.TgZ(0,"th",24),t._uU(1,"Name "),t.qZA())}function at(n,s){if(1&n&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.name," ")}}function rt(n,s){1&n&&(t.TgZ(0,"th",24),t._uU(1,"City"),t.qZA())}function st(n,s){if(1&n&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.city," ")}}function ct(n,s){1&n&&(t.TgZ(0,"th",24),t._uU(1,"Province/State"),t.qZA())}function lt(n,s){if(1&n&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.provinceState," ")}}function mt(n,s){1&n&&(t.TgZ(0,"th",24),t._uU(1,"Country"),t.qZA())}function dt(n,s){if(1&n&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.country," ")}}function a(n,s){1&n&&(t.TgZ(0,"th",24),t._uU(1,"Email"),t.qZA())}function f(n,s){if(1&n&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&n){const o=s.$implicit;t.xp6(1),t.hij(" ",o.email," ")}}function r(n,s){1&n&&t._UZ(0,"th",24)}function c(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"td",26)(1,"button",27),t.NdJ("click",function(){const _=t.CHM(o).$implicit,y=t.oxw();return t.KtG(y.viewCustomer(_))}),t._UZ(2,"mat-icon",28),t.qZA()()}}function m(n,s){1&n&&t._UZ(0,"tr",29)}function g(n,s){1&n&&t._UZ(0,"tr",30)}function pt(n,s){1&n&&(t.TgZ(0,"div",31),t._UZ(1,"mat-progress-spinner",32),t.qZA())}const ft=[{path:"",component:(()=>{class n{constructor(o){this.store=o,this.displayedColumns=["name","city","provinceState","country","email","actions"],this.dataSource=new p.by,this.customersFullList=[],this.searchParams={customerName:null},this.destroy$=new R.x,this.customers$=this.store.select(e.p6),this.loadingCustomers=!1,this.loading$=this.store.select(e.qX),this.customersFullList$=this.store.select(e.JZ)}ngOnInit(){this.buildForm(),this.loadingCustomers=!0,this.store.dispatch((0,P.Mm)({searchParams:this.searchParams})),this.store.dispatch((0,M.L)()),this.customers$.pipe((0,S.R)(this.destroy$)).subscribe(o=>{o&&(this.dataSource=new p.by(o),this.loadingCustomers=!1,o.length>0&&this.store.dispatch((0,P.Ps)({customerId:o[0].customerId})))}),this.customersFullList$.pipe((0,S.R)(this.destroy$)).subscribe(o=>{o&&(this.customersFullList=o)}),this.loading$.subscribe(o=>{this.loadingCustomers=o})}buildForm(){this.customerForm=new x.cw({customerName:new x.NI("",[])})}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}applyFilter(o){this.dataSource.filter=o.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}filter(){this.setSearchParams(),this.loadingCustomers=!0,this.store.dispatch((0,P.Mm)({searchParams:this.searchParams}))}setSearchParams(){const o=this.customerForm.value;let d={};""!=o.customerName&&(d.customerName=o.customerName),this.searchParams=Object.keys(d).length>0?d:null}clearForm(){this.customerForm.reset(),this.searchParams={customerName:null},this.store.dispatch((0,P.Mm)({searchParams:this.searchParams}))}onFormSubmit(o){o.preventDefault(),this.filter()}viewCustomer(o){this.store.dispatch((0,P.Ps)({customerId:o.customerId}))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(d){return new(d||n)(t.Y36(Z.yh))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-search-customer"]],viewQuery:function(d,u){if(1&d&&(t.Gf(A.NW,5),t.Gf(w.YE,5)),2&d){let _;t.iGM(_=t.CRH())&&(u.paginator=_.first),t.iGM(_=t.CRH())&&(u.sort=_.first)}},decls:41,vars:5,consts:[[1,"container-tab"],[1,"section-search"],["expanded","true",1,"filter-options"],[3,"formGroup","ngSubmit"],[1,"container-filter"],["appearance","outline","color","accent"],["matInput","","formControlName","customerName","placeholder","Enter customer name"],[1,"item-buttons"],["mat-raised-button","","type","button",3,"click"],["mat-raised-button","","color","primary","type","submit"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","city"],["matColumnDef","provinceState"],["matColumnDef","country"],["matColumnDef","email"],["matColumnDef","actions"],["mat-cell","","class","column-actions",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","spinner",4,"ngIf"],[1,"section-view"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-cell","",1,"column-actions"],["mat-icon-button","","aria-label","View tally",3,"click"],["aria-hidden","false","fontIcon","open_in_new","color","accent"],["mat-header-row",""],["mat-row",""],[1,"spinner"],["color","primary","mode","indeterminate"]],template:function(d,u){1&d&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-accordion")(3,"mat-expansion-panel",2)(4,"mat-expansion-panel-header")(5,"mat-panel-title"),t._uU(6,"Filter options"),t.qZA()(),t.TgZ(7,"form",3),t.NdJ("ngSubmit",function(y){return u.onFormSubmit(y)}),t.TgZ(8,"div",4)(9,"mat-form-field",5)(10,"mat-label"),t._uU(11,"Customer Name"),t.qZA(),t._UZ(12,"input",6),t.qZA(),t.TgZ(13,"div",7)(14,"button",8),t.NdJ("click",function(){return u.clearForm()}),t._uU(15,"Clear filters"),t.qZA(),t.TgZ(16,"button",9),t._uU(17,"Filter"),t.qZA()()()()()(),t.TgZ(18,"table",10),t.ynx(19,11),t.YNc(20,ut,2,0,"th",12),t.YNc(21,at,2,1,"td",13),t.BQk(),t.ynx(22,14),t.YNc(23,rt,2,0,"th",12),t.YNc(24,st,2,1,"td",13),t.BQk(),t.ynx(25,15),t.YNc(26,ct,2,0,"th",12),t.YNc(27,lt,2,1,"td",13),t.BQk(),t.ynx(28,16),t.YNc(29,mt,2,0,"th",12),t.YNc(30,dt,2,1,"td",13),t.BQk(),t.ynx(31,17),t.YNc(32,a,2,0,"th",12),t.YNc(33,f,2,1,"td",13),t.BQk(),t.ynx(34,18),t.YNc(35,r,1,0,"th",12),t.YNc(36,c,3,0,"td",19),t.BQk(),t.YNc(37,m,1,0,"tr",20),t.YNc(38,g,1,0,"tr",21),t.qZA(),t.YNc(39,pt,2,0,"div",22),t.qZA(),t._UZ(40,"app-customer-view",23),t.qZA()),2&d&&(t.xp6(7),t.Q6J("formGroup",u.customerForm),t.xp6(11),t.Q6J("dataSource",u.dataSource),t.xp6(19),t.Q6J("matHeaderRowDef",u.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",u.displayedColumns),t.xp6(1),t.Q6J("ngIf",u.loadingCustomers))},dependencies:[C.O5,h.Ou,Y.KE,Y.hX,p.BZ,p.fO,p.as,p.w1,p.Dz,p.nj,p.ge,p.ev,p.XQ,p.Gk,U.a8,J.Hw,I.lW,I.RK,l.Nt,O.pp,O.ib,O.yz,O.yK,x._Y,x.Fj,x.JJ,x.JL,x.sg,x.u,w.YE,w.nU,it],styles:["mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:1rem}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}.container[_ngcontent-%COMP%]{display:flex;align-items:center}.section[_ngcontent-%COMP%]{padding-left:1rem;align-self:flex-start}h4[_ngcontent-%COMP%]{margin:.5rem 1rem .5rem 0}.column-actions[_ngcontent-%COMP%]{width:0}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white}mat-expansion-panel[_ngcontent-%COMP%]{margin:1rem 0}mat-expansion-panel[_ngcontent-%COMP%]   .container-filter[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}mat-expansion-panel[_ngcontent-%COMP%]   .item-buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}mat-expansion-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-right:1rem;width:12rem}mat-expansion-panel[_ngcontent-%COMP%]   .date-field[_ngcontent-%COMP%]{width:auto}mat-expansion-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:1.5rem}table[_ngcontent-%COMP%]{margin-top:1rem}"]})}return n})()}];let Ct=(()=>{class n{static#t=this.\u0275fac=function(d){return new(d||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[k.Bz.forChild(ft),k.Bz]})}return n})();var _t=i(6208);let xt=(()=>{class n{static#t=this.\u0275fac=function(d){return new(d||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[C.ez,v.q,Ct,_t.m]})}return n})()}}]);