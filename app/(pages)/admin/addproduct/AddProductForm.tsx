'use client'
import CategoryInput from '@/app/components/ui/Inputs/CategoryInput'
import CustomCheckBox from '@/app/components/ui/Inputs/CustomCheckBox'
import Input from '@/app/components/ui/Inputs/Input'
import SelectColor from '@/app/components/ui/Inputs/SelectColor'
import TextArea from '@/app/components/ui/Inputs/TextArea'
import Button from '@/app/components/ui/product/Button'
import Heading from '@/app/components/ui/product/Heading'
import { categories } from '@/lib/Categories'
import { colors } from '@/lib/Colors'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from '@/lib/firebase'

export type ImageType = {
    color: string
    colorCode: string
    image: File | null
}
export type UploadedImageType = {
    color: string
    colorCode: string
    image: string
}

const AddProductForm = () => {
    //
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, SetIsProductCreated] = useState(false)
    //test
    // console.log("image: ", images);

    //
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            brand: '',
            quantity: '',
            categoryId: '',
            inStock: false,
            image: []
        }
    })
    //
    useEffect(() => {
        setCustomValue('images', images)
    }, [images])
    useEffect(() => {
        if (isProductCreated) {
            reset()
            setImages(null)
            SetIsProductCreated(false)
        }
    }, [isProductCreated])

    const category = watch('category')
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    //
    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }
            return [...prev, value]
        })
    }, [])

    //submit
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Product Date:", data)
        //database
        setIsLoading(true)
        let uploadedImages: UploadedImageType[] = []

        if (!data.category) {
            setIsLoading(false)
            return toast.error('Category is not selected')
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error('No selected image!')
        }
        const handleImageUploads = async () => {
            toast('Creating product, please wait...')
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name
                        //store : npm i formidable
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    // Observe state change events such as progress, pause, and resume
                                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                (error) => {
                                    // Handle unsuccessful uploads
                                    console.log('Error uploading image', error);

                                    reject(error)
                                },
                                () => {
                                    // Handle successful uploads on complete
                                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item, image: downloadURL
                                        })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    }).catch((error) => {
                                        console.log("Error getting the download URL", error);
                                        reject(error)
                                    });
                                }
                            );
                        })
                    }
                }
            }
            catch (error) {
                setIsLoading(false)
                console.log('Error handeling image upload', error);
                return toast.error('Error handeling image upload')
            }
        }
        await handleImageUploads()
        const productData = { ...data, images: uploadedImages }
        console.log("productData", productData);
    }


    const removeImagefromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => {
                    item.color !== value.color
                })
                return filteredImages
            }
            return prev
        })
    }, [])

    return (
        <>
            <Heading title='Add a Product'></Heading>
            {/*  */}
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            {/*  */}
            <Input
                id='price'
                label='Price'
                disabled={isLoading}
                register={register}
                type='number'
                errors={errors}
            />
            <Input
                id='brand'
                label='Brand'
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            {/*  */}
            <TextArea
                id='desciption'
                label='Description'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            {/*  */}
            <CustomCheckBox
                id='inStock'
                label='This product is in stock'
                disabled={isLoading}
                register={register}
            />
            {/*  */}

            <div className='mb-2 font-semibold'>Select a Category</div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => {
                    // if (item.label === 'All') {
                    //     return null
                    // }
                    return (
                        <div key={item.label} className='col-span'>
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            ></CategoryInput>
                        </div>
                    )
                })}
            </div>
            {/*  */}
            <div className='w-full flex flex-col flex-wrap gap-4 h-[500px]'>
                {/*  */}
                <div>
                    <div className='font-bold'>Select the available product colors and upload their images</div>
                    <div className='text-sm'>
                        You must upload an image for each of the color selected otherwise your color selection will be ignored.
                    </div>
                </div>
                {/*  */}
                <div className='grid grid-cols-2 gap-2'>
                    {colors.map((item, index) => {
                        return (
                            <SelectColor
                                key={index}
                                item={item}
                                addImageToState={addImageToState}
                                removeImageFromState={removeImagefromState}
                                isProductCreated={isProductCreated}
                            />
                        )
                    })}
                </div>
            </div>
            <Button label={isLoading ? 'Loading...' : 'Add Product'}
                onClick={handleSubmit(onSubmit)}
            ></Button >

        </>
    )
}

export default AddProductForm
