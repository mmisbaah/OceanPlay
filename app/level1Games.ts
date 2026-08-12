export type Choice={id:string;label:string;icon:string};
export type Challenge={id:string;prompt:string;instruction:string;hint:string;audio:string;answer:string;choices:Choice[]};

const colors=[['red','Red','🔴'],['blue','Blue','🔵'],['yellow','Yellow','🟡'],['green','Green','🟢'],['orange','Orange','🟠'],['purple','Purple','🟣'],['pink','Pink','🩷'],['brown','Brown','🟤'],['black','Black','⚫'],['white','White','⚪']];
const animals=[['turtle','Turtle','🐢'],['fish','Fish','🐠'],['dolphin','Dolphin','🐬'],['crab','Crab','🦀'],['bird','Bird','🐦'],['cat','Cat','🐈'],['butterfly','Butterfly','🦋'],['octopus','Octopus','🐙'],['shark','Shark','🦈'],['whale','Whale','🐋']];
const rhymes=[['cat','hat','🐈','🎩'],['sun','fun','☀️','🎈'],['fish','dish','🐟','🍽️'],['boat','goat','⛵','🐐'],['star','car','⭐','🚗'],['shell','bell','🐚','🔔'],['bee','sea','🐝','🌊'],['cake','lake','🍰','🏝️'],['moon','spoon','🌙','🥄'],['light','kite','💡','🪁']];
const actions=[['clap','Clap','👏'],['jump','Jump','🦘'],['wave','Wave','👋'],['sit','Sit','🪑'],['stand','Stand','🧍'],['turn','Turn around','🔄'],['tap','Tap your head','🙂'],['stomp','Stomp','👣'],['point','Point up','👆'],['smile','Smile','😄']];

function rotate<T>(items:T[],offset:number){return items.map((_,i)=>items[(i+offset)%items.length]);}
function choices(rows:string[][],answer:string,seed:number,count=3):Choice[]{
 const ordered=rotate(rows,seed%rows.length).slice(0,count);
 if(!ordered.some(x=>x[0]===answer)) ordered[count-1]=rows.find(x=>x[0]===answer)!;
 return rotate(ordered,(seed*7+2)%count).map(x=>({id:x[0],label:x[1],icon:x[2]}));
}

export function challengeFor(game:number,stage:number,index:number):Challenge{
 const seed=(stage-1)*5+index;
 if(game===0){const row=colors[seed%colors.length];return{id:`color-${stage}-${index}`,prompt:`Find ${row[1]}`,instruction:'Tap the matching colour.',hint:`Look for the ${row[1].toLowerCase()} splash.`,audio:row[1],answer:row[0],choices:choices(colors,row[0],seed)};}
 if(game===1){const row=animals[(seed*3+stage)%animals.length];return{id:`animal-${stage}-${index}`,prompt:`Match ${row[1]}`,instruction:'Tap the same island animal.',hint:`Find another ${row[1].toLowerCase()}.`,audio:row[1],answer:row[0],choices:choices(animals,row[0],seed+2)};}
 if(game===2){const row=rhymes[(seed+stage)%rhymes.length];const pool=rhymes.map(x=>[x[1],x[1],x[3]]);return{id:`rhyme-${stage}-${index}`,prompt:`What rhymes with ${row[0]}?`,instruction:'Tap the word with the same ending sound.',hint:`Say ${row[0]} and listen to the last sound.`,audio:`${row[0]}. ${row[0]}.`,answer:row[1],choices:choices(pool,row[1],seed+4)};}
 const length=stage<8?1:stage<15?2:3;const seq=Array.from({length},(_,i)=>actions[(seed+i*3)%actions.length]);const answer=seq[seq.length-1][0];return{id:`guide-${stage}-${index}`,prompt:`Do this: ${seq.map(x=>x[1]).join(', then ')}`,instruction:'Listen, do the moves, then tap the last move.',hint:`The last move is ${seq.at(-1)![1].toLowerCase()}.`,audio:seq.map(x=>x[1]).join('. Then '),answer,choices:choices(actions,answer,seed+6)};
}
