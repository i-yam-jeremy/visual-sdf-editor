import React from 'react'
import Popup from 'reactjs-popup'
import NodeEditorType from '../node/node-editor-type.js'

const FILES = [{name: 'main.sdf', type: NodeEditorType.SDF}, {name: 'main.shader', type: NodeEditorType.SHADER}]
const FILE_TYPE_ICONS = {
  SDF: (
    <div style={{width: '32px', height: '32px'}}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="32" height="32"><defs><path d="M573.39 417.75C573.39 506.05 501.69 577.75 413.39 577.75C325.08 577.75 253.39 506.05 253.39 417.75C253.39 329.44 325.08 257.75 413.39 257.75C501.69 257.75 573.39 329.44 573.39 417.75Z" id="b1lUN6F1K"></path><path d="M293.91 247.85L252.18 289.58L59.72 97.11L101.45 55.39L293.91 247.85Z" id="diA7Qu8WB"></path><path d="M125.18 78.04C125.18 101.5 106.14 120.54 82.68 120.54C59.22 120.54 40.18 101.5 40.18 78.04C40.18 54.58 59.22 35.54 82.68 35.54C106.14 35.54 125.18 54.58 125.18 78.04Z" id="c1zTrXe0f4"></path><path d="M245.54 287.65L182.38 273.58L231.48 224.49L280.57 175.4L294.64 238.56L308.71 301.72L245.54 287.65Z" id="h5L1FvR4RL"></path></defs><g><g><g><use xlinkHref="#b1lUN6F1K" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g><g><use xlinkHref="#diA7Qu8WB" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g><g><use xlinkHref="#c1zTrXe0f4" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g><g><use xlinkHref="#h5L1FvR4RL" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g></g></g></svg>
    </div>
  ),
  SHADER: (
    <div style={{width: '32px', height: '32px'}}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="32" height="32"><defs><path d="M517.81 419.39L536.11 420.48L550.95 433.65L563.33 453.79L567.58 474.93L570.4 497.9L574.65 519.04L580.32 538.34L594.53 559.92L610.59 569.61L591.47 575.29L573.56 577.49L553.63 576.6L534.72 570.59L516.63 557.82L502 546.29L491.85 530.87L480.07 515.66L471.14 496.76L465.67 479.11L463.45 461.05" id="a1jqQ7GCKX"></path><path d="M504.44 421.98L471.11 447.47L197.42 78.96L230.76 53.47L504.44 421.98Z" id="b2MkM1jLAJ"></path><path d="M463.86 451.75L509.46 414.28L517.57 424.44L471.97 461.92L463.86 451.75Z" id="a2XBpB3Vm"></path><path d="M46.45 293.15L297.7 293.15L297.7 577.49L46.45 577.49L46.45 293.15Z" id="b2B5bSNO9g"></path><path d="M274.03 307.01C274.03 363.78 228.35 409.88 172.07 409.88C115.8 409.88 70.12 363.78 70.12 307.01C70.12 250.24 115.8 204.15 172.07 204.15C228.35 204.15 274.03 250.24 274.03 307.01Z" id="gbdEl996L"></path><path d="M297.7 574.43C297.7 593.02 241.41 608.11 172.07 608.11C102.74 608.11 46.45 593.02 46.45 574.43C46.45 555.84 102.74 540.75 172.07 540.75C241.41 540.75 297.7 555.84 297.7 574.43Z" id="afNXAigZ7"></path></defs><g><g><g><use xlinkHref="#a1jqQ7GCKX" opacity="1" fill="#99b2b8" fill-opacity="1"></use><g><use xlinkHref="#a1jqQ7GCKX" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="0" stroke-opacity="1"></use></g></g><g><use xlinkHref="#b2MkM1jLAJ" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g><g><use xlinkHref="#a2XBpB3Vm" opacity="1" fill="#99b2b8" fill-opacity="1"></use><g><use xlinkHref="#a2XBpB3Vm" opacity="1" fill-opacity="0" stroke="#be36de" stroke-width="0" stroke-opacity="1"></use></g></g><g><use xlinkHref="#b2B5bSNO9g" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g><g><use xlinkHref="#gbdEl996L" opacity="1" fill="#99b2b8" fill-opacity="0"></use><g><use xlinkHref="#gbdEl996L" opacity="1" fill-opacity="0" stroke="#99b2b8" stroke-width="20" stroke-opacity="1"></use></g></g><g><use xlinkHref="#afNXAigZ7" opacity="1" fill="#99b2b8" fill-opacity="1"></use></g></g></g></svg>
    </div>
  )
}

const STYLES = {
  overlay: {
  },
  content: {
    width: '400px',
    border: '3px solid #002B36',
    backgroundColor: '#001F27',
    borderRadius: '5px',
    padding: '0px'
  }
}

export default class FileChooser extends React.Component {

  getFileTypeIcon(editorType) {
    return FILE_TYPE_ICONS[editorType]
  }

  render() {
    return (
      <Popup
        trigger={this.props.trigger}
        overlayStyle={STYLES.overlay}
        contentStyle={STYLES.content}
        modal
        closeOnDocumentClick >
        <div className="file-chooser-container">
          <div className="file-chooser-title">Select a File</div>
          <div className="file-list-container">
            {FILES.map(file => (
              <div key={file.name} className="file-list-element">
                <div className="file-list-element-icon">{this.getFileTypeIcon(file.type)}</div>
                <div className="file-list-element-filename">{file.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    )
  }

}