export interface Outcome {
  eventStage: Stage;

  offerTicketDelayLive: Number;
  offerTicketDelayUpcoming: Number;

  eventTicketDelayLive: Number;
  eventTicketDelayUpcoming: Number;

  sportTicketDelayLive: Number;
  sportTicketDelayUpcoming: Number;
}

export enum Stage {
  UPCOMING = 1,
  LIVE = 2,
}

// The delayCalculator function must
// - receive an input of type Outcome Array
// - return an output of type Number
export type DelayCalculator = (input: Outcome[]) => Number;

//implement max for Number type, keep it as functonal as possible and reduce mutations for maintainability
const MaxNumber = (numbers: Number[]) =>
  numbers.reduce((acc, number) => (acc > number ? acc : number), 0);

//keep functions as pure as possible so that memoization pattern/ caching is easier
const getMaxUpcomingDelay = ({
  offerTicketDelayUpcoming,
  eventTicketDelayUpcoming,
  sportTicketDelayUpcoming,
}) => {
  return MaxNumber([
    offerTicketDelayUpcoming,
    eventTicketDelayUpcoming,
    sportTicketDelayUpcoming,
  ]);
};

const getMaxLiveDelay = ({
  offerTicketDelayLive,
  eventTicketDelayLive,
  sportTicketDelayLive,
}) => {
  return MaxNumber([
    offerTicketDelayLive,
    eventTicketDelayLive,
    sportTicketDelayLive,
  ]);
};

// Please put your code here
// Run 'npm i' to install modules and then then 'npm test' to test the logic
export const delayCalculator: DelayCalculator = (input) => {
  return input.reduce((acc, outcome) => {
    //for maintainability keep the conditonal logic unnested
    const delay =
      outcome.eventStage === Stage.UPCOMING ? getMaxUpcomingDelay(outcome) : 0;
    const live =
      outcome.eventStage === Stage.LIVE ? getMaxLiveDelay(outcome) : 0;
    return MaxNumber([acc, delay, live]);
  }, 0);
};
