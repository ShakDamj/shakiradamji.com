import { Translatable } from '../components/Translatable';
import { JobPosition, JobPositionView } from '../entities/JobPosition';

export interface ProfessionalExperiencesProps {
  jobPositions: JobPosition[];
}

export function ProfessionalExperiences({ jobPositions }: ProfessionalExperiencesProps) {
  return (
    <section>
      <Translatable
        value={{
          en: 'Professional Experience',
          es: 'Experiencia Profesional',
        }}
        render={x => <h2>{x}</h2>}
      />

      {jobPositions.reverse().map(x => (
        <JobPositionView {...x} />
      ))}
    </section>
  );
}
