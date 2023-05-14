import { Form } from '@remix-run/react'
import { Label } from '../Label'
import { Textarea } from '../Textarea'
import { FieldError } from '../Input'

interface CardFormProps {
  defaultValues?: { answer: string; question: string }
  errors?: { answer?: string; question?: string }
  fields: { answer: string; question: string }
  isSubmitting?: boolean
}

export function CardForm({
  defaultValues,
  errors,
  fields,
  isSubmitting,
}: CardFormProps) {
  return (
    <Form className="flex h-full flex-col " id={CardForm.formId} method="post">
      <div className="flex flex-1 flex-col">
        <Label className="mb-2 text-xl" htmlFor={fields.question}>
          Question
        </Label>
        <Textarea
          className="flex-1"
          defaultValue={defaultValues?.question}
          disabled={isSubmitting}
          id={fields.question}
          name={fields.question}
          placeholder="What is the capital city of France?"
          required
        />
        {errors?.question && <FieldError>{errors.question}</FieldError>}
      </div>
      <div className="flex flex-1 flex-col">
        <Label className="mb-2 mt-4 text-xl" htmlFor={fields.answer}>
          Answer
        </Label>
        <Textarea
          className="flex-1"
          defaultValue={defaultValues?.answer}
          disabled={isSubmitting}
          id={fields.answer}
          name={fields.answer}
          placeholder="The capital city of France is Paris."
          required
        />
        {errors?.answer && <FieldError>{errors.answer}</FieldError>}
      </div>
    </Form>
  )
}

CardForm.formId = 'card-form'
