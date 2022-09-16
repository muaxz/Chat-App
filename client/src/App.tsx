import React, { useEffect } from 'react';
import logo from './logo.svg';
import LeftSide from "./components/leftSide/leftSide"
import MiddleSide from "./components/middleSide/middleSide"
import RightSide from "./components/rightSide/rightSide"
import {Route,Routes,BrowserRouter} from "react-router-dom"
import {ApolloClient,ApolloProvider,HttpLink,DefaultOptions,from,InMemoryCache} from "@apollo/client"
import {onError} from "@apollo/client/link/error"
import LoginPage from "./pages/login"
import ChatPage from "./pages/chat"
import UserStateProvider from "./context/user-state-context"

import "./app.css"
//file

const errorLink = onError(({graphQLErrors,networkError})=>{
  if(graphQLErrors){
    console.log("error")
  }
})

const link = from([
errorLink,
new HttpLink({uri:"https://chat-app-ts-rjs.herokuapp.com/graphql"})
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

  useEffect(()=>{
      
  },[])


  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserStateProvider>
          <Routes>
             <Route path="/" element={<LoginPage/>}></Route>
             <Route path="/chat" element={<ChatPage/>}></Route>
          </Routes>
        </UserStateProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
