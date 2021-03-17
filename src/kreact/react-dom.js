/**
 * vNode 虚拟dom对象
 * node 真实dom节点
 * @param {*} 虚拟dom对象
 * @param {*} container
 */
function render(vNode, container) {
    console.log('vNode :>> ', vNode);
    //  vNode---> node
    const node = createNode(vNode);
    //  node---> container
    container.appendChild(node); //初次渲染直接插入到容器中
}

/**
 * 根据vNode生成真实node节点
 * @param {*} vNode
 */
function createNode(vNode) {
    let node;
    // 根据组件类型创建节点
    const { type } = vNode;
    if (typeof type === 'string') {
        // 原生节点
        node = updateHostComponent(vNode);
    } else if (typeof type === 'function') {
        // 函数组件或类组件
        node = type.prototype.isReactComponent ? updateClassComponent(vNode) : updateFunctionComponent(vNode);
    } else {
        // 文本节点
        node = updateTextComponent(vNode);
    };

    return node;
};

/**
 *更新原生标签节点* 
 * @param {*} vNode
 */
function updateHostComponent(vNode) {
    const { type, props } = vNode;
    const node = document.createElement(type);
    // 处理属性
    updateNode(node, props);
    // 原生标签节点存在children
    reconcileChildren(node, props.children);
    return node;
}


/**
 * 更新属性*
 * @param {*} node
 * @param {*} nextVal
 */
function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(key => key !== 'children').forEach(k => {
        node[k] = nextVal[k];
    });
}

/**
 * 处理原生节点下边的children *
 * @param {*} parentNode
 * @param {*} children
 */
function reconcileChildren(parentNode, children) {
    // children 可能是字符串或者数组，均放到数组中处理
    let newChildren = Array.isArray(children) ? children : [children];
    for (let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i];
        render(child, parentNode); // 将VNode转化node，并插入到父节点
    }
};

/**
 * 处理类组件 *
 * @param {*} vNode
 */
function updateClassComponent(vNode) {
    const { type, props } = vNode;
    const instance = new type(props);
    const vvNode = instance.render();
    // vvNode -> node
    const node = createNode(vvNode);
    return node;
}

/**
 * 处理函数组件 *
 * @param {*} vNode
 */
function updateFunctionComponent(vNode) {
    // 执行函数得到VNode
    const { type, props } = vNode;
    const vvNode = type(props);
    // vvNode->node
    const node = createNode(vvNode);
    return node;
}


/**
 * 更新文本节点*
 * @param {*} vNode
 */
function updateTextComponent(vNode) {
    const node = document.createTextNode(vNode);
    return node;
}

export default { render }
