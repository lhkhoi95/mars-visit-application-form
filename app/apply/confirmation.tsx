import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ProgressType = PersonalInfo | TravelPreferences | HealthAndSafety;

type ConfirmationProps = {
  data: ProgressType[];
  onEdit: (stage: number) => void;
  onBack: () => void;
};

const DataCard = ({
  title,
  onEdit,
  data,
}: {
  title: string;
  onEdit: (stage: number) => void;
  data: Record<string, any>;
}) => {
  function handleEdit() {
    if (title === "Personal Information") {
      onEdit(1);
    } else if (title === "Travel Preferences") {
      onEdit(2);
    } else if (title === "Health and Safety") {
      onEdit(3);
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            {title}
            <Button onClick={handleEdit} variant="ghost" className="p-2">
              <Edit />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(data).map(
          ([key, value]) =>
            key !== "isCompleted" && (
              <div key={key} className="mb-2">
                <span className="font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                </span>
                <span>
                  {value !== null ? value.toString() : "Not provided"}
                </span>
              </div>
            )
        )}
      </CardContent>
    </Card>
  );
};

const ConfirmationDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Submit Application</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <div className="relative flex flex-col items-center">
          <div className="relative mb-4 h-40 w-full sm:h-48">
            <Image
              src="/confirmation.png"
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="mars"
              className="rounded-t-lg"
            />
          </div>
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-center text-xl sm:text-2xl">
              Thank you!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              Your application to be part of humanity&apos;s greatest adventure
              has been successfully submitted! The red sands of Mars await your
              footprints. Our team of interplanetary experts will carefully
              review your application. Stay tuned for updates as we prepare for
              this historic journey. The next giant leap for mankind could be
              yours!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 sm:mt-6">
            <AlertDialogAction asChild>
              <Link href="/" className="w-full sm:w-auto">
                <Button className="w-full">Confirm</Button>
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function Confirmation({
  data,
  onEdit,
  onBack,
}: ConfirmationProps) {
  const personalInfo = data.find((item) => "fullName" in item) as PersonalInfo;
  const travelPreferences = data.find(
    (item) => "departureDate" in item
  ) as TravelPreferences;
  const healthAndSafety = data.find(
    (item) => "healthDeclaration" in item
  ) as HealthAndSafety;

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Confirmation</h1>
      <p className="mb-4">Please review your information before submitting:</p>

      <DataCard
        title="Personal Information"
        data={personalInfo}
        onEdit={onEdit}
      />
      <DataCard
        title="Travel Preferences"
        data={travelPreferences}
        onEdit={onEdit}
      />
      <DataCard
        title="Health and Safety"
        data={healthAndSafety}
        onEdit={onEdit}
      />

      <div className="mt-6 flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <ConfirmationDialog />
      </div>
    </div>
  );
}
