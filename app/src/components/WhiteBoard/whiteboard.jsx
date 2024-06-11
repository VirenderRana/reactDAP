import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Button, IconButton, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fabric } from 'fabric';
import PdfReader from '../PdfReader/PdfReader';
import { saveAs } from 'file-saver';
import getCursor from './cursors.jsx';
import SelectIcon from './images/hand.svg';
import EraserIcon from './images/eraser.svg';
import TextIcon from './images/comment.svg';
import RectangleIcon from './images/icons.svg';
import LineIcon from './images/line.svg';
import EllipseIcon from './images/ellipse.svg';
import TriangleIcon from './images/triangle.svg';
import PencilIcon from './images/pencil.svg';
import DeleteIcon from './images/delete.svg';
import linebreak from './images/linebreak.svg';
import floorbeam from './images/bridge/ExistingFloorBeam.svg';
import diaphragms from './images/bridge/IntermediateDiaphragms.svg';
import support from './images/bridge/MedianSupport.svg';
import subfloor from './images/bridge/SubFloorBeam.svg';
import angel from './images/bridge/UmbrellaAngel.svg';
import separator from './images/bridge/separator.svg';
import close from './images/bridge/close.svg';
import './eraserBrush.jsx';

import styles from './index.module.scss';

let drawInstance = null;
let origX;
let origY;
let mouseDown = false;

const options = {
  currentMode: '',
  currentColor: 'red',
  currentWidth: 1,
  fill: false,
  group: {},
};

const modes = {
  RECTANGLE: 'RECTANGLE',
  TRIANGLE: 'TRIANGLE',
  ELLIPSE: 'ELLIPSE',
  LINE: 'LINE',
  PENCIL: 'PENCIL',
  ERASER: 'ERASER',
};

const initCanvas = (width, height) => {
  const canvas = new fabric.Canvas('canvas', { height, width });
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.borderColor = '#4447A9';
  fabric.Object.prototype.cornerColor = '#4447A9';
  fabric.Object.prototype.cornerSize = 6;
  fabric.Object.prototype.padding = 10;
  fabric.Object.prototype.borderDashArray = [5, 5];

  canvas.on('object:added', (e) => {
    e.target.on('mousedown', removeObject(canvas));
  });
  canvas.on('path:created', (e) => {
    e.path.on('mousedown', removeObject(canvas));
  });

  return canvas;
};

function removeObject(canvas) {
  return (e) => {
    if (options.currentMode === modes.ERASER) {
      canvas.remove(e.target);
    }
  };
}

function stopDrawing() {
  mouseDown = false;
}

function removeCanvasListener(canvas) {
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
}

/* ==== rectangle ==== */
function createRect(canvas, icn) {
  //if (options.currentMode !== modes.RECTANGLE) {
  //  options.currentMode = modes.RECTANGLE;

    removeCanvasListener(canvas);

    canvas.on('mouse:down', startAddRect(canvas, icn));
    canvas.on('mouse:move', startDrawingRect(canvas));
    canvas.on('mouse:up', stopDrawing);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  //}
}

function startAddRect(canvas, icn) {
  return ({ e }) => {
    mouseDown = true;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;

    fabric.Image.fromURL(icn, (img) => {
      // Set the image properties
      img.set({
        left: origX,
        top: origY,
        selectable: false,
        // Scale the image as needed
        scaleX: 1,
        scaleY: 1,
      });

      // Add the image to the canvas
      canvas.add(img);

      // If you need to do anything when this image is clicked (for instance, with the eraser mode)
      img.on('mousedown', (e) => {
        if (options.currentMode === modes.ERASER) {
          canvas.remove(e.target);
        }});});
    

    drawInstance = new fabric.Rect({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectable: false,
    });

    canvas.add(drawInstance);

    drawInstance.on('mousedown', (e) => {
      if (options.currentMode === modes.ERASER) {
        console.log('pointer', e);
        canvas.remove(e.target);
      }
    });
  };
}

function startDrawingRect(canvas) {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY),
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
}


function createText(canvas) {
  removeCanvasListener(canvas);

  canvas.isDrawingMode = false;

  const text = new fabric.Textbox('text', {
    left: 100,
    top: 100,
    fill: options.currentColor,
    editable: true,
  });

  canvas.add(text);
  canvas.renderAll();
}

