import {gql} from "@apollo/client"


const CreateUser = gql`
    Mutation CreateUser($userName:$String!){
        createUser(){
            state
        }
    }
`


const CreateMessage = gql`
    Mutation CreateMessage(){
        createMessage(){

        }
    }
`