import IntroCard from './IntroCard';
import ExperienceStack from './ExperienceStack';
import SceneGate from './SceneGate';
import GraphicGrid from './GraphicGrid';

// Full flow:
//   1. IntroCard       -- "Product Engineer" card
//   2. ExperienceStack -- two stacked, hover-to-unroll job cards (id="work")
//   3. SceneGate       -- click-to-open "Scene?" door gate. The 5-project
//                         Namma Metro train showcase now lives INSIDE this
//                         component, revealed once the doors open (id="best-work")
//   4. GraphicGrid      -- unchanged, the "Cooked" design grid
export default function Projects(){
  return (
    <>
      <IntroCard />
      <ExperienceStack />
      <SceneGate />
      <GraphicGrid />
    </>
  );
}
