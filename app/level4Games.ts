import type {Challenge,Choice} from "./level1Games";

const grammar=[
 ['Aminath ___ to school every day.','walks',['walk','walking'],'🚶‍♀️','Use -s with one person in the present tense.'],
 ['The crabs ___ under the rock.','hide',['hides','hiding'],'🦀','More than one crab uses hide.'],
 ['Yesterday, Hassan ___ the dhoni.','painted',['paints','painting'],'⛵','Yesterday needs a past-tense verb.'],
 ['The turtle is ___ than the crab.','slower',['slow','slowest'],'🐢','Compare two animals with -er.'],
 ['We ___ our books before class.','opened',['opens','opening'],'📚','We need a completed past action.'],
 ['The bright fish swims ___.','quickly',['quick','quicker'],'🐠','Describe how it swims with an adverb.'],
 ['Mariya and I ___ beach bags.','carry',['carries','carrying'],'👜','A plural subject uses carry.'],
 ['This shell belongs to me. It is ___.','mine',['my','me'],'🐚','Choose the possessive pronoun.'],
 ['If it rains, we ___ inside.','will play',['played','plays'],'🌧️','This tells what will happen next.'],
 ['The reef ___ by many tiny fish.','is visited',['visit','visiting'],'🪸','The reef receives the action.']
];
const opinions=[
 ['Our class should grow a small garden.','Plants make the school shady and green.',['Gardens are things.','Green is a word.'],'🌱'],
 ['Children should carry reusable bottles.','Reusable bottles reduce plastic rubbish.',['Bottles can be blue.','Water is wet.'],'🧴'],
 ['The beach needs more rubbish bins.','Bins help visitors keep sand and water clean.',['Bins have lids.','The beach is long.'],'🗑️'],
 ['Reading under a palm is enjoyable.','The shade is cool and stories are fun.',['Palms have leaves.','Books have pages.'],'📖'],
 ['A walking school bus is a good idea.','Friends can walk safely together with an adult.',['Shoes come in pairs.','Roads are grey.'],'🚶'],
 ['We should protect nesting turtles.','Quiet, clean beaches give hatchlings a safer path.',['Turtles have shells.','Sand feels warm.'],'🐢'],
 ['School trips to the reef are useful.','Students can observe real habitats carefully.',['Boats float.','Fish have fins.'],'🤿'],
 ['Our island should plant more palms.','Their roots hold soil and their leaves give shade.',['Coconuts are round.','Trees are tall.'],'🌴']
];
const routes=[
 ['Start at school. Walk east to the jetty. Where are you?','jetty',['library','market'],'🏫 ➡️ ⚓'],
 ['Start at the harbour. Walk north to the market. Where are you?','market',['reef','school'],'⚓ ⬆️ 🧺'],
 ['The library is west of school. Which way leads to the library?','west',['east','south'],'📚 ⬅️ 🏫'],
 ['The clinic is south of the park. Which way leads from the park to the clinic?','south',['north','west'],'🌳 ⬇️ 🏥'],
 ['Sail around the red buoy, then stop at the island. What comes first?','sail around the buoy',['stop at the island','return to school'],'⛵ 🔴 🏝️'],
 ['The reef is east of the beach. Where is the beach from the reef?','west',['east','north'],'🏖️ ⬅️ 🪸'],
 ['Walk north, then turn right. Which direction do you face?','east',['west','south'],'⬆️ ↪️'],
 ['The dhoni moves from Malé to a nearby island. What kind of journey is this?','sea journey',['air journey','walking journey'],'🏙️ ⛵ 🏝️']
];
const visuals=[
 ['A poster shows 4 turtles and 2 crabs. Which animal appears more?','turtles',['crabs','both are equal'],'🐢🐢🐢🐢  🦀🦀'],
 ['A chart shows Monday: 3 books, Tuesday: 5 books. Which day has more?','Tuesday',['Monday','both are equal'],'📊'],
 ['A diagram labels root, trunk and leaf. What is it explaining?','parts of a tree',['types of fish','boat directions'],'🌳'],
 ['A weather table shows sun, sun, rain, sun. Which weather appears most?','sun',['rain','wind'],'☀️☀️🌧️☀️'],
 ['A poster says “Use the bin” beside a clean beach. What is its purpose?','to persuade people not to litter',['to teach swimming','to sell coconuts'],'🗑️🏖️'],
 ['A map key shows ★ = school. What does ★ mark?','school',['reef','harbour'],'🗺️⭐'],
 ['A diagram has arrows from cloud to rain to sea. What does it show?','a water sequence',['a food menu','a bus route'],'☁️➡️🌧️➡️🌊'],
 ['A bar chart gives reef fish 8 and lagoon fish 5. What is the difference?','3',['5','13'],'🐠📊']
];
const rotate=<T,>(a:T[],n:number)=>a.map((_,i)=>a[(i+n)%a.length]);
const options=(answer:string,wrong:string[],icon:string,seed:number):Choice[]=>rotate([{id:answer,label:answer,icon},...wrong.slice(0,2).map((x,i)=>({id:`wrong-${i}`,label:x,icon:i?'🫧':'⭐'}))],seed%3);
export function level4Challenge(game:number,stage:number,index:number):Challenge{const seed=(stage-1)*5+index;if(game===0){const x=grammar[seed%grammar.length];return{id:`l4-grammar-${stage}-${index}`,prompt:x[0] as string,instruction:'Tap the word that makes the sentence correct.',hint:x[4] as string,audio:x[0] as string,answer:x[1] as string,choices:options(x[1] as string,x[2] as string[],x[3] as string,seed)}}if(game===1){const x=opinions[seed%opinions.length];return{id:`l4-opinion-${stage}-${index}`,prompt:x[0] as string,instruction:'Choose the strongest supporting reason.',hint:'A strong reason explains why the opinion would help.',audio:`Opinion. ${x[0]}`,answer:x[1] as string,choices:options(x[1] as string,x[2] as string[],x[3] as string,seed)}}if(game===2){const x=routes[seed%routes.length];return{id:`l4-atoll-${stage}-${index}`,prompt:x[0] as string,instruction:'Follow the route and choose the answer.',hint:'Trace each direction in order.',audio:x[0] as string,answer:x[1] as string,choices:options(x[1] as string,x[2] as string[],x[3] as string,seed)}}const x=visuals[seed%visuals.length];return{id:`l4-visual-${stage}-${index}`,prompt:x[0] as string,instruction:'Read the visual information and choose.',hint:'Use only the information shown in the picture or chart.',audio:x[0] as string,answer:x[1] as string,choices:options(x[1] as string,x[2] as string[],x[3] as string,seed)}}
