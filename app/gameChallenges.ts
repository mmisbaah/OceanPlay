import {challengeFor} from "./level1Games";
import {level2Challenge} from "./level2Games";
import {level3Challenge} from "./level3Games";
import {level4Challenge} from "./level4Games";
import {level5Challenge} from "./level5Games";
import {level6Challenge} from "./level6Games";
import {level7Challenge} from "./level7Games";
const generators=[challengeFor,level2Challenge,level3Challenge,level4Challenge,level5Challenge,level6Challenge,level7Challenge];
const places=["Malé harbour","Addu mangroves","Fuvahmulah beach","Baa Atoll reef","Kulhudhuffushi jetty","an island school","a coconut grove","a quiet lagoon","the fish market","a dhoni deck","a coral nursery","a turtle beach","the community library","a rainy harbour","the school garden","a seagrass bay","the island clinic","a shaded park","a boatyard","the sports ground"];
const moments=["at sunrise","after school","before the ferry","during reef club","after a rain shower"];
export function gameChallenge(level:number,game:number,stage:number,index:number){
 const q=generators[level](game,stage,index),place=places[(stage-1)%places.length],moment=moments[index];
 return {...q,prompt:`Mission ${stage}.${index+1} — ${place}, ${moment}: ${q.prompt}`};
}
