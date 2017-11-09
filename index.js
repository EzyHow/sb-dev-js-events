/*
    setTimeout(fun(),0) invokes the callback function when event loop enters
    the TIMER phase. (see flowchart at bottom of this page.)
*/
setTimeout(function(){
    console.log(`setTimeout: invokes the callback function when event loop enters TIMER phase.`);
},0);


/*
    setImmediate() put the callback function in queue behind the whatever
    I/O callbacks that are already in queue. So setImmediate is exactly 
    not immediate, it will be executed once in every iteration (when event
    loop is in CHECK phase (see the flowchart given at the bottom of this 
    page)).
*/
setImmediate(function(){
    console.log(`setImmediate: executed once in every iteration in CHECK phase of event loop.`);
});

/*
    process.nextTick() put the function at the head of queue, so it executes
    immeditely after execution of current function completes.
*/
process.nextTick(function(){
    console.log('nextTick: executes immediately after current function completes.');
});

//used setTimeout here because I want below code to run after execution of above code.
setTimeout(function(){
    console.log('\nExample: \n');
    for (let i=1; i<6; ++i) {
        setTimeout(()=>console.log(`setTimeout: ${i}`),0);
        setImmediate(()=>console.log(`setImmediate: ${i}`));
        process.nextTick(()=>console.log(`process.nextTick: ${i}`));
    }
},500); 

setTimeout(()=>{
    console.log(`
    ┌───────────────────────┐
 ┌─>│        timers         │
 │  └──────────┬────────────┘
 │  ┌──────────┴────────────┐
 │  │     I/O callbacks     │
 │  └──────────┬────────────┘
 │  ┌──────────┴────────────┐
 │  │     idle, prepare     │
 │  └──────────┬────────────┘      ┌───────────────┐
 │  ┌──────────┴────────────┐      │   incoming:   │
 │  │         poll          │<─────┤  connections, │
 │  └──────────┬────────────┘      │   data, etc.  │
 │  ┌──────────┴────────────┐      └───────────────┘
 │  │        check          │
 │  └──────────┬────────────┘
 │  ┌──────────┴────────────┐
 └──┤    close callbacks    │
    └───────────────────────┘
 `);
},1000);


/*
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘

source of above flowchart: https://stackoverflow.com/a/44275063
*/