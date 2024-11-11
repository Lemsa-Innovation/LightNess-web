"use client"
import {logout} from "@/firebase/auth/functions";
import {AUTH_ROUTES} from "@/routes";
import {Button, Card, CardBody, CardFooter, CardHeader, Navbar, NavbarBrand} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useLoadingCallback} from "react-loading-hook";

function NotSetupPage() {
    const {push} = useRouter()
    const [handleBack, isLoading] = useLoadingCallback(async () => {
        await logout()
        push(AUTH_ROUTES.auth)
    })

    return (
        <div className="flex flex-col w-screen h-screen ">
            <Navbar
                isBordered
                position="static"
                maxWidth="full"
            >
                <NavbarBrand>
                    <p className="font-bold">
                        Wassel Eats Console
                    </p>
                </NavbarBrand>
            </Navbar>
            <div className="flex items-center justify-center w-full h-full">
                <Card
                    isBlurred
                    className="w-unit-9xl"
                >
                    <CardHeader className="justify-center">
                        <p className="font-semibold text-xl">
                            {"Compte non configuré"}
                        </p>
                    </CardHeader>
                    <CardBody>
                        <p>
                            {"Votre compte n'est pas configuré pour Wassel Eats. Vous pouvez vous déconnecter et réessayer, ou contacter restaurants@wassel.com afin d'obtenir de l'aide."}
                        </p>
                    </CardBody>
                    <CardFooter>
                        <Button
                            isLoading={isLoading}
                            onClick={handleBack}
                        >
                            {"Revenir a la connexion"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>



        </div>
    );
}

export default NotSetupPage;