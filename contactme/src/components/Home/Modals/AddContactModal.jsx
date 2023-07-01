import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../elements/Form/FormInput'

const AddContactModal = () => {

    const formik = useFormik({
        initialValues:{
            dp:"",
            gender:"female",
            name:"",
            email:"",
            phone:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .required('Name required'),
            email: Yup.string()
            .required('Email required')
            .email('Please enter a valid email address'),
            phone: Yup.string()
            .required('Phone number required')
            
        })
    })

  return (
    <div className={`bg-white m-auto relative rounded-lg py-8 px-5 md:py-8 md:px-10 z-50 w-[95%] max-w-sm h-fit`}>
        <h2 className='text-xl md:text-2xl text-slate-950 font-semibold text-center'>Add New Contact</h2>

        <form action="" className='flex flex-col gap-4 pt-6'>
            <FormInput inputId={'name'} inputName={'name'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.name} fieldError={formik.touched.name && formik.errors.name} />
            <FormInput inputId={'email'} inputName={'email'} inputType={"email"} inputLabel={'Contact Email'} inputPlaceholder={"Enter email"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} />
        </form>
    </div>
  )
}

export default AddContactModal