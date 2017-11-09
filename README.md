Status: [DONE]

# How to run
    1. Clone this repository: ```git clone https://github.com/EzyHow/sb-dev-js-events.git```
    2. Run index.js: ```node index.js```


# Research
    ## setTimeout(fun(),0)
         setTimeout(fun(),0) invokes the callback function when event loop enters the TIMER phase.
         (see flowchart at bottom of this page.)

    ## setImmediate()
        setImmediate() put the callback function in queue behind the whatever I/O callbacks that
        are already in queue. So setImmediate is exactly not immediate, it will be executed once
        in every iteration (when event loop is in CHECK phase (see the flowchart given at the
        bottom of this page)).

    ## process.nextTick()
        process.nextTick() put the function at the head of queue, so it executes immeditely after
        execution of current function completes.

# Event loop
```   
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
```