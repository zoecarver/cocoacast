import { connect } from 'react-redux';
import { inc, dec } from '../actions';
import Counter from '../components/Counter';

const returnSateToProps = state => {
  console.log(state, state.counter.id);
  return {
    num: state.counter.id,
  };
};

const returnDispatchToProps = dispatch => {
  return {
    inc: i => {
      dispatch(inc(i));
    },
    dec: i => {
      dispatch(dec(i));
    },
  };
};

export default (VisibleCounter = connect(
  returnSateToProps,
  returnDispatchToProps
)(Counter));

//(num) ? onClick(1) : onClick(num)
