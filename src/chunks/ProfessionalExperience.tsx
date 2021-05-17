import { JobPosition, JobPositionView } from '../entities/JobPosition';

export interface ProfessionalExperiencesProps {
  jobPositions: JobPosition[];
}

export function ProfessionalExperiences({ jobPositions }: ProfessionalExperiencesProps) {
  return (
    <section className="ProfessionalExperiences">
      {jobPositions.map(x => (
        <JobPositionView {...x} />
      ))}
    </section>
  );
}
