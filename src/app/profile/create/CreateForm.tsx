"use client"
import { ProfileSchema, profileSchema } from "@/zod-schemas/profileSchema"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputWithLabel } from "../../../components/form/FormInput"
import SubmitBtn from "../../../components/form/SubmitBtn"
import { useToast } from "@/hooks/use-toast"
import * as actions from "@/actions"
import { handleFormServerErrors } from "@/lib/utils"

export default function CompleteProfilePage() {
  const { toast } = useToast()
  const formMethods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })

  const {
    handleSubmit,
    setError,
    getValues,
    register,
    formState: { errors, isValid, isSubmitting },
  } = formMethods

  const onSubmit = async () => {
    const formValues = getValues()
    const r = await actions.saveProfile(formValues)

    if (r.status === "error") {
      handleFormServerErrors<ProfileSchema>(r.errors, setError)
    } else {
      toast({ description: "Profile saved successfully!" })
    }
  }

  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-8 capitalize">
        complete profile
      </h1>
      <div className="border p-8 rounded-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 mt-4 gap-4">
            <InputWithLabel
              type="text"
              name="firstName"
              defaultValue={getValues("firstName")}
              register={register("firstName")}
              error={errors.firstName?.message}
            />

            <InputWithLabel
              type="text"
              name="lastName"
              defaultValue={getValues("lastName")}
              register={register("lastName")}
              error={errors.lastName?.message}
            />

            <InputWithLabel
              type="text"
              name="username"
              defaultValue={getValues("username")}
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
              label="submit"
              onActionLabel="submitting"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