function changeToErasingMode(canvas) {
  if (options.currentMode !== modes.ERASER) {
    removeCanvasListener(canvas);

    canvas.isDrawingMode = false;

    options.currentMode = modes.ERASER;
    canvas.hoverCursor = `url(${getCursor({ type: 'eraser' })}), default`;
  }
}

function onSelectMode(canvas) {
  options.currentMode = '';
  canvas.isDrawingMode = false;

  removeCanvasListener(canvas);

  canvas.getObjects().map((item) => item.set({ selectable: true }));
  canvas.hoverCursor = 'all-scroll';
}

function clearCanvas(canvas) {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
}
function canvasToJson(canvas) {
  alert(JSON.stringify(canvas.toJSON()));
}

function draw(canvas) {
  if (options.currentMode !== modes.PENCIL) {
    removeCanvasListener(canvas);

    options.currentMode = modes.PENCIL;
    // canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
    canvas.isDrawingMode = true;
  }
}

function handleResize(callback) {
  const resize_ob = new ResizeObserver(callback);

  return resize_ob;
}

function resizeCanvas(canvas, whiteboard) {
  return () => {
    const ratio = canvas.getWidth() / canvas.getHeight();
    const whiteboardWidth = whiteboard.clientWidth;

    const scale = whiteboardWidth / canvas.getWidth();
    const zoom = canvas.getZoom() * scale;
    canvas.setDimensions({ width: whiteboardWidth, height: whiteboardWidth / ratio });
    canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
  };
}

