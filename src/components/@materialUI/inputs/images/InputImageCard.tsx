import InputImage from "./InputImage";
import { motion } from "framer-motion";
import { Control, useController } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Fragment } from "react";
import { varFadeInLeft } from "../../animate/variants/fade";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { ImageField } from "@/language/structure/inputs/attachements";

type Props = {
  isDisabled?: boolean;
  name: string;
  control: Control<any>;
  field: ImageField | undefined;
};
const InputImageCard: React.FC<Props> = ({
  name,
  field,
  control,
  isDisabled,
}) => {
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  //console.log(value);

  const { languageData } = useLanguage();
  const imageLabels = languageData?.inputs.attachements.media.labels;
  return (
    <Card className="bg-transparent border-2 border-foreground-200 select-none ">
      <CardHeader className="flex flex-row justify-center">
        <p className="text-lg">{field?.label}</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-2 items-center">
        <motion.div
          {...varFadeInLeft}
          style={{
            height: 250,
          }}
          className="justify-center w-full"
        >
          <InputImage
            isDisabled={isDisabled}
            imagePlaceholder={field?.placeholder}
            control={control}
            name={name}
            squared
            maxSize={10}
          />
        </motion.div>
        <div className="text-[10px] text-center text-foreground-500">
          {error ? (
            <p className="text-danger">{error.message}</p>
          ) : (
            <Fragment>
              <p>{imageLabels?.authorizedFiles} *.jpeg *.jpg *.png</p>
              <p className="capitalize">{imageLabels?.maxFileSize(3.1)}</p>
            </Fragment>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default InputImageCard;
