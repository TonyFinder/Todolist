(this.webpackJsonp01=this.webpackJsonp01||[]).push([[0],{69:function(t,e,n){},76:function(t,e,n){"use strict";n.r(e);var i=n(0),c=n(9),r=n.n(c),o=(n(69),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,124)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),i(t),c(t),r(t),o(t)}))}),l=n(17),a=n(48),d=n(11),s=n(25),u=n(121),j=[],O=n(21),b={},f=Object(a.a)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todolistId}));case"ADD-TODOLIST":return[].concat(Object(s.a)(t),[{id:e.todolistId,title:e.title,filter:"All"}]);case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.todolistId?Object(d.a)(Object(d.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todolistId?Object(d.a)(Object(d.a)({},t),{},{filter:e.filterId}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(d.a)(Object(d.a)({},t),{},Object(O.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskID}))));case"ADD-TASK":return Object(d.a)(Object(d.a)({},t),{},Object(O.a)({},e.todolistId,[{id:Object(u.a)(),term:e.title,isDone:!1}].concat(Object(s.a)(t[e.todolistId]))));case"CHANGE-TASK-STATUS":return Object(d.a)(Object(d.a)({},t),{},Object(O.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.id?Object(d.a)(Object(d.a)({},t),{},{isDone:e.checked}):t}))));case"CHANGE-TASK-TITLE":return Object(d.a)(Object(d.a)({},t),{},Object(O.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(d.a)(Object(d.a)({},t),{},{term:e.title}):t}))));case"REMOVE-TODOLIST":var n=Object(d.a)({},t);return delete n[e.todolistId],n;case"ADD-TODOLIST":return Object(d.a)(Object(O.a)({},e.todolistId,[]),t);default:return t}}}),h=Object(a.b)(f);window.store=h;var I=n(30),T=n(120),p=n(108),x=n(109),m=n(5),v=function(t){var e=Object(i.useState)(""),n=Object(I.a)(e,2),c=n[0],r=n[1],o=Object(i.useState)(!1),l=Object(I.a)(o,2),a=l[0],d=l[1],s=function(e){"Enter"!==e&&"NumpadEnter"!==e||(""!==c.trim()?(t.addItem(c),r("")):d(!0))};return Object(m.jsxs)("div",{children:[Object(m.jsx)(T.a,{variant:"outlined",size:"small",value:c,onChange:function(t){return e=t.currentTarget.value,r(e),void d(!1);var e},onKeyPress:function(t){return s(t.code)},label:"Title",error:a,helperText:a&&"Title is a must",style:{marginBottom:"10px"}}),Object(m.jsx)(p.a,{color:"primary",onClick:function(){return s("Enter")},children:Object(m.jsx)(x.a,{})})]})},y=n(112),A=n(107),D=n(113),g=n(122),E=n(110),C=function(t){var e=Object(i.useState)(t.title),n=Object(I.a)(e,2),c=n[0],r=n[1],o=Object(i.useState)(!1),l=Object(I.a)(o,2),a=l[0],d=l[1],s=function(){d(!1),t.changedTitle(c)},u=t.header?{fontWeight:"bold",fontSize:"larger"}:t.completed?{opacity:.35}:{opacity:1};return Object(m.jsx)("div",{children:a?Object(m.jsx)(T.a,{value:c,onChange:function(t){return r(t.currentTarget.value)},onBlur:s,onKeyPress:function(t){"Enter"===t.key&&s()},autoFocus:!0}):Object(m.jsx)(E.a,{onDoubleClick:function(){return d(!0)},style:u,children:t.title})})},S=n(111),k=n(114),L=function(t){var e=Object(l.b)(),n=Object(l.c)((function(e){return e.todolists.filter((function(e){return e.id===t.todolistId}))[0]})),i=Object(l.c)((function(e){return e.tasks[t.todolistId]}));i="Active"===n.filter?i.filter((function(t){return!t.isDone})):"Completed"===n.filter?i.filter((function(t){return t.isDone})):Object(s.a)(i);var c=function(n){return e((i=n,{type:"CHANGE-TODOLIST-FILTER",todolistId:t.todolistId,filterId:i}));var i};return Object(m.jsxs)("div",{children:[Object(m.jsx)(p.a,{onClick:function(){return e({type:"REMOVE-TODOLIST",todolistId:t.todolistId})},children:Object(m.jsx)(S.a,{color:"secondary"})}),Object(m.jsx)("h3",{children:Object(m.jsx)(C,{changedTitle:function(n){return e(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",todolistId:e,title:t}}(n,t.todolistId))},title:n.title,completed:!1,header:!0})}),Object(m.jsx)(v,{addItem:function(n){return e(function(t,e){return{type:"ADD-TASK",title:t,todolistId:e}}(n,t.todolistId))},filter:n.filter}),Object(m.jsxs)("div",{children:[Object(m.jsx)(y.a,{variant:"contained",color:"All"===n.filter?"primary":"inherit",size:"small",onClick:function(){return c("All")},children:"All"}),Object(m.jsx)(y.a,{variant:"contained",color:"Active"===n.filter?"primary":"inherit",size:"small",onClick:function(){return c("Active")},style:{margin:"0px 5px"},children:"Active"}),Object(m.jsx)(y.a,{variant:"contained",color:"Completed"===n.filter?"primary":"inherit",size:"small",onClick:function(){return c("Completed")},children:"Completed"})]}),Object(m.jsx)(A.a,{children:i.map((function(n){return Object(m.jsxs)(D.a,{style:{padding:"0px"},children:[Object(m.jsx)(p.a,{onClick:function(){return function(n){return e((i=n,c=t.todolistId,{type:"REMOVE-TASK",taskID:i,todolistId:c}));var i,c}(n.id)},size:"small",children:Object(m.jsx)(k.a,{color:"secondary"})}),Object(m.jsx)(g.a,{size:"small",color:"primary",onChange:function(i){return function(n,i){return e(function(t,e,n){return{type:"CHANGE-TASK-STATUS",id:t,checked:e,todolistId:n}}(n,i.currentTarget.checked,t.todolistId))}(n.id,i)},checked:n.isDone}),Object(m.jsx)(C,{title:n.term,changedTitle:function(i){e(function(t,e,n){return{type:"CHANGE-TASK-TITLE",title:t,todolistId:e,taskId:n}}(i,t.todolistId,n.id))},completed:n.isDone,header:!1})]},n.id)}))})]})},K=n(115),N=n(77),G=n(116),H=n(117),w=n(119),z=n(118);function F(){var t=Object(l.b)(),e=Object(l.c)((function(t){return t.todolists})).map((function(t){return Object(m.jsx)(K.a,{item:!0,children:Object(m.jsx)(N.a,{elevation:4,style:{padding:"15px"},children:Object(m.jsx)(L,{todolistId:t.id},t.id)})},t.id)}));return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)(G.a,{position:"sticky",children:Object(m.jsxs)(H.a,{style:{justifyContent:"space-between"},children:[Object(m.jsx)(p.a,{edge:"start",color:"inherit",children:Object(m.jsx)(z.a,{})}),Object(m.jsx)(E.a,{variant:"h6",children:"Todolists"}),Object(m.jsx)(y.a,{variant:"outlined",color:"inherit",children:"Login"})]})}),Object(m.jsxs)(w.a,{maxWidth:"xl",children:[Object(m.jsx)(K.a,{container:!0,style:{justifyContent:"center",margin:"20px"},children:Object(m.jsx)(v,{addItem:function(e){return t(function(t){return{type:"ADD-TODOLIST",title:t,todolistId:Object(u.a)()}}(e))},filter:"All"})}),Object(m.jsx)(K.a,{container:!0,spacing:3,style:{justifyContent:"center"},children:e})]})]})}r.a.render(Object(m.jsx)(l.a,{store:h,children:Object(m.jsx)(F,{})}),document.getElementById("root")),o()}},[[76,1,2]]]);
//# sourceMappingURL=main.b9419513.chunk.js.map