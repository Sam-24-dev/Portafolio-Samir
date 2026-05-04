import EngineeringHero from '../components/EngineeringHero';
import EngineeringProofStrip from '../components/EngineeringProofStrip';
import EngineeringProjects from '../components/EngineeringProjects';
import EngineeringBridgeProjects from '../components/EngineeringBridgeProjects';
import EngineeringStack from '../components/EngineeringStack';
import EngineeringCertifications from '../components/EngineeringCertifications';
import EngineeringStrengths from '../components/EngineeringStrengths';

const EngineeringPage = () => {
  return (
    <>
      <EngineeringHero />
      <EngineeringProofStrip />
      <EngineeringProjects />
      <EngineeringBridgeProjects />
      <EngineeringStack />
      <EngineeringCertifications />
      <EngineeringStrengths />
    </>
  );
};

export default EngineeringPage;
