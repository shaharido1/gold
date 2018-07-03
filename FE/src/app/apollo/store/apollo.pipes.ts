import { Observable, pipe } from 'rxjs/Rx';
import { filter, flatMap, map } from 'rxjs/operators';
import { createSelectorGetEntityById } from './apollo.selectors';

export const createEntityPipe = (store) => {
  return pipe(
    filter(Boolean),
    map(newData => newData.id),
    map(id => createSelectorGetEntityById(id)),
    flatMap((selector) => store.select(selector)),
);
};


export const positionPipe = (store) => {
  return pipe(
    filter(Boolean),
    map(data => data.position),
    filter(Boolean),
    map(position => position.id),
    map(id => createSelectorGetEntityById(id)),
    flatMap((selector) => store.select(selector))
  )
};

// export const getPosition = pipe(
//   filter(Boolean),
//   map(data => {console.log(data); return data.messageAdded}),
//   filter(Boolean),
//   map(messageAdded => messageAdded.position)
// )
