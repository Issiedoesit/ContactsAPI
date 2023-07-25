import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../elements/Form/FormInput'
import PhoneInput from '../../elements/Form/PhoneInput'
import {FaUserAlt} from "react-icons/fa"
import axios from "axios"
import FormFileInput from '../../elements/Form/FormFileInput'
import useFileUpload from '../../../utils/useFileUpload'


const AddContactModal = ({mutate, setIsModalOpen}) => {

    const [submitting, setSubmitting] = useState(false)

    const [dpType, setDpType] = useState("upload")

    const dpTypeOptions = [
        {
            id:"upload",
            name:"Upload"
        },
        {
            id:"url",
            name:"URL"
        }
    ]

    const formik = useFormik({
        initialValues:{
            dp:"",
            dp_url:"",
            gender:"",
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
            .required('Phone number required'),
            gender: Yup.string()
            .required('Gender required'),
            dp: Yup.mixed()
            .nullable()
            .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
              // Check file size only if the dp is not empty and is a file
              return !value || (value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE);
            }),
            dp_url: Yup.
            string()
            .nullable()
            .url('Format is url')
        })
    })


    const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.dp, 'image', 'contacts')


    const addContact = () => {

        // console.log(Object.keys(formik.errors).length);
        // console.log(formik.errors);
        // console.log(formik.values.dp);

        setSubmitting(true)
        if(Object.keys(formik.errors).length !== 0){
            setSubmitting(false)
            return
        }
        

        const {name, email, phone, gender} = formik.values

        const dp = dpType == "upload" ? uploadedImageUrl : formik.values.dp_url

        try {
            axios.post(`${import.meta.env.VITE_BASE_URL}/add`, {name:name, email:email, phone:phone, gender:gender, dp:dp})
            .then((res)=>{
                // console.log('res => ', res);
                mutate()
            })
            .catch((err) => {
                console.error('Error => ', err);
            })
            setSubmitting(false)
            formik.resetForm()
            setIsModalOpen(false)
        } catch (error) {
            setSubmitting(false)
        }

    }


    const handleCancel = () => {
        formik.setFieldValue('dp', '')
        setUploadedImageUrl('')
      }

  return (
    <div className={`bg-white m-auto relative rounded-lg py-8 px-5 md:py-8 md:px-10 z-50 w-[95%] max-w-sm h-fit`}>
        <h2 className='text-xl md:text-2xl text-slate-950 font-semibold text-center'>Add New Contact</h2>

        <form action="" className='flex flex-col gap-4 pt-6'>
            <div className='bg-gray-300 p-1 w-fit rounded-md'>
                {dpTypeOptions.map((option, idx)=>{
                    return <button type='button' onClick={()=>{setDpType(option.id)}} key={idx} className={`${option.id == dpType ? "text-white bg-slate-950" : "text-slate-950 bg-transparent"} font-medium py-2 px-3 rounded-md transition-all ease-in-out duration-300`}>{option.name}</button>
                })}
            </div>
           {
               dpType === 'upload'
               ?
                <FormFileInput formik={formik} fileValue={formik.values.dp} errorUpload={errorUpload} setErrorUpload={setErrorUpload} setUploadedImageUrl={setUploadedImageUrl} handleCancel={handleCancel} handleFileUpload={handleFileUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} actionText={'Choose dp'} fileInputId={'dp'} fileInputName={'dp'} handleBlur={formik.handleBlur} fieldError={formik.touched.dp && formik.errors.dp} />
                :
                <FormInput inputId={'dp_url'} inputName={'dp_url'} inputLabel={'Contact Photo URL'} inputPlaceholder={'Enter URL'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.dp_url} fieldError={formik.touched.dp_url && formik.errors.dp_url} />
           }
            <FormInput inputId={'name'} inputName={'name'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.name} fieldError={formik.touched.name && formik.errors.name} />
            <FormInput inputId={'email'} inputName={'email'} inputType={"email"} inputLabel={'Contact Email'} inputPlaceholder={"Enter email"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} />
            <fieldset className={`w-full flex flex-col gap-2.5`}>
                <label htmlFor="phone" className={`text-gray-600 text-sm font-medium`}>Contact Phone</label>
                <PhoneInput value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} Placeholder={`Enter Phone`} name={"phone"} id={"phone"} className={`px-4 py-2.5 rounded-five text-black placeholder:text-gray-600 font-spaceGroteskRegular w-full border-2 ${(formik.touched.phone && formik.errors.phone) ? 'border-red-500 focus:border-red-500' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 bg-transparent`} />
                {(formik.touched.phone && formik.errors.phone) && <p className='text-red-500 text-xs font-medium'>{formik.errors.phone}</p>}
            </fieldset>
            <fieldset className={`w-full flex flex-col gap-2.5`}>
                <label htmlFor="gender" className={`text-gray-600 text-sm font-medium`}>Contact gender</label>
                <select value={formik.values.gender} onBlur={formik.handleBlur} onChange={formik.handleChange} Placeholder={`Enter gender`} name={"gender"} id={"gender"} className={`px-4 py-2.5 rounded-five text-black bg-transparent placeholder:text-gray-600 font-spaceGroteskRegular w-full border-2 ${(formik.touched.gender && formik.errors.gender) ? 'border-red-500 focus:border-red-500' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 bg-transparent`} >
                    <option value="" selected disabled>Choose gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    {/* <option value="prefer not to say">Prefer not to say</option> */}
                </select>
                {(formik.touched.gender && formik.errors.gender) && <p className='text-red-500 text-xs font-medium'>{formik.errors.gender}</p>}
            </fieldset>
            <div className={`flex items-center justify-center`}>
                <button type='button' onClick={addContact} disabled={submitting} className={`bg-slate-950 text-slate-100 disabled:bg-slate-500 rounded-lg px-3 py-1.5 hover:drop-shadow-lg hover:ring-2 hover:ring-slate-950 hover:ring-offset-1 transition-all duration-300 ease-in-out  `}>
                    Create Contact
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddContactModal