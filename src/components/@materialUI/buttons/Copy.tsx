import { Button } from "@heroui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

function CopyButton({ value }: { value: string }) {
  const [icon, setIcon] = useState(<Icon icon="mdi:content-copy" />); // État pour gérer le contenu du bouton
  const [isCopying, setIsCopying] = useState(false); // État pour déclencher l'animation

  const copyToClipboard = () => {
    setIsCopying(true);
    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log("Texte copié dans le presse-papiers:", value);
        // Changement temporaire du contenu du bouton à un checkmark
        setIcon(<Icon icon="mdi:check" />);
        // Réinitialisation du contenu du bouton après 5 secondes
        setTimeout(() => {
          setIcon(<Icon icon="mdi:content-copy" />);
          setIsCopying(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Erreur lors de la copie dans le presse-papiers:", err);
        setIsCopying(false);
      });
  };
  return (
    <Button
      size="sm"
      isIconOnly
      className="bg-transparent"
      onPress={() => copyToClipboard()}
    >
      <motion.span
        animate={{ opacity: isCopying ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: isCopying ? "inline-block" : "none" }}
      >
        {icon}
      </motion.span>
      <motion.span
        animate={{ opacity: isCopying ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: isCopying ? "none" : "inline-block" }}
      >
        {icon}
      </motion.span>
    </Button>
  );
}

export default CopyButton;
