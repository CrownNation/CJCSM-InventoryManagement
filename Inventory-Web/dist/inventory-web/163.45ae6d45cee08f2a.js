"use strict";(self.webpackChunkInventory_Web=self.webpackChunkInventory_Web||[]).push([[163],{5163:(Ut,Z,o)=>{o.r(Z),o.d(Z,{PipePropertyWallModule:()=>At});var C=o(6814),f=o(5195),O=o(617),b=o(5940),d=o(5313),W=o(5683),T=o(5986),s=o(6223),l=o(4221),g=o(5154),A=o(2032),U=o(1303),D=o(8645),I=o(2572),h=o(7398),R=o(9773),B=o(8180),j=o(6293);const m="[Pipe Properties Wall]",y=(0,l.PH)(`${m} Get Walls`,(0,l.Ky)()),N=(0,l.PH)(`${m} Get Walls Success`,(0,l.Ky)()),$=(0,l.PH)(`${m} Get Walls Failure`,(0,l.Ky)()),_=(0,l.PH)(`${m} Create PipeProperty_Wall`,(0,l.Ky)()),S=(0,l.PH)(`${m} Create PipeProperty_Wall Success`,(0,l.Ky)()),F=(0,l.PH)(`${m} Create PipeProperty_Wall Error`,(0,l.Ky)()),v=(0,l.PH)(`${m} Update PipeProperty_Wall`,(0,l.Ky)()),Y=(0,l.PH)(`${m} Update PipeProperty_Wall Success`,(0,l.Ky)()),Q=(0,l.PH)(`${m} Update PipeProperty_Wall Error`,(0,l.Ky)()),k=(0,l.PH)(`${m} Reset Wall Notifications`),P=(0,j.H)({sortComparer:function z(e,n){return e.wallMetric-n.wallMetric},selectId:e=>e.pipeProperty_WallId}),V=P.getInitialState({ids:[],entities:{},loadingWalls:!1,errorLoadingWalls:null,creatingWall:!1,createdWall:null,errorCreatingWall:null,updatingWall:!1,updatedWall:null,errorUpdatingWall:null,selectedWall:null,errorLoadingSelectedWall:null}),tt=(0,l.Lq)(V,(0,l.on)(y,e=>({...e,loadingWalls:!0,errorLoadingWalls:null})),(0,l.on)(N,(e,{walls:n})=>P.addMany(n,{...e,loadingWalls:!1,errorLoadingWalls:null})),(0,l.on)($,(e,{errorLoadingWalls:n})=>({...e,loadingWalls:!1,errorLoadingWalls:n})),(0,l.on)(_,e=>({...e,creatingWall:!0,createdWall:null,errorCreatingWall:null})),(0,l.on)(S,(e,{wall:n})=>P.addOne(n,{...e,creatingWall:!1,createdWall:n,errorCreatingWall:null})),(0,l.on)(F,(e,{errorCreatingWall:n})=>({...e,creatingWall:!1,errorCreatingWall:n})),(0,l.on)(v,e=>({...e,updatingWall:!0,errorUpdatingWall:null})),(0,l.on)(Y,(e,{id:n,wall:r})=>P.updateOne({id:n,changes:r},{...e,updatingWall:!1,updatedWall:r,errorUpdatingWall:null})),(0,l.on)(Q,(e,{errorUpdatingWall:n})=>({...e,updatingWall:!1,errorUpdatingWall:n})),(0,l.on)(k,e=>({...e,createdWall:null,updatedWall:null,errorLoadingWalls:null,errorCreatingWall:null,errorUpdatingWall:null})));function et(e,n){return tt(e,n)}const{selectEntities:lt,selectAll:nt}=P.getSelectors(),p=(0,l.ZF)("pipeProperty_Wall"),at=((0,l.P1)(p,e=>e),(0,l.P1)(p,nt)),rt=((0,l.P1)(p,lt),(0,l.P1)(p,e=>e.loadingWalls)),q=(0,l.P1)(p,e=>e.errorLoadingWalls),E=((0,l.P1)(p,e=>e.creatingWall),(0,l.P1)(p,e=>e.createdWall)),J=(0,l.P1)(p,e=>e.errorCreatingWall),L=((0,l.P1)(p,e=>e.selectedWall),(0,l.P1)(p,e=>e.errorLoadingSelectedWall)),H=((0,l.P1)(p,e=>e.updatingWall),(0,l.P1)(p,e=>e.updatedWall));(0,l.P1)(p,e=>e.errorUpdatingWall);var t=o(5879);function ot(e,n){1&e&&(t.TgZ(0,"th",28),t._uU(1,"Wall Metric (cm)"),t.qZA())}function it(e,n){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const r=n.$implicit;t.xp6(1),t.Oqu(r.wallMetric)}}function ct(e,n){1&e&&(t.TgZ(0,"th",28),t._uU(1,"Wall Imperial (inches)"),t.qZA())}function st(e,n){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const r=n.$implicit;t.xp6(1),t.Oqu(r.wallImperial)}}function pt(e,n){1&e&&(t.TgZ(0,"th",28),t._uU(1,"Is Active"),t.qZA())}function dt(e,n){1&e&&(t.TgZ(0,"mat-icon",32),t._uU(1,"check"),t.qZA())}function mt(e,n){1&e&&(t.TgZ(0,"mat-icon",33),t._uU(1,"close"),t.qZA())}function ut(e,n){if(1&e&&(t.TgZ(0,"td",29),t.YNc(1,dt,2,0,"mat-icon",30),t.YNc(2,mt,2,0,"ng-template",null,31,t.W1O),t.qZA()),2&e){const r=n.$implicit,i=t.MAs(3);t.xp6(1),t.Q6J("ngIf",r.isActive)("ngIfElse",i)}}function gt(e,n){1&e&&(t.TgZ(0,"th",34),t._uU(1,"Edit"),t.qZA())}function ft(e,n){if(1&e){const r=t.EpF();t.TgZ(0,"td",29)(1,"button",35),t.NdJ("click",function(){const c=t.CHM(r).$implicit,u=t.oxw();return t.KtG(u.selectWall(c))}),t._UZ(2,"mat-icon",36),t.qZA()()}}function ht(e,n){1&e&&t._UZ(0,"tr",37)}function Pt(e,n){1&e&&t._UZ(0,"tr",38)}function Wt(e,n){1&e&&(t.TgZ(0,"div",39),t._UZ(1,"mat-progress-spinner",40),t.qZA())}function Ct(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Wall in metric is required. "),t.qZA())}function yt(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," The value must be a non-negative number. "),t.qZA())}function _t(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Wall in imperial is required. "),t.qZA())}function vt(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," The value must be a non-negative number. "),t.qZA())}function wt(e,n){if(1&e&&(t.TgZ(0,"div",41),t._uU(1),t.qZA()),2&e){const r=n.ngIf;t.xp6(1),t.hij(" ",r," ")}}function Mt(e,n){1&e&&(t.TgZ(0,"div",42),t._uU(1," Wall created successfully! "),t.qZA())}function xt(e,n){1&e&&(t.TgZ(0,"div",42),t._uU(1," Wall updated successfully! "),t.qZA())}const Zt=[{path:"",component:(()=>{class e{constructor(r,i){this.store=r,this.fb=i,this.displayedColumns=["wallMetric","wallImperial","isActive","actions"],this.editingWall=null,this.destroy$=new D.x,this.wallForm=this.fb.group({wallMetric:["",[s.kI.required,s.kI.pattern(/^\d+(\.\d{1,3})?$/)]],wallImperial:["",[s.kI.required,s.kI.pattern(/^\d+(\.\d{1,3})?$/)]],isActive:[!0,s.kI.required]}),this.dataSource=new d.by([]),this.errorMessage$=(0,I.a)([this.store.select(q),this.store.select(J),this.store.select(L)]).pipe((0,h.U)(([a,c,u])=>a||c||u?"An error occurred":"")),this.isWallCreated$=this.store.select(E).pipe((0,h.U)(a=>!!a)),this.isWallUpdated$=this.store.select(H).pipe((0,h.U)(a=>!!a))}ngOnInit(){this.loadingWalls$=this.store.select(rt),this.store.dispatch(y({searchParams:null})),this.store.pipe((0,l.Ys)(at),(0,R.R)(this.destroy$)).subscribe(r=>this.dataSource.data=r)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.loadingWallsSubscription&&this.loadingWallsSubscription.unsubscribe(),this.checkAndResetNotifications()}selectWall(r){this.editingWall=r,this.wallForm.patchValue(r),this.checkAndResetNotifications()}checkAndResetNotifications(){(0,I.a)([this.store.select(E),this.store.select(H),this.store.select(q),this.store.select(J),this.store.select(L)]).pipe((0,B.q)(1)).subscribe(([r,i,a,c,u])=>{(r||i||a||c||u)&&this.store.dispatch(k())})}saveOrUpdateWall(){if(this.editingWall){const i={...this.editingWall,...this.wallForm.value};this.store.dispatch(v({id:this.editingWall.pipeProperty_WallId,wall:i}))}else this.store.dispatch(_({wallCreate:this.wallForm.value}));this.resetForm()}resetForm(){this.editingWall=null,this.wallForm.reset({wallMetric:"",wallImperial:"",isActive:!0}),this.checkAndResetNotifications()}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(l.yh),t.Y36(s.qu))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-pipe-property-wall"]],decls:58,vars:23,consts:[[1,"container-tab"],[1,"section"],["mat-table","","matSort","",1,"myTable",3,"dataSource"],["matColumnDef","wallMetric"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","wallImperial"],["matColumnDef","isActive"],["matColumnDef","actions"],["mat-header-cell","","mat-sort-header","","class","center-text",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","small-element",4,"matRowDef","matRowDefColumns"],["class","spinner",4,"ngIf"],[1,"editor-card"],[1,"wall-form",3,"formGroup"],[1,"widget-container",2,"flex-direction","column"],["appearance","fill",1,"full-width-input"],["matInput","","formControlName","wallMetric","type","number","min","0","step","0.001"],[4,"ngIf"],["matInput","","formControlName","wallImperial","type","number","min","0","step","0.001"],["formControlName","isActive"],[1,"checkbox-label"],[1,"messages-container"],["class","error-message",4,"ngIf"],["class","alert alert-success",4,"ngIf"],[1,"item-buttons"],["mat-raised-button","",3,"disabled","click"],["mat-raised-button","",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["class","isActive-icon",4,"ngIf","ngIfElse"],["inactiveIcon",""],[1,"isActive-icon"],[1,"isInactive-icon"],["mat-header-cell","","mat-sort-header","",1,"center-text"],["aria-label","View Wall",1,"item-buttons",3,"click"],["aria-hidden","false","fontIcon","open_in_new","color","accent"],["mat-header-row",""],["mat-row","",1,"small-element"],[1,"spinner"],["color","primary","mode","indeterminate"],[1,"error-message"],[1,"alert","alert-success"]],template:function(i,a){if(1&i&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title"),t._uU(4,"Wall - Pipe Property"),t.qZA()(),t.TgZ(5,"mat-card-content")(6,"table",2),t.ynx(7,3),t.YNc(8,ot,2,0,"th",4),t.YNc(9,it,2,1,"td",5),t.BQk(),t.ynx(10,6),t.YNc(11,ct,2,0,"th",4),t.YNc(12,st,2,1,"td",5),t.BQk(),t.ynx(13,7),t.YNc(14,pt,2,0,"th",4),t.YNc(15,ut,4,2,"td",5),t.BQk(),t.ynx(16,8),t.YNc(17,gt,2,0,"th",9),t.YNc(18,ft,3,0,"td",5),t.BQk(),t.YNc(19,ht,1,0,"tr",10),t.YNc(20,Pt,1,0,"tr",11),t.qZA(),t.YNc(21,Wt,2,0,"div",12),t.ALo(22,"async"),t.qZA()(),t.TgZ(23,"mat-card",13)(24,"mat-card-header")(25,"mat-card-title"),t._uU(26),t.qZA()(),t.TgZ(27,"mat-card-content")(28,"form",14)(29,"div",15)(30,"mat-form-field",16)(31,"mat-label"),t._uU(32,"Wall Metric (cm)"),t.qZA(),t._UZ(33,"input",17),t.YNc(34,Ct,2,0,"mat-error",18),t.YNc(35,yt,2,0,"mat-error",18),t.qZA(),t.TgZ(36,"mat-form-field",16)(37,"mat-label"),t._uU(38,"Wall Imperial (inches)"),t.qZA(),t._UZ(39,"input",19),t.YNc(40,_t,2,0,"mat-error",18),t.YNc(41,vt,2,0,"mat-error",18),t.qZA(),t.TgZ(42,"mat-checkbox",20)(43,"div",21),t._uU(44,"Is Active"),t.qZA()()(),t.TgZ(45,"div",22),t.YNc(46,wt,2,1,"div",23),t.ALo(47,"async"),t.YNc(48,Mt,2,0,"div",24),t.ALo(49,"async"),t.YNc(50,xt,2,0,"div",24),t.ALo(51,"async"),t.qZA()()(),t.TgZ(52,"mat-card-actions")(53,"div",25)(54,"button",26),t.NdJ("click",function(){return a.saveOrUpdateWall()}),t._uU(55),t.qZA(),t.TgZ(56,"button",27),t.NdJ("click",function(){return a.resetForm()}),t._uU(57,"Cancel"),t.qZA()()()()()),2&i){let c,u,G,K;t.xp6(6),t.Q6J("dataSource",a.dataSource),t.xp6(13),t.Q6J("matHeaderRowDef",a.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",a.displayedColumns),t.xp6(1),t.Q6J("ngIf",t.lcZ(22,15,a.loadingWalls$)),t.xp6(5),t.Oqu(a.editingWall?"Edit Wall":"Create New Wall"),t.xp6(2),t.Q6J("formGroup",a.wallForm),t.xp6(6),t.Q6J("ngIf",null==(c=a.wallForm.get("wallMetric"))?null:c.hasError("required")),t.xp6(1),t.Q6J("ngIf",null==(u=a.wallForm.get("wallMetric"))?null:u.hasError("min")),t.xp6(5),t.Q6J("ngIf",null==(G=a.wallForm.get("wallImperial"))?null:G.hasError("required")),t.xp6(1),t.Q6J("ngIf",null==(K=a.wallForm.get("wallImperial"))?null:K.hasError("min")),t.xp6(5),t.Q6J("ngIf",t.lcZ(47,17,a.errorMessage$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(49,19,a.isWallCreated$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(51,21,a.isWallUpdated$)),t.xp6(4),t.Q6J("disabled",!a.wallForm.valid),t.xp6(1),t.hij(" ",a.editingWall?"Update":"Create"," ")}},dependencies:[C.O5,f.a8,f.hq,f.dn,f.dk,f.n5,O.Hw,b.Ou,d.BZ,d.fO,d.as,d.w1,d.Dz,d.nj,d.ge,d.ev,d.XQ,d.Gk,W.KE,W.hX,W.TO,T.oG,s._Y,s.Fj,s.wV,s.JJ,s.JL,s.qQ,s.sg,s.u,A.Nt,C.Ov],styles:[".center-text[_ngcontent-%COMP%]{text-align:center}.messages-container[_ngcontent-%COMP%]{margin-top:0}.error-message[_ngcontent-%COMP%], .alert.alert-success[_ngcontent-%COMP%]{margin-bottom:5px}.error-message[_ngcontent-%COMP%]{color:#961b0f;font-weight:700}.alert.alert-success[_ngcontent-%COMP%]{color:#19806f;font-weight:700}.container-tab[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:flex-start}.widget-container[_ngcontent-%COMP%]{display:flex;flex-direction:row}.section[_ngcontent-%COMP%], .editor-card[_ngcontent-%COMP%]{flex:1;margin:1rem}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white}.category-form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.full-width-input[_ngcontent-%COMP%]{width:100%}.error-message[_ngcontent-%COMP%]{color:#d32f2f;margin-top:20px}.isActive-icon[_ngcontent-%COMP%]{color:green}.isInactive-icon[_ngcontent-%COMP%]{color:red}.item-buttons[_ngcontent-%COMP%]{width:100%;text-align:center;border:0;background-color:transparent}.item-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:medium;margin-bottom:1rem}.item-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child{margin-right:8px}.mat-card-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.mat-card-actions[_ngcontent-%COMP%]{margin-top:auto}.mat-card[_ngcontent-%COMP%]{text-align:center}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:.5rem}mat-card-title[_ngcontent-%COMP%], h1[_ngcontent-%COMP%]{font-weight:500;font-size:1.4rem}mat-form-field[_ngcontent-%COMP%]{display:block}@media (max-width: 768px){.section[_ngcontent-%COMP%], .category-editor-card[_ngcontent-%COMP%]{width:calc(100% - 2rem)}}.mat-mdc-header-row.mdc-data-table__header-row[_ngcontent-%COMP%], .mat-mdc-header-row.mdc-data-table__header-row[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]{padding-top:4px;padding-bottom:4px;height:auto;line-height:normal}.myTable[_ngcontent-%COMP%]{width:100%;table-layout:fixed}.myTable[_ngcontent-%COMP%]   .mat-mdc-header-row[_ngcontent-%COMP%], .myTable[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]{white-space:nowrap;width:100%;box-sizing:border-box;background-color:#fff}.myTable[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;height:1.5rem;width:1.5rem;line-height:1.5rem}.myTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd){background-color:#f2f2f2}.myTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#fff}.small-element[_ngcontent-%COMP%]{height:30px;min-height:30px}.mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-layout[_ngcontent-%COMP%]{width:auto}.mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-label[_ngcontent-%COMP%]{white-space:nowrap}.checkbox-label[_ngcontent-%COMP%]{width:auto;white-space:nowrap}"]})}return e})()}];let Ot=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#l=this.\u0275inj=t.cJS({imports:[U.Bz.forChild(Zt),U.Bz]})}return e})();var w=o(4664),M=o(6306),x=o(2096),bt=o(1767);let Tt=(()=>{class e{constructor(r,i){this.actions$=r,this.pipePropertiesService=i,this.loadWalls$=(0,g.GW)(()=>this.actions$.pipe((0,g.l4)(y),(0,w.w)(({searchParams:a})=>this.pipePropertiesService.getWall(a).pipe((0,h.U)(c=>N({walls:c})),(0,M.K)(c=>(0,x.of)($({errorLoadingWalls:c}))))))),this.createWall$=(0,g.GW)(()=>this.actions$.pipe((0,g.l4)(_),(0,w.w)(({wallCreate:a})=>this.pipePropertiesService.createWall(a).pipe((0,h.U)(c=>S({wall:c})),(0,M.K)(c=>(0,x.of)(F({errorCreatingWall:c}))))))),this.updateWall$=(0,g.GW)(()=>this.actions$.pipe((0,g.l4)(v),(0,w.w)(({id:a,wall:c})=>this.pipePropertiesService.updateWall(a,c).pipe((0,h.U)(()=>Y({id:a,wall:c})),(0,M.K)(u=>(0,x.of)(Q({errorUpdatingWall:u})))))))}static#t=this.\u0275fac=function(i){return new(i||e)(t.LFG(g.eX),t.LFG(bt.Q))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac})}return e})(),At=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#l=this.\u0275inj=t.cJS({imports:[C.ez,Ot,f.QW,O.Ps,b.Cq,d.p0,W.lN,T.p9,s.UX,s.u5,A.c,l.Aw.forFeature("pipeProperty_Wall",et),g.sQ.forFeature([Tt])]})}return e})()}}]);