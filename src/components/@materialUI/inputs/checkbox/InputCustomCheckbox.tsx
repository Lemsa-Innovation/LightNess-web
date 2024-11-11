import { Chip, VisuallyHidden, tv, useCheckbox } from "@nextui-org/react"
import { CheckCircle2, PlusCircle } from "lucide-react"
import { ReactNode } from "react"

const InputCustomCheckbox: React.FC<{
    code: string
    label?: string
    isDisabled?: boolean
    startContent ?: ReactNode
    endContent ?: ReactNode
}> = ({ label,startContent,endContent ,code, isDisabled }) => {

    const {
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        value: code
    })


    const checkbox = tv({
        slots: {
            base: "border-default hover:bg-default-200",
            content: "text-default-500"
        },
        variants: {
            isSelected: {
                true: {
                    base: "border-primary bg-transparent hover:border-primary-700",
                    content: "dark:text-primary-foreground pl-1"
                }
            },
            isFocusVisible: {
                true: {
                    base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
                }
            }
        }
    })

    const styles = checkbox({ isSelected, isFocusVisible })

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} disabled={isDisabled} />
            </VisuallyHidden>
            <Chip
                isDisabled={isDisabled}
                classNames={{
                    base: styles.base(),
                    content: styles.content()
                }}
                key={label}
                variant="bordered"
                startContent={
                    (isSelected || isDisabled) ? <CheckCircle2 size={18} className="text-primary" /> : <PlusCircle size={18} />
                }
                endContent ={endContent}
                //{...getLabelProps()}
            >
                <p className='text-sm'>
                    {label}
                </p>
            </Chip>
        </label>
    )
}

export default InputCustomCheckbox