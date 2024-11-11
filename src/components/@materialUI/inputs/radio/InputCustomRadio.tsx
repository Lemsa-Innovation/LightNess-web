import { Chip, VisuallyHidden, tv, useRadio } from "@nextui-org/react";
import { CheckCircle2, Circle } from "lucide-react";

type Props = {
    value: string
    label: string
    isDisabled?: boolean
}
function InputCustomRadio({ label, value, isDisabled }: Props) {
    const {
        isSelected,
        isFocusVisible,
        getLabelProps,
        getBaseProps,
        getInputProps

    } = useRadio({
        value,
    })

    const radio = tv({
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


    const styles = radio({ isSelected, isFocusVisible })

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
                    (isSelected || isDisabled) ? <CheckCircle2 size={18} className="text-primary" /> : <Circle size={18} />
                }
                //{...getLabelProps()}
            >
                <p className='text-sm'>
                    {label}
                </p>
            </Chip>
        </label>
    )
}

export default InputCustomRadio;