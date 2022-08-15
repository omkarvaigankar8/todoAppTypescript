import React from 'react';
import { useFormContext } from 'react-hook-form';
import './form.scss';
interface FormProps {
	children?: React.ReactNode;
	onSubmit: (e:any) => void;
}
const Form: React.FC<FormProps> = ({ children, onSubmit }: FormProps) => {
	const methods = useFormContext();
	const { handleSubmit } = methods;
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form'>
			{children}
		</form>
	);
};

export default Form;
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
