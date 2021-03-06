import _ from 'lodash';
import {clamp} from 'components/utils/math';
import {xenia} from 'app/AppActions';

export const QUERYSET_SELECTED = 'QUERYSET_SELECTED';
export const QUERYSET_REQUEST = 'QUERYSET_REQUEST'; // request data for a single queryset
export const QUERYSETS_REQUEST = 'QUERYSETS_REQUEST';
export const QUERYSETS_REQUEST_FAILURE = 'QUERYSETS_REQUEST_FAILURE';
export const QUERYSET_REQUEST_FAILURE = 'QUERYSET_REQUEST_FAILURE';
export const QUERYSETS_RECEIVED = 'QUERYSETS_RECEIVED';
export const QUERYSET_RECEIVED = 'QUERYSET_RECEIVED';

export const RECEIVE_FILTER_RANGES = 'RECEIVE_FILTER_RANGES';

export const QUERYSET_SAVE_SUCCESS = 'QUERYSET_SAVE_SUCCESS';
export const QUERYSET_SAVE_FAILED = 'QUERYSET_SAVE_FAILED';
export const CREATE_QUERY = 'CREATE_QUERY';

export const SUBMIT_CUSTOM_QUERY = 'SUBMIT_CUSTOM_QUERY';


export const selectQueryset = (queryset) => {
  return {
    type: QUERYSET_SELECTED,
    queryset
  };
};

export const requestQueryset = (queryset) => {
  return {
    type: QUERYSET_REQUEST,
    queryset
  };
};

export const requestQuerysets = () => {
  return {
    type: QUERYSETS_REQUEST
  };
};

export const receiveQuerysets = (querysets) => {
  return {
    type: QUERYSETS_RECEIVED,
    querysets
  };
};

export const requestQuerysetsFailure = (err) => {
  return {
    type: QUERYSETS_REQUEST_FAILURE,
    err
  };
};

/* xenia_package */
export const fetchQuerysetsIfNotFetched = () => {
  return (dispatch, getState) => {
    if (! getState().groups.loading) {
      return dispatch(fetchQuerysets());
    }
    return {
      type: 'NOOP'
    };
  };
};

/* xenia_package */
// get deep list of query_sets
export const fetchQuerysets = () => {
  return (dispatch) => {

    dispatch(requestQuerysets());

    xenia().getQueries()
      .then(querysets => dispatch(receiveQuerysets(querysets)))
      .catch(err => dispatch(requestQuerysetsFailure(err)));
  };
};

export const requestQuerysetFailure = (err) => {
  return {
    type: QUERYSET_REQUEST_FAILURE,
    err
  };
};

export const receiveQueryset = (data) => {
  return {
    type: QUERYSET_RECEIVED,
    data
  };
};

/* xenia_package */
// execute a query_set
export const fetchQueryset = (querysetName) => {
  return (dispatch) => {
    dispatch(requestQueryset(querysetName));

    xenia()
      .exec(querysetName)
      .then(queryset => dispatch(receiveQueryset(queryset)))
      .catch(err => dispatch(requestQuerysetFailure(err)));
  };
};

export const executeCustomQueryset = queryset => {
  return {
    type: 'EXECUTE_CUSTOM_QUERYSET',
    queryset
  };
};


export const createQuery = (query) => {
  return {
    type: CREATE_QUERY,
    query
  };
};

/* xenia_package */
export const makeQueryFromState = (/*type*/) => {
  return (dispatch, getState) => {
    // make a query from the current state
    const filterState = getState().filters;
    const app = getState().app;
    const filters = filterState.filterList.map(key => filterState[key]);
    const x = xenia({
      name: 'user_search',
      desc: 'user search currently. this is going to be more dynamic in the future'
    });

    x.addQuery();
    filters.forEach(filter => {
      let dbField;
      if (filterState.breakdown === 'author' && filterState.specificBreakdown !== '') {
        dbField = _.template(filter.template)({dimension: 'author.' + filterState.specificBreakdown});
      } else if (filterState.breakdown === 'section' && filterState.specificBreakdown !== '') {
        dbField = _.template(filter.template)({dimension: 'section.' + filterState.specificBreakdown});
      } else { // all
        dbField = _.template(filter.template)({dimension: 'all'});
      }

      // Only create match statements for non-defaults
      if (filter.min !== filter.userMin) {
        x.match({[dbField]: {$gte: clamp(filter.userMin, filter.min, filter.max)}});
      }

      if (filter.max !== filter.userMax) {
        x.match({[dbField]: {$lte: clamp(filter.userMax, filter.min, filter.max)}});
      }
    });

    x.skip(0)
    .limit(20)
    .include(['name', 'avatar', 'statistics.comments']);

    doMakeQueryFromStateAsync(x, dispatch, app);
  };
};

/* xenia_package */
// yikes. lots of this code is replicated above.
// time to make a xenia library
export const saveQueryFromState = (queryName, modDescription) => {

  return (dispatch, getState) => {
    // make a query from the current state
    const filterState = getState().filters;
    const filters = filterState.filterList.map(key => filterState[key]);
    const app = getState().app;
    const x = xenia({
      name: queryName,
      desc: modDescription
    });

    x.addQuery();
    filters.forEach(filter => {
      let dbField;
      if (filterState.breakdown === 'author') {
        dbField = _.template(filter.template)({dimension: 'author.' + filterState.specificBreakdown});
      } else if (filterState.breakdown === 'section') {
        dbField = _.template(filter.template)({dimension: 'section.' + filterState.specificBreakdown});
      } else { // all
        dbField = _.template(filter.template)({dimension: 'all'});
      }

      // Only create match statements for non-defaults
      if (filter.min !== filter.userMin) {
        x.match({[dbField]: {$gte: clamp(filter.userMin, filter.min, filter.max)}});
      }

      if (filter.max !== filter.userMax) {
        x.match({[dbField]: {$lte: clamp(filter.userMax, filter.min, filter.max)}});
      }
    });

    x.skip(0)
    .limit(20)
    .include(['name', 'avatar', 'statistics.comments']);
    doPutQueryFromState(x, dispatch, app);
  };
};
/* xenia_package */
const doPutQueryFromState = (query, dispatch) => {
  query.saveQuery()
    .then(() => dispatch({type: QUERYSET_SAVE_SUCCESS})) // if response.status < 400
    .catch(error => dispatch({type: QUERYSET_SAVE_FAILED, error}));
};
/* xenia_package */
const doMakeQueryFromStateAsync = _.debounce((query, dispatch)=>{
  dispatch(requestQueryset());
  dispatch(createQuery(query._data));

  query.exec()
    .then(json => dispatch(receiveQueryset(json)))
    .catch(() => {});
}, 1000);
