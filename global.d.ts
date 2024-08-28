type PersonalInfo = {
  isCompleted: boolean;
  fullName?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  email?: string | null;
  phone?: string | null;
};

type TravelPreferences = {
  isCompleted: boolean;
  departureDate?: string | null;
  returnDate?: string | null;
  accommodation?: string | null;
  specialRequest?: string | null;
};

type HealthAndSafety = {
  isCompleted: boolean;
  healthDeclaration?: boolean | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  medicalConditions?: string | null;
};
