import { useLoaderData } from '@remix-run/react'

export function loader() {
  return [
    {
      answer: 'This is answer for this question',
      question: 'This is content of the question, asking you...?',
      title: 'This is first question',
    },
  ]
}

export default function Index() {
  const data = useLoaderData()
  return (
    <main className="text-base">
      <h1 className="text-xl">Learn Loop</h1>
      <code>{JSON.stringify(data, null, 2)}</code>
    </main>
  )
}
