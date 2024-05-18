"use strict";(self.webpackChunkInventory_Web=self.webpackChunkInventory_Web||[]).push([[14],{5014:(st,M,n)=>{n.r(M),n.d(M,{PipePropertyCategoryModule:()=>ct});var f=n(6814),h=n(5195),O=n(617),b=n(5940),d=n(5313),u=n(5683),Z=n(5986),p=n(6223),i=n(4221),m=n(5154),A=n(2032),T=n(1303),J=n(8645),_=n(2572),y=n(7398),Y=n(9773),Q=n(8180),w=n(4472);const{selectEntities:k,selectAll:D}=w.Hb.getSelectors(),l=(0,i.ZF)("pipeProperty_Category"),E=((0,i.P1)(l,e=>e),(0,i.P1)(l,D)),R=((0,i.P1)(l,k),(0,i.P1)(l,e=>e.loadingCategories)),U=(0,i.P1)(l,e=>e.errorCreatingCategory),N=((0,i.P1)(l,e=>e.creatingCategory),(0,i.P1)(l,e=>e.createdCategory)),I=(0,i.P1)(l,e=>e.errorCreatingCategory),F=((0,i.P1)(l,e=>e.selectedCategory),(0,i.P1)(l,e=>e.errorLoadingSelectedCategory)),$=((0,i.P1)(l,e=>e.updatingCategory),(0,i.P1)(l,e=>e.updatedCategory));(0,i.P1)(l,e=>e.errorUpdatingCategory);var g=n(8609),t=n(5879);function L(e,c){1&e&&(t.TgZ(0,"th",25),t._uU(1,"Name"),t.qZA())}function j(e,c){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const r=c.$implicit;t.xp6(1),t.hij(" ",r.name," ")}}function B(e,c){1&e&&(t.TgZ(0,"th",25),t._uU(1,"Is Active"),t.qZA())}function z(e,c){1&e&&(t.TgZ(0,"mat-icon",29),t._uU(1,"check"),t.qZA())}function G(e,c){1&e&&(t.TgZ(0,"mat-icon",30),t._uU(1,"close"),t.qZA())}function H(e,c){if(1&e&&(t.TgZ(0,"td",26),t.YNc(1,z,2,0,"mat-icon",27),t.YNc(2,G,2,0,"ng-template",null,28,t.W1O),t.qZA()),2&e){const r=c.$implicit,a=t.MAs(3);t.xp6(1),t.Q6J("ngIf",r.isActive)("ngIfElse",a)}}function W(e,c){1&e&&(t.TgZ(0,"th",31),t._uU(1,"Edit"),t.qZA())}function K(e,c){if(1&e){const r=t.EpF();t.TgZ(0,"td",26)(1,"button",32),t.NdJ("click",function(){const s=t.CHM(r).$implicit,C=t.oxw();return t.KtG(C.selectCategory(s))}),t._UZ(2,"mat-icon",33),t.qZA()()}}function X(e,c){1&e&&t._UZ(0,"tr",34)}function V(e,c){1&e&&t._UZ(0,"tr",35)}function q(e,c){1&e&&(t.TgZ(0,"div",36),t._UZ(1,"mat-progress-spinner",37),t.qZA())}function tt(e,c){if(1&e&&(t.TgZ(0,"div",38),t._uU(1),t.qZA()),2&e){const r=c.ngIf;t.xp6(1),t.hij(" ",r," ")}}function et(e,c){1&e&&(t.TgZ(0,"div",39),t._uU(1," Category created successfully! "),t.qZA())}function ot(e,c){1&e&&(t.TgZ(0,"div",39),t._uU(1," Category updated successfully! "),t.qZA())}const nt=[{path:"",component:(()=>{class e{constructor(r,a){this.store=r,this.fb=a,this.displayedColumns=["name","isActive","actions"],this.editingCategory=null,this.destroy$=new J.x,this.categoryForm=this.fb.group({name:["",p.kI.required],isActive:[!0,p.kI.required]}),this.dataSource=new d.by([]),this.errorMessage$=(0,_.a)([this.store.select(U),this.store.select(I),this.store.select(F)]).pipe((0,y.U)(([o,s,C])=>o||s||C?"An error occurred":"")),this.isCategoryCreated$=this.store.select(N).pipe((0,y.U)(o=>!!o)),this.isCategoryUpdated$=this.store.select($).pipe((0,y.U)(o=>!!o))}ngOnInit(){this.loadingCategories$=this.store.select(R),this.store.dispatch((0,g.D)({searchParams:null})),this.store.pipe((0,i.Ys)(E),(0,Y.R)(this.destroy$)).subscribe(r=>this.dataSource.data=r)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.loadingCategoriesSubscription&&this.loadingCategoriesSubscription.unsubscribe(),this.checkAndResetNotifications()}selectCategory(r){this.editingCategory=r,this.categoryForm.patchValue(r),this.checkAndResetNotifications()}checkAndResetNotifications(){(0,_.a)([this.store.select(N),this.store.select($),this.store.select(U),this.store.select(I),this.store.select(F)]).pipe((0,Q.q)(1)).subscribe(([r,a,o,s,C])=>{(r||a||o||s||C)&&this.store.dispatch((0,g.D2)())})}saveOrUpdateCategory(){if(this.editingCategory){const a={...this.editingCategory,...this.categoryForm.value};this.store.dispatch((0,g.VT)({id:this.editingCategory.pipeProperty_CategoryId,category:a}))}else this.store.dispatch((0,g.RB)({categoryCreate:this.categoryForm.value}));this.resetForm()}resetForm(){this.editingCategory=null,this.categoryForm.reset({name:"",isActive:!0}),this.checkAndResetNotifications()}static#t=this.\u0275fac=function(a){return new(a||e)(t.Y36(i.yh),t.Y36(p.qu))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-pipe-property-category"]],decls:47,vars:19,consts:[[1,"container-tab"],[1,"section"],["mat-table","","matSort","",1,"myTable",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isActive"],["matColumnDef","actions"],["mat-header-cell","","mat-sort-header","","class","center-text",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","small-element",4,"matRowDef","matRowDefColumns"],["class","spinner",4,"ngIf"],[1,"editor-card"],[1,"category-form",3,"formGroup"],[1,"widget-container"],["appearance","fill",1,"full-width-input"],["matInput","","formControlName","name"],["formControlName","isActive"],[1,"checkbox-label"],[1,"messages-container"],["class","error-message",4,"ngIf"],["class","alert alert-success",4,"ngIf"],[1,"item-buttons"],["mat-raised-button","",3,"disabled","click"],["mat-raised-button","",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["class","isActive-icon",4,"ngIf","ngIfElse"],["inactiveIcon",""],[1,"isActive-icon"],[1,"isInactive-icon"],["mat-header-cell","","mat-sort-header","",1,"center-text"],["aria-label","View Category",1,"item-buttons",3,"click"],["aria-hidden","false","fontIcon","open_in_new","color","accent"],["mat-header-row",""],["mat-row","",1,"small-element"],[1,"spinner"],["color","primary","mode","indeterminate"],[1,"error-message"],[1,"alert","alert-success"]],template:function(a,o){1&a&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title"),t._uU(4,"Category - Pipe Property"),t.qZA()(),t.TgZ(5,"mat-card-content")(6,"table",2),t.ynx(7,3),t.YNc(8,L,2,0,"th",4),t.YNc(9,j,2,1,"td",5),t.BQk(),t.ynx(10,6),t.YNc(11,B,2,0,"th",4),t.YNc(12,H,4,2,"td",5),t.BQk(),t.ynx(13,7),t.YNc(14,W,2,0,"th",8),t.YNc(15,K,3,0,"td",5),t.BQk(),t.YNc(16,X,1,0,"tr",9),t.YNc(17,V,1,0,"tr",10),t.qZA(),t.YNc(18,q,2,0,"div",11),t.ALo(19,"async"),t.qZA()(),t.TgZ(20,"mat-card",12)(21,"mat-card-header")(22,"mat-card-title"),t._uU(23),t.qZA()(),t.TgZ(24,"mat-card-content")(25,"form",13)(26,"div",14)(27,"mat-form-field",15)(28,"mat-label"),t._uU(29,"Name"),t.qZA(),t._UZ(30,"input",16),t.qZA(),t.TgZ(31,"mat-checkbox",17)(32,"div",18),t._uU(33,"Is Active"),t.qZA()()(),t.TgZ(34,"div",19),t.YNc(35,tt,2,1,"div",20),t.ALo(36,"async"),t.YNc(37,et,2,0,"div",21),t.ALo(38,"async"),t.YNc(39,ot,2,0,"div",21),t.ALo(40,"async"),t.qZA()()(),t.TgZ(41,"mat-card-actions")(42,"div",22)(43,"button",23),t.NdJ("click",function(){return o.saveOrUpdateCategory()}),t._uU(44),t.qZA(),t.TgZ(45,"button",24),t.NdJ("click",function(){return o.resetForm()}),t._uU(46,"Cancel"),t.qZA()()()()()),2&a&&(t.xp6(6),t.Q6J("dataSource",o.dataSource),t.xp6(10),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(1),t.Q6J("ngIf",t.lcZ(19,11,o.loadingCategories$)),t.xp6(5),t.Oqu(o.editingCategory?"Edit Category":"Create New Category"),t.xp6(2),t.Q6J("formGroup",o.categoryForm),t.xp6(10),t.Q6J("ngIf",t.lcZ(36,13,o.errorMessage$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(38,15,o.isCategoryCreated$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(40,17,o.isCategoryUpdated$)),t.xp6(4),t.Q6J("disabled",!o.categoryForm.valid),t.xp6(1),t.hij(" ",o.editingCategory?"Update":"Create"," "))},dependencies:[f.O5,h.a8,h.hq,h.dn,h.dk,h.n5,O.Hw,b.Ou,d.BZ,d.fO,d.as,d.w1,d.Dz,d.nj,d.ge,d.ev,d.XQ,d.Gk,u.KE,u.hX,Z.oG,p._Y,p.Fj,p.JJ,p.JL,p.sg,p.u,A.Nt,f.Ov],styles:[".center-text[_ngcontent-%COMP%]{text-align:center}.messages-container[_ngcontent-%COMP%]{margin-top:0}.error-message[_ngcontent-%COMP%], .alert.alert-success[_ngcontent-%COMP%]{margin-bottom:5px}.error-message[_ngcontent-%COMP%]{color:#961b0f;font-weight:700}.alert.alert-success[_ngcontent-%COMP%]{color:#19806f;font-weight:700}.container-tab[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:flex-start}.widget-container[_ngcontent-%COMP%]{display:flex;flex-direction:row}.section[_ngcontent-%COMP%], .editor-card[_ngcontent-%COMP%]{flex:1;margin:1rem}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white}.category-form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.full-width-input[_ngcontent-%COMP%]{width:100%}.error-message[_ngcontent-%COMP%]{color:#d32f2f;margin-top:20px}.isActive-icon[_ngcontent-%COMP%]{color:green}.isInactive-icon[_ngcontent-%COMP%]{color:red}.item-buttons[_ngcontent-%COMP%]{width:100%;text-align:center;border:0;background-color:transparent}.item-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:medium;margin-bottom:1rem}.item-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child{margin-right:8px}.mat-card-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.mat-card-actions[_ngcontent-%COMP%]{margin-top:auto}.mat-card[_ngcontent-%COMP%]{text-align:center}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:.5rem}mat-card-title[_ngcontent-%COMP%], h1[_ngcontent-%COMP%]{font-weight:500;font-size:1.4rem}mat-form-field[_ngcontent-%COMP%]{display:block}@media (max-width: 768px){.section[_ngcontent-%COMP%], .category-editor-card[_ngcontent-%COMP%]{width:calc(100% - 2rem)}}.mat-mdc-header-row.mdc-data-table__header-row[_ngcontent-%COMP%], .mat-mdc-header-row.mdc-data-table__header-row[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]{padding-top:4px;padding-bottom:4px;height:auto;line-height:normal}.myTable[_ngcontent-%COMP%]{width:100%;table-layout:fixed}.myTable[_ngcontent-%COMP%]   .mat-mdc-header-row[_ngcontent-%COMP%], .myTable[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]{white-space:nowrap;width:100%;box-sizing:border-box;background-color:#fff}.myTable[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;height:1.5rem;width:1.5rem;line-height:1.5rem}.myTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd){background-color:#f2f2f2}.myTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#fff}.small-element[_ngcontent-%COMP%]{height:30px;min-height:30px}.mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-layout[_ngcontent-%COMP%]{width:auto}.mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-label[_ngcontent-%COMP%]{white-space:nowrap}.checkbox-label[_ngcontent-%COMP%]{width:auto;white-space:nowrap}"]})}return e})()}];let rt=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[T.Bz.forChild(nt),T.Bz]})}return e})();var S=n(9397),P=n(4664),v=n(6306),x=n(2096),at=n(1767);let it=(()=>{class e{constructor(r,a){this.actions$=r,this.pipePropertiesService=a,this.loadCategories$=(0,m.GW)(()=>this.actions$.pipe((0,m.l4)(g.D),(0,S.b)(()=>console.log("Loading categories...")),(0,P.w)(()=>(console.log("Inside switchMap for loading categories"),this.pipePropertiesService.getCategory(null).pipe((0,S.b)(o=>console.log("Categories retrieved:",o)),(0,y.U)(o=>(0,g.jc)({categories:o})),(0,v.K)(o=>(0,x.of)((0,g.BN)({errorLoadingCategories:o})))))))),this.createCategory$=(0,m.GW)(()=>this.actions$.pipe((0,m.l4)(g.RB),(0,P.w)(o=>this.pipePropertiesService.createCategory(o.categoryCreate).pipe((0,y.U)(s=>(0,g.sF)({category:s})),(0,v.K)(s=>(0,x.of)((0,g.Jl)({errorCreatingCategory:s}))))))),this.updateCategory$=(0,m.GW)(()=>this.actions$.pipe((0,m.l4)(g.VT),(0,P.w)(({id:o,category:s})=>this.pipePropertiesService.updateCategory(o,s).pipe((0,y.U)(()=>(0,g.ot)({id:o,category:s})),(0,v.K)(C=>(0,x.of)((0,g.vH)({errorUpdatingCategory:C})))))))}static#t=this.\u0275fac=function(a){return new(a||e)(t.LFG(m.eX),t.LFG(at.Q))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac})}return e})(),ct=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[f.ez,rt,h.QW,O.Ps,b.Cq,d.p0,u.lN,Z.p9,p.UX,p.u5,A.c,i.Aw.forFeature("pipeProperty_Category",w.z0),m.sQ.forFeature([it])]})}return e})()}}]);