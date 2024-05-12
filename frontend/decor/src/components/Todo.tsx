// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
// import { Todo } from "./types";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {LOAD_USERS} from '../Graphql/Query'

import { DELETE_TASK} from "../Graphql/Mutation";
import { useMutation } from "@apollo/client";

export function Gettodos() {
    const {error, loading, data} = useQuery(LOAD_USERS)
    const [todos, settodos] = useState([])
    const [deletetask] = useMutation(DELETE_TASK)
    const deltask = (id:number) => {
        deletetask({
            variables: {
                id: id
            }
        }).catch(error => {
            console.error('Mutation Error:', error);
        });
    };
    
    useEffect(()=>{
        if(data){
            settodos(data.tasks);
        }         
        
    }, [data])
    if(loading){
        return "Loading...."
    }
    if(error){
        console.log(error)
    }
    return <div className="my-5 flex flex-col ">
        
        {todos.map((todo)=>{
            return(
                todo.completed === false ?
               <div className="flex justify-center text-2xl">
                <h1 className="mx-5">{todo.title}</h1>  
                <button   onClick={  () =>{
                    deltask(Number(todo.id!))
                }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
               </div> 
               :<div className="flex justify-center text-2xl"> no more tasks left </div>)
        })}
    </div>
}


// export function Todos({todos}:{todos:Todo[]}) {

//     return <div>
//         {todos.map((todo: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; completed: boolean })=>{
//             return <div>
//               <h1>{todo.title}</h1>
//               <button>{todo.completed ==true ? "completed" : "Mark as completed"}</button>
//             </div>
//         })}
//     </div>
// }