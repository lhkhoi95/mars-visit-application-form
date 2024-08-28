"use client";
import { Fragment, useState } from "react";
import PersonalInfo from "./personal-info";
import TravelPreferences from "./travel-preferences";
import HealthAndSafety from "./health-and-safety";
import { Button } from "@/components/ui/button";
import Confirmation from "./confirmation";

const TOTAL_STAGES = 4;

export default function Apply() {
  const [stage, setStage] = useState(1);
  type ProgressType = PersonalInfo | TravelPreferences | HealthAndSafety;

  const [progress, setProgress] = useState<ProgressType[]>([
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
  ]);

  function handleNext(values: any) {
    if (stage === 1) {
      const { fullName, dateOfBirth, nationality, email, phone } = values;
      setProgress((prev) => [
        {
          ...prev[0],
          isCompleted: true,
          fullName,
          dateOfBirth,
          nationality,
          email,
          phone,
        },
        prev[1],
        prev[2],
      ]);
      setStage((prev) => prev + 1);
    } else if (stage === 2) {
      const { departureDate, returnDate, accommodation, specialRequest } =
        values;
      setProgress((prev) => [
        prev[0],
        {
          ...prev[1],
          isCompleted: true,
          departureDate,
          returnDate,
          accommodation,
          specialRequest,
        },
        prev[2],
      ]);
      setStage((prev) => prev + 1);
    } else if (stage === 3) {
      setProgress((prev) => [
        prev[0],
        prev[1],
        {
          ...prev[2],
          isCompleted: true,
          healthDeclaration: values.healthDeclaration,
          emergencyContactName: values.emergencyContactName,
          emergencyContactPhone: values.emergencyContactPhone,
          medicalConditions: values.medicalConditions,
        },
      ]);
      setStage((prev) => prev + 1);
    }
  }
  function handleBack() {
    setStage((prev) => prev - 1);
  }

  function handleStateChange(selectedStage: number) {
    if (selectedStage === 4) {
      const allStagesCompleted = progress.every((s) => s.isCompleted);
      if (allStagesCompleted) setStage(selectedStage);
      return;
    }
    if (selectedStage > 0 && selectedStage < TOTAL_STAGES) {
      const s = progress[selectedStage - 1];
      if (s.isCompleted) {
        setStage(selectedStage);
      }
    }
  }

  // console.log(progress);

  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <StagesIndicator stage={stage} onSelect={handleStateChange} />
      {stage === 1 && <PersonalInfo onNext={handleNext} data={progress[0]} />}
      {stage === 2 && (
        <TravelPreferences
          data={progress[1]}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {stage === 3 && (
        <HealthAndSafety
          data={progress[2]}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {stage === 4 && (
        <Confirmation
          onBack={handleBack}
          data={progress}
          onEdit={handleStateChange}
        />
      )}
    </div>
  );
}

function StagesIndicator({
  stage,
  onSelect,
}: {
  stage: number;
  onSelect: (stageIdx: number) => void;
}) {
  return (
    <div className="container my-4 flex flex-row items-center gap-2 md:w-1/2">
      {[...Array(TOTAL_STAGES)].map((_, index) => (
        <Fragment key={index}>
          <Button
            onClick={() => onSelect(index + 1)}
            className="rounded-full"
            variant={stage > index ? "default" : "outline"}
          >
            {index + 1}
          </Button>
          {index < TOTAL_STAGES - 1 && (
            <div
              className={`h-2 w-full rounded ${
                stage > index ? "bg-primary" : "bg-muted"
              }`}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
