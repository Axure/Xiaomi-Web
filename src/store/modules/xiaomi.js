/**
 * Created by zhenghu on 2016-06-11.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const EXPAND_WEEK = 'EXPAND_WEEK'
export const NOTHING = 'NOTHING'
export const COLLAPSE_WEEK = 'COLLAPSE_WEEK'
export const EXPAND_MENU = 'EXPAND_MENU'
export const COLLAPSE_MENU = 'COLLAPSE_MENU'
export const SET_HEADER_SCROLL_BEFORE = 'SET_HEADER_SCROLL_BEFORE'
export const SET_HEADER_SCROLL_IN = 'SET_HEADER_SCROLL_IN'
export const SET_HEADER_SCROLL_AFTER = 'SET_HEADER_SCROLL_AFTER'

export const INITIAL_HEADER_HEIGHT = 50;
export const END_HEADER_HEIGHT = 20;
export const EMPTY_HEIGHT = 100;
export const PERSISTENT_HEIGHT = 30;

// ------------------------------------
// Actions
// ------------------------------------
export function expandWeek() {
  return {
    type: EXPAND_WEEK,
  }
}

export function handleScroll(scrollTop) {
  console.log(`Scrolling to ${scrollTop}`);
  if (scrollTop < EMPTY_HEIGHT) {
    return {
      type: SET_HEADER_SCROLL_BEFORE,
    }
  } else if (scrollTop < EMPTY_HEIGHT + PERSISTENT_HEIGHT) {
    return {
      type: SET_HEADER_SCROLL_IN,
      payload: (scrollTop - EMPTY_HEIGHT) / PERSISTENT_HEIGHT
    }
  } else {
    return {
      type: SET_HEADER_SCROLL_AFTER,
    }
  }

}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  expandWeek,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COLLAPSE_MENU]: (state, action) => ({
    ...state,
    menuExpanded: false
  }),
  [EXPAND_MENU]: (state, action) => ({
    ...state,
    menuExpanded: true
  }),
  [COLLAPSE_WEEK]: (state, action) => ({
    ...state,
    weekExpanded: false
  }),
  [EXPAND_WEEK]: (state, action) => ({
    ...state,
    weekExpanded: true
  }),
  [SET_HEADER_SCROLL_BEFORE]: (state, action) => {
    return {
      ...state,
      headerHeight: INITIAL_HEADER_HEIGHT,
      ratio: 1,
      isAtTheEnd: false
    }
  },
  [SET_HEADER_SCROLL_IN]: (state, action) => {
    return {
      ...state,
      headerHeight: INITIAL_HEADER_HEIGHT + action.payload * (END_HEADER_HEIGHT - INITIAL_HEADER_HEIGHT),
      ratio: 1 + action.payload * (END_HEADER_HEIGHT / INITIAL_HEADER_HEIGHT - 1),
      isAtTheEnd: false
    }
  },
  [SET_HEADER_SCROLL_AFTER]: (state, action) => {
    return {
      ...state,
      headerHeight: END_HEADER_HEIGHT,
      ratio: END_HEADER_HEIGHT / INITIAL_HEADER_HEIGHT,
      isAtTheEnd: true
    }
  },
  [NOTHING]: (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  updating: true,

  weekExpanded: false,
  menuExpanded: false,
  initialHeaderHeight: INITIAL_HEADER_HEIGHT,
  headerHeight: INITIAL_HEADER_HEIGHT,
  ratio: 1,
  isAtTheEnd: false,
  hourData: [],
  weekData: [],
  tips: []
}

export default function xiaomi(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

/**
 * On Scroll =>
 * 1. normal
 * 2. In the range
 *  1. set transform
 *  2. On end, set border.
 * 3. normal
 */
var a = 2