const Whiteboard = ({ aspectRatio = 4 / 3, fileReaderInfo, updateFileReaderInfo }) => {
  const [canvas, setCanvas] = useState(null);
  const [brushWidth, setBrushWidth] = useState(1);
  const [isFill, setIsFill] = useState(false);
  const canvasRef = useRef(null);
  const whiteboardRef = useRef(null);
  const uploadImageRef = useRef(null);
  const uploadPdfRef = useRef(null);
  const [showExtendedToolbar, setShowExtendedToolbar] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [pickNumber, setPickNumber] = useState('');

  useEffect(() => {
    if (!canvas && canvasRef.current) {
      if (!canvas && canvasRef.current) {
      const canvas = initCanvas(
        whiteboardRef.current.clientWidth,
        whiteboardRef.current.clientWidth / aspectRatio,
      );
      setCanvas(() => canvas);

      handleResize(resizeCanvas(canvas, whiteboardRef.current)).observe(whiteboardRef.current);
      setIsOpen(true);
    }
    }
  }, [canvas, canvasRef]);

  useEffect(() => {
    if (canvas) {
      const center = canvas.getCenter();
      fabric.Image.fromURL(fileReaderInfo?.currentPage, (img) => {
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          top: center.top,
          left: center.left,
          originX: 'center',
          originY: 'center',
        });

        canvas.renderAll();
      });
    }
  }, [fileReaderInfo?.currentPage]);

  function uploadImage(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToHeight(canvas.height);
        canvas.add(img);
      });
    });

    reader.readAsDataURL(file);
  }

  function changeCurrentWidth(e) {
    const intValue = parseInt(e.target.value);
    options.currentWidth = intValue;
    canvas.freeDrawingBrush.width = intValue;
    setBrushWidth(() => intValue);
  }

  function changeCurrentColor(e) {
    options.currentColor = e.target.value;
    canvas.freeDrawingBrush.color = e.target.value;
  }

  function changeFill(e) {
    options.fill = e.target.checked;
    setIsFill(() => e.target.checked);
  }

  function onSaveCanvasAsImage() {
    canvasRef.current.toBlob(function (blob) {
      saveAs(blob, `project1_image.png`);
    });
  }

  function onFileChange(event) {
    updateFileReaderInfo({ file: event.target.files[0], currentPageNumber: 1 });
  }

  function toggleExtendedToolbar() {
    setShowExtendedToolbar((prev) => !prev);
  }

  // function updateFileReaderInfo(data) {
  //   setFileReaderInfo({ ...fileReaderInfo, ...data });
  // }

  return (
    <div ref={whiteboardRef} className={styles.whiteboard}>
      
      <canvas ref={canvasRef} id="canvas" />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        p: 4,
        borderRadius: 4,
        minWidth: 300,
        maxWidth: '90vw',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center'
      }}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Upload File and Select Type
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="pick-number-label">Selections</InputLabel>
          <Select
            labelId="pick-number-label"
            value={pickNumber}
            onChange={(e) => setPickNumber(e.target.value)}
            label="Selections"
            defaultValue=""
          >
            <MenuItem value="Master Structure">Master Structure</MenuItem>
            <MenuItem value="Project Area">Project Area</MenuItem>
            <MenuItem value="Inspection Area">Inspection Area</MenuItem>
            <MenuItem value="Inspection Type">Inspection Type</MenuItem>
            <MenuItem value="Component">Component</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', mb: 2 }}>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: '#2979ff',
              ':hover': { backgroundColor: '#5393ff' },
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              ref={uploadImageRef}
              onChange={uploadImage}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: '#ff5722',
              ':hover': { backgroundColor: '#ff8a50' },
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Upload PDF
            <input
              type="file"
              hidden
              accept=".pdf"
              ref={uploadPdfRef}
              onChange={onFileChange}
            />
          </Button>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            onClick={() => setIsOpen(false)}
            variant="contained"
            sx={{ backgroundColor: '#00e676', color: 'white', ':hover': { backgroundColor: '#33eb91' } }}
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="outlined"
            sx={{ borderColor: '#00e676', color: '#00e676', ':hover': { borderColor: '#00e676', color: '#00e676' } }}
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>


      <div className={`${styles.extendedToolbar} ${showExtendedToolbar ? styles.show : ''}`}>
        <button type="button" onClick={() => createRect(canvas, floorbeam)}>
          <img src={floorbeam} alt="floorbeam" />
        </button>
        <button type="button" onClick={() => createRect(canvas, diaphragms)}>
          <img src={diaphragms} alt="diaphragms" />
        </button>
        <button type="button" onClick={() => createRect(canvas, support)}>
          <img src={support} alt="support" />
        </button>
        <button type="button" onClick={() => createRect(canvas, subfloor)}>
          <img src={subfloor} alt="subfloor" />
        </button>
        <button type="button" onClick={() => createRect(canvas, angel)}>
          <img src={angel} alt="angel" />
        </button>
        <img src={separator} alt="separator"/>
        <button type="button" onClick={() => toggleExtendedToolbar()}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.pickNumberDisplay}>
          <span className="toolbar-text">{pickNumber}</span>
        </div>
        <button type="button" onClick={() => onSelectMode(canvas)}>
          <img src={SelectIcon} alt="Selection mode" />
        </button>
        <button type="button" onClick={() => createText(canvas)}>
          <img src={TextIcon} alt="Text" />
        </button>
        {/* <button type="button" onClick={() => draw(canvas)}>
          <img src={PencilIcon} alt="Pencil" style={{ filter: 'invert(100%)' }}/>
        </button> */}
        <img src={linebreak} alt="linebreak"/>
        <button type="button" onClick={() => changeToErasingMode(canvas)}>
          <img src={EraserIcon} alt="Eraser" style={{ filter: 'invert(100%)' }}/>
        </button>
        <button type="button" onClick={() => toggleExtendedToolbar()}>
          <img src={RectangleIcon} alt="Rectangle" />
        </button>
        <button type="button" onClick={() => clearCanvas(canvas)}>
          <img src={DeleteIcon} alt="Delete" style={{ filter: 'invert(100%)' }}/>
        </button>
        <img src={linebreak} alt="linebreak"/>
        {/* <div>
          <input type="color" name="color" id="color" onChange={changeCurrentColor} />
        </div>
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={brushWidth}
          onChange={changeCurrentWidth}
        /> */}
        <div className={styles.uploadDropdown}>
          <input ref={uploadImageRef} accept="image/*" type="file" onChange={uploadImage} />
          <input ref={uploadPdfRef} accept=".pdf" type="file" onChange={onFileChange} />
          <button style={{ color: 'white' }} className={styles.dropdownButton}>+Upload</button>
          <div className={styles.dropdownContent}>
            <span onClick={() => uploadImageRef.current.click()}>Image</span>
            <span onClick={() => uploadPdfRef.current.click()}>PDF</span>
          </div>
        </div>

        <button style={{ color: 'white' }} onClick={() => canvasToJson(canvas)}>To Json</button>
        <button style={{ color: 'white' }} onClick={onSaveCanvasAsImage}>Save as image</button>
      </div>
      <div>
        <PdfReader fileReaderInfo={fileReaderInfo} updateFileReaderInfo={updateFileReaderInfo} />
      </div>
    </div>
  );
};

Whiteboard.propTypes = {
  aspectRatio: PropTypes.number,
  fileReaderInfo: PropTypes.object,
  updateFileReaderInfo: PropTypes.func,
};

export default Whiteboard;
