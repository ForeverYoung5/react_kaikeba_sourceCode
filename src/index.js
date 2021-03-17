import ReactDOM from './kreact/react-dom';
import Component from './kreact/component'
import './index.css';

function FunctionComponent(props) {
  return(
    <div className='border'>
      <p>函数组件-{props.name}</p>
    </div>
  )
}
class ClassComponent extends Component {
  render(){
    return(
      <div className='border'>
        <p>类组件-{this.props.name}</p>
      </div>
    )
  }
};

let jsx = (
  <div className='border'>
    <h1>全站</h1>
    <p>这里是段落</p>
    <FunctionComponent name='function' />
    <ClassComponent name='class' />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));

// 渲染原生标签节点 
// 文本节点
// 函数组件
// 类组件