"use client";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="text-sm text-default-500">
              You don&apos;t have permission to access this page. Only
              administrators can view this content.
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button color="primary" onClick={() => router.push("/")}>
              Go to Home
            </Button>
            <Button variant="bordered" onClick={() => router.push("/auth")}>
              Sign In with Different Account
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
