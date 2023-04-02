import clsx from 'clsx'

type CardProps = JSX.IntrinsicElements['div']
type CardTitleProps = JSX.IntrinsicElements['h2']
type CardBodyProps = JSX.IntrinsicElements['div']

function CartTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h2 className={clsx('line-clamp-1 text-xl', className)} {...props}>
      {children}
    </h2>
  )
}

function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div
      className={clsx('mt-3 line-clamp-4 text-slate-600', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx('rounded-md border border-slate-200 p-6', className)}
      {...props}
    />
  )
}

Card.Title = CartTitle
Card.Body = CardBody
