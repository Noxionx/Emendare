import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
}

export const Columns = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <div className={'columns ' + className} {...rest}>
      {children}
    </div>
  )
)
