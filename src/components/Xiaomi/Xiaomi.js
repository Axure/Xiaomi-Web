import React from "react";
import {Motion, spring} from "react-motion";
import classes from "./Xiaomi.scss";

const styleMap = (props) => ({
  transformOrigin: '50% 0',
  transform: 'scale(' + props.ratio + ',' + props.ratio + ')',
})

const Header = (props) => (
  <div className={classes.header}
       style={{
    borderBottom: props.atTheEnd ? 'solid 1px black' : '',
    height: props.height + 'px'
  }}>
    <button className={classes.circularButton}
            style={styleMap(props)}
    />
    <span
      style={styleMap(props)}>City</span>
    <button className={classes.circularButton}
            style={styleMap(props)}
    />
  </div>
)

const Banner = (props) => (
  <div className={classes.banner}>
    hangzhou 25
  </div>
)

const Hours = (props) => (
  <div>
    <Motion defaultStyle={{x:0}} style={{x: spring(10)}}>
      {value => <div>{value.x}</div>}
    </Motion>
    <Motion defaultStyle={{x:0}} style={{x: spring(1)}}>
      {value => <div style={{backgroundColor: 'rgba(0,0,0,' +  Math.pow(0.02, (1-value.x)) + ')'}}>
        {value.x}
        <br/>
        {JSON.stringify(value)}
      </div>}

    </Motion>
    This is the hours.
  </div>
)

const Weeks = (props) => (
  <div>
    This is the weeks.
  </div>
)
Weeks.propTypes = {}

const Tips = (props) => (
  <div>
    This is the tips.
  </div>
)

export const Xiaomi = (props) => (
  <div className={classes.xiaomi} onScroll={(event)=>{
      props.handleScroll(event.target.scrollTop)
    }
  }>
    <Header atTheEnd={props.xiaomi.isAtTheEnd}
            height={props.xiaomi.headerHeight}
            ratio={props.xiaomi.ratio}
    />
    <div
      className={classes.scrollContainer}
      style={{marginTop: props.xiaomi.headerHeight + 'px'}}
    >
      <Banner/>
      <Hours />
      <Weeks/>
      <Tips/>
      <div style={{height: '5000px'}}></div>
    </div>
  </div>
)


export default Xiaomi
