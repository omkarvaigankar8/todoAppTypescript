import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index
// import { useFormContext } from "react-hook-form";
// interface FormProps{
//     children:Element,
//     ref:any,
//     onSubmit:void,
//     autoComplete:any
//     rest:any
// }
// const Form:React.FC<FormProps> = ({ children, ref, onSubmit, autoComplete, ...rest }:FormProps)=> {
//   const methods = useFormContext();
//   const { handleSubmit } = methods;

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       autoComplete={autoComplete ? "on" : "off"}
//       ref={ref}
//       {...rest}
//     >
//       {children}
//     </form>
//   );
// }

// export default Form;
