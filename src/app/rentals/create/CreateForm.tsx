'use client'
import { PropertySchema, propertySchema } from '@/zod-schemas/propertySchema'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as actions from '@/actions'
import { handleFormServerErrors } from '@/lib/utils'
import { InputWithLabel } from '@/components/form/FormInput'
import SubmitBtn from '@/components/form/SubmitBtn'
import { useRouter } from 'next/navigation'
import { ImageView } from '@/components/form/ImageView'

import placeholderImg from '@/public/images/placeholder.svg'
import { AccommodationInput } from '@/components/form/AccommodationInput'
import { CategoryInput } from '@/components/form/CategoryInput'
import { TextareaInput } from '@/components/form/TextareaInput'
import { CountryInput } from '@/components/form/CountryInput'
import AmenitiesArea from '@/components/form/AmenitiesArea'

const longDesc = `Glamping Tuscan Style in an Aframe Cabin Tent, nestled in a beautiful olive orchard. AC, heat, Queen Bed, TV, Wi-Fi and an amazing view. Close to Weeki Wachee River State Park, mermaids, manatees, Chassahwitzka River and on the SC Bike Path. Kayaks available for rivers. Bathhouse, fire pit, Kitchenette, fresh eggs. Relax & enjoy fresh country air. No pets please. Ducks, hens and roosters roam the grounds. We have a Pot Cake Rescue from Bimini, Retriever and Pom dog. The space is inspiring and relaxing. Enjoy the beauty of the orchard. Spring trees are in blossom and harvested in Fall. We have a farm store where we sell our farm to table products`
interface Props {}
export default function CreatePropertyForm({}: Props) {
  const router = useRouter()

  const formMethods = useForm<PropertySchema>({
    resolver: zodResolver(propertySchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      tagline: 'Dream Getaway Awaits You Here',
      price: 0,
      category: '',
      description: longDesc,
      country: '',
      guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      amenities: '[]',
      image: '',
    },
  })

  const {
    handleSubmit,
    setError,
    getValues,
    register,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = formMethods

  console.log(
    `CreatePropertyForm values:${JSON.stringify(getValues(), null, 3)}`
  )
  const onSubmit = async () => {
    const formValues = getValues()
    console.log(formValues)
    const r = await actions.createProperty(formValues)
    if (r.status === 'error') {
      handleFormServerErrors<PropertySchema>(r.errors, setError)
    } else {
      router.refresh()
      router.push('/')
    }
  }

  return (
    <section>
      <h1 className=' text-2xl font-semibold mb-8 capitalize'>New property</h1>
      <div className='border p-8 rounded-md '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-10'>
            <ImageView
              name='image'
              setValue={setValue}
              setError={setError}
              error={errors.image?.message as string}
              defaultValue={placeholderImg}
              label='Upload Image'
              value={getValues('image')}
            />
          </div>
          <div className='grid md:grid-cols-2 mt-4 gap-4'>
            <InputWithLabel
              type='text'
              name='name'
              defaultValue={getValues('name')}
              register={register('name')}
              error={errors.name?.message}
            />

            <InputWithLabel
              type='text'
              name='tagline'
              defaultValue={getValues('tagline')}
              register={register('tagline')}
              error={errors.tagline?.message}
            />

            <InputWithLabel
              type='number'
              name='price'
              defaultValue={getValues('price')}
              register={register('price')}
              error={errors.price?.message}
            />

            <CategoryInput
              label='category'
              defaultValue={getValues('category')}
              setValue={setValue}
              error={errors.category?.message}
            />

            <CountryInput
              label='country'
              defaultValue={getValues('country')}
              setValue={setValue}
              error={errors.category?.message}
            />
          </div>
          <TextareaInput
            name='description'
            defaultValue={getValues('description')}
            register={register('description')}
            error={errors.description?.message}
          />
          <div className='grid grid-cols-1 mt-4 gap-4'>
            <h3 className='text-2xl'>Accommodations</h3>
            <AccommodationInput
              name='guests'
              description='Specify the number of guests'
              defaultValue={getValues('guests')}
              register={register('guests')}
              setValue={setValue}
              error={errors.guests?.message}
            />

            <AccommodationInput
              name='bedrooms'
              description='Specify the number of bedrooms'
              defaultValue={getValues('bedrooms')}
              register={register('bedrooms')}
              setValue={setValue}
              error={errors.bedrooms?.message}
            />

            <AccommodationInput
              name='beds'
              description='Specify the number of beds'
              defaultValue={getValues('beds')}
              register={register('beds')}
              setValue={setValue}
              error={errors.beds?.message}
            />

            <AccommodationInput
              name='baths'
              description='Specify the number of baths'
              defaultValue={getValues('baths')}
              register={register('baths')}
              setValue={setValue}
              error={errors.baths?.message}
            />
          </div>

          <div>
            <h3 className=' my-5 text-2xl'>Amenities</h3>
            <AmenitiesArea
              defaultValue={getValues('amenities')}
              setValue={setValue}
            />
          </div>

          {errors.root?.serverError && (
            <p className=' text-danger text-sm'>
              {errors.root.serverError.message}
            </p>
          )}
          <div className=' flex flex-row items-center gap-6 mt-10'>
            <SubmitBtn
              isSubmitting={isSubmitting}
              isValid={isValid}
              label='Create Rental'
              onActionLabel='Creating...'
            />
          </div>
        </form>
      </div>
    </section>
  )
}
