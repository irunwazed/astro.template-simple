import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "@/libs/cn"

const toastVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Toast = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
    const [show, setShow] = React.useState(true)
    React.useEffect(() => {
      const timeId = setTimeout(() => {
        setShow(false)
      }, 3000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []);
    
    if (!show) {
      return null;
    }
    return (
        <div
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            {...props}
        />
    )
})
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
    />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
))
ToastDescription.displayName = "ToastDescription"

export { Toast, ToastTitle, ToastDescription }
