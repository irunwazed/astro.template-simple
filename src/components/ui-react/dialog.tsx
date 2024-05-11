import * as React from "react"
import cn from "@/libs/cn"
import { XSquareIcon } from "lucide-react"

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    isShow: boolean,
    setIsShow: any,
}


const Dialog = React.forwardRef<
    HTMLDivElement,
    DialogProps
>(({ className, isShow, setIsShow, children, ...props }, ref) => {
    return (
        <div className={cn("fixed inset-0 flex items-center justify-center ", (isShow ? "" : " invisible"))}>
            <div onClick={() => setIsShow(false)} className="fixed w-full h-full backdrop-blur-sm bg-black/50">
            </div>
            <div
                ref={ref}
                className={cn(
                    "z-[100] rounded-lg border bg-card text-card-foreground shadow-sm",
                    className
                )}
                {...props}
            >
                <div className="relative">
                    <div className="absolute   -top-[3px] -right-[3px]" onClick={() => setIsShow(false)}><XSquareIcon /></div>
                </div>
                {children}
            </div>
        </div>
    )
})
Dialog.displayName = "Dialog"


const DialogHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 px-6 pt-5 pb-3 border-b border-slate-100", className)}
        {...props}
    />
))
DialogHeader.displayName = "DialogHeader"


const DialogTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

const DialogContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-2", className)} {...props} />
))
DialogContent.displayName = "DialogContent"

const DialogFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center px-6 pb-5 pt-2 border-t border-slate-100", className)}
        {...props}
    />
))
DialogFooter.displayName = "DialogFooter"

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter }