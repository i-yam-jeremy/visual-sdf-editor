import React from 'react'
import ReactDOM from 'react-dom'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import Node from './node.jsx'
import getNodeTypes from './node-types/index.jsx'

export default class NodeEditorPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nodeData: []
    }

    this.nodeComponents = []
    this.currentNodeDataId = 0
  }

  getNextNodeDataId() {
    return this.currentNodeDataId++
  }

  addNode(node, nodeData) {
    if (node) {
      node.nodeData = nodeData
      this.nodeComponents.push(node)
    }
  }

  contextMenuClick(e, data) {
    const menuBounds = e.target.getBoundingClientRect()
    const nodeEditorPanelBounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const x = menuBounds.left - nodeEditorPanelBounds.left
    const y = menuBounds.top - nodeEditorPanelBounds.top
    this.setState({
      nodeData: this.state.nodeData.concat([{
        nodeType: data.nodeType,
        x: x,
        y: y,
        id: this.getNextNodeDataId()
      }])
    })
  }

  deleteNode(e, data) {
    let index = -1;
    this.state.nodeData.forEach((nodeData, i) => {
      if (nodeData.id == data.nodeId) {
        index = i
      }
    })
    if (index != -1) {
      this.nodeComponents.forEach(node => {
        if (node.nodeData.id == data.nodeId) {
          node.clearConnections()
        }
      })
      this.state.nodeData.splice(index, 1)
      this.setState({
        nodeData: this.state.nodeData
      })
    }
  }

  getOutputNode() {
    let outputNode = null
    for (let node of this.nodeComponents) {
      if (node.props.nodeContent.outputType == null) {
        if (outputNode != null) {
          throw 'Multiple output nodes' // TODO better error messages (display to user)
        }
        outputNode = node
      }
    }

    if (outputNode == null) {
      throw 'No output node' // TODO better error messages (display to user)
    }

    return outputNode
  }

  getSaveState() {
    return {
      nodes: this.nodeComponents.map(nodeComponent => nodeComponent.getSaveState())
    }
  }

  loadState(state) {
    let nodeData = state.nodes.map(node => {
      return {
        nodeType: getNodeTypes(this.props.editorType).filter(type => type.name == node.type)[0],
        x: node.x,
        y: node.y,
        id: node.id
      }
    })
    let maxNodeId = state.nodes.length > 0 ? state.nodes.reduce((a, b) => Math.max(a.id, b.id)) : 0
    this.currentNodeDataId = maxNodeId+1
    this.setState({
      nodeData: nodeData
    }, () => {
      let nodeComponentMap = {}
      for (let component of this.nodeComponents) {
        nodeComponentMap[component.props.nodeId] = component
      }

      for (let node of state.nodes) {
        if (node.content) {
          nodeComponentMap[node.id].nodeContent.loadState(node.content)
        }
        for (let input in node.inputs) {
          let otherNodeId = node.inputs[input]
          if (otherNodeId != null) {
            nodeComponentMap[node.id].connectInput(input, nodeComponentMap[otherNodeId])
          }
        }
      }
    })
  }

  render() {
    this.nodeComponents = []
    return (
      <div>
        <ContextMenuTrigger id={'node-editor-panel-contextmenu-' + this.props.editorId}>
          <div className="node-editor-panel">
            {this.state.nodeData.map(nodeData =>
              <ContextMenuTrigger key={'contextmenu-trigger-node-' + nodeData.id} id={'contextmenu-node-' + this.props.editorId + '-' + nodeData.id}>
                <Node ref={nodeComponent => this.addNode(nodeComponent, nodeData)} key={'node-' + nodeData.id} title={nodeData.nodeType.title} inputs={nodeData.nodeType.inputs} outputType={nodeData.nodeType.outputType} nodeContent={nodeData.nodeType} initialX={nodeData.x} initialY={nodeData.y} nodeId={nodeData.id} />
              </ContextMenuTrigger>
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={'node-editor-panel-contextmenu-' + this.props.editorId}>
          <div className="node-editor-contextmenu">
            {getNodeTypes(this.props.editorType).map(nodeType =>
              <MenuItem key={'contextmenu-' + nodeType.title} data={{nodeType: nodeType}} onClick={this.contextMenuClick.bind(this)}>
                <div className="node-editor-contextmenu-item">{nodeType.title}</div>
              </MenuItem>
            )}
          </div>
        </ContextMenu>

        {this.state.nodeData.map(nodeData =>
          <ContextMenu key={'contextmenu-node-delete-' + nodeData.id} id={'contextmenu-node-' + this.props.editorId + '-' + nodeData.id}>
            <div className="node-editor-contextmenu">
              <MenuItem data={{nodeId: nodeData.id}} onClick={this.deleteNode.bind(this)}>
                <div className="node-editor-contextmenu-item">Delete</div>
              </MenuItem>
            </div>
          </ContextMenu>
        )}
      </div>
    )
  }
}
