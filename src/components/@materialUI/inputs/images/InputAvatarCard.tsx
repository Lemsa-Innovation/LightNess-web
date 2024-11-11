import {motion} from 'framer-motion';
import {Control, useController} from "react-hook-form";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {useLanguage} from '@/contexts/language/LanguageContext';
import {Fragment} from 'react';
import {varFadeInLeft} from '../../animate/variants/fade';
import InputAvatar from './InputAvatar';

type Props = {
    name: string
    control: Control<any>
    variant: "user"
}
const InputAvatarCard: React.FC<Props> = ({
    name,
    control,
    variant
}) => {
    const {fieldState: {error}, field: {value}} = useController({
        name,
        control,
    });

    //console.log(value);

    const {languageData} = useLanguage()
    const imageLabels = languageData?.inputs.attachements.media.labels
    const avatarImage = languageData?.inputs.users.fields.profilePhoto

    return (
        <Card className=' bg-transparent border-2 border-foreground-200 select-none '>
            <CardHeader className='flex flex-row justify-center'>
                <p className='text-lg font-mono'>
                    {avatarImage?.label}
                </p>
            </CardHeader>
            <CardBody className='flex flex-col gap-2 items-center'>
                <motion.div
                    {...varFadeInLeft}
                    className="justify-center size-40">
                    <InputAvatar
                        imagePlaceholder={avatarImage?.placeholder}
                        control={control}
                        name={name}
                    />
                </motion.div>
                <div className='text-[10px] text-center text-foreground-500'>
                    {error ?
                        <p className='text-danger'>
                            {error.message}
                        </p> : <Fragment>
                            <p>{imageLabels?.authorizedFiles} *.jpeg *.jpg *.png</p>
                            <p className='capitalize'>{imageLabels?.maxFileSize.replace('{size}', '3.1')} </p>
                        </Fragment>
                    }
                </div>
            </CardBody>
        </Card>
    );
}

export default InputAvatarCard;