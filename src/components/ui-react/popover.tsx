import * as React from "react"
import cn from "@/libs/cn"

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
    isShow: boolean,
    setIsShow: any,
}

const Popover = React.forwardRef<
    HTMLDivElement,
    PopoverProps
>(({ className, children, isShow, setIsShow, ...props }, ref) => {
    const [floating, setFloating] = React.useState(0)
    const inputRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let rect = inputRef.current?.getBoundingClientRect();
        let posDiv = (rect?.top ?? 0);
        let hDiv = (rect?.height ?? 0);
        let _floating = posDiv + hDiv + 40;
        
        setFloating(prev => prev>0?(prev +posDiv + hDiv > window.innerHeight ? hDiv+40:0):0)
        // if(_floating > window.innerHeight && (hDiv + 40) < posDiv){
        //     setFloating(hDiv + 40);
        // }else{
        //     setFloating(prev => prev>0?(prev +posDiv + hDiv > window.innerHeight ? hDiv+40:0):0)
        // }

    }, [props])  // add , [] for no repeat or no loop

    return (
        <div ref={ref} className={"relative size-1 w-full" +(isShow ? "" : " invisible")}>
            <div onClick={() => setIsShow(false)} className="fixed top-0 left-0 right-0 bottom-0 w-full h-full">
            </div>
            <div className={"relative"} style={{top: -floating}}>
                <div
                    ref={inputRef}
                    className={cn(
                        "z-[101] rounded-lg border bg-popover text-popover-foreground shadow-sm outline-none max-h-[500px] overflow-y-scroll",
                        className
                    )}
                    {...props}
                >{children}</div>
            </div>
        </div>
    )
})
Popover.displayName = "Popover"



export { Popover }