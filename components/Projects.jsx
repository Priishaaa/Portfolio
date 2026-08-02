import MetroScene from './MetroScene';
import TrafficScene from './TrafficScene';
import GraphicGrid from './GraphicGrid';

// This file used to be a plain project list. It's now three scroll-driven
// scenes in sequence:
//   1. MetroScene   -- the metro-doors "Welcome to Bangalore" intro
//   2. TrafficScene -- the street illustration where all 5 projects
//                      reveal one by one as you scroll (id="work", so the
//                      navbar's "Work" link still lands here)
//   3. GraphicGrid  -- the hover-to-reveal "Cooked" design grid
//
// See MetroScene.jsx, TrafficScene.jsx and GraphicGrid.jsx for the actual
// implementations -- kept separate because each one is a fairly different
// piece of interaction.
export default function Projects(){
  return (
    <>
      <MetroScene />
      <TrafficScene />
      <GraphicGrid />
    </>
  );
}
