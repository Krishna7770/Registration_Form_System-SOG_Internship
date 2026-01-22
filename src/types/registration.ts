export type RegistrationDraft = {
  municipalityId?: string;
  schoolId?: string;
  clubId?: string;

  parentFirstName?: string;
  parentLastName?: string;
  parentEmail?: string;
  parentPhone?: string;

  childFirstName?: string;
  childLastName?: string;
  childDob?: string;

  consent?: boolean;

  childGender?: string;
  additionalInfo?: string;
};
