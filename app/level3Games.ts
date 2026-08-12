import type {Challenge,Choice} from "./level1Games";

const clues=[
 ['dhoni','It carries people between islands.','⛵',['coconut','school']],['reef','Fish live around it under the sea.','🪸',['jetty','garden']],['lagoon','It is calm blue water beside an island.','🏝️',['classroom','market']],['coconut','It grows high on a palm.','🥥',['shell','pencil']],['jetty','A boat stops beside it.','🛶',['reef','cloud']],['heron','This long-legged bird walks by the shore.','🐦',['crab','turtle']],['uniform','Children wear it to school.','👕',['umbrella','basket']],['library','We borrow books here.','📚',['harbour','kitchen']],['fisher','This person catches fish.','🎣',['teacher','pilot']],['market','People buy fruit and fish here.','🧺',['lagoon','playground']]
];
const orders=[
 ['Plant a coconut seed.',['Dig a small hole.','Put in the seed.','Water the soil.'],'🌱'],['Get ready for school.',['Put on your uniform.','Pack your school bag.','Walk to school.'],'🎒'],['Make a fruit drink.',['Wash the fruit.','Cut the fruit.','Mix it with water.'],'🥭'],['Visit a nearby island.',['Pack a small bag.','Board the dhoni.','Step onto the jetty.'],'⛵'],['Clean the beach.',['Pick up litter.','Put it in a bag.','Place the bag in a bin.'],'🏖️'],['Read a new book.',['Choose a book.','Read each page.','Tell a friend about it.'],'📖'],['Grow a flower.',['Fill a pot with soil.','Plant the seed.','Give it water.'],'🌼'],['Prepare for rain.',['See the dark clouds.','Open an umbrella.','Walk under it.'],'☔']
];
const groups=[
 ['Sea animals','🐠',['fish','turtle','crab'],['palm','pencil']],['School things','🎒',['book','pencil','ruler'],['reef','dhoni']],['Island plants','🌴',['palm','flower','coconut'],['whale','desk']],['Transport','⛵',['dhoni','bicycle','bus'],['shell','mango']],['People at work','👩‍🏫',['teacher','fisher','doctor'],['lagoon','parrot']],['Weather','🌦️',['rain','wind','sun'],['jetty','uniform']]
];
const features=[
 ['Which title best matches a page about reef fish?','Reef Fish',['My Blue Bag','A Rainy Walk'],'🐠'],['Which label belongs under a coconut picture?','coconut',['jetty','uniform'],'🥥'],['Which heading helps us find boat facts?','Boats of the Maldives',['Funny Cats','Our Classroom'],'⛵'],['Which caption matches this picture?','A turtle swims near the reef.',['The bus stops at school.','A bird sits in a tree.'],'🐢'],['Which sign belongs beside a rubbish bin?','Put litter here.',['Swim here.','Open your book.'],'🗑️'],['Which map label names the place where boats stop?','harbour',['garden','library'],'⚓'],['Which contents-page heading would include rain and wind?','Weather',['Animals','Transport'],'🌧️'],['Which poster line helps keep the beach clean?','Use the bin.',['Pick the flowers.','Feed every fish.'],'🏖️']
];

const rotate=<T,>(a:T[],n:number)=>a.map((_,i)=>a[(i+n)%a.length]);
function options(answer:string,wrong:string[],icon:string,seed:number):Choice[]{return rotate([{id:answer,label:answer,icon},...wrong.slice(0,2).map((x,i)=>({id:`wrong-${i}`,label:x,icon:i?'🫧':'⭐'}))],seed%3)}

export function level3Challenge(game:number,stage:number,index:number):Challenge{
 const seed=(stage-1)*5+index;
 if(game===0){const x=clues[seed%clues.length];return{id:`l3-detective-${stage}-${index}`,prompt:x[1] as string,instruction:'Find the mystery word.',hint:`Look at the ${x[2]} clue.`,audio:`Mystery clue. ${x[1]}`,answer:x[0] as string,choices:options(x[0] as string,x[3] as string[],x[2] as string,seed)};}
 if(game===1){const x=orders[seed%orders.length],step=index%3,answer=(x[1] as string[])[step],wrong=(orders[(seed+3)%orders.length][1] as string[]).filter(v=>v!==answer).slice(0,2);return{id:`l3-order-${stage}-${index}`,prompt:`${x[0]} — Step ${step+1}`,instruction:'Tap what happens at this step.',hint:step===0?'What must happen first?':step===1?'What happens after the first step?':'What finishes the job?',audio:`${x[0]}. Choose step ${step+1}.`,answer,choices:options(answer,wrong,x[2] as string,seed)};}
 if(game===2){const x=groups[seed%groups.length],answer=(x[2] as string[])[index%3],wrong=x[3] as string[];return{id:`l3-community-${stage}-${index}`,prompt:`Fill the ${x[0]} branch`,instruction:'Tap an item that belongs in this group.',hint:`Think of things connected to ${String(x[0]).toLowerCase()}.`,audio:`Choose one item for ${x[0]}.`,answer,choices:options(answer,wrong,x[1] as string,seed)};}
 const x=features[seed%features.length];return{id:`l3-feature-${stage}-${index}`,prompt:x[0] as string,instruction:'Tap the useful text feature.',hint:'Choose the words that match the picture and purpose.',audio:x[0] as string,answer:x[1] as string,choices:options(x[1] as string,x[2] as string[],x[3] as string,seed)};
}
