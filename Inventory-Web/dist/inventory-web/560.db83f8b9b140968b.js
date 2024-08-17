"use strict";(self.webpackChunkInventory_Web=self.webpackChunkInventory_Web||[]).push([[560],{560:(Oe,b,i)=>{i.r(b),i.d(b,{PipePropertyThreadModule:()=>xe});var P=i(6814),T=i(5195),Z=i(617),A=i(5940),l=i(5313),C=i(5683),U=i(5986),h=i(6223),r=i(4221),m=i(5154),w=i(2032),$=i(1303),D=i(8645),N=i(2572),u=i(7398),R=i(9773),j=i(8180),z=i(6293);const p="[Pipe Properties Thread]",y=(0,r.PH)(`${p} Get Threads`,(0,r.Ky)()),I=(0,r.PH)(`${p} Get Threads Success`,(0,r.Ky)()),S=(0,r.PH)(`${p} Get Threads Failure`,(0,r.Ky)()),v=(0,r.PH)(`${p} Create PipeProperty_Thread`,(0,r.Ky)()),F=(0,r.PH)(`${p} Create PipeProperty_Thread Success`,(0,r.Ky)()),Y=(0,r.PH)(`${p} Create PipeProperty_Thread Error`,(0,r.Ky)()),x=(0,r.PH)(`${p} Update PipeProperty_Thread`,(0,r.Ky)()),k=(0,r.PH)(`${p} Update PipeProperty_Thread Success`,(0,r.Ky)()),E=(0,r.PH)(`${p} Update PipeProperty_Thread Error`,(0,r.Ky)()),J=(0,r.PH)(`${p} Reset Thread Notifications`),f=(0,z.H)({sortComparer:function B(t,n){return t.name.localeCompare(n.name)},selectId:t=>t.pipeProperty_ThreadId}),W=f.getInitialState({ids:[],entities:{},loadingThreads:!1,errorLoadingThreads:null,creatingThread:!1,createdThread:null,errorCreatingThread:null,updatingThread:!1,updatedThread:null,errorUpdatingThread:null,selectedThread:null,errorLoadingSelectedThread:null}),X=(0,r.Lq)(W,(0,r.on)(y,t=>({...t,loadingThreads:!0,errorLoadingThreads:null})),(0,r.on)(I,(t,{threads:n})=>f.addMany(n,{...t,loadingThreads:!1,errorLoadingThreads:null})),(0,r.on)(S,(t,{errorLoadingThreads:n})=>({...t,loadingThreads:!1,errorLoadingThreads:n})),(0,r.on)(v,t=>({...t,creatingThread:!0,createdThread:null,errorCreatingThread:null})),(0,r.on)(F,(t,{thread:n})=>f.addOne(n,{...t,creatingThread:!1,createdThread:n,errorCreatingThread:null})),(0,r.on)(Y,(t,{errorCreatingThread:n})=>({...t,creatingThread:!1,errorCreatingThread:n})),(0,r.on)(x,t=>({...t,updatingThread:!0,errorUpdatingThread:null})),(0,r.on)(k,(t,{id:n,thread:o})=>f.updateOne({id:n,changes:o},{...t,updatingThread:!1,updatedThread:o,errorUpdatingThread:null})),(0,r.on)(E,(t,{errorUpdatingThread:n})=>({...t,updatingThread:!1,errorUpdatingThread:n})),(0,r.on)(J,t=>({...t,createdThread:null,updatedThread:null,errorLoadingThreads:null,errorCreatingThread:null,errorUpdatingThread:null})));function V(t,n){return X(t,n)}const{selectEntities:ee,selectAll:te}=f.getSelectors(),d=(0,r.ZF)("pipeProperty_Thread"),re=((0,r.P1)(d,t=>t),(0,r.P1)(d,te)),ne=((0,r.P1)(d,ee),(0,r.P1)(d,t=>t.loadingThreads)),L=(0,r.P1)(d,t=>t.errorLoadingThreads),H=((0,r.P1)(d,t=>t.creatingThread),(0,r.P1)(d,t=>t.createdThread)),Q=(0,r.P1)(d,t=>t.errorCreatingThread),G=((0,r.P1)(d,t=>t.selectedThread),(0,r.P1)(d,t=>t.errorLoadingSelectedThread)),K=((0,r.P1)(d,t=>t.updatingThread),(0,r.P1)(d,t=>t.updatedThread));(0,r.P1)(d,t=>t.errorUpdatingThread);var e=i(5879);function ae(t,n){1&t&&(e.TgZ(0,"th",25),e._uU(1,"Name"),e.qZA())}function oe(t,n){if(1&t&&(e.TgZ(0,"td",26),e._uU(1),e.qZA()),2&t){const o=n.$implicit;e.xp6(1),e.Oqu(o.name)}}function ie(t,n){1&t&&(e.TgZ(0,"th",25),e._uU(1,"Is Active"),e.qZA())}function ce(t,n){1&t&&(e.TgZ(0,"mat-icon",29),e._uU(1,"check"),e.qZA())}function se(t,n){1&t&&(e.TgZ(0,"mat-icon",30),e._uU(1,"close"),e.qZA())}function de(t,n){if(1&t&&(e.TgZ(0,"td",26),e.YNc(1,ce,2,0,"mat-icon",27),e.YNc(2,se,2,0,"ng-template",null,28,e.W1O),e.qZA()),2&t){const o=n.$implicit,c=e.MAs(3);e.xp6(1),e.Q6J("ngIf",o.isActive)("ngIfElse",c)}}function le(t,n){1&t&&(e.TgZ(0,"th",31),e._uU(1,"Edit"),e.qZA())}function he(t,n){if(1&t){const o=e.EpF();e.TgZ(0,"td",26)(1,"button",32),e.NdJ("click",function(){const s=e.CHM(o).$implicit,g=e.oxw();return e.KtG(g.selectThread(s))}),e._UZ(2,"mat-icon",33),e.qZA()()}}function pe(t,n){1&t&&e._UZ(0,"tr",34)}function me(t,n){1&t&&e._UZ(0,"tr",35)}function ge(t,n){1&t&&(e.TgZ(0,"div",36),e._UZ(1,"mat-progress-spinner",37),e.qZA())}function Te(t,n){if(1&t&&(e.TgZ(0,"div",38),e._uU(1),e.qZA()),2&t){const o=n.ngIf;e.xp6(1),e.hij(" ",o," ")}}function ue(t,n){1&t&&(e.TgZ(0,"div",39),e._uU(1," Thread created successfully! "),e.qZA())}function fe(t,n){1&t&&(e.TgZ(0,"div",39),e._uU(1," Thread updated successfully! "),e.qZA())}const Pe=[{path:"",component:(()=>{class t{constructor(o,c){this.store=o,this.fb=c,this.displayedColumns=["name","isActive","actions"],this.editingThread=null,this.destroy$=new D.x,this.threadForm=this.fb.group({name:["",h.kI.required],isActive:[!0,h.kI.required]}),this.dataSource=new l.by([]),this.errorMessage$=(0,N.a)([this.store.select(L),this.store.select(Q),this.store.select(G)]).pipe((0,u.U)(([a,s,g])=>a||s||g?"An error occurred":"")),this.isThreadCreated$=this.store.select(H).pipe((0,u.U)(a=>!!a)),this.isThreadUpdated$=this.store.select(K).pipe((0,u.U)(a=>!!a))}ngOnInit(){this.loadingThreads$=this.store.select(ne),this.store.dispatch(y({searchParams:null})),this.store.pipe((0,r.Ys)(re),(0,R.R)(this.destroy$)).subscribe(o=>this.dataSource.data=o)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.loadingThreadsSubscription&&this.loadingThreadsSubscription.unsubscribe(),this.checkAndResetNotifications()}selectThread(o){this.editingThread=o,this.threadForm.patchValue(o),this.checkAndResetNotifications()}checkAndResetNotifications(){(0,N.a)([this.store.select(H),this.store.select(K),this.store.select(L),this.store.select(Q),this.store.select(G)]).pipe((0,j.q)(1)).subscribe(([o,c,a,s,g])=>{(o||c||a||s||g)&&this.store.dispatch(J())})}saveOrUpdateThread(){if(this.editingThread){const c={...this.editingThread,...this.threadForm.value};this.store.dispatch(x({id:this.editingThread.pipeProperty_ThreadId,thread:c}))}else this.store.dispatch(v({threadCreate:this.threadForm.value}));this.resetForm()}resetForm(){this.editingThread=null,this.threadForm.reset({name:"",isActive:!0}),this.checkAndResetNotifications()}static#e=this.\u0275fac=function(c){return new(c||t)(e.Y36(r.yh),e.Y36(h.qu))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-pipe-property-thread"]],decls:47,vars:19,consts:[[1,"container-tab"],[1,"section"],["mat-table","","matSort","",1,"myTable",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isActive"],["matColumnDef","actions"],["mat-header-cell","","mat-sort-header","","class","center-text",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","small-element",4,"matRowDef","matRowDefColumns"],["class","spinner",4,"ngIf"],[1,"editor-card"],[1,"thread-form",3,"formGroup"],[1,"widget-container"],["appearance","fill",1,"full-width-input"],["matInput","","formControlName","name"],["formControlName","isActive"],[1,"checkbox-label"],[1,"messages-container"],["class","error-message",4,"ngIf"],["class","alert alert-success",4,"ngIf"],[1,"item-buttons"],["mat-raised-button","",3,"disabled","click"],["mat-raised-button","",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["class","isActive-icon",4,"ngIf","ngIfElse"],["inactiveIcon",""],[1,"isActive-icon"],[1,"isInactive-icon"],["mat-header-cell","","mat-sort-header","",1,"center-text"],["aria-label","View Thread",1,"item-buttons",3,"click"],["aria-hidden","false","fontIcon","open_in_new","color","accent"],["mat-header-row",""],["mat-row","",1,"small-element"],[1,"spinner"],["color","primary","mode","indeterminate"],[1,"error-message"],[1,"alert","alert-success"]],template:function(c,a){1&c&&(e.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title"),e._uU(4,"Thread - Pipe Property"),e.qZA()(),e.TgZ(5,"mat-card-content")(6,"table",2),e.ynx(7,3),e.YNc(8,ae,2,0,"th",4),e.YNc(9,oe,2,1,"td",5),e.BQk(),e.ynx(10,6),e.YNc(11,ie,2,0,"th",4),e.YNc(12,de,4,2,"td",5),e.BQk(),e.ynx(13,7),e.YNc(14,le,2,0,"th",8),e.YNc(15,he,3,0,"td",5),e.BQk(),e.YNc(16,pe,1,0,"tr",9),e.YNc(17,me,1,0,"tr",10),e.qZA(),e.YNc(18,ge,2,0,"div",11),e.ALo(19,"async"),e.qZA()(),e.TgZ(20,"mat-card",12)(21,"mat-card-header")(22,"mat-card-title"),e._uU(23),e.qZA()(),e.TgZ(24,"mat-card-content")(25,"form",13)(26,"div",14)(27,"mat-form-field",15)(28,"mat-label"),e._uU(29,"Name"),e.qZA(),e._UZ(30,"input",16),e.qZA(),e.TgZ(31,"mat-checkbox",17)(32,"div",18),e._uU(33,"Is Active"),e.qZA()()(),e.TgZ(34,"div",19),e.YNc(35,Te,2,1,"div",20),e.ALo(36,"async"),e.YNc(37,ue,2,0,"div",21),e.ALo(38,"async"),e.YNc(39,fe,2,0,"div",21),e.ALo(40,"async"),e.qZA()()(),e.TgZ(41,"mat-card-actions")(42,"div",22)(43,"button",23),e.NdJ("click",function(){return a.saveOrUpdateThread()}),e._uU(44),e.qZA(),e.TgZ(45,"button",24),e.NdJ("click",function(){return a.resetForm()}),e._uU(46,"Cancel"),e.qZA()()()()()),2&c&&(e.xp6(6),e.Q6J("dataSource",a.dataSource),e.xp6(10),e.Q6J("matHeaderRowDef",a.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",a.displayedColumns),e.xp6(1),e.Q6J("ngIf",e.lcZ(19,11,a.loadingThreads$)),e.xp6(5),e.Oqu(a.editingThread?"Edit Thread":"Create New Thread"),e.xp6(2),e.Q6J("formGroup",a.threadForm),e.xp6(10),e.Q6J("ngIf",e.lcZ(36,13,a.errorMessage$)),e.xp6(2),e.Q6J("ngIf",e.lcZ(38,15,a.isThreadCreated$)),e.xp6(2),e.Q6J("ngIf",e.lcZ(40,17,a.isThreadUpdated$)),e.xp6(4),e.Q6J("disabled",!a.threadForm.valid),e.xp6(1),e.hij(" ",a.editingThread?"Update":"Create"," "))},dependencies:[P.O5,T.a8,T.hq,T.dn,T.dk,T.n5,Z.Hw,A.Ou,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,C.KE,C.hX,U.oG,h._Y,h.Fj,h.JJ,h.JL,h.sg,h.u,w.Nt,P.Ov],styles:[".center-text[_ngcontent-%COMP%]{text-align:center}.messages-container[_ngcontent-%COMP%]{margin-top:0}.error-message[_ngcontent-%COMP%], .alert.alert-success[_ngcontent-%COMP%]{margin-bottom:5px}.error-message[_ngcontent-%COMP%]{color:#961b0f;font-weight:700}.alert.alert-success[_ngcontent-%COMP%]{color:#19806f;font-weight:700}.container-tab[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:flex-start}.widget-container[_ngcontent-%COMP%]{display:flex;flex-direction:row}.section[_ngcontent-%COMP%], .editor-card[_ngcontent-%COMP%]{flex:1;margin:1rem}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white}.category-form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.full-width-input[_ngcontent-%COMP%]{width:100%}.error-message[_ngcontent-%COMP%]{color:#d32f2f;margin-top:20px}.isActive-icon[_ngcontent-%COMP%]{color:green}.isInactive-icon[_ngcontent-%COMP%]{color:red}.item-buttons[_ngcontent-%COMP%]{width:100%;text-align:center;border:0;background-color:transparent}.item-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:medium;margin-bottom:1rem}.item-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child{margin-right:8px}.mat-card-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.mat-card-actions[_ngcontent-%COMP%]{margin-top:auto}.mat-card[_ngcontent-%COMP%]{text-align:center}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:.5rem}mat-card-title[_ngcontent-%COMP%], h1[_ngcontent-%COMP%]{font-weight:500;font-size:1.4rem}mat-form-field[_ngcontent-%COMP%]{display:block}@media (max-width: 768px){.section[_ngcontent-%COMP%], .category-editor-card[_ngcontent-%COMP%]{width:calc(100% - 2rem)}}.mat-mdc-header-row.mdc-data-table__header-row[_ngcontent-%COMP%], .mat-mdc-header-row.mdc-data-table__header-row[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]{padding-top:4px;padding-bottom:4px;height:auto;line-height:normal}.myTable[_ngcontent-%COMP%]{width:100%;table-layout:fixed}.myTable[_ngcontent-%COMP%]   .mat-mdc-header-row[_ngcontent-%COMP%], .myTable[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]{white-space:nowrap;width:100%;box-sizing:border-box;background-color:#fff}.myTable[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;height:1.5rem;width:1.5rem;line-height:1.5rem}.myTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd){background-color:#f2f2f2}.myTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#fff}.small-element[_ngcontent-%COMP%]{height:30px;min-height:30px}.mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-layout[_ngcontent-%COMP%]{width:auto}.mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-label[_ngcontent-%COMP%]{white-space:nowrap}.checkbox-label[_ngcontent-%COMP%]{width:auto;white-space:nowrap}"]})}return t})()}];let Ce=(()=>{class t{static#e=this.\u0275fac=function(c){return new(c||t)};static#t=this.\u0275mod=e.oAB({type:t});static#r=this.\u0275inj=e.cJS({imports:[$.Bz.forChild(Pe),$.Bz]})}return t})();var O=i(4664),_=i(6306),M=i(2096),ye=i(1767);let ve=(()=>{class t{constructor(o,c){this.actions$=o,this.pipePropertiesService=c,this.loadThreads$=(0,m.GW)(()=>this.actions$.pipe((0,m.l4)(y),(0,O.w)(()=>this.pipePropertiesService.getThread(null).pipe((0,u.U)(a=>I({threads:a})),(0,_.K)(a=>(0,M.of)(S({errorLoadingThreads:a}))))))),this.createThread$=(0,m.GW)(()=>this.actions$.pipe((0,m.l4)(v),(0,O.w)(a=>this.pipePropertiesService.createThread(a.threadCreate).pipe((0,u.U)(s=>F({thread:s})),(0,_.K)(s=>(0,M.of)(Y({errorCreatingThread:s}))))))),this.updateThread$=(0,m.GW)(()=>this.actions$.pipe((0,m.l4)(x),(0,O.w)(({id:a,thread:s})=>this.pipePropertiesService.updateThread(a,s).pipe((0,u.U)(()=>k({id:a,thread:s})),(0,_.K)(g=>(0,M.of)(E({errorUpdatingThread:g})))))))}static#e=this.\u0275fac=function(c){return new(c||t)(e.LFG(m.eX),e.LFG(ye.Q))};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac})}return t})(),xe=(()=>{class t{static#e=this.\u0275fac=function(c){return new(c||t)};static#t=this.\u0275mod=e.oAB({type:t});static#r=this.\u0275inj=e.cJS({imports:[P.ez,Ce,T.QW,Z.Ps,A.Cq,l.p0,C.lN,U.p9,h.UX,h.u5,w.c,r.Aw.forFeature("pipeProperty_Thread",V),m.sQ.forFeature([ve])]})}return t})()}}]);