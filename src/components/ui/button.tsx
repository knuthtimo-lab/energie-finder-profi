import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Energy-specific variants
        solar: "bg-gradient-solar text-white hover:shadow-solar transform hover:scale-105",
        wind: "bg-gradient-wind text-white hover:shadow-wind transform hover:scale-105",
        geo: "bg-gradient-geo text-white hover:shadow-geo transform hover:scale-105",
        battery: "bg-gradient-battery text-white hover:shadow-battery transform hover:scale-105",
        "solar-outline": "border-2 border-solar bg-transparent text-solar hover:bg-solar hover:text-white",
        "wind-outline": "border-2 border-wind bg-transparent text-wind hover:bg-wind hover:text-white",
        "geo-outline": "border-2 border-geo bg-transparent text-geo hover:bg-geo hover:text-white",
        "battery-outline": "border-2 border-battery bg-transparent text-battery hover:bg-battery hover:text-white",
        hero: "bg-gradient-hero text-white hover:shadow-lg transform hover:scale-105 border border-white/20",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-lg px-8 text-base",
        xl: "h-16 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
