import { interval, of, throwError } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/filtering/ignoreelements
// Example 1: Ignore all elements from source

//emit value every 1s
const srcInterval$ = interval(1000);
const obs = srcInterval$.pipe(
  mergeMap((val) => {
    //throw error for demonstration
    if (val > 4) {
      return throwError('Error!');
    }
    return of(val);
  }),
  //retry 2 times on error
  retry(2)
);

const subscribe = obs.subscribe({
  next: (val) => console.log(val),
  error: (val) => console.log(`${val}: Retried 2 times then quit!`),
});
/*
  output:
  0..1..2..3..4..5..
  "Error!: Retried 2 times then quit!"
*/
