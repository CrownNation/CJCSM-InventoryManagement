"use strict";(self.webpackChunkInventory_Web=self.webpackChunkInventory_Web||[]).push([[471],{1471:(Y,v,o)=>{o.d(v,{j:()=>Ot});var m=o(5387),l=o(5313),O=o(1476),u=o(3566),s=o(6223),g=o(8145),P=o(8645),x=o(9773),Z=o(342),A=o(4031),M=o(5878),t=o(5879),D=o(1303),b=o(4221),f=o(6814),y=o(5683),S=o(8525),U=o(3680),q=o(2032),c=o(5940),C=o(5195),I=o(617),N=o(2296),w=o(3305),T=o(8034),h=o(6825);function F(n,a){1&n&&(t.TgZ(0,"div",3),t._uU(1," Tally Information "),t.qZA())}function $(n,a){if(1&n&&(t.TgZ(0,"div",3)(1,"span"),t._uU(2),t.qZA(),t.TgZ(3,"span"),t._uU(4),t.qZA()()),2&n){const e=t.oxw();t.xp6(2),t.Oqu(e.tally.tallyNumber),t.xp6(2),t.Oqu(e.displayTallyType(e.tally.tallyType))}}function Q(n,a){1&n&&(t.TgZ(0,"th",23),t._uU(1,"Quantity"),t.qZA())}function k(n,a){if(1&n&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.quantity," ")}}function J(n,a){1&n&&(t.TgZ(0,"th",23),t._uU(1,"Meters"),t.qZA())}function j(n,a){if(1&n&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.lengthInMeters," ")}}function R(n,a){1&n&&(t.TgZ(0,"th",23),t._uU(1,"Rack"),t.qZA())}function V(n,a){if(1&n&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.rackName," ")}}function K(n,a){1&n&&(t.TgZ(0,"th",23),t._uU(1,"Tier"),t.qZA())}function L(n,a){if(1&n&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.tierNumber," ")}}function B(n,a){1&n&&(t.TgZ(0,"th",25),t._uU(1,"\xa0"),t.qZA())}function z(n,a){1&n&&(t.TgZ(0,"mat-icon"),t._uU(1,"keyboard_arrow_down"),t.qZA())}function G(n,a){1&n&&(t.TgZ(0,"mat-icon"),t._uU(1,"keyboard_arrow_up"),t.qZA())}function W(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"td",26)(1,"button",27),t.NdJ("click",function(r){const p=t.CHM(e).$implicit,_=t.oxw(2);return _.expandedElement=_.expandedElement===p?null:p,t.KtG(r.stopPropagation())}),t.YNc(2,z,2,0,"mat-icon",28),t.YNc(3,G,2,0,"mat-icon",28),t.qZA()()}if(2&n){const e=a.$implicit,i=t.oxw(2);t.xp6(2),t.Q6J("ngIf",i.expandedElement!==e),t.xp6(1),t.Q6J("ngIf",i.expandedElement===e)}}function H(n,a){if(1&n&&(t.TgZ(0,"td",24)(1,"div",29)(2,"div",30)(3,"div")(4,"div",31)(5,"b"),t._uU(6,"Category: "),t.qZA(),t.TgZ(7,"span"),t._uU(8),t.qZA()(),t.TgZ(9,"div",31)(10,"b"),t._uU(11,"Condition: "),t.qZA(),t.TgZ(12,"span"),t._uU(13),t.qZA()(),t.TgZ(14,"div",31)(15,"b"),t._uU(16,"Grade: "),t.qZA(),t.TgZ(17,"span"),t._uU(18),t.qZA()(),t.TgZ(19,"div",31)(20,"b"),t._uU(21,"Range: "),t.qZA(),t.TgZ(22,"span"),t._uU(23),t.qZA()(),t.TgZ(24,"div",31)(25,"b"),t._uU(26,"Thread: "),t.qZA(),t.TgZ(27,"span"),t._uU(28),t.qZA()(),t.TgZ(29,"div",31)(30,"b"),t._uU(31,"Weight (kg/m): "),t.qZA(),t.TgZ(32,"span"),t._uU(33),t.qZA()(),t.TgZ(34,"div",31)(35,"b"),t._uU(36,"Weight (lbs/ft): "),t.qZA(),t.TgZ(37,"span"),t._uU(38),t.qZA()()(),t.TgZ(39,"div")(40,"div",31)(41,"b"),t._uU(42,"Length (ft): "),t.qZA(),t.TgZ(43,"span"),t._uU(44),t.qZA()(),t.TgZ(45,"div",31)(46,"b"),t._uU(47,"Size (m): "),t.qZA(),t.TgZ(48,"span"),t._uU(49),t.qZA()(),t.TgZ(50,"div",31)(51,"b"),t._uU(52,"Size (ft): "),t.qZA(),t.TgZ(53,"span"),t._uU(54),t.qZA()(),t.TgZ(55,"div",31)(56,"b"),t._uU(57,"Wall (m): "),t.qZA(),t.TgZ(58,"span"),t._uU(59),t.qZA()(),t.TgZ(60,"div",31)(61,"b"),t._uU(62,"Wall (ft): "),t.qZA(),t.TgZ(63,"span"),t._uU(64),t.qZA()()()()()()),2&n){const e=a.$implicit,i=t.oxw(2);t.uIk("colspan",i.columnsToDisplayWithExpand.length),t.xp6(1),t.Q6J("@detailExpand",e==i.expandedElement?"expanded":"collapsed"),t.xp6(7),t.Oqu(e.pipeDefinition.category.name),t.xp6(5),t.Oqu(e.pipeDefinition.condition.name),t.xp6(5),t.Oqu(e.pipeDefinition.grade.name),t.xp6(5),t.Oqu(e.pipeDefinition.range.name),t.xp6(5),t.Oqu(e.pipeDefinition.thread.name),t.xp6(5),t.Oqu(e.pipeDefinition.weight.weightInKgPerMeter),t.xp6(5),t.Oqu(e.pipeDefinition.weight.weightInLbsPerFoot),t.xp6(6),t.Oqu(e.lengthInFeet),t.xp6(5),t.Oqu(e.pipeDefinition.size.sizeMetric),t.xp6(5),t.Oqu(e.pipeDefinition.size.sizeMetric),t.xp6(5),t.Oqu(e.pipeDefinition.wall.wallMetric),t.xp6(5),t.Oqu(e.pipeDefinition.wall.wallMetric)}}function X(n,a){1&n&&t._UZ(0,"tr",32)}function tt(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"tr",33),t.NdJ("click",function(){const d=t.CHM(e).$implicit,p=t.oxw(2);return t.KtG(p.expandedElement=p.expandedElement===d?null:d)}),t.qZA()}if(2&n){const e=a.$implicit,i=t.oxw(2);t.ekj("example-expanded-row",i.expandedElement===e)}}function et(n,a){1&n&&t._UZ(0,"tr",34)}const nt=function(){return["expandedDetail"]};function at(n,a){if(1&n&&(t.TgZ(0,"div",4)(1,"div",5)(2,"div",6)(3,"span"),t._uU(4),t.qZA(),t.TgZ(5,"span"),t._uU(6),t.ALo(7,"date"),t.qZA(),t.TgZ(8,"span"),t._uU(9),t.qZA()(),t.TgZ(10,"div",7)(11,"span"),t._uU(12),t.qZA(),t.TgZ(13,"span"),t._uU(14),t.qZA(),t.TgZ(15,"span"),t._uU(16),t.qZA()()(),t.TgZ(17,"p"),t._uU(18),t.qZA(),t.TgZ(19,"h4"),t._uU(20,"Pipe"),t.qZA(),t.TgZ(21,"table",8),t.ynx(22,9),t.YNc(23,Q,2,0,"th",10),t.YNc(24,k,2,1,"td",11),t.BQk(),t.ynx(25,12),t.YNc(26,J,2,0,"th",10),t.YNc(27,j,2,1,"td",11),t.BQk(),t.ynx(28,13),t.YNc(29,R,2,0,"th",10),t.YNc(30,V,2,1,"td",11),t.BQk(),t.ynx(31,14),t.YNc(32,K,2,0,"th",10),t.YNc(33,L,2,1,"td",11),t.BQk(),t.ynx(34,15),t.YNc(35,B,2,0,"th",16),t.YNc(36,W,4,2,"td",17),t.BQk(),t.ynx(37,18),t.YNc(38,H,65,14,"td",11),t.BQk(),t.YNc(39,X,1,0,"tr",19),t.YNc(40,tt,1,2,"tr",20),t.YNc(41,et,1,0,"tr",21),t.qZA(),t._UZ(42,"form",22),t.qZA()),2&n){const e=t.oxw();t.xp6(4),t.hij("",e.tally.customerName," "),t.xp6(2),t.Oqu(t.xi3(7,12,e.tally.dateOfCreation,"mediumDate")),t.xp6(3),t.Oqu(e.tally.shopLocationName),t.xp6(3),t.hij("",e.tally.invoiceNumber," "),t.xp6(2),t.hij("",e.tally.weightInKg," kg"),t.xp6(2),t.hij("",e.tally.weightInLbs," lbs"),t.xp6(2),t.Oqu(e.tally.notes),t.xp6(3),t.Q6J("dataSource",e.dataSource),t.xp6(18),t.Q6J("matHeaderRowDef",e.columnsToDisplayWithExpand),t.xp6(1),t.Q6J("matRowDefColumns",e.columnsToDisplayWithExpand),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(15,nt)),t.xp6(1),t.Q6J("formGroup",e.tallyForm)}}function lt(n,a){1&n&&(t.TgZ(0,"div",35),t._UZ(1,"mat-progress-spinner",36),t.qZA())}let it=(()=>{class n{constructor(e){this.store=e,this.tally=null,this.columnsToDisplay=["quantity","lengthMeters","rack","tier"],this.columnsToDisplayWithExpand=[...this.columnsToDisplay,"expand"],this.dataSource=new l.by,this.tally$=this.store.select(Z.f$),this.loading=!1,this.destroy$=new P.x}ngOnInit(){this.tally$.pipe((0,x.R)(this.destroy$)).subscribe(e=>{e&&(this.loading=!1,this.tally=e,this.dataSource=new l.by(e.pipeList))}),this.buildForm()}buildForm(){this.tallyForm=new s.cw({tallyType:new s.NI("",[]),tallyNumber:new s.NI("",[]),customer:new s.NI("",[]),dateStart:new s.NI("",[]),dateEnd:new s.NI("",[])})}displayTallyType(e){return e===m.t.TallyIn?"In":e===m.t.TallyOut?"Out":""}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(b.yh))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-tally-view"]],decls:7,vars:4,consts:[["class","title-container",4,"ngIf"],["class","container",4,"ngIf"],["class","spinner",4,"ngIf"],[1,"title-container"],[1,"container"],[1,"container-row"],[1,"data-column-left"],[1,"data-column-right"],["mat-table","","multiTemplateDataRows","","matSort","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","quantity"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","lengthMeters"],["matColumnDef","rack"],["matColumnDef","tier"],["matColumnDef","expand"],["mat-header-cell","","aria-label","row actions",4,"matHeaderCellDef"],["mat-cell","","class","column-actions",4,"matCellDef"],["matColumnDef","expandedDetail"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","example-element-row",3,"example-expanded-row","click",4,"matRowDef","matRowDefColumns"],["mat-row","","class","example-detail-row",4,"matRowDef","matRowDefColumns"],[3,"formGroup"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell","","aria-label","row actions"],["mat-cell","",1,"column-actions"],["mat-icon-button","","aria-label","expand row",3,"click"],[4,"ngIf"],[1,"example-element-detail"],[1,"container-description"],[1,"element-description"],["mat-header-row",""],["mat-row","",1,"example-element-row",3,"click"],["mat-row","",1,"example-detail-row"],[1,"spinner"],["color","primary","mode","indeterminate"]],template:function(i,r){1&i&&(t.TgZ(0,"mat-card")(1,"mat-card-header"),t.YNc(2,F,2,0,"div",0),t.YNc(3,$,5,2,"div",0),t.qZA(),t.TgZ(4,"mat-card-content"),t.YNc(5,at,43,16,"div",1),t.qZA(),t.YNc(6,lt,2,0,"div",2),t.qZA()),2&i&&(t.xp6(2),t.Q6J("ngIf",!r.tally),t.xp6(1),t.Q6J("ngIf",r.tally),t.xp6(2),t.Q6J("ngIf",r.tally),t.xp6(1),t.Q6J("ngIf",r.loading))},dependencies:[f.O5,s._Y,s.JL,s.sg,u.YE,u.nU,c.Ou,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,C.a8,C.dn,C.dk,I.Hw,N.RK,f.uU],styles:["mat-card[_ngcontent-%COMP%]{min-width:500px;padding:1rem;width:100%}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem;width:100%}.title-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}span[_ngcontent-%COMP%]{padding-bottom:5px}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;width:100%}.container-description[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:100%;padding-bottom:20px}.element-description[_ngcontent-%COMP%]{padding:5px}.container-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:100%;padding-top:20px}.container-row[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:first-child{padding-right:20px}.container-row[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-right:0}.data-column-left[_ngcontent-%COMP%], .data-column-right[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1}.data-column-right[_ngcontent-%COMP%]{text-align:right}h4[_ngcontent-%COMP%]{margin:.5rem 1rem .5rem 0}.column-actions[_ngcontent-%COMP%]{width:0}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white;padding:1rem}mat-expansion-panel[_ngcontent-%COMP%]{margin:1rem 0}mat-expansion-panel[_ngcontent-%COMP%]   .container-filter[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}mat-expansion-panel[_ngcontent-%COMP%]   .item-buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}mat-expansion-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-right:1rem;width:12rem}mat-expansion-panel[_ngcontent-%COMP%]   .date-field[_ngcontent-%COMP%]{width:auto}mat-expansion-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:1.5rem}table[_ngcontent-%COMP%]{margin-top:1rem}tr.example-detail-row[_ngcontent-%COMP%]{height:0}tr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):hover{background:whitesmoke}tr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):active{background:#efefef}.example-element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom-width:0}.example-element-detail[_ngcontent-%COMP%]{overflow:hidden;display:flex}.example-element-diagram[_ngcontent-%COMP%]{min-width:80px;border:2px solid black;padding:8px;font-weight:lighter;margin:8px 0;height:104px}.example-element-symbol[_ngcontent-%COMP%]{font-weight:700;font-size:40px;line-height:normal}.example-element-description[_ngcontent-%COMP%]{padding:16px}.example-element-description-attribution[_ngcontent-%COMP%]{opacity:.5}"],data:{animation:[(0,h.X$)("detailExpand",[(0,h.SB)("collapsed",(0,h.oB)({height:"0px",minHeight:"0"})),(0,h.SB)("expanded",(0,h.oB)({height:"*"})),(0,h.eR)("expanded <=> collapsed",(0,h.jt)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]}})}return n})();function ot(n,a){if(1&n&&(t.TgZ(0,"mat-option",34),t._uU(1),t.qZA()),2&n){const e=a.$implicit,i=t.oxw();t.Q6J("value",e),t.xp6(1),t.Oqu(i.displayTallyType(e))}}function rt(n,a){if(1&n&&(t.TgZ(0,"mat-option",34),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.Q6J("value",e.customerId),t.xp6(1),t.hij(" ",e.name," ")}}function ct(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Invalid start date"),t.qZA())}function st(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Invalid end date"),t.qZA())}function mt(n,a){1&n&&(t.TgZ(0,"th",35),t._uU(1,"Tally Number "),t.qZA())}function dt(n,a){if(1&n&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.tallyNumber," ")}}function pt(n,a){1&n&&(t.TgZ(0,"th",35),t._uU(1,"Customer"),t.qZA())}function ut(n,a){if(1&n&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.customerName," ")}}function gt(n,a){1&n&&(t.TgZ(0,"th",35),t._uU(1,"Shop"),t.qZA())}function ft(n,a){if(1&n&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",e.customerName," ")}}function ht(n,a){1&n&&(t.TgZ(0,"th",35),t._uU(1,"Type"),t.qZA())}function _t(n,a){if(1&n&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&n){const e=a.$implicit,i=t.oxw();t.xp6(1),t.hij(" ",i.displayTallyType(e.tallyType)," ")}}function yt(n,a){1&n&&(t.TgZ(0,"th",35),t._uU(1,"Date"),t.qZA())}function Tt(n,a){if(1&n&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"date"),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,e.dateOfCreation,"mediumDate")," ")}}function xt(n,a){1&n&&t._UZ(0,"th",35)}function Zt(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"td",37)(1,"button",38),t.NdJ("click",function(){const d=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.viewTally(d))}),t._UZ(2,"mat-icon",39),t.qZA()()}}function Ct(n,a){1&n&&t._UZ(0,"tr",40)}function wt(n,a){1&n&&t._UZ(0,"tr",41)}function vt(n,a){1&n&&(t.TgZ(0,"div",42),t._UZ(1,"mat-progress-spinner",43),t.qZA())}let Ot=(()=>{class n{constructor(e,i){this.router=e,this.store=i,this.displayedColumns=["tallyNumber","customerName","shopName","tallyType","date","actions"],this.dataSource=new l.by,this.tallyTypes=Object.values(m.t).filter(r=>"number"==typeof r),this.customers=[],this.customersFullList=[],this.searchParams={tallyType:null,tallyNumber:null,customerId:null,dateStart:null,dateEnd:null},this.destroy$=new P.x,this.tallies$=this.store.select(Z.gu),this.loadingTallies=!1,this.loading$=this.store.select(Z.hg),this.customersFullList$=this.store.select(A.JZ)}ngOnInit(){this.buildForm(),this.loadingTallies=!0,this.setDefaultDateCriteria(),this.store.dispatch((0,g.$O)({searchParams:this.searchParams})),this.store.dispatch((0,M.L)()),this.tallies$.pipe((0,x.R)(this.destroy$)).subscribe(e=>{e&&(this.dataSource=new l.by(e),this.loadingTallies=!1,e.length>0&&this.store.dispatch((0,g.l5)({tallyId:e[0].tallyId})))}),this.customersFullList$.pipe((0,x.R)(this.destroy$)).subscribe(e=>{e&&(this.customersFullList=e)}),this.loading$.subscribe(e=>{this.loadingTallies=e})}buildForm(){this.tallyForm=new s.cw({tallyType:new s.NI("",[]),tallyNumber:new s.NI("",[]),customer:new s.NI("",[]),dateStart:new s.NI("",[]),dateEnd:new s.NI("",[])})}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}applyFilter(e){this.dataSource.filter=e.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}setDefaultDateCriteria(){if(this.searchParams){const e=new Date;e.setDate(e.getDate()+1);const i=e.getFullYear(),r=e.getMonth()+1,d=e.getDate();e.setDate(e.getDate()+1);const p=`${i}-${r.toString().padStart(2,"0")}-${d.toString().padStart(2,"0")}`;this.searchParams.dateEnd=new Date(p).toISOString(),this.tallyForm.controls.dateEnd.setValue(p);const _=new Date;_.setMonth(e.getMonth()-1);const Pt=_.getFullYear(),At=_.getMonth()+1,Dt=_.getDate(),E=`${Pt}-${At.toString().padStart(2,"0")}-${Dt.toString().padStart(2,"0")}`;this.searchParams.dateStart=new Date(E).toISOString(),this.tallyForm.controls.dateStart.setValue(E)}}addRack(){console.log("add rack"),this.router.navigate(["/rack/add"])}filter(){const e=new Date(this.tallyForm.value.dateStart),i=new Date(this.tallyForm.value.dateEnd);this.searchParams={tallyType:this.tallyForm.value.tallyType,tallyNumber:this.tallyForm.value.tallyNumber,customerId:this.tallyForm.value.customer,dateStart:e.getFullYear()>1971?new Date(e).toISOString():null,dateEnd:i.getFullYear()>1971?new Date(i).toISOString():null},this.loadingTallies=!0,this.store.dispatch((0,g.$O)({searchParams:this.searchParams}))}clearForm(){this.tallyForm.reset(),this.searchParams={tallyType:null,tallyNumber:null,customerId:null,dateStart:null,dateEnd:null},this.setDefaultDateCriteria(),this.store.dispatch((0,g.$O)({searchParams:this.searchParams}))}displayTallyType(e){return e===m.t.TallyIn?"In":e===m.t.TallyOut?"Out":""}viewTally(e){this.store.dispatch((0,g.l5)({tallyId:e.tallyId}))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(D.F0),t.Y36(b.yh))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-search-tally"]],viewQuery:function(i,r){if(1&i&&(t.Gf(O.NW,5),t.Gf(u.YE,5)),2&i){let d;t.iGM(d=t.CRH())&&(r.paginator=d.first),t.iGM(d=t.CRH())&&(r.sort=d.first)}},decls:62,vars:12,consts:[[1,"container-tab"],[1,"section-search"],["expanded","true",1,"filter-options"],[3,"formGroup"],[1,"container-filter"],["appearance","outline","color","accent"],["formControlName","tallyType"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","string","placeholder","Tally Number","formControlName","tallyNumber"],["formControlName","customer"],[1,"date-field"],[3,"formGroup","rangePicker"],["matStartDate","","formControlName","dateStart","placeholder","Start date"],["matEndDate","","formControlName","dateEnd","placeholder","End date"],["matIconSuffix","",3,"for"],["picker",""],[4,"ngIf"],[1,"item-buttons"],["mat-raised-button","",3,"click"],["mat-raised-button","","color","primary",3,"click"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","tallyNumber"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","customerName"],["matColumnDef","shopName"],["matColumnDef","tallyType"],["matColumnDef","date"],["matColumnDef","actions"],["mat-cell","","class","column-actions",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","spinner",4,"ngIf"],[1,"section-view"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-cell","",1,"column-actions"],["mat-icon-button","","aria-label","View tally",3,"click"],["aria-hidden","false","fontIcon","open_in_new","color","accent"],["mat-header-row",""],["mat-row",""],[1,"spinner"],["color","primary","mode","indeterminate"]],template:function(i,r){if(1&i&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-accordion")(3,"mat-expansion-panel",2)(4,"mat-expansion-panel-header")(5,"mat-panel-title"),t._uU(6,"Filter options"),t.qZA()(),t.TgZ(7,"form",3)(8,"div",4)(9,"mat-form-field",5)(10,"mat-label"),t._uU(11,"Tally Type"),t.qZA(),t.TgZ(12,"mat-select",6),t.YNc(13,ot,2,2,"mat-option",7),t.qZA()(),t.TgZ(14,"mat-form-field",5)(15,"mat-label"),t._uU(16,"Tally Number"),t.qZA(),t._UZ(17,"input",8),t.qZA(),t.TgZ(18,"mat-form-field",5)(19,"mat-label"),t._uU(20,"Customer"),t.qZA(),t.TgZ(21,"mat-select",9),t.YNc(22,rt,2,2,"mat-option",7),t.qZA()(),t.TgZ(23,"mat-form-field",10)(24,"mat-label"),t._uU(25,"Enter a date range"),t.qZA(),t.TgZ(26,"mat-date-range-input",11),t._UZ(27,"input",12)(28,"input",13),t.qZA(),t._UZ(29,"mat-datepicker-toggle",14)(30,"mat-date-range-picker",null,15),t.YNc(32,ct,2,0,"mat-error",16),t.YNc(33,st,2,0,"mat-error",16),t.qZA(),t.TgZ(34,"div",17)(35,"button",18),t.NdJ("click",function(){return r.clearForm()}),t._uU(36,"Clear filters"),t.qZA(),t.TgZ(37,"button",19),t.NdJ("click",function(){return r.filter()}),t._uU(38,"Filter"),t.qZA()()()()()(),t.TgZ(39,"table",20),t.ynx(40,21),t.YNc(41,mt,2,0,"th",22),t.YNc(42,dt,2,1,"td",23),t.BQk(),t.ynx(43,24),t.YNc(44,pt,2,0,"th",22),t.YNc(45,ut,2,1,"td",23),t.BQk(),t.ynx(46,25),t.YNc(47,gt,2,0,"th",22),t.YNc(48,ft,2,1,"td",23),t.BQk(),t.ynx(49,26),t.YNc(50,ht,2,0,"th",22),t.YNc(51,_t,2,1,"td",23),t.BQk(),t.ynx(52,27),t.YNc(53,yt,2,0,"th",22),t.YNc(54,Tt,3,4,"td",23),t.BQk(),t.ynx(55,28),t.YNc(56,xt,1,0,"th",22),t.YNc(57,Zt,3,0,"td",29),t.BQk(),t.YNc(58,Ct,1,0,"tr",30),t.YNc(59,wt,1,0,"tr",31),t.qZA(),t.YNc(60,vt,2,0,"div",32),t.qZA(),t._UZ(61,"app-tally-view",33),t.qZA()),2&i){const d=t.MAs(31);t.xp6(7),t.Q6J("formGroup",r.tallyForm),t.xp6(6),t.Q6J("ngForOf",r.tallyTypes),t.xp6(9),t.Q6J("ngForOf",r.customersFullList),t.xp6(4),t.Q6J("formGroup",r.tallyForm)("rangePicker",d),t.xp6(3),t.Q6J("for",d),t.xp6(3),t.Q6J("ngIf",r.tallyForm.controls.dateStart.hasError("matStartDateInvalid")),t.xp6(1),t.Q6J("ngIf",r.tallyForm.controls.dateEnd.hasError("matEndDateInvalid")),t.xp6(6),t.Q6J("dataSource",r.dataSource),t.xp6(19),t.Q6J("matHeaderRowDef",r.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",r.displayedColumns),t.xp6(1),t.Q6J("ngIf",r.loadingTallies)}},dependencies:[f.sg,f.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,u.YE,u.nU,y.KE,y.hX,y.TO,y.R9,S.gD,U.ey,q.Nt,c.Ou,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,C.a8,I.Hw,N.lW,N.RK,w.pp,w.ib,w.yz,w.yK,T.nW,T.wx,T.zY,T.By,T._g,it,f.uU],styles:["mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:1rem}mat-card-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem}mat-form-field[_ngcontent-%COMP%]{display:block}h4[_ngcontent-%COMP%]{margin:.5rem 1rem .5rem 0}.column-actions[_ngcontent-%COMP%]{width:0}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:white}mat-expansion-panel[_ngcontent-%COMP%]{margin:1rem 0}mat-expansion-panel[_ngcontent-%COMP%]   .container-filter[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}mat-expansion-panel[_ngcontent-%COMP%]   .item-buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}mat-expansion-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-right:1rem;width:12rem}mat-expansion-panel[_ngcontent-%COMP%]   .date-field[_ngcontent-%COMP%]{width:auto}mat-expansion-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:1.5rem}table[_ngcontent-%COMP%]{margin-top:1rem}"]})}return n})()},342:(Y,v,o)=>{o.d(v,{NT:()=>y,f$:()=>U,gu:()=>t,hg:()=>D,vS:()=>S,yY:()=>f});var m=o(4221),l=o(4820),O=o(2487);const{selectEntities:u,selectAll:s}=O.hU.getSelectors(),g=(0,m.ZF)("tally"),A=((0,m.P1)(g,({entities:c})=>Object.values(c)),(0,m.P1)(l.Kn,c=>c),(0,m.P1)(l.Kn,s),(0,m.P1)(l.Kn,u)),t=((0,m.P1)(l.Kn,c=>c.entities),(0,m.P1)(A,c=>Object.values(c))),D=(0,m.P1)(l.Kn,c=>c.loadingTallies),f=((0,m.P1)(l.Kn,c=>c.errorLoadingTallies),(0,m.P1)(l.Kn,c=>c.creatingTally)),y=(0,m.P1)(l.Kn,c=>c.createdTally),S=(0,m.P1)(l.Kn,c=>c.errorCreatingTally),U=(0,m.P1)(l.Kn,c=>c.selectedTally);(0,m.P1)(l.Kn,c=>c.errorLoadingSelectedTally)}}]);