"use client"
import { UpdateSchema, updateSchema } from "@/zod-schemas/profileSchema"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as actions from "@/actions"
import { handleFormServerErrors } from "@/lib/utils"
import { Profile } from "@prisma/client"
import { InputWithLabel } from "@/components/form/FormInput"
import SubmitBtn from "@/components/form/SubmitBtn"
import { ImageView } from "@/components/form/ImageView"
import { useRouter } from "next/navigation"

interface Props {
  profile: Profile
}
export default function UpdateProfilePage({
  profile: { firstName, lastName, profileImage, username },
}: Props) {
  const router = useRouter()

  const formMethods = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    mode: "onTouched",
  })

  const {
    handleSubmit,
    setError,
    getValues,
    register,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = formMethods

  const onSubmit = async () => {
    const formValues = getValues()
    console.log(formValues)
    const r = await actions.updateProfile(formValues)
    if (r.status === "error") {
      handleFormServerErrors<UpdateSchema>(r.errors, setError)
    } else {
      router.refresh()
      router.push("/")
    }
  }

  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-8 capitalize">user profile</h1>
      <div className="border p-8 rounded-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10">
            <ImageView
              name="profileImage"
              setValue={setValue}
              setError={setError}
              error={errors.profileImage?.message as string}
              label="Upload Image"
              value={getValues("profileImage") || profileImage}
            />
          </div>
          <div className="grid md:grid-cols-2 mt-4 gap-4">
            <InputWithLabel
              type="text"
              name="firstName"
              defaultValue={firstName}
              register={register("firstName")}
              error={errors.firstName?.message}
            />

            <InputWithLabel
              type="text"
              name="lastName"
              defaultValue={lastName}
              register={register("lastName")}
              error={errors.lastName?.message}
            />

            <InputWithLabel
              type="text"
              name="username"
              defaultValue={username}
              register={register("username")}
              error={errors.username?.message}
            />

            {errors.root?.serverError && (
              <p className=" text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
          </div>
          <div className=" flex flex-row items-center gap-6 ">
            <SubmitBtn
              isSubmitting={isSubmitting}
              isValid={isValid}
              label="Update"
              onActionLabel="Updating..."
            />
          </div>
        </form>
      </div>
    </section>
  )
}
