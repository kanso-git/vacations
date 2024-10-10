"use client"
import { ReviewSchema, reviewSchema } from "@/zod-schemas/reviewSchema"
import React, { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as actions from "@/actions"
import { handleFormServerErrors } from "@/lib/utils"
import SubmitBtn from "@/components/form/SubmitBtn"
import { useRouter } from "next/navigation"
import { TextareaInput } from "@/components/form/TextareaInput"
import { RateInput } from "@/components/form/RateInput"
import Title from "../Title"
import { Button } from "@/components/ui/button"

interface Props {
  propertyId: string
}
export default function ReviewForm({ propertyId }: Props) {
  const router = useRouter()
  const reviewDivRef = useRef<HTMLDivElement | null>(null)

  const formMethods = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    mode: "onTouched",
    defaultValues: {
      text: "",
      rate: 3,
    },
  })

  const {
    handleSubmit,
    setError,
    getValues,
    register,
    setValue,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = formMethods

  console.log(`ReviewForm values:${JSON.stringify(getValues(), null, 3)}`)
  const onSubmit = async () => {
    const formValues = getValues()
    const r = await actions.createOneReview(formValues)
    if (r.status === "error") {
      handleFormServerErrors<ReviewSchema>(r.errors, setError)
    } else {
      reset()
      router.refresh()
      router.push(`/properties/${propertyId}`)
    }
  }

  const toggleVisibility = () => {
    if (reviewDivRef.current) {
      const value = reviewDivRef.current.style.display
      reviewDivRef.current.style.display = value === "block" ? "none" : "block"
    }
  }
  useEffect(() => {
    setValue("propertyId", propertyId)
  }, [setValue, propertyId])

  return (
    <section className="mt-4">
      <Title text="What people think about this property?" />

      <Button className="mb-4" onClick={toggleVisibility}>
        Leave a review
      </Button>
      <div className="border p-8 rounded-md hidden" ref={reviewDivRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RateInput
            label="Rate"
            setValue={setValue}
            error={errors.rate?.message}
          />

          <TextareaInput
            name="Review feedback"
            defaultValue={getValues("text")}
            register={register("text")}
            error={errors.text?.message}
          />

          {errors.root?.serverError && (
            <p className="text-danger text-sm">
              {errors.root.serverError.message}
            </p>
          )}
          <div className=" flex flex-row items-center gap-6 mt-10">
            <SubmitBtn
              isSubmitting={isSubmitting}
              isValid={isValid}
              label="Create Review"
              onActionLabel="Creating..."
            />
          </div>
        </form>
      </div>
    </section>
  )
}
