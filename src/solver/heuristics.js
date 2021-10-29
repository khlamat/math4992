import _ from "lodash";
import { getXYCoord } from './utility';

export const manhattanDist = (tiles) => {
  let dist = 0;
  // console.log(tiles)
  for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === 15) {
        continue;
      }
      const targetXpos = tiles[i] % 4;
      const targetYpos = Math.floor(tiles[i] / 4);
      const [currentXpos, currentYpos] = getXYCoord(i);
      const t_dist = Math.abs(currentXpos - targetXpos) + Math.abs( currentYpos - targetYpos);
      dist += t_dist;
			// console.log(`i:${i % 4},j:${ Math.floor(i / 4)},targetYpos:${targetYpos},targetXpos:${targetXpos}`)
			// console.log(t_dist)

  }
  return dist;
};
