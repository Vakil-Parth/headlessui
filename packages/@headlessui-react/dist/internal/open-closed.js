import{createContext as r,useContext as l}from"react";let t=r(null);t.displayName="OpenClosedContext";var d=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(d||{});function i(){return l(t)}function s({value:o,children:n}){return<t.Provider value={o}>{n}</t.Provider>}export{s as OpenClosedProvider,d as State,i as useOpenClosed};
