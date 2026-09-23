export default function Container({ className = '', children, as: Tag = 'div', ...props }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`} {...props}>
      {children}
    </Tag>
  )
}
