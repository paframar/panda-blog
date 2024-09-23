import React from 'react'

interface FormRowProps {
  children: React.ReactNode
  label?: string
  error?: string
  visible?: boolean
}

function FormRow({ children, label, error, visible = true }: FormRowProps) {
  if (!visible) return null
  return (
    <>
      <div className="form-row">
        {label && (
          <label className="form-row__label" htmlFor={children.props.id}>
            {label}
          </label>
        )}
        {children}
      </div>
      {error && <p className="form-row__error">{error}</p>}
    </>
  )
}

export default FormRow
