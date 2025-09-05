import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SimpleSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
}

const SimpleSelect = React.forwardRef<HTMLDivElement, SimpleSelectProps>(
  ({ value, onValueChange, placeholder, children, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value)
    const [selectedLabel, setSelectedLabel] = React.useState("")

    React.useEffect(() => {
      setSelectedValue(value)
      // Find the selected option label
      const selectedOption = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.props.value === value
      )
      if (selectedOption && React.isValidElement(selectedOption)) {
        setSelectedLabel(selectedOption.props.children)
      }
    }, [value, children])

    const handleSelect = (newValue: string, newLabel: string) => {
      setSelectedValue(newValue)
      setSelectedLabel(newLabel)
      setIsOpen(false)
      onValueChange(newValue)
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md">
            <div className="p-1">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return (
                    <button
                      key={child.props.value}
                      type="button"
                      onClick={() => handleSelect(child.props.value, child.props.children)}
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        selectedValue === child.props.value && "bg-accent text-accent-foreground"
                      )}
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {selectedValue === child.props.value && (
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      {child.props.children}
                    </button>
                  )
                }
                return child
              })}
            </div>
          </div>
        )}
        
        {/* Click outside to close */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    )
  }
)

SimpleSelect.displayName = "SimpleSelect"

interface SimpleSelectItemProps {
  value: string
  children: React.ReactNode
}

const SimpleSelectItem = ({ value, children }: SimpleSelectItemProps) => {
  return <div data-value={value}>{children}</div>
}

SimpleSelectItem.displayName = "SimpleSelectItem"

export { SimpleSelect, SimpleSelectItem }
