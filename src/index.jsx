/* eslint-env browser */
import { Graph, Dom } from '@antv/x6'
import { DagreLayout } from '@antv/layout'
import './assets/css/style.css'
import './add-edge'
import { layout } from './layout'
import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'

const data = {
  nodes: [],
  edges: [],
}

for ( let i = 1; i <= 12; i++ ) {
  data.nodes.push( {
    id: String( i ),
    shape: 'rect',
    width: 60,
    height: 30,
    label: i,
    attrs: {
      body: {
        fill: '#855af2',
        stroke: 'transparent',
      },
      label: {
        fill: '#ffffff',
      },
    },
  } )
}

data.edges.push(
  ...[
    {
      source: '1',
      target: '2',
      label: {
        position: 0.5,
        data: 1
      },
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '2',
      target: '3',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '2',
      target: '4',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '4',
      target: '5',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '4',
      target: '6',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '4',
      target: '7',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: '111',
      source: '4',
      target: '8',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '5',
      target: '9',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '6',
      target: '10',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '7',
      target: '11',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      source: '8',
      target: '12',
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
  ]
)

const graph = new Graph( {
  container: document.getElementById( 'app' ),
  width: 800,
  height: 600,
  panning: true,
  interacting: false,
  highlighting: {
    enabled: true,
    default: {
      name: 'className',
      args: {
        className: 'my-selecting'
      },
    },
  },
  // selecting: {
  //   enabled: true,
  //   rubberband: true,
  //   showNodeSelectionBox: true,
  //   showEdgeSelectionBox: true,
  //   className: 'my-selecting',
  // },
  onEdgeLabelRendered( args ) {
    const { edge, label, container } = args
    const data = label.data

    console.log( data, args, edge )

    if ( data ) {
      const content = appendForeignObject( container )
      content.classList.add( 'fo-content' )
      ReactDOM.render( <Dot edge={ edge } />, content )
    }
  },
} )

function Dot( props ) {
  const { edge } = props
  const [ isHover, setIsHover ] = useState( false )
  const ref = useRef( null )

  function onMouseEnter() {
    setIsHover( true )
  }

  function onClick() {
    const sourceNode = edge.getSourceNode()
    const targetNode = edge.getTargetNode()
    console.log( sourceNode )

    graph.freeze()
    graph.removeEdge( edge.id )
    const newNode = graph.addNode( {
      id: String( Math.random() ),
      shape: 'rect',
      width: 60,
      height: 30,
      label: 'new',
      attrs: {
        body: {
          fill: '#855af2',
          stroke: 'transparent',
        },
        label: {
          fill: '#ffffff',
        },
      },
    } )
    const edge1 = graph.addEdge( {
      source: sourceNode,
      target: newNode,
      label: {
        position: 0.5,
        data: 1
      },
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    } )
    const edge2 = graph.addEdge( {
      source: newNode,
      target: targetNode,
      label: {
        position: 0.5,
        data: 1
      },
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    } )

    // graph.addCell(  )
    const cell = graph.findView( newNode )
    console.log( 'cell', cell )
    graph.unfreeze()
    cell.highlight()
    layout( graph )
    // graph.centerCell( newNode )
  }

  return <div
    onMouseEnter={ () => setIsHover( true ) }
    onMouseLeave={ () => setIsHover( false ) }
    onClick={ onClick }
    className="dot"
    ref={ ref }
  >
    { isHover ? '+' : null }
  </div>
}

function appendForeignObject( container ) {
  const fo = Dom.createSvgElement( 'foreignObject' )
  const body = Dom.createElementNS( 'body', Dom.ns.xhtml )
  const content = Dom.createElementNS( 'div', Dom.ns.xhtml )

  fo.setAttribute( 'width', '120' )
  fo.setAttribute( 'height', '30' )
  fo.setAttribute( 'x', '-60' )
  fo.setAttribute( 'y', '-15' )

  body.setAttribute( 'xmlns', Dom.ns.xhtml )
  body.style.width = '100%'
  body.style.height = '100%'
  body.style.padding = '0'
  body.style.margin = '0'

  content.style.width = '100%'
  content.style.height = '100%'
  content.style.textAlign = 'center'
  content.style.lineHeight = '30px'
  content.classList.add( 'xxx' )

  body.appendChild( content )
  fo.appendChild( body )
  container.appendChild( fo )

  return content
}

const dagreLayout = new DagreLayout( {
  type: 'dagre',
  rankdir: 'TB',
  align: 'UL',
  ranksep: 30,
  nodesep: 15,
  controlPoints: true,
} )

const newModel = dagreLayout.layout( data )

graph.fromJSON( newModel )

graph.on( 'edge:customevent', e => {

} )

setInterval( () => {
  const cells = graph.getSelectedCells()
  console.log( 'cells', cells )
}, 1000 )

const cell = graph.getCellById( '111' )

console.log( cell )

cell.appendLabel( {
  position: 0.5,
  data: 1
} )
