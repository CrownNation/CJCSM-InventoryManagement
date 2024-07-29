"use strict";(self.webpackChunkInventory_Web=self.webpackChunkInventory_Web||[]).push([[592],{5124:(M,C,n)=>{n.d(C,{g:()=>t});var e=n(5879),c=n(2939);let t=(()=>{class p{constructor(s,m){this.snackBar=s,this.zone=m}default(s){this.show(s,{duration:2e3,panelClass:"default-notification-overlay"})}info(s){this.show(s,{duration:2e3,panelClass:"info-notification-overlay"})}success(s){this.show(s,{duration:2e3,panelClass:["success-notification-overlay"]})}warn(s){this.show(s,{duration:2500,panelClass:"warning-notification-overlay"})}error(s){this.show(s,{duration:5e3,panelClass:"error-notification-overlay"})}show(s,m){this.zone.run(()=>this.snackBar.open(s,void 0,m))}static#t=this.\u0275fac=function(m){return new(m||p)(e.LFG(c.ux),e.LFG(e.R0b))};static#e=this.\u0275prov=e.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"})}return p})()},1122:(M,C,n)=>{n.r(C),n.d(C,{PipeModule:()=>A});var e=n(6814),c=n(1303),t=n(5879),p=n(1476),l=n(3566),s=n(5313),m=n(7700),_=n(4221),u=n(5195),h=n(617),f=n(2296);function L(a,k){1&a&&(t.TgZ(0,"th",12),t._uU(1," Pipe Coating "),t.qZA())}function R(a,k){if(1&a&&(t.TgZ(0,"td",13),t._uU(1),t.qZA()),2&a){const g=k.$implicit;t.xp6(1),t.hij(" ",g.pipeCoating," ")}}function E(a,k){1&a&&t._UZ(0,"th",12)}function i(a,k){if(1&a){const g=t.EpF();t.TgZ(0,"td",14)(1,"button",15),t.NdJ("click",function(){const S=t.CHM(g).$implicit,Z=t.oxw();return t.KtG(Z.editCoating(S))}),t._UZ(2,"mat-icon",16),t.qZA()()}}function y(a,k){1&a&&t._UZ(0,"tr",17)}function v(a,k){1&a&&t._UZ(0,"tr",18)}const r=function(){return[5,10,25,100]};let O=(()=>{class a{constructor(g,d){this.dialog=g,this.store=d,this.displayedColumns=["pipeCoating","actions"],this.dataSource=new s.by,this.pipeCoatings=[{pipeCoatingId:"ExternalFBE",pipeCoating:"External Fusion Bonded Epoxy"},{pipeCoatingId:"InternalFBE",pipeCoating:"Internal Fusion Bonded Epoxy"},{pipeCoatingId:"External3LPE",pipeCoating:"External 3 Layer Polyethylene"},{pipeCoatingId:"Internal3LPE",pipeCoating:"Internal 3 Layer Polyethylene"},{pipeCoatingId:"External3LPP",pipeCoating:"External 3 Layer Polypropylene"}]}ngOnInit(){console.log("pipe coating list init"),this.dataSource=new s.by(this.pipeCoatings)}addPipeCoating(){console.log("add coating")}editCoating(g){console.log("edit coating")}static#t=this.\u0275fac=function(d){return new(d||a)(t.Y36(m.uw),t.Y36(_.yh))};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["app-pipe-coating-list"]],viewQuery:function(d,P){if(1&d&&(t.Gf(p.NW,5),t.Gf(l.YE,5)),2&d){let S;t.iGM(S=t.CRH())&&(P.paginator=S.first),t.iGM(S=t.CRH())&&(P.sort=S.first)}},decls:17,vars:5,consts:[[1,"section"],["mat-icon-button","","aria-label","Add rack",1,"btn-add",3,"click"],["aria-hidden","false","fontIcon","add","color","accent"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","pipeCoating"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","actions"],["mat-cell","","class","column-actions",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page of users",3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-cell","",1,"column-actions"],["mat-icon-button","","aria-label","Edit rack","matToolTip","Edit",3,"click"],["aria-hidden","false","fontIcon","edit","color","accent"],["mat-header-row",""],["mat-row",""]],template:function(d,P){1&d&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),t._uU(3,"Pipe Coatings"),t.qZA(),t.TgZ(4,"button",1),t.NdJ("click",function(){return P.addPipeCoating()}),t._UZ(5,"mat-icon",2),t.qZA()(),t.TgZ(6,"mat-card-content")(7,"table",3),t.ynx(8,4),t.YNc(9,L,2,0,"th",5),t.YNc(10,R,2,1,"td",6),t.BQk(),t.ynx(11,7),t.YNc(12,E,1,0,"th",5),t.YNc(13,i,3,0,"td",8),t.BQk(),t.YNc(14,y,1,0,"tr",9),t.YNc(15,v,1,0,"tr",10),t.qZA(),t._UZ(16,"mat-paginator",11),t.qZA()()),2&d&&(t.xp6(7),t.Q6J("dataSource",P.dataSource),t.xp6(7),t.Q6J("matHeaderRowDef",P.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",P.displayedColumns),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(4,r)))},dependencies:[l.YE,l.nU,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.ge,s.ev,s.XQ,s.Gk,p.NW,u.a8,u.dn,u.dk,u.n5,h.Hw,f.RK],styles:["mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:1rem}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}.container[_ngcontent-%COMP%]{display:flex;align-items:center}h4[_ngcontent-%COMP%]{margin:.5rem 1rem .5rem 0}.column-actions[_ngcontent-%COMP%]{width:0}"]})}return a})();const o=[{path:"",component:(()=>{class a{static#t=this.\u0275fac=function(d){return new(d||a)};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["app-pipe-config"]],decls:2,vars:0,consts:[[1,"container"],[1,"section"]],template:function(d,P){1&d&&(t.TgZ(0,"div",0),t._UZ(1,"app-pipe-coating-list",1),t.qZA())},dependencies:[O],styles:[".section[_ngcontent-%COMP%]{margin:1rem;width:45%;flex:1 1 auto}.container[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;padding:1rem}"]})}return a})()}];let D=(()=>{class a{static#t=this.\u0275fac=function(d){return new(d||a)};static#e=this.\u0275mod=t.oAB({type:a});static#o=this.\u0275inj=t.cJS({imports:[c.Bz.forChild(o),c.Bz]})}return a})();var F=n(6208),x=n(5789);let A=(()=>{class a{static#t=this.\u0275fac=function(d){return new(d||a)};static#e=this.\u0275mod=t.oAB({type:a});static#o=this.\u0275inj=t.cJS({imports:[e.ez,D,F.m,x.q]})}return a})()},4031:(M,C,n)=>{n.d(C,{HY:()=>E,JZ:()=>O,W8:()=>y,Y:()=>v,oY:()=>r,p6:()=>f,qX:()=>L});var e=n(4221),c=n(4820),t=n(1783);const{selectEntities:p,selectAll:l}=t.DB.getSelectors(),s=(0,e.ZF)("customer"),h=((0,e.P1)(s,({entities:o})=>Object.values(o)),(0,e.P1)(c.k8,o=>o),(0,e.P1)(c.k8,l),(0,e.P1)(c.k8,p)),f=(0,e.P1)(h,o=>Object.values(o)),L=(0,e.P1)(c.k8,o=>o.loadingCustomers),E=((0,e.P1)(c.k8,o=>o.errorLoadingCustomers),(0,e.P1)(c.k8,o=>o.selectedCustomer)),y=((0,e.P1)(c.k8,o=>o.errorLoadingSelectedCustomer),(0,e.P1)(c.k8,o=>o.creatingCustomer)),v=(0,e.P1)(c.k8,o=>o.createdCustomer),r=(0,e.P1)(c.k8,o=>o.errorCreatingCustomer),O=(0,e.P1)(c.k8,o=>o.customersFullList);(0,e.P1)(c.k8,o=>o.errorLoadingCustomersList)},2036:(M,C,n)=>{n.d(C,{N$:()=>R,QG:()=>_,Ql:()=>E,Ry:()=>f,Sl:()=>h,b3:()=>t,h3:()=>m,se:()=>L,us:()=>s,x8:()=>u});var e=n(4221);const c=(0,e.ZF)("pipeProperties"),t=(0,e.P1)(c,i=>i.pipeProperties),s=((0,e.P1)(c,i=>i.loadingProperties),(0,e.P1)(c,i=>i.errorLoadingProperties),(0,e.P1)(t,i=>i?.categories??[])),m=(0,e.P1)(t,i=>i?.coatings??[]),_=(0,e.P1)(t,i=>i?.conditions??[]),u=(0,e.P1)(t,i=>i?.grades??[]),h=(0,e.P1)(t,i=>i?.ranges??[]),f=(0,e.P1)(t,i=>i?.sizes??[]),L=(0,e.P1)(t,i=>i?.threads??[]),R=(0,e.P1)(t,i=>i?.walls??[]),E=(0,e.P1)(t,i=>i?.weights??[])},8577:(M,C,n)=>{n.d(C,{A2:()=>O,ME:()=>f,RL:()=>y,SQ:()=>E,V:()=>v,dv:()=>i,zV:()=>L});var e=n(4221),c=n(9145),t=n(4820);const{selectEntities:p,selectAll:l}=c.S0.getSelectors(),s=(0,e.ZF)("rack"),h=((0,e.P1)(s,({entities:o})=>Object.values(o)),(0,e.P1)(t.FS,o=>o),(0,e.P1)(t.FS,l),(0,e.P1)(t.FS,p)),f=(0,e.P1)(h,o=>Object.values(o)),L=(0,e.P1)(t.FS,o=>o.loadingRacks),E=((0,e.P1)(t.FS,o=>o.errorLoadingRacks),(0,e.P1)(t.FS,o=>o.creatingRack)),i=(0,e.P1)(t.FS,o=>o.createdRack),y=(0,e.P1)(t.FS,o=>o.errorCreatingRack),v=(0,e.P1)(t.FS,o=>o.selectedRack),O=((0,e.P1)(t.FS,o=>o.errorLoadingSelectedRack),(0,e.P1)(t.FS,o=>o.racksWithTiers));(0,e.P1)(t.FS,o=>o.errorLoadingRacksWithTiers)},4124:(M,C,n)=>{n.d(C,{ST:()=>m});var e=n(4221),c=n(4137);const{selectEntities:t,selectAll:p}=c.h3.getSelectors(),l=(0,e.ZF)("shopLocation"),m=((0,e.P1)(l,r=>r),(0,e.P1)(l,p));(0,e.P1)(l,t),(0,e.P1)(l,r=>r.loadingShopLocations),(0,e.P1)(l,r=>r.errorLoadingShopLocations),(0,e.P1)(l,r=>r.creatingShopLocation),(0,e.P1)(l,r=>r.selectedShopLocation),(0,e.P1)(l,r=>r.errorCreatingShopLocation),(0,e.P1)(l,r=>r.selectedShopLocation),(0,e.P1)(l,r=>r.errorLoadingSelectedShopLocation),(0,e.P1)(l,r=>r.shopLocationsList),(0,e.P1)(l,r=>r.errorLoadingShopLocationsList)}}]);