import React from 'react'
import {useForm } from 'react-hook-form';

interface Props{
   addTodoHandler :(e: object)=>void;
}
const InputField = ({addTodoHandler}:Props) => {
  const methods = useForm();
  
  const { handleSubmit,register,formState:{errors}} = methods;
  const error = errors['todo'];

  const onSubmit = (data:object) => {
    addTodoHandler(data)
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input  type="text" {...register('todo',{required:true})} />
      <input type="submit" value="Add Todo" />
    </form>
    {error&&<p>Todo cannot be Empty</p>}
    </>
  )
}

export default InputField