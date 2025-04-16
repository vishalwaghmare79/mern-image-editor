import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Transformer } from 'react-konva';
import { useParams } from 'react-router-dom';
import { getImage, updateImageBoundaries } from '../../services/imageService';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import { FiTrash2, FiSave } from 'react-icons/fi';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [boundaries, setBoundaries] = useState([]);
  const [selectedBoundary, setSelectedBoundary] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const stageRef = useRef();
  const imageRef = useRef();
  const transformerRef = useRef();
  const { id: imageId } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await getImage(imageId);
        setImage(data.image);
        setBoundaries(data.image.boundaries || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load image');
      }
    };

    if (imageId) {
      fetchImage();
    }
  }, [imageId]);

  useEffect(() => {
    if (image && image.filename) {
      const img = new window.Image();
      img.src = image.url;
      img.onload = () => {
        imageRef.current.image(img);
        stageRef.current.width(img.width);
        stageRef.current.height(img.height);
      };
    }
  }, [image]);

  useEffect(() => {
    if (selectedBoundary !== null && transformerRef.current && stageRef.current) {
      const node = stageRef.current.findOne(`#boundary-${selectedBoundary}`);
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else {
      transformerRef.current?.nodes([]);
    }
  }, [selectedBoundary, boundaries]);

  const handleBoundarySelect = (index) => {
    setSelectedBoundary(index);
  };

  const handleBoundaryDrag = (index, e) => {
    const newBoundaries = [...boundaries];
    newBoundaries[index].bbox[0] = e.target.x();
    newBoundaries[index].bbox[1] = e.target.y();
    setBoundaries(newBoundaries);
  };

  const handleBoundaryTransform = (index) => {
    const node = stageRef.current.findOne(`#boundary-${index}`);
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newBoundaries = [...boundaries];
    newBoundaries[index].bbox = [
      node.x(),
      node.y(),
      node.width() * scaleX,
      node.height() * scaleY
    ];

    node.scaleX(1);
    node.scaleY(1);
    setBoundaries(newBoundaries);
  };

  const handleDeleteBoundary = (index) => {
    const newBoundaries = boundaries.filter((_, i) => i !== index);
    setBoundaries(newBoundaries);
    setSelectedBoundary(null);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await updateImageBoundaries(imageId, { boundaries: boundaries }); 
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {image && (
        <>
          <div className="mb-4 overflow-auto max-h-[85vh] border border-gray-200 dark:border-gray-700 rounded-lg">
            <Stage
              ref={stageRef}
              className="bg-gray-50 dark:bg-gray-900"
            >
              <Layer>
                <KonvaImage ref={imageRef} />
                {boundaries.map((boundary, index) => (
                  <Rect
                    key={index}
                    id={`boundary-${index}`}
                    x={boundary.bbox[0]}
                    y={boundary.bbox[1]}
                    width={boundary.bbox[2]}
                    height={boundary.bbox[3]}
                    stroke={boundary.color || '#4F46E5'} // indigo-600
                    strokeWidth={selectedBoundary === index ? 3 : 2}
                    draggable
                    onClick={() => handleBoundarySelect(index)}
                    onTap={() => handleBoundarySelect(index)}
                    onDragEnd={(e) => handleBoundaryDrag(index, e)}
                    onTransformEnd={() => handleBoundaryTransform(index)}
                    transformEnabled={selectedBoundary === index}
                  />
                ))}

                {selectedBoundary !== null && <Transformer ref={transformerRef} />}

                {boundaries.map((boundary, index) => (
                  <Text
                    key={`label-${index}`}
                    x={boundary.bbox[0]}
                    y={boundary.bbox[1] - 20}
                    text={`${boundary.label} (${Math.round(boundary.score * 100)}%)`}
                    fontSize={16}
                    fill={boundary.color || '#4F46E5'} // indigo-600
                  />
                ))}
              </Layer>
            </Stage>
          </div>

          <div className="flex gap-2 items-center mt-4">
            {selectedBoundary !== null && (
              <Button
                width='sm'
                onClick={() => handleDeleteBoundary(selectedBoundary)}
                className="flex bg-red-600 hover:bg-red-700 items-center gap-2"
              >
                <FiTrash2 size={18} />
                Delete Boundary
              </Button>
            )}
            
            <Button
              onClick={handleSave}
              width='sm'
              className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave size={18} />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageEditor;