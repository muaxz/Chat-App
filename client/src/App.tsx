import React from 'react';
import logo from './logo.svg';
import LeftSide from "./components/leftSide/leftSide"
import MiddleSide from "./components/middleSide/middleSide"
import RightSide from "./components/rightSide/rightSide"
import {Route,Routes,BrowserRouter} from "react-router-dom"
import {ApolloClient,ApolloProvider,HttpLink,DefaultOptions,from,InMemoryCache} from "@apollo/client"
import {onError} from "@apollo/client/link/error"
import LoginPage from "./pages/login"
import ChatPage from "./pages/chat"
import "./app.css"
//file

const errorLink = onError(({graphQLErrors,networkError})=>{
  if(graphQLErrors){
    console.log("error")
  }
})

const link = from([
errorLink,
new HttpLink({uri:"http://localhost:3001/graphql"})
])

const defaultOptions : DefaultOptions= {
watchQuery: {
  fetchPolicy: 'no-cache',
  errorPolicy: 'ignore',
},
query: {
  fetchPolicy: 'no-cache',
  errorPolicy: 'all',
},
}

const client = new ApolloClient({
cache: new InMemoryCache(),
link: link,
defaultOptions:defaultOptions
})


function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
          <Routes>
             <Route path="/" element={<LoginPage/>}></Route>
             <Route path="/chat" element={<ChatPage/>}></Route>
          </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
