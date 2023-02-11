import { useLoaderData } from '@remix-run/react'

export function loader() {
  return [
    {
      title: 'This is first question',
      question: 'This is content of the question, asking you...?',
      answer: 'This is answer for this question',
    },
  ]
}

export default function Index() {
  const data = useLoaderData()
  return <div>{JSON.stringify(data, null, 2)}</div>
}
