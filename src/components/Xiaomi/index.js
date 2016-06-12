import {connect} from "react-redux";
import {expandWeek, handleScroll} from "../../store/modules/xiaomi";
import Xiaomi from "./Xiaomi";


const mapActionCreators = {
  expandWeek,
  handleScroll
}

const mapStateToProps = (state) => ({
  xiaomi: state.xiaomi
})


export default connect(mapStateToProps, mapActionCreators)(Xiaomi)
