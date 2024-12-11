"use client";
import { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import "../app/styles/doodle.css";

export default function Doodle() {
  const canvasRef = useRef(null);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasHeight, setCanvasHeight] = useState("600px");

  useEffect(() => {
    const updateHeight = () => {
      const availableHeight = window.innerHeight - 180;
      setCanvasHeight(`${availableHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const dotPattern = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#ccc"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)"/>
    </svg>
  `;
  const backgroundImage = `data:image/svg+xml,${encodeURIComponent(
    dotPattern
  )}`;

  const handleSave = async () => {
    try {
      // Get the canvas element
      const svgData = await canvasRef.current.exportSvg();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      // Set canvas size
      canvas.width = svgDoc.documentElement.width.baseVal.value;
      canvas.height = svgDoc.documentElement.height.baseVal.value;

      // Fill white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert SVG to image and draw on canvas
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        // Create download link
        const link = document.createElement("a");
        link.download = "doodle.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div className="doodle-container">
      <div className="controls">
        <div className="color-picker">
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            title="Choose any color"
          />
        </div>

        <div className="brush-size">
          <label>Brush Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          />
          <span>{strokeWidth}px</span>
        </div>

        <button
          onClick={() => canvasRef.current.clearCanvas()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>

        <button
          onClick={() => canvasRef.current.undo()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Undo
        </button>

        <button
          onClick={() => canvasRef.current.redo()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Redo
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      <div className="canvas-container">
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          width="100%"
          height="100%"
          canvasColor="#ffffff"
          backgroundImage={backgroundImage}
          exportWithBackgroundImage={false}
          preserveBackgroundImageAspectRatio="none"
          eraserWidth={strokeWidth}
          withTimestamp={false}
          allowOnlyPointerType="all"
        />
      </div>
    </div>
  );
}
